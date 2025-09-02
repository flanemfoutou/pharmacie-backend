import {Produit }from "./produit.model";
import Fournisseur from "./fournisseur.model";
import Stock from "./stock.model";
import Commande from "./commande.model";
import Vente from "./vente.model";
import Agent from "./agent.model";


// Relations
Fournisseur.hasMany(Produit, { foreignKey: "fournisseurId" });
Produit.belongsTo(Fournisseur, { foreignKey: "fournisseurId" });
Produit.hasMany(Stock, { foreignKey: "produitId", as: "stocks" });
Stock.belongsTo(Produit, { foreignKey: "produitId", as: "produit" });


Produit.hasMany(Commande, { foreignKey: "produitId" });
Commande.belongsTo(Produit, { foreignKey: "produitId" });

Produit.hasMany(Vente, { foreignKey: "produitId" });
Vente.belongsTo(Produit, { foreignKey: "produitId" });

Agent.hasMany(Vente, { foreignKey: "agentId" });
Vente.belongsTo(Agent, { foreignKey: "agentId" });

export { Produit, Fournisseur, Stock, Commande, Vente, Agent };


