var jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers, "here");
  if (!token) {
    return res.status(401).send("Access Denied, No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const rootUser = await User.findOne({ _id: decoded._id });
    req.user = rootUser;
    // console.log(rootUser)
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { isAuthenticated };
