const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from my First Server");
});

app.get("/data", (req, res) => {
  res.send("Hello From Yeasin Arafat");
});

app.listen(port, () => {
  console.log(`My first server is running on port ${port}`);
});
