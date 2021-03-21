require('dotenv').config();

const express = require('express');
const path = require("path");
const cors = require("cors");
const router = require("./src/routes/index");
const { errorMiddleware } = require('./src/middlewares');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router)
app.use(errorMiddleware);

require('./src/database/index');

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
