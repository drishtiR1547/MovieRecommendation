const express = require("express");
const app = express();
const PORT = 3000;

// serve frontend files
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});