// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // expects 'Bearer <token>'
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // secret key used while signing
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
