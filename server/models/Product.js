import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amountInStock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    productValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Product",
    tableName: "products",
  }
);

const associate = (models) => {
  const { Cart, Purchase } = models;

  // Define associations
  Product.belongsToMany(Cart, {
    through: "CartProduct",
    foreignKey: "productId",
  });

  if (Purchase) {
    Product.belongsToMany(Purchase, {
      through: "ProductPurchase",
      foreignKey: "productId",
    });
  }
};

export { Product as default, associate };
