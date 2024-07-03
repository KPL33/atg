import express from "express";
import { getAllCarts, getCartById } from "../../controllers/cart/getCart.js";

const router = express.Router();

// Route to retrieve all carts
router.get("/", async (req, res) => {
  try {
    const carts = await getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error getting all carts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to retrieve a cart by ID
router.get("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
