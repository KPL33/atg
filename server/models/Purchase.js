// Import necessary modules
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

// Define the Purchase model
class Purchase extends Model {}

Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "purchase", // Model name
    tableName: "purchases", // Table name
    timestamps: false, // Disable timestamps
  }
);

// Define associations
const associate = (models) => {
  const { User, Cart } = models;

  Purchase.belongsTo(User, { foreignKey: "userId", as: "user" });
  Purchase.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });
};

// Export the model and associations
export default { Purchase, associate };
