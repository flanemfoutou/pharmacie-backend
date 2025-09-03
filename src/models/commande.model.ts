import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../config/database";
import { Produit } from "./produit.model";
import Fournisseur from "./fournisseur.model";

// Attributs du modèle
interface CommandeAttributes {
  num_com: number;
  produitId: number;
  quantite_commande: number;
  type_produit: string;
  prix?: number;
  fournisseurId: number;
  date_commande?: Date;
}

// Pour la création, num_com et date_commande sont optionnels
interface CommandeCreationAttributes extends Optional<CommandeAttributes, "num_com" | "date_commande" | "prix"> {}

class Commande extends Model<CommandeAttributes, CommandeCreationAttributes> implements CommandeAttributes {
  public num_com!: number;
  public produitId!: number;
  public quantite_commande!: number;
  public type_produit!: string;
  public prix!: number;
  public fournisseurId!: number;
  public date_commande!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialisation du modèle
Commande.init(
  {
    num_com: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    produitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantite_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_produit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fournisseurId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_commande: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Commande",
    tableName: "commandes",
  }
);

// Relations
Produit.hasMany(Commande, { foreignKey: "produitId" });
Commande.belongsTo(Produit, { foreignKey: "produitId" });

Fournisseur.hasMany(Commande, { foreignKey: "fournisseurId" });
Commande.belongsTo(Fournisseur, { foreignKey: "fournisseurId" });

export default Commande;
