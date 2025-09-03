import express from "express";
import sequelize from "./config/database";
import { Produit } from "./models/produit.model"; 
import produitRoutes from "./routes/produit.routes";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("API Pharmacie fonctionne ✅");
});

// Routes produits
app.use("/api/produit", produitRoutes);

// Sync des modèles et démarrage du serveur
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à PostgreSQL réussie ✅");

    await sequelize.sync({ alter: true }); // met à jour les tables selon les modèles
    console.log("Modèles synchronisés avec la base ✅");

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur serveur ou DB:", error);
  }
}

startServer();
