const isTeacher = (req, res, next) => {
  if (req.user.isTeacher) {
    next();
    return;
  }
  res
    .status(403)
    .json({
      ok: false,
      error: "You need to be a teacher to access this route",
    });
};

module.exports = {
  isTeacher
};