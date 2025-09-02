import express from "express";
import agentRoutes from "./routes/agent.routes";
import produitRoutes from "./routes/produit.routes";
import fournisseurRoutes from "./routes/fournisseur.routes";
import stockRoutes from "./routes/stock.routes";
import commandeRoutes from "./routes/commande.routes";
import venteRoutes from "./routes/vente.routes";
import { errorHandler } from "./middlewares/error.middleware";

import sequelize from "./config/database";
import { Produit, Stock } from "./models";

sequelize.sync({ alter: true }) // alter = ajuste les tables sans tout supprimer
  .then(() => {
    console.log("✅ Base de données synchronisée");
  })
  .catch((err) => {
    console.error("❌ Erreur de synchronisation :", err);
  });


const app = express();

app.use(express.json());

// Routes
app.use("/api/agents", agentRoutes);
app.use("/api/produits", produitRoutes);
app.use("/api/fournisseurs", fournisseurRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/ventes", venteRoutes);

// Middleware global d'erreur
app.use(errorHandler);

export default app;
