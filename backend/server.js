const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("API is running");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("Mongodb connection failed", err));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const restRoutes = require("./routes/restaurantRoutes");
app.use("/api/restaurant", restRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menu/", menuRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("api/user", userRoutes);
