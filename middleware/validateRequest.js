const validateRequest = (req, res, next) => {
  const errors = [];
  if (!req.body.name) errors.push("Name is required");
  if (!req.body.email) errors.push("Email is required");
  if (!req.body.password) errors.push("Password is required");
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = { validateRequest };
