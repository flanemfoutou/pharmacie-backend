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
app.use("/api/agent", agentRoutes);
app.use("/api/produit", produitRoutes);
app.use("/api/fournisseur", fournisseurRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/commande", commandeRoutes);
app.use("/api/vente", venteRoutes);

// Middleware global d'erreur
app.use(errorHandler);

export default app;
