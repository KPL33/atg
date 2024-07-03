import express from "express";
import deleteProductById from "../../controllers/product/deleteProduct.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await deleteProductById(productId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
