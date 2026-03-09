const express = require("express");
const fs = require("fs");

const data_file = "./data.json";

// initialize express app
const app = express();

const readData = () => {
  const jsonData = fs.readFileSync(data_file);
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(data_file, JSON.stringify(data, null, 2));
};

const PORT = 3000;

app.get("/data", (req, res) => {
  res.send(readData());
});

app.post("/data", (req, res) => {
  const { id, username, email, status, last_login } = req.body;

  const oldData = readData();

  const newData = oldData.push({ id, username, email, status, last_login });

  writeData(oldData);
});

// middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
