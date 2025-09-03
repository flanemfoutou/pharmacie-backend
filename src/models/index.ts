import { Produit } from "./produit.model";
import Fournisseur from "./fournisseur.model";
import Stock from "./stock.model";
import Commande from "./commande.model";
import Vente from "./vente.model";
import Agent from "./agent.model";

// Fournisseur → Produit
Fournisseur.hasMany(Produit, { foreignKey: "fournisseurId" });
Produit.belongsTo(Fournisseur, { foreignKey: "fournisseurId" });

// Produit → Stock
Produit.hasMany(Stock, { foreignKey: "produitId", as: "produitStocks" });
Stock.belongsTo(Produit, { foreignKey: "produitId", as: "produit" });

// Produit → Commande
Produit.hasMany(Commande, { foreignKey: "produitId", as: "produitCommandes" });
Commande.belongsTo(Produit, { foreignKey: "produitId", as: "produit" });

// Produit → Vente
Produit.hasMany(Vente, { foreignKey: "produitId", as: "produitVentes" });
Vente.belongsTo(Produit, { foreignKey: "produitId", as: "produit" });

// Agent → Vente
Agent.hasMany(Vente, { foreignKey: "agentId", as: "agentVentes" });
Vente.belongsTo(Agent, { foreignKey: "agentId", as: "agent" });

export { Produit, Fournisseur, Stock, Commande, Vente, Agent };
