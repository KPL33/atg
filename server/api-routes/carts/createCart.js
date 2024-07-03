import express from "express";
import createCart from "../../controllers/cart/createCart.js";

const router = express.Router();

// Route for creating a new item in the cart
router.post("/", async (req, res) => {
  try {
    // Extract cart data from the request body
    const cartData = req.body;

    // Call the cart controller to create a new item in the cart
    const newInCart = await createCart(cartData);

    // Respond with the newly created cart item
    res.status(201).json(newInCart);
  } catch (error) {
    // Handle errors
    console.error("Error creating new cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
