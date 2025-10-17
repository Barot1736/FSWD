const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const logFilePath = path.join(__dirname, "./error.log");

app.get("/", (req, res) => {
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send(`
        <h1>Error</h1><pre>${err.message}</pre> `);
    } else {
      res.send(`
        <h1>Error Logs</h1><pre>${data}</pre>`);
    }
  });
});

app.listen(PORT, () => {
console.log(`Server running at http:localhost:${PORT}`);
    });