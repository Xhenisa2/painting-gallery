const express = require("express");
const router = express.Router();

const Contact = require("../models/ContactModel");
const protect = require("../middleware/authMiddleware");

// =========================
// ADD CONTACT MESSAGE
// PUBLIC
// =========================

router.post(
  ["/addContact", "/addContact/"],
  async (req, res) => {
    try {
      console.log("Contact received:", req.body);

      const newContact = new Contact(req.body);

      await newContact.save();

      console.log("Contact added:", newContact);

      res.status(200).json(newContact);

    } catch (error) {
      console.log("Contact not added:", error);

      res.status(500).json({
        message: "Contact not added",
        error: error.message,
      });
    }
  }
);


// =========================
// GET ALL CONTACT MESSAGES
// ADMIN ONLY
// =========================

router.get(
  ["/api/contacts", "/api/contacts/"],
  protect,
  async (req, res) => {
    try {
      const contacts = await Contact.find({})
        .sort({ _id: -1 });

      res.status(200).json(contacts);

    } catch (error) {
      console.log("Contacts not found:", error);

      res.status(500).json({
        message: "Contacts not found",
        error: error.message,
      });
    }
  }
);

module.exports = router;