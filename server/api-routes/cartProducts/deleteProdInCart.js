import express from "express";
import deleteProdInCart from "../../controllers/prodInCart/deleteProdInCart.js";

// Create a router
const router = express.Router();

router.delete("/:id", async (req, res) => {
  const cartProductId = req.params.id;

  try {
    const result = await deleteProdInCart(cartProductId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
