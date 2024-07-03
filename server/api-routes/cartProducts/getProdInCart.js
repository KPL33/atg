import express from "express";
import getAllProductsInCart from "../../controllers/prodInCart/getProdInCart.js";

const router = express.Router();

// Endpoint to retrieve all products in a user's cart
router.get("/", async (req, res) => {
  try {
    const productsInCart = await getAllProductsInCart();
    return res.status(200).json(productsInCart); // Return the products in the cart
  } catch (error) {
    console.error("Error getting products in cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
