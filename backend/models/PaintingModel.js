const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, default: "", trim: true },
    image: { type: String, required: true, trim: true },
     userItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);
