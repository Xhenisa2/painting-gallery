const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const protect = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Please login.",
      });
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    console.log("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;