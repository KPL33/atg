import express from "express";

import createProduct from "../../controllers/product/createProduct.js";

// Create a router
const router = express.Router();

// Route for creating a new user
router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await createProduct(productData);

    // Send a success response with the newly created user
    res.status(201).json(newProduct);
  } catch (error) {
    // Handle errors
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
