const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//using middleware to parse json data
app.use(express.json());

require("./db/conn");


app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
  });