import express from "express";
import { deleteCartById } from "../../controllers/cart/deleteCart.js";

const router = express.Router();

// DELETE route for deleting a cart by ID
router.delete("/:cartId", async (req, res) => {
  const { cartId } = req.params;

  try {
    // Call the deleteCartById function from the controller
    const result = await deleteCartById(cartId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
