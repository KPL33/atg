import express from "express";
import { editCartItem } from "../../controllers/cart/editCart.js";

const router = express.Router();

router.put("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const cartData = req.body;

  try {
    const updatedCartItem = await editCartItem(cartId, cartData);
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error editing cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
