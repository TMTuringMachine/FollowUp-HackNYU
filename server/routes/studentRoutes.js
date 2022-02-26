const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  jwtVerify,
  joinClassByID,
  getStudentTests
} = require("../controllers/student");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.post("/joinClass",joinClassByID);
router.get("/getAllTests",getStudentTests)

module.exports = router;