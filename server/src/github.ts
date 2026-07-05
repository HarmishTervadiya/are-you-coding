import type { GitHubEventActor, GitHubPublicEvent } from "./dummy_data";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // strongly recommended, see rate limit note below

// GitHub's current max user ID keeps growing — this is a rough safe upper bound
// (check https://api.github.com/users?since=<big number> to sanity-check periodically)
const MAX_USER_ID_ESTIMATE = 220_000_000;

async function githubFetch(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok)
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  return res;
}

export async function getActiveUsernames(count = 10): Promise<GitHubEventActor[]> {
  const res = await githubFetch("https://api.github.com/events?per_page=100");
  const events = await res.json();

  if (!Array.isArray(events)) {
    throw new Error("[github] Expected array of events from events stream");
  }

  const activeUsers: GitHubEventActor[] = [];
  const seenLogins = new Set<string>();

  for (const event of events) {
    if (activeUsers.length >= count) break;
    const actor = event.actor;
    if (actor && actor.login && !seenLogins.has(actor.login)) {
      seenLogins.add(actor.login);
      activeUsers.push({
        id: actor.id,
        login: actor.login,
        display_login: actor.display_login || actor.login,
        gravatar_id: actor.gravatar_id || "",
        url: `https://github.com/${actor.login}`, // Redirect profile URL
        avatar_url: actor.avatar_url,
      });
    }
  }

  return activeUsers;
}

function parseNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return match && match[1] ? match[1] : null;
}

export async function getRecentPublicEvents(username: string, days = 7) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const events: any[] = [];
  let url: string | null = `https://api.github.com/users/${username}/events/public?per_page=100`;

  while (url) {
    const res = await githubFetch(url);
    const page: any = await res.json();

    if (!Array.isArray(page)) {
      console.warn(`[github] Expected array of events, got:`, page);
      return events;
    }

    for (const event of page) {
      if (new Date(event.created_at).getTime() < cutoff) {
        return events; // hit the cutoff — stop paginating entirely
      }
      events.push(event);
    }

    url = parseNextLink(res.headers.get("link"));
  }

  return events as unknown as GitHubPublicEvent[]; // exhausted all pages (user has <7 days of activity total)
}
