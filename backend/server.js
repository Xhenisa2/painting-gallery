require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const contactRoute = require("./routes/contactRoutes");
const paintingRoute = require("./routes/paintingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


// =========================
// CORS
// =========================

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);


// =========================
// MIDDLEWARE
// =========================

app.use(cookieParser());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// =========================
// IMAGES
// =========================

app.use(
  "/images",
  express.static(
    path.join(__dirname, "images")
  )
);


// =========================
// MONGODB
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((error) => {
    console.log(
      "❌ MongoDB Connection Error:",
      error
    );
  });


// =========================
// ROUTES
// =========================

app.use(contactRoute);

app.use(paintingRoute);

app.use(
  "/api/admin",
  adminRoutes
);


// =========================
// TEST
// =========================

app.get("/", (req, res) => {
  res.send(
    "Xhulia Toska Art API is running!"
  );
});


// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});