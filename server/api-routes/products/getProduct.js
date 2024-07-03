import express from "express";
import getProductControllers from "../../controllers/product/getProduct.js";
const { getAllProducts, getProductById } = getProductControllers;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products); // Return the response immediately
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product); // Return the response immediately
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
