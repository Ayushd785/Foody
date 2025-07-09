const express = require("express");
const {
  getRestaurant,
  getMenu,
} = require("../controllers/restaurantController");
const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.status(200).json({
    msg: "User route is running",
  });
});

router.get("/restaurant", getRestaurant);
router.get("/restaurant/:id/menu", getMenu);

module.exports = router;
