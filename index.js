const express = require("express");
const fs = require("fs");

const data_file = "./data.json";
const app = express();

// 1. MOVE MIDDLEWARE HERE (Must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readData = () => {
  const jsonData = fs.readFileSync(data_file);
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(data_file, JSON.stringify(data, null, 2));
};

const PORT = 3000;

// Change to "/" so it works with your current Postman URL
app.get("/", (req, res) => {
  res.send(readData());
});

app.post("/data", (req, res) => {
  const { id, username, email, status, last_login } = req.body;
  const oldData = readData();
  
  oldData.push({ id, username, email, status, last_login });
  writeData(oldData);

  // 2. ALWAYS SEND A RESPONSE BACK
  res.status(201).send({ message: "Data added successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});