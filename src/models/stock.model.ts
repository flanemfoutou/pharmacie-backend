// src/models/stock.model.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import {Produit} from "./produit.model";

class Stock extends Model {}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "produits", // ou Produit.tableName
        key: "id",         // ✅ clé primaire de Produit
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "stock",
    tableName: "stocks",
    timestamps: true,
  }
);

// Association
Produit.hasMany(Stock, { foreignKey: "produitId" });
Stock.belongsTo(Produit, { foreignKey: "produitId" });

export default Stock;
