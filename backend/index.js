const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const path = require("path");
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tweets", require("./routes/tweet"));
app.use("/api/relationship", require("./routes/relationship"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/searchusers", require("./routes/search"));
app.use("/api/newsfeed", require("./routes/newsfeed"));
app.use(express.static(path.join(__dirname, "..build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..build/index.html"));
});

app.listen(port, () => {
  console.log(`Twitter backend listening at http://localhost:${port}`);
});
