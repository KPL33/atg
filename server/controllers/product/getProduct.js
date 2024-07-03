import Product from "../../models/Product.js";

const calculateValue = (product) => {
  return parseFloat(product.price) * product.amountInStock;
};

const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    // Manually calculate the value for each product
    const productsWithValue = products.map((product) => {
      const value = calculateValue(product);
      return { ...product.toJSON(), value };
    });
    return productsWithValue;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    // Manually calculate the value for the product
    const value = calculateValue(product);
    return { ...product.toJSON(), value };
  } catch (error) {
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
};