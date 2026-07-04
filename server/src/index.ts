import express from "express";

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
