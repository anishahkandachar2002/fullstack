const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Use a strong secret key

const verifyTeacherToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.teacher = decoded; // Attach teacher data to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token!" });
  }
};

module.exports = verifyTeacherToken;
