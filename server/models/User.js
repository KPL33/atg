import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "User",
    tableName: "users",
  }
);

const associate = (models) => {
  const { Cart, Purchase } = models;

  // Define associations
  User.hasOne(Cart, { foreignKey: "userId" }); // A User has one Cart
  User.hasMany(Purchase, { foreignKey: "userId" }); // A User has many Purchases
};

export { User as default, associate };

