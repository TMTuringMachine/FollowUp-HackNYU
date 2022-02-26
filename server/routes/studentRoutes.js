const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  jwtVerify,
  joinClassByID,
  getStudentTests,

  feedback,
} = require("../controllers/student");

router.post("/signup", signup);
router.post("/login", login);
router.get("/jwtVerify", jwtVerify);
router.post("/joinClass", joinClassByID);
router.get("/getAllTests", getStudentTests);
router.post("/feedback", feedback);

module.exports = router;
