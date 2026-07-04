// Contains dummy data for 10 users:
//   - a trimmed subset of the GitHub "GET /users/{username}" response
//   - the full "GET /users/{username}/events/public" response (unmodified shape)

export interface GitHubEventActor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

export interface GitHubEventRepoRef {
  id: number;
  name: string;
  url: string;
}

export interface GitHubPublicEvent {
  id: string;
  type: string;
  actor: GitHubEventActor;
  repo: GitHubEventRepoRef;
  payload: Record<string, unknown>;
  public: boolean;
  created_at: string;
}

export interface DummyUser {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  bio: string | null;
  twitter_username: string | null;
  location: string | null;
  events: GitHubPublicEvent[];
}

export const DUMMY_USERS: DummyUser[] = [
  {
    "id": 1000001,
    "login": "noahrao1",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4",
    "url": "https://api.github.com/users/noahrao1",
    "bio": null,
    "twitter_username": null,
    "location": "New York, USA",
    "events": [
      {
        "id": "20100000100",
        "type": "WatchEvent",
        "actor": {
          "id": 1000001,
          "login": "noahrao1",
          "display_login": "noahrao1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahrao1",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4"
        },
        "repo": {
          "id": 6000001,
          "name": "noahrao1/app-318",
          "url": "https://api.github.com/repos/noahrao1/app-318"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-07-03T14:32:43.337Z"
      },
      {
        "id": "20100000101",
        "type": "CreateEvent",
        "actor": {
          "id": 1000001,
          "login": "noahrao1",
          "display_login": "noahrao1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahrao1",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4"
        },
        "repo": {
          "id": 6000002,
          "name": "noahrao1/lib-810",
          "url": "https://api.github.com/repos/noahrao1/lib-810"
        },
        "payload": {
          "ref": null,
          "ref_type": "branch",
          "master_branch": "main",
          "description": "A Go project for lib purposes."
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.337Z"
      },
      {
        "id": "20100000102",
        "type": "CreateEvent",
        "actor": {
          "id": 1000001,
          "login": "noahrao1",
          "display_login": "noahrao1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahrao1",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4"
        },
        "repo": {
          "id": 6000001,
          "name": "noahrao1/app-318",
          "url": "https://api.github.com/repos/noahrao1/app-318"
        },
        "payload": {
          "ref": null,
          "ref_type": "tag",
          "master_branch": "main",
          "description": null
        },
        "public": true,
        "created_at": "2026-07-03T14:32:43.337Z"
      },
      {
        "id": "20100000103",
        "type": "ForkEvent",
        "actor": {
          "id": 1000001,
          "login": "noahrao1",
          "display_login": "noahrao1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahrao1",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4"
        },
        "repo": {
          "id": 6000003,
          "name": "noahrao1/service-533",
          "url": "https://api.github.com/repos/noahrao1/service-533"
        },
        "payload": {
          "forkee": {
            "id": 6000004,
            "full_name": "noahrao1/service-533-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-26T14:32:43.337Z"
      },
      {
        "id": "20100000104",
        "type": "WatchEvent",
        "actor": {
          "id": 1000001,
          "login": "noahrao1",
          "display_login": "noahrao1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahrao1",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4"
        },
        "repo": {
          "id": 6000002,
          "name": "noahrao1/lib-810",
          "url": "https://api.github.com/repos/noahrao1/lib-810"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-23T14:32:43.337Z"
      },
      {
        "id": "20100000105",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000001,
          "login": "noahrao1",
          "display_login": "noahrao1",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahrao1",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000001?v=4"
        },
        "repo": {
          "id": 6000001,
          "name": "noahrao1/app-318",
          "url": "https://api.github.com/repos/noahrao1/app-318"
        },
        "payload": {
          "action": "reopened",
          "number": 160,
          "pull_request": {
            "url": "https://api.github.com/repos/noahrao1/app-318/pulls/4",
            "state": "closed",
            "title": "Update dependencies",
            "user": {
              "login": "noahrao1",
              "id": 1000001
            }
          }
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.338Z"
      }
    ]
  },
  {
    "id": 1000002,
    "login": "avadesai2",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4",
    "url": "https://api.github.com/users/avadesai2",
    "bio": "Building things with Python.",
    "twitter_username": null,
    "location": null,
    "events": [
      {
        "id": "20100000200",
        "type": "PushEvent",
        "actor": {
          "id": 1000002,
          "login": "avadesai2",
          "display_login": "avadesai2",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avadesai2",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4"
        },
        "repo": {
          "id": 6000004,
          "name": "avadesai2/service-879",
          "url": "https://api.github.com/repos/avadesai2/service-879"
        },
        "payload": {
          "push_id": 8994356537,
          "size": 4,
          "distinct_size": 2,
          "ref": "refs/heads/main",
          "head": "92510c6925714",
          "before": "c72fd66890a23",
          "commits": [
            {
              "sha": "089a8b0e83354",
              "author": {
                "email": "avadesai2@example.com",
                "name": "Ava Desai"
              },
              "message": "add feature",
              "distinct": true,
              "url": "https://api.github.com/repos/avadesai2/service-879/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-06-24T14:32:43.338Z"
      },
      {
        "id": "20100000201",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000002,
          "login": "avadesai2",
          "display_login": "avadesai2",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avadesai2",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4"
        },
        "repo": {
          "id": 6000003,
          "name": "avadesai2/lib-750",
          "url": "https://api.github.com/repos/avadesai2/lib-750"
        },
        "payload": {
          "action": "reopened",
          "number": 122,
          "pull_request": {
            "url": "https://api.github.com/repos/avadesai2/lib-750/pulls/23",
            "state": "closed",
            "title": "Fix typo",
            "user": {
              "login": "avadesai2",
              "id": 1000002
            }
          }
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.338Z"
      },
      {
        "id": "20100000202",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000002,
          "login": "avadesai2",
          "display_login": "avadesai2",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avadesai2",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4"
        },
        "repo": {
          "id": 6000004,
          "name": "avadesai2/service-879",
          "url": "https://api.github.com/repos/avadesai2/service-879"
        },
        "payload": {
          "action": "closed",
          "number": 137,
          "pull_request": {
            "url": "https://api.github.com/repos/avadesai2/service-879/pulls/111",
            "state": "open",
            "title": "Improve performance",
            "user": {
              "login": "avadesai2",
              "id": 1000002
            }
          }
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.338Z"
      },
      {
        "id": "20100000203",
        "type": "ForkEvent",
        "actor": {
          "id": 1000002,
          "login": "avadesai2",
          "display_login": "avadesai2",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avadesai2",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4"
        },
        "repo": {
          "id": 6000002,
          "name": "avadesai2/app-749",
          "url": "https://api.github.com/repos/avadesai2/app-749"
        },
        "payload": {
          "forkee": {
            "id": 6000003,
            "full_name": "avadesai2/app-749-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-23T14:32:43.338Z"
      },
      {
        "id": "20100000204",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000002,
          "login": "avadesai2",
          "display_login": "avadesai2",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avadesai2",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4"
        },
        "repo": {
          "id": 6000004,
          "name": "avadesai2/service-879",
          "url": "https://api.github.com/repos/avadesai2/service-879"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 98,
            "title": "Sample issue"
          },
          "comment": {
            "body": "I'll take a look."
          }
        },
        "public": true,
        "created_at": "2026-06-30T14:32:43.339Z"
      },
      {
        "id": "20100000205",
        "type": "ForkEvent",
        "actor": {
          "id": 1000002,
          "login": "avadesai2",
          "display_login": "avadesai2",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avadesai2",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000002?v=4"
        },
        "repo": {
          "id": 6000004,
          "name": "avadesai2/service-879",
          "url": "https://api.github.com/repos/avadesai2/service-879"
        },
        "payload": {
          "forkee": {
            "id": 6000005,
            "full_name": "avadesai2/service-879-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-25T14:32:43.339Z"
      }
    ]
  },
  {
    "id": 1000003,
    "login": "noahkhan3",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4",
    "url": "https://api.github.com/users/noahkhan3",
    "bio": "Building things with Ruby.",
    "twitter_username": "noahkhan3",
    "location": "Bengaluru, India",
    "events": [
      {
        "id": "20100000300",
        "type": "ForkEvent",
        "actor": {
          "id": 1000003,
          "login": "noahkhan3",
          "display_login": "noahkhan3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahkhan3",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "noahkhan3/service-480",
          "url": "https://api.github.com/repos/noahkhan3/service-480"
        },
        "payload": {
          "forkee": {
            "id": 6000006,
            "full_name": "noahkhan3/service-480-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-28T14:32:43.339Z"
      },
      {
        "id": "20100000301",
        "type": "CreateEvent",
        "actor": {
          "id": 1000003,
          "login": "noahkhan3",
          "display_login": "noahkhan3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahkhan3",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "noahkhan3/service-480",
          "url": "https://api.github.com/repos/noahkhan3/service-480"
        },
        "payload": {
          "ref": null,
          "ref_type": "repository",
          "master_branch": "main",
          "description": "A Python project for service purposes."
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.339Z"
      },
      {
        "id": "20100000302",
        "type": "PushEvent",
        "actor": {
          "id": 1000003,
          "login": "noahkhan3",
          "display_login": "noahkhan3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahkhan3",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4"
        },
        "repo": {
          "id": 6000003,
          "name": "noahkhan3/app-59",
          "url": "https://api.github.com/repos/noahkhan3/app-59"
        },
        "payload": {
          "push_id": 5077232682,
          "size": 5,
          "distinct_size": 4,
          "ref": "refs/heads/main",
          "head": "c9611903cbd47",
          "before": "1ee4649b36e0c",
          "commits": [
            {
              "sha": "8f3a136bc47ae",
              "author": {
                "email": "noahkhan3@example.com",
                "name": "Noah Khan"
              },
              "message": "bump deps",
              "distinct": true,
              "url": "https://api.github.com/repos/noahkhan3/app-59/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-06-25T14:32:43.339Z"
      },
      {
        "id": "20100000303",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000003,
          "login": "noahkhan3",
          "display_login": "noahkhan3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahkhan3",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4"
        },
        "repo": {
          "id": 6000003,
          "name": "noahkhan3/app-59",
          "url": "https://api.github.com/repos/noahkhan3/app-59"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 16,
            "title": "Sample issue"
          },
          "comment": {
            "body": "Can you clarify this?"
          }
        },
        "public": true,
        "created_at": "2026-07-01T14:32:43.339Z"
      },
      {
        "id": "20100000304",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000003,
          "login": "noahkhan3",
          "display_login": "noahkhan3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahkhan3",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "noahkhan3/service-480",
          "url": "https://api.github.com/repos/noahkhan3/service-480"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 275,
            "title": "Sample issue"
          },
          "comment": {
            "body": "I'll take a look."
          }
        },
        "public": true,
        "created_at": "2026-06-22T14:32:43.339Z"
      },
      {
        "id": "20100000305",
        "type": "PushEvent",
        "actor": {
          "id": 1000003,
          "login": "noahkhan3",
          "display_login": "noahkhan3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/noahkhan3",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000003?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "noahkhan3/service-480",
          "url": "https://api.github.com/repos/noahkhan3/service-480"
        },
        "payload": {
          "push_id": 7486286756,
          "size": 4,
          "distinct_size": 3,
          "ref": "refs/heads/main",
          "head": "09262e7961543",
          "before": "2ad60f59d33a4",
          "commits": [
            {
              "sha": "368622fd21766",
              "author": {
                "email": "noahkhan3@example.com",
                "name": "Noah Khan"
              },
              "message": "bump deps",
              "distinct": true,
              "url": "https://api.github.com/repos/noahkhan3/service-480/commits/abc123"
            },
            {
              "sha": "4461f9497f71d",
              "author": {
                "email": "noahkhan3@example.com",
                "name": "Noah Khan"
              },
              "message": "add feature",
              "distinct": true,
              "url": "https://api.github.com/repos/noahkhan3/service-480/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-06-26T14:32:43.339Z"
      }
    ]
  },
  {
    "id": 1000004,
    "login": "kabirjoshi4",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4",
    "url": "https://api.github.com/users/kabirjoshi4",
    "bio": "Building things with Java.",
    "twitter_username": "kabirjoshi4",
    "location": "Remote",
    "events": [
      {
        "id": "20100000400",
        "type": "PushEvent",
        "actor": {
          "id": 1000004,
          "login": "kabirjoshi4",
          "display_login": "kabirjoshi4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirjoshi4",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "kabirjoshi4/lib-185",
          "url": "https://api.github.com/repos/kabirjoshi4/lib-185"
        },
        "payload": {
          "push_id": 8825709228,
          "size": 2,
          "distinct_size": 5,
          "ref": "refs/heads/main",
          "head": "1c97453bcbb97",
          "before": "2adcb9ca6fcb7",
          "commits": [
            {
              "sha": "21da4027253d2",
              "author": {
                "email": "kabirjoshi4@example.com",
                "name": "Kabir Joshi"
              },
              "message": "add feature",
              "distinct": true,
              "url": "https://api.github.com/repos/kabirjoshi4/lib-185/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-06-29T14:32:43.339Z"
      },
      {
        "id": "20100000401",
        "type": "IssuesEvent",
        "actor": {
          "id": 1000004,
          "login": "kabirjoshi4",
          "display_login": "kabirjoshi4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirjoshi4",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "kabirjoshi4/service-862",
          "url": "https://api.github.com/repos/kabirjoshi4/service-862"
        },
        "payload": {
          "action": "closed",
          "issue": {
            "number": 114,
            "title": "Bug: crash on start",
            "state": "closed",
            "user": {
              "login": "kabirjoshi4",
              "id": 1000004
            }
          }
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.339Z"
      },
      {
        "id": "20100000402",
        "type": "ForkEvent",
        "actor": {
          "id": 1000004,
          "login": "kabirjoshi4",
          "display_login": "kabirjoshi4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirjoshi4",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "kabirjoshi4/service-862",
          "url": "https://api.github.com/repos/kabirjoshi4/service-862"
        },
        "payload": {
          "forkee": {
            "id": 6000007,
            "full_name": "kabirjoshi4/service-862-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-27T14:32:43.339Z"
      },
      {
        "id": "20100000403",
        "type": "ForkEvent",
        "actor": {
          "id": 1000004,
          "login": "kabirjoshi4",
          "display_login": "kabirjoshi4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirjoshi4",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "kabirjoshi4/service-862",
          "url": "https://api.github.com/repos/kabirjoshi4/service-862"
        },
        "payload": {
          "forkee": {
            "id": 6000007,
            "full_name": "kabirjoshi4/service-862-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-30T14:32:43.339Z"
      },
      {
        "id": "20100000404",
        "type": "WatchEvent",
        "actor": {
          "id": 1000004,
          "login": "kabirjoshi4",
          "display_login": "kabirjoshi4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirjoshi4",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "kabirjoshi4/service-862",
          "url": "https://api.github.com/repos/kabirjoshi4/service-862"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-27T14:32:43.339Z"
      },
      {
        "id": "20100000405",
        "type": "PushEvent",
        "actor": {
          "id": 1000004,
          "login": "kabirjoshi4",
          "display_login": "kabirjoshi4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirjoshi4",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000004?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "kabirjoshi4/service-862",
          "url": "https://api.github.com/repos/kabirjoshi4/service-862"
        },
        "payload": {
          "push_id": 6406899234,
          "size": 4,
          "distinct_size": 2,
          "ref": "refs/heads/main",
          "head": "d94acc77f4b05",
          "before": "0a5df1180f0d",
          "commits": [
            {
              "sha": "975c7946943f",
              "author": {
                "email": "kabirjoshi4@example.com",
                "name": "Kabir Joshi"
              },
              "message": "update readme",
              "distinct": true,
              "url": "https://api.github.com/repos/kabirjoshi4/service-862/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-06-24T14:32:43.339Z"
      }
    ]
  },
  {
    "id": 1000005,
    "login": "ethanjoshi5",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4",
    "url": "https://api.github.com/users/ethanjoshi5",
    "bio": null,
    "twitter_username": null,
    "location": "New York, USA",
    "events": [
      {
        "id": "20100000500",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000005,
          "login": "ethanjoshi5",
          "display_login": "ethanjoshi5",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethanjoshi5",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "ethanjoshi5/lib-410",
          "url": "https://api.github.com/repos/ethanjoshi5/lib-410"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 199,
            "title": "Sample issue"
          },
          "comment": {
            "body": "I'll take a look."
          }
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.339Z"
      },
      {
        "id": "20100000501",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000005,
          "login": "ethanjoshi5",
          "display_login": "ethanjoshi5",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethanjoshi5",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "ethanjoshi5/lib-410",
          "url": "https://api.github.com/repos/ethanjoshi5/lib-410"
        },
        "payload": {
          "action": "reopened",
          "number": 156,
          "pull_request": {
            "url": "https://api.github.com/repos/ethanjoshi5/lib-410/pulls/194",
            "state": "open",
            "title": "Improve performance",
            "user": {
              "login": "ethanjoshi5",
              "id": 1000005
            }
          }
        },
        "public": true,
        "created_at": "2026-06-22T14:32:43.339Z"
      },
      {
        "id": "20100000502",
        "type": "WatchEvent",
        "actor": {
          "id": 1000005,
          "login": "ethanjoshi5",
          "display_login": "ethanjoshi5",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethanjoshi5",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "ethanjoshi5/app-948",
          "url": "https://api.github.com/repos/ethanjoshi5/app-948"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-28T14:32:43.339Z"
      },
      {
        "id": "20100000503",
        "type": "IssuesEvent",
        "actor": {
          "id": 1000005,
          "login": "ethanjoshi5",
          "display_login": "ethanjoshi5",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethanjoshi5",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "ethanjoshi5/lib-410",
          "url": "https://api.github.com/repos/ethanjoshi5/lib-410"
        },
        "payload": {
          "action": "opened",
          "issue": {
            "number": 99,
            "title": "Bug: crash on start",
            "state": "open",
            "user": {
              "login": "ethanjoshi5",
              "id": 1000005
            }
          }
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.339Z"
      },
      {
        "id": "20100000504",
        "type": "CreateEvent",
        "actor": {
          "id": 1000005,
          "login": "ethanjoshi5",
          "display_login": "ethanjoshi5",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethanjoshi5",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4"
        },
        "repo": {
          "id": 6000007,
          "name": "ethanjoshi5/service-836",
          "url": "https://api.github.com/repos/ethanjoshi5/service-836"
        },
        "payload": {
          "ref": "main",
          "ref_type": "tag",
          "master_branch": "main",
          "description": "A TypeScript project for service purposes."
        },
        "public": true,
        "created_at": "2026-06-22T14:32:43.339Z"
      },
      {
        "id": "20100000505",
        "type": "ForkEvent",
        "actor": {
          "id": 1000005,
          "login": "ethanjoshi5",
          "display_login": "ethanjoshi5",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethanjoshi5",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000005?v=4"
        },
        "repo": {
          "id": 6000005,
          "name": "ethanjoshi5/app-948",
          "url": "https://api.github.com/repos/ethanjoshi5/app-948"
        },
        "payload": {
          "forkee": {
            "id": 6000006,
            "full_name": "ethanjoshi5/app-948-fork"
          }
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.339Z"
      }
    ]
  },
  {
    "id": 1000006,
    "login": "ethandesai6",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4",
    "url": "https://api.github.com/users/ethandesai6",
    "bio": null,
    "twitter_username": null,
    "location": "Rajkot, India",
    "events": [
      {
        "id": "20100000600",
        "type": "WatchEvent",
        "actor": {
          "id": 1000006,
          "login": "ethandesai6",
          "display_login": "ethandesai6",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethandesai6",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "ethandesai6/service-778",
          "url": "https://api.github.com/repos/ethandesai6/service-778"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-23T14:32:43.339Z"
      },
      {
        "id": "20100000601",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000006,
          "login": "ethandesai6",
          "display_login": "ethandesai6",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethandesai6",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4"
        },
        "repo": {
          "id": 6000007,
          "name": "ethandesai6/lib-565",
          "url": "https://api.github.com/repos/ethandesai6/lib-565"
        },
        "payload": {
          "action": "reopened",
          "number": 152,
          "pull_request": {
            "url": "https://api.github.com/repos/ethandesai6/lib-565/pulls/96",
            "state": "closed",
            "title": "Improve performance",
            "user": {
              "login": "ethandesai6",
              "id": 1000006
            }
          }
        },
        "public": true,
        "created_at": "2026-06-23T14:32:43.340Z"
      },
      {
        "id": "20100000602",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000006,
          "login": "ethandesai6",
          "display_login": "ethandesai6",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethandesai6",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "ethandesai6/service-778",
          "url": "https://api.github.com/repos/ethandesai6/service-778"
        },
        "payload": {
          "action": "opened",
          "number": 167,
          "pull_request": {
            "url": "https://api.github.com/repos/ethandesai6/service-778/pulls/141",
            "state": "open",
            "title": "Add tests",
            "user": {
              "login": "ethandesai6",
              "id": 1000006
            }
          }
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.340Z"
      },
      {
        "id": "20100000603",
        "type": "ForkEvent",
        "actor": {
          "id": 1000006,
          "login": "ethandesai6",
          "display_login": "ethandesai6",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethandesai6",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "ethandesai6/app-323",
          "url": "https://api.github.com/repos/ethandesai6/app-323"
        },
        "payload": {
          "forkee": {
            "id": 6000007,
            "full_name": "ethandesai6/app-323-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-22T14:32:43.340Z"
      },
      {
        "id": "20100000604",
        "type": "IssuesEvent",
        "actor": {
          "id": 1000006,
          "login": "ethandesai6",
          "display_login": "ethandesai6",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethandesai6",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4"
        },
        "repo": {
          "id": 6000006,
          "name": "ethandesai6/app-323",
          "url": "https://api.github.com/repos/ethandesai6/app-323"
        },
        "payload": {
          "action": "closed",
          "issue": {
            "number": 65,
            "title": "Bug: crash on start",
            "state": "open",
            "user": {
              "login": "ethandesai6",
              "id": 1000006
            }
          }
        },
        "public": true,
        "created_at": "2026-06-22T14:32:43.340Z"
      },
      {
        "id": "20100000605",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000006,
          "login": "ethandesai6",
          "display_login": "ethandesai6",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethandesai6",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000006?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "ethandesai6/service-778",
          "url": "https://api.github.com/repos/ethandesai6/service-778"
        },
        "payload": {
          "action": "opened",
          "number": 109,
          "pull_request": {
            "url": "https://api.github.com/repos/ethandesai6/service-778/pulls/146",
            "state": "open",
            "title": "Fix typo",
            "user": {
              "login": "ethandesai6",
              "id": 1000006
            }
          }
        },
        "public": true,
        "created_at": "2026-07-04T14:32:43.340Z"
      }
    ]
  },
  {
    "id": 1000007,
    "login": "ethaniyer7",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4",
    "url": "https://api.github.com/users/ethaniyer7",
    "bio": null,
    "twitter_username": null,
    "location": "Bengaluru, India",
    "events": [
      {
        "id": "20100000700",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000007,
          "login": "ethaniyer7",
          "display_login": "ethaniyer7",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethaniyer7",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "ethaniyer7/lib-384",
          "url": "https://api.github.com/repos/ethaniyer7/lib-384"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 10,
            "title": "Sample issue"
          },
          "comment": {
            "body": "I'll take a look."
          }
        },
        "public": true,
        "created_at": "2026-06-27T14:32:43.340Z"
      },
      {
        "id": "20100000701",
        "type": "PushEvent",
        "actor": {
          "id": 1000007,
          "login": "ethaniyer7",
          "display_login": "ethaniyer7",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethaniyer7",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4"
        },
        "repo": {
          "id": 6000009,
          "name": "ethaniyer7/service-390",
          "url": "https://api.github.com/repos/ethaniyer7/service-390"
        },
        "payload": {
          "push_id": 5001115108,
          "size": 2,
          "distinct_size": 1,
          "ref": "refs/heads/main",
          "head": "9bf19da426f1d",
          "before": "7c92bf9e0aef4",
          "commits": [
            {
              "sha": "7c5aafcb4a612",
              "author": {
                "email": "ethaniyer7@example.com",
                "name": "Ethan Iyer"
              },
              "message": "fix bug",
              "distinct": true,
              "url": "https://api.github.com/repos/ethaniyer7/service-390/commits/abc123"
            },
            {
              "sha": "95f83bb5756d",
              "author": {
                "email": "ethaniyer7@example.com",
                "name": "Ethan Iyer"
              },
              "message": "fix bug",
              "distinct": true,
              "url": "https://api.github.com/repos/ethaniyer7/service-390/commits/abc123"
            },
            {
              "sha": "4fd925bbddd8a",
              "author": {
                "email": "ethaniyer7@example.com",
                "name": "Ethan Iyer"
              },
              "message": "fix bug",
              "distinct": true,
              "url": "https://api.github.com/repos/ethaniyer7/service-390/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.340Z"
      },
      {
        "id": "20100000702",
        "type": "WatchEvent",
        "actor": {
          "id": 1000007,
          "login": "ethaniyer7",
          "display_login": "ethaniyer7",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethaniyer7",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "ethaniyer7/lib-384",
          "url": "https://api.github.com/repos/ethaniyer7/lib-384"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.340Z"
      },
      {
        "id": "20100000703",
        "type": "IssuesEvent",
        "actor": {
          "id": 1000007,
          "login": "ethaniyer7",
          "display_login": "ethaniyer7",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethaniyer7",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4"
        },
        "repo": {
          "id": 6000007,
          "name": "ethaniyer7/app-25",
          "url": "https://api.github.com/repos/ethaniyer7/app-25"
        },
        "payload": {
          "action": "opened",
          "issue": {
            "number": 132,
            "title": "Docs improvement",
            "state": "closed",
            "user": {
              "login": "ethaniyer7",
              "id": 1000007
            }
          }
        },
        "public": true,
        "created_at": "2026-06-28T14:32:43.340Z"
      },
      {
        "id": "20100000704",
        "type": "ForkEvent",
        "actor": {
          "id": 1000007,
          "login": "ethaniyer7",
          "display_login": "ethaniyer7",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethaniyer7",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "ethaniyer7/lib-384",
          "url": "https://api.github.com/repos/ethaniyer7/lib-384"
        },
        "payload": {
          "forkee": {
            "id": 6000009,
            "full_name": "ethaniyer7/lib-384-fork"
          }
        },
        "public": true,
        "created_at": "2026-07-03T14:32:43.340Z"
      },
      {
        "id": "20100000705",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000007,
          "login": "ethaniyer7",
          "display_login": "ethaniyer7",
          "gravatar_id": "",
          "url": "https://api.github.com/users/ethaniyer7",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000007?v=4"
        },
        "repo": {
          "id": 6000007,
          "name": "ethaniyer7/app-25",
          "url": "https://api.github.com/repos/ethaniyer7/app-25"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 192,
            "title": "Sample issue"
          },
          "comment": {
            "body": "I'll take a look."
          }
        },
        "public": true,
        "created_at": "2026-06-23T14:32:43.340Z"
      }
    ]
  },
  {
    "id": 1000008,
    "login": "miaiyer8",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4",
    "url": "https://api.github.com/users/miaiyer8",
    "bio": null,
    "twitter_username": null,
    "location": null,
    "events": [
      {
        "id": "20100000800",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000008,
          "login": "miaiyer8",
          "display_login": "miaiyer8",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miaiyer8",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "miaiyer8/app-478",
          "url": "https://api.github.com/repos/miaiyer8/app-478"
        },
        "payload": {
          "action": "opened",
          "number": 78,
          "pull_request": {
            "url": "https://api.github.com/repos/miaiyer8/app-478/pulls/64",
            "state": "closed",
            "title": "Add tests",
            "user": {
              "login": "miaiyer8",
              "id": 1000008
            }
          }
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.340Z"
      },
      {
        "id": "20100000801",
        "type": "CreateEvent",
        "actor": {
          "id": 1000008,
          "login": "miaiyer8",
          "display_login": "miaiyer8",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miaiyer8",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "miaiyer8/app-478",
          "url": "https://api.github.com/repos/miaiyer8/app-478"
        },
        "payload": {
          "ref": null,
          "ref_type": "repository",
          "master_branch": "main",
          "description": null
        },
        "public": true,
        "created_at": "2026-07-02T14:32:43.340Z"
      },
      {
        "id": "20100000802",
        "type": "IssuesEvent",
        "actor": {
          "id": 1000008,
          "login": "miaiyer8",
          "display_login": "miaiyer8",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miaiyer8",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "miaiyer8/app-478",
          "url": "https://api.github.com/repos/miaiyer8/app-478"
        },
        "payload": {
          "action": "reopened",
          "issue": {
            "number": 140,
            "title": "Docs improvement",
            "state": "closed",
            "user": {
              "login": "miaiyer8",
              "id": 1000008
            }
          }
        },
        "public": true,
        "created_at": "2026-06-24T14:32:43.340Z"
      },
      {
        "id": "20100000803",
        "type": "CreateEvent",
        "actor": {
          "id": 1000008,
          "login": "miaiyer8",
          "display_login": "miaiyer8",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miaiyer8",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4"
        },
        "repo": {
          "id": 6000008,
          "name": "miaiyer8/app-478",
          "url": "https://api.github.com/repos/miaiyer8/app-478"
        },
        "payload": {
          "ref": null,
          "ref_type": "tag",
          "master_branch": "main",
          "description": null
        },
        "public": true,
        "created_at": "2026-06-29T14:32:43.340Z"
      },
      {
        "id": "20100000804",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000008,
          "login": "miaiyer8",
          "display_login": "miaiyer8",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miaiyer8",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4"
        },
        "repo": {
          "id": 6000009,
          "name": "miaiyer8/lib-543",
          "url": "https://api.github.com/repos/miaiyer8/lib-543"
        },
        "payload": {
          "action": "opened",
          "number": 160,
          "pull_request": {
            "url": "https://api.github.com/repos/miaiyer8/lib-543/pulls/194",
            "state": "open",
            "title": "Update dependencies",
            "user": {
              "login": "miaiyer8",
              "id": 1000008
            }
          }
        },
        "public": true,
        "created_at": "2026-06-29T14:32:43.340Z"
      },
      {
        "id": "20100000805",
        "type": "ForkEvent",
        "actor": {
          "id": 1000008,
          "login": "miaiyer8",
          "display_login": "miaiyer8",
          "gravatar_id": "",
          "url": "https://api.github.com/users/miaiyer8",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000008?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "miaiyer8/service-939",
          "url": "https://api.github.com/repos/miaiyer8/service-939"
        },
        "payload": {
          "forkee": {
            "id": 6000011,
            "full_name": "miaiyer8/service-939-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-27T14:32:43.340Z"
      }
    ]
  },
  {
    "id": 1000009,
    "login": "avastone9",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4",
    "url": "https://api.github.com/users/avastone9",
    "bio": null,
    "twitter_username": null,
    "location": "Berlin, Germany",
    "events": [
      {
        "id": "20100000900",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000009,
          "login": "avastone9",
          "display_login": "avastone9",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avastone9",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "avastone9/lib-613",
          "url": "https://api.github.com/repos/avastone9/lib-613"
        },
        "payload": {
          "action": "reopened",
          "number": 79,
          "pull_request": {
            "url": "https://api.github.com/repos/avastone9/lib-613/pulls/124",
            "state": "closed",
            "title": "Add tests",
            "user": {
              "login": "avastone9",
              "id": 1000009
            }
          }
        },
        "public": true,
        "created_at": "2026-06-26T14:32:43.340Z"
      },
      {
        "id": "20100000901",
        "type": "CreateEvent",
        "actor": {
          "id": 1000009,
          "login": "avastone9",
          "display_login": "avastone9",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avastone9",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "avastone9/lib-613",
          "url": "https://api.github.com/repos/avastone9/lib-613"
        },
        "payload": {
          "ref": "main",
          "ref_type": "repository",
          "master_branch": "main",
          "description": "A Rust project for lib purposes."
        },
        "public": true,
        "created_at": "2026-06-29T14:32:43.340Z"
      },
      {
        "id": "20100000902",
        "type": "WatchEvent",
        "actor": {
          "id": 1000009,
          "login": "avastone9",
          "display_login": "avastone9",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avastone9",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "avastone9/lib-613",
          "url": "https://api.github.com/repos/avastone9/lib-613"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-28T14:32:43.340Z"
      },
      {
        "id": "20100000903",
        "type": "PushEvent",
        "actor": {
          "id": 1000009,
          "login": "avastone9",
          "display_login": "avastone9",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avastone9",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4"
        },
        "repo": {
          "id": 6000009,
          "name": "avastone9/app-495",
          "url": "https://api.github.com/repos/avastone9/app-495"
        },
        "payload": {
          "push_id": 6290380122,
          "size": 4,
          "distinct_size": 5,
          "ref": "refs/heads/main",
          "head": "4d85ee58c7caa",
          "before": "282a9b663946b",
          "commits": [
            {
              "sha": "25c9aa8629519",
              "author": {
                "email": "avastone9@example.com",
                "name": "Ava Stone"
              },
              "message": "fix bug",
              "distinct": true,
              "url": "https://api.github.com/repos/avastone9/app-495/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-07-03T14:32:43.340Z"
      },
      {
        "id": "20100000904",
        "type": "PushEvent",
        "actor": {
          "id": 1000009,
          "login": "avastone9",
          "display_login": "avastone9",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avastone9",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4"
        },
        "repo": {
          "id": 6000009,
          "name": "avastone9/app-495",
          "url": "https://api.github.com/repos/avastone9/app-495"
        },
        "payload": {
          "push_id": 3274227233,
          "size": 4,
          "distinct_size": 5,
          "ref": "refs/heads/main",
          "head": "0405a09752d9b",
          "before": "e263203c8d094",
          "commits": [
            {
              "sha": "657ab71304ed",
              "author": {
                "email": "avastone9@example.com",
                "name": "Ava Stone"
              },
              "message": "add feature",
              "distinct": true,
              "url": "https://api.github.com/repos/avastone9/app-495/commits/abc123"
            }
          ]
        },
        "public": true,
        "created_at": "2026-07-04T14:32:43.340Z"
      },
      {
        "id": "20100000905",
        "type": "CreateEvent",
        "actor": {
          "id": 1000009,
          "login": "avastone9",
          "display_login": "avastone9",
          "gravatar_id": "",
          "url": "https://api.github.com/users/avastone9",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000009?v=4"
        },
        "repo": {
          "id": 6000009,
          "name": "avastone9/app-495",
          "url": "https://api.github.com/repos/avastone9/app-495"
        },
        "payload": {
          "ref": null,
          "ref_type": "repository",
          "master_branch": "main",
          "description": "A Java project for app purposes."
        },
        "public": true,
        "created_at": "2026-06-26T14:32:43.340Z"
      }
    ]
  },
  {
    "id": 1000010,
    "login": "kabirdesai10",
    "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4",
    "url": "https://api.github.com/users/kabirdesai10",
    "bio": null,
    "twitter_username": "kabirdesai10",
    "location": "Remote",
    "events": [
      {
        "id": "20100001000",
        "type": "ForkEvent",
        "actor": {
          "id": 1000010,
          "login": "kabirdesai10",
          "display_login": "kabirdesai10",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirdesai10",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4"
        },
        "repo": {
          "id": 6000011,
          "name": "kabirdesai10/lib-463",
          "url": "https://api.github.com/repos/kabirdesai10/lib-463"
        },
        "payload": {
          "forkee": {
            "id": 6000012,
            "full_name": "kabirdesai10/lib-463-fork"
          }
        },
        "public": true,
        "created_at": "2026-06-23T14:32:43.341Z"
      },
      {
        "id": "20100001001",
        "type": "IssuesEvent",
        "actor": {
          "id": 1000010,
          "login": "kabirdesai10",
          "display_login": "kabirdesai10",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirdesai10",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "kabirdesai10/app-426",
          "url": "https://api.github.com/repos/kabirdesai10/app-426"
        },
        "payload": {
          "action": "reopened",
          "issue": {
            "number": 211,
            "title": "Docs improvement",
            "state": "open",
            "user": {
              "login": "kabirdesai10",
              "id": 1000010
            }
          }
        },
        "public": true,
        "created_at": "2026-06-20T14:32:43.341Z"
      },
      {
        "id": "20100001002",
        "type": "PullRequestEvent",
        "actor": {
          "id": 1000010,
          "login": "kabirdesai10",
          "display_login": "kabirdesai10",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirdesai10",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "kabirdesai10/app-426",
          "url": "https://api.github.com/repos/kabirdesai10/app-426"
        },
        "payload": {
          "action": "opened",
          "number": 78,
          "pull_request": {
            "url": "https://api.github.com/repos/kabirdesai10/app-426/pulls/191",
            "state": "closed",
            "title": "Add tests",
            "user": {
              "login": "kabirdesai10",
              "id": 1000010
            }
          }
        },
        "public": true,
        "created_at": "2026-06-28T14:32:43.341Z"
      },
      {
        "id": "20100001003",
        "type": "CreateEvent",
        "actor": {
          "id": 1000010,
          "login": "kabirdesai10",
          "display_login": "kabirdesai10",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirdesai10",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4"
        },
        "repo": {
          "id": 6000011,
          "name": "kabirdesai10/lib-463",
          "url": "https://api.github.com/repos/kabirdesai10/lib-463"
        },
        "payload": {
          "ref": "main",
          "ref_type": "tag",
          "master_branch": "main",
          "description": "A Go project for lib purposes."
        },
        "public": true,
        "created_at": "2026-06-24T14:32:43.341Z"
      },
      {
        "id": "20100001004",
        "type": "WatchEvent",
        "actor": {
          "id": 1000010,
          "login": "kabirdesai10",
          "display_login": "kabirdesai10",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirdesai10",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4"
        },
        "repo": {
          "id": 6000012,
          "name": "kabirdesai10/service-227",
          "url": "https://api.github.com/repos/kabirdesai10/service-227"
        },
        "payload": {
          "action": "started"
        },
        "public": true,
        "created_at": "2026-06-26T14:32:43.341Z"
      },
      {
        "id": "20100001005",
        "type": "IssueCommentEvent",
        "actor": {
          "id": 1000010,
          "login": "kabirdesai10",
          "display_login": "kabirdesai10",
          "gravatar_id": "",
          "url": "https://api.github.com/users/kabirdesai10",
          "avatar_url": "https://avatars.githubusercontent.com/u/1000010?v=4"
        },
        "repo": {
          "id": 6000010,
          "name": "kabirdesai10/app-426",
          "url": "https://api.github.com/repos/kabirdesai10/app-426"
        },
        "payload": {
          "action": "created",
          "issue": {
            "number": 21,
            "title": "Sample issue"
          },
          "comment": {
            "body": "Looks good to me!"
          }
        },
        "public": true,
        "created_at": "2026-07-04T14:32:43.341Z"
      }
    ]
  }
];