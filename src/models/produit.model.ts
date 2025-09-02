import { DataTypes } from "sequelize";
import  sequelize  from "../config/database";

export const Produit = sequelize.define("Produit", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: DataTypes.TEXT,
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    categorie: DataTypes.STRING(100),
    date_expiration: DataTypes.DATE
}, {
    tableName: "produits",
    timestamps: false
})

;
