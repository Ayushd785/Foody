const Menu = require("../models/Menu");
const Restaurant = require("../models/Restaurant");

// createItem route this can only be accessed by the restaurant owner so in this route we will add the owneronly middleware

const createItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl, isAvailable } = req.body;

    const restaurant = await Restaurant.findOne({ ownerId: req.user.userId });
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }
    const item = new Menu({
      restaurantId: restaurant._id,
      name,
      description,
      price,
      imageUrl,
      isAvailable,
    });

    await item.save();
    res.status(200).json({
      msg: "Item created successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server down",
      error: err,
    });
  }
};

// get all the menu items this can be accessed by both owner and the customer

const getItems = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ ownerId: req.user.userId });
    if (!restaurant) {
      return res.status(404).json({
        msg: "Restaurant does not exist",
      });
    }
    const menu = await Menu.findOne({ restaurantId: restaurant._id });
    if (!menu) {
      return res.status(404).json({
        msg: "Menu does not exist for this restaurant",
      });
    }
    res.status(200).json({
      menu: menu,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server down",
      error: err,
    });
  }
};

// the owner can update the menu item this route is also OWNER ONLY route

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Menu.findById(itemId);
    if (!item) {
      res.status(404).json({
        msg: "Item does not exist",
      });
    }
    const restaurant = await Restaurant.findOne({ ownerId: req.user.userId });
    if (
      !restaurant ||
      restaurant._id.toString() !== item.restaurantId.toString()
    ) {
      return res.status(403).json({
        msg: "Access Denied",
      });
    }
    const update = req.body;
    await Menu.findOneAndUpdate({ _id: itemId }, req.body, { new: true });
    res.status(200).json({
      msg: "Item updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server issue",
      error: err.message,
    });
  }
};

// the owner can delete a Item from the menu

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Menu.findById(itemId);
    if (!item) {
      res.status(404).json({
        msg: "Item does not exist",
      });
    }
    const restaurant = await Restaurant.findOne({ ownerId: req.user.userId });
    if (
      !restaurant ||
      restaurant._id.toString() !== item.restaurantId.toString()
    ) {
      res.status(403).josn({
        msg: "Access denied",
      });
    }
    await Menu.findOneAndDelete(itemId);
    res.status(200).json({
      msg: "Item successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server down",
      error: err.message,
    });
  }
};

module.exports = {
  createItem,
  updateItem,
  getItems,
  deleteItem,
};
