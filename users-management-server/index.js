const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Users server is available");
});


// To Do Save to the DataBase
const users = [
  { id: 1, name: "Sabana", email: "sabana12@gmail.com" },
  { id: 2, name: "Rahim", email: "rahim07@gmail.com" },
  { id: 3, name: "Karim", email: "karim22@gmail.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log("post method called", req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Ports are running on ${port}`);
});
