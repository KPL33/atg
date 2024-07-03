import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";
import User from "./User.js";
import Product from "./Product.js";

class CartProduct extends Model {}

CartProduct.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cart", // Assuming you're using a string reference here to avoid circular dependency
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    productTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cartTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      // change back to false, if problems.
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "CartProduct",
    tableName: "cartProducts", // Specify the correct table name here
  }
);

// Define the 'associate' function to establish associations
const associate = (models) => {
  const { User, Cart, Product } = models;

  // Establish associations
  CartProduct.belongsTo(User, { foreignKey: "userId" });
  CartProduct.belongsTo(Cart, { foreignKey: "cartId" });
  CartProduct.belongsTo(Product, { foreignKey: "productId" });
};

// Call the 'associate' function to establish associations
associate(sequelize.models);

export { CartProduct as default, associate };
