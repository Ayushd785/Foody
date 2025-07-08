const express = require("express");
const ownerOnly = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRetaurant,
  updateRestaurant,
  getRestaurant,
} = require("../controllers/restaurantController");
const router = express.Router();

router.use(authMiddleware);

router.get("/test", (req, res) => {
  res.status(200).json({
    msg: "Restaurant route is running",
  });
});

router.post("/", ownerOnly, createRetaurant);
router.put("/", ownerOnly, updateRestaurant);
router.get("/me", ownerOnly, getRestaurant);

module.exports = router;
