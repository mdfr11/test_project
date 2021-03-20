const express = require('express');
const path = require("path");
const cors = require("cors");
const router = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});