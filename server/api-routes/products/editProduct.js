import express from "express";
import editProduct from "../../controllers/product/editProduct.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await editProduct(productId, productData);

    console.log("Updated Product Data:", updatedProduct);

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ error: "Product not found or not updated" });
    }

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
