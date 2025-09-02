// models/agent.model.ts
import { Model, DataTypes } from "sequelize";
import  sequelize  from "../config/database";

export interface AgentAttributes {
  num_agent?: number;
  mat_agent: string;
  nom_prenom: string;
  genre: "M" | "F";
  telephone: string;
}

// Type pour création (id optionnel)
export interface AgentCreationAttributes extends Omit<AgentAttributes, "num_agent"> {}

export class Agent extends Model<AgentAttributes, AgentCreationAttributes> implements AgentAttributes {
  public num_agent!: number;
  public mat_agent!: string;
  public nom_prenom!: string;
  public genre!: "M" | "F";
  public telephone!: string;
}

Agent.init(
  {
    num_agent: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mat_agent: { type: DataTypes.STRING, unique: true, allowNull: false },
    nom_prenom: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING(1), allowNull: false },
    telephone: { type: DataTypes.STRING(15), allowNull: false },
  },
  {
    sequelize,
    modelName: "Agent",
    tableName: "agents",
  }
);

export default Agent;
