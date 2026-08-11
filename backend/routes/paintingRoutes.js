const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Painting = require("../models/PaintingModel");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const imagesDirectory = path.join(__dirname, "..", "images");

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, imagesDirectory),
    filename: (_req, file, callback) => callback(null, `${Date.now()}${path.extname(file.originalname)}`),
  }),
  fileFilter: (_req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    callback(null, allowedTypes.includes(file.mimetype));
  },
});

const imageUrl = (painting) => ({
  ...painting.toObject(),
  image: painting.image ? `/images/${painting.image}` : "",
});

router.get("/api/paintings", async (_req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });
    res.json(paintings.map(imageUrl));
  } catch (_error) {
    res.status(500).json({ message: "Unable to load paintings." });
  }
});

router.get("/api/paintings/:id", async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting) return res.status(404).json({ message: "Painting not found." });
    res.json(imageUrl(painting));
  } catch (_error) {
    res.status(400).json({ message: "Invalid painting id." });
  }
});

router.post(
  "/api/paintings",
  protect,
  upload.single("image"),
  async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "An image is required." });

    const painting = await Painting.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.file.filename,
    });
    res.status(201).json(imageUrl(painting));
  } catch (error) {
    if (req.file) await fs.unlink(path.join(imagesDirectory, req.file.filename)).catch(() => {});
    res.status(400).json({ message: error.message });
  }
});

// UPDATE PAINTING
router.put(
  "/api/paintings/:id",
  protect,
  upload.single("image"),
  async (req, res) => {  try {
    const painting = await Painting.findById(req.params.id);

    if (!painting) {
      return res.status(404).json({
        message: "Painting not found.",
      });
    }

    // Ruajmë informacionet e reja
    painting.title = req.body.title;
    painting.description = req.body.description;
    painting.category = req.body.category;

    // Nëse është zgjedhur foto e re
    if (req.file) {
      const oldImage = painting.image;

      painting.image = req.file.filename;

      // Fshi foton e vjetër
      if (oldImage) {
        await fs
          .unlink(path.join(imagesDirectory, oldImage))
          .catch(() => {});
      }
    }

    const updatedPainting = await painting.save();

    res.status(200).json(imageUrl(updatedPainting));

  } catch (error) {
    console.log("Update painting error:", error);

    // Nëse fotoja e re u upload-ua por update dështoi
    if (req.file) {
      await fs
        .unlink(path.join(imagesDirectory, req.file.filename))
        .catch(() => {});
    }

    res.status(400).json({
      message: "Painting could not be updated.",
    });
  }
});
router.delete(
  "/api/paintings/:id",
  protect,
  async (req, res) => {
  try {
    const painting = await Painting.findByIdAndDelete(req.params.id);
    if (!painting) return res.status(404).json({ message: "Painting not found." });
    await fs.unlink(path.join(imagesDirectory, painting.image)).catch(() => {});
    res.status(204).end();
  } catch (_error) {
    res.status(400).json({ message: "Invalid painting id." });
  }
});

module.exports = router;
