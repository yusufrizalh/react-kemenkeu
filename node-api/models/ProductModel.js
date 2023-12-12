import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const ProductModel = db.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      allowNull: true,
    },
    updatedAt: {
      type: "TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP",
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default ProductModel;
