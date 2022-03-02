const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const path = require("path");
//using middleware to parse json data

app.use(express.json());
app.use(cors());

require("./db/conn");
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
