import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface FournisseurAttributes {
  id: number;
  nom: string;
  telephone: string;
}

interface FournisseurCreation extends Optional<FournisseurAttributes, "id"> {}

class Fournisseur extends Model<FournisseurAttributes, FournisseurCreation>
  implements FournisseurAttributes {
  public id!: number;
  public nom!: string;
  public telephone!: string;
}

Fournisseur.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "fournisseurs" }
);

export default Fournisseur;
