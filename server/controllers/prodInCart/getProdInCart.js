import CartProduct from "../../models/CartProduct.js";
import User from "../../models/User.js";
import Product from "../../models/Product.js";

//Because we wouldn't need to get just 1 CartProduct, we don't include a getById.
const getAllProductsInCart = async () => {
  try {
    const productsInCart = await CartProduct.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "firstName", "lastName"], // Include specific attributes of User
        },
        {
          model: Product,
          attributes: ["id", "name"], // Include specific attributes of Product
        },
      ],
    });

    return productsInCart;
  } catch (error) {
    throw error;
  }
};

export default getAllProductsInCart;
