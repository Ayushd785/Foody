function ownerOnly(req, res, next) {
  if (req.user.role !== "owner") {
    return res.status(404).json({
      message: "Access denied Owners only",
    });
  }
  next();
}

module.exports = ownerOnly;
