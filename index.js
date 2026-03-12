const express = require("express");
const fs = require("fs");

const data_file = "./data.json";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- NEW: Basic Logger Middleware ---
// This will log every request to your terminal so you can "see" the traffic
app.use((req, req_res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

const readData = () => {
  try {
    const jsonData = fs.readFileSync(data_file);
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading file:", error.message);
    return []; // Return empty array if file doesn't exist yet
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(data_file, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing file:", error.message);
  }
};

const PORT = 3000;

app.get("/", (req, res) => {
  const data = readData();
  res.status(200).json(data);
});

app.post("/data", (req, res) => {
  const { id, username, email, status, last_login } = req.body;
  
  // --- NEW: Basic Validation ---
  if (!username || !email) {
    return res.status(400).send({ message: "Username and Email are required!" });
  }

  const oldData = readData();
  oldData.push({ id, username, email, status, last_login });
  writeData(oldData);

  res.status(201).send({ message: "Data added successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});