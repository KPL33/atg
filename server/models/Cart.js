import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";
import User from "./User.js";
import Product from "./Product.js";

class Cart extends Model {}

Cart.init(
  {
    // Define model attributes
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Add other attributes as needed
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Cart",
    tableName: "carts",
  }
);

// Define associations
const associate = () => {
  // Establish associations
  Cart.belongsTo(User, { foreignKey: "userId" });
  Cart.belongsToMany(Product, { through: "CartProduct", foreignKey: "cartId" });
};

// Call associate function to establish associations
associate();

export default Cart;
