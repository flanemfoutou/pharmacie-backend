import { Router } from "express";
import { createCommande, getCommandes } from "../controllers/commande.controller";
import { validateFields } from "../middlewares/validateFields.middleware";
import { checkStock } from "../middlewares/checkStock.middleware";

const router = Router();

router.post(
  "/",
  validateFields(["produitId", "quantite_commande", "type_produit", "prix", "fournisseurId"]),
  checkStock,
  createCommande
);

router.get("/", getCommandes);

export default router;
