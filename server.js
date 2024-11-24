const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", require("./api/auth"));
app.use("/tracks", require("./api/tracks"));
app.use("/playlists", require("./api/playlists"));

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});