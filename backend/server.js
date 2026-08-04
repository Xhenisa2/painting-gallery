const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const contactRoute = require("./routes/contactRoutes");
const itemRoute = require("./routes/paintingRoutes");

// Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

// MongoDB Atlas Connection
mongoose
  .connect(
    "mongodb+srv://xhenisa2:Website2123@cluster0.au5mvpr.mongodb.net/artgallery?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:");
    console.log(err);
  });

// Routes
app.use(contactRoute);
app.use(itemRoute);

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});