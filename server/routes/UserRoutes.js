const express = require("express");
const router = express.Router();
const { signup, login, jwtVerify } = require("../controllers/Users");
const { isAuthenticated } = require("../middlewares/Auth");

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/jwtVerify", jwtVerify);
// router.get("/test", isAuthenticated);
// router.post("/hi", (req, res) => {
//   res.send("working");
// });

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/jwtVerify", jwtVerify);

module.exports = router;
