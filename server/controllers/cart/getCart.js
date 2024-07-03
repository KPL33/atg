import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import CartProduct from "../../models/CartProduct.js";

// Utility function to calculate cartTotal based on products in a cart
const calculateCartTotal = (products) => {
  if (!products || products.length === 0) {
    return "0.00";
  }

  const cartTotal = products.reduce((total, product) => {
    return total + parseFloat(product.CartProduct.productTotal);
  }, 0);

  return cartTotal.toFixed(2);
};

// Function to retrieve all carts with associated products and calculated cartTotal
export const getAllCarts = async () => {
  try {
    const carts = await Cart.findAll({
      include: {
        model: Product,
        through: {
          model: CartProduct,
          attributes: ["productQuantity", "productPrice", "productTotal"],
        },
        attributes: ["id", "name", "category", "description"], // Specify the attributes of Product to include
      },
      attributes: ["id", "userId", "createdAt", "updatedAt"], // Specify the attributes of Cart to include
    });

    // Calculate cartTotal for each cart based on products in the cart
    carts.forEach((cart) => {
      cart.dataValues.cartTotal = calculateCartTotal(cart.Products);
    });

    return carts;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve a specific cart by ID with associated products and calculated cartTotal
export const getCartById = async (cartId) => {
  try {
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: Product,
        through: {
          model: CartProduct,
          attributes: ["productQuantity", "productPrice", "productTotal"],
        },
        attributes: ["id", "name", "category", "description"], // Specify the attributes of Product to include
      },
      attributes: ["id", "userId", "createdAt", "updatedAt"], // Specify the attributes of Cart to include
    });

    // Calculate cartTotal based on products in the cart
    if (cart) {
      cart.dataValues.cartTotal = calculateCartTotal(cart.Products);
    }

    return cart;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllCarts,
  getCartById,
};
