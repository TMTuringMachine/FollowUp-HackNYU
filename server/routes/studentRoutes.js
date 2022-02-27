const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  jwtVerify,
  joinClassByID,
  getStudentTests,
  getAttendance,
  feedback,
} = require("../controllers/student");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.post("/joinClass", joinClassByID);
router.get("/getAllTests/:studentID", getStudentTests);
router.post("/feedback", feedback);
router.get("/getAttendance/:id", getAttendance);

module.exports = router;
