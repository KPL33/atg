import express from "express";
import editProdInCart from "../../controllers/prodInCart/editProdInCart.js";

const router = express.Router();

// Route to update a product's quantity in the user's cart
router.put("/:productId", async (req, res) => {
  try {
    const result = await editProdInCart(req, res);
    return result; // Return the result from the controller
  } catch (error) {
    console.error("Error updating product quantity in cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
