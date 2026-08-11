const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username dhe password janë të detyrueshme.",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Username ose password i gabuar.",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Username ose password i gabuar.",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      username: admin.username,
    });

  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = {
  login,
};