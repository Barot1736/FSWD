const express = require('express');
const homeRoute = require('../src/App');

const app = express();

app.use(express.json());

app.use('/', homeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
