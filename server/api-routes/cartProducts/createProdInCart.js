import express from "express";
import createProdInCart from "../../controllers/prodInCart/createProdInCart.js";

const router = express.Router();

// Route for adding a product to the cart
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    
    const { userId, productId, quantity, cartId } = req.body;

    // Call the createProdInCart function with required parameters
    const newCartProduct = await createProdInCart({
      userId,
      productId,
      quantity,
      cartId,
    });

    // Send a success response with the newly created or updated CartProduct
    res.status(201).json(newCartProduct);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
