import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../config/database";
import { Produit }from "./produit.model";
import Agent from "./agent.model";

// Attributs du modèle Vente
interface VenteAttributes {
  num_vente: number;
  produitId: number;
  quantite_vendue: number;
  prix_unitaire?: number;
  prix_total?: number;
  agentId: number;
  date_vente?: Date;
}

// Pour la création, certaines propriétés sont optionnelles
interface VenteCreationAttributes extends Optional<VenteAttributes, "num_vente" | "prix_unitaire" | "prix_total" | "date_vente"> {}

class Vente extends Model<VenteAttributes, VenteCreationAttributes> implements VenteAttributes {
  public num_vente!: number;
  public produitId!: number;
  public quantite_vendue!: number;
  public prix_unitaire!: number;
  public prix_total!: number;
  public agentId!: number;
  public date_vente!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialisation du modèle
Vente.init(
  {
    num_vente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    produitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantite_vendue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prix_unitaire: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    prix_total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_vente: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Vente",
    tableName: "ventes",
  }
);

// Relations
Produit.hasMany(Vente, { foreignKey: "produitId" });
Vente.belongsTo(Produit, { foreignKey: "produitId" });

Agent.hasMany(Vente, { foreignKey: "agentId" });
Vente.belongsTo(Agent, { foreignKey: "agentId" });

export default Vente;


