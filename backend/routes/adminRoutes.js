const express = require("express");
const bcrypt = require("bcrypt");

const Admin = require("../models/AdminModel");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("LOGIN REQUEST:", username);

    const findUser = await Admin.findOne({
      username: username
    });

    console.log("USER FOUND:", findUser ? "YES" : "NO");

    if (!findUser) {
      return res.status(404).json({
        message: "Username ose password i gabuar."
      });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      findUser.password
    );

    console.log(
      "PASSWORD CORRECT:",
      passwordCompare
    );

    if (!passwordCompare) {
      return res.status(401).json({
        message: "Username ose password i gabuar."
      });
    }

    res.status(200).json({
      message: "Login successful",
      id: findUser._id,
      username: findUser.username,
      email: findUser.email
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error during login."
    });
  }
});

module.exports = router;