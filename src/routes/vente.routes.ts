import { Router } from "express";
import { createVente, getVentes } from "../controllers/vente.controller";
import { validateFields } from "../middlewares/validateFields.middleware";
import { checkStock } from "../middlewares/checkStock.middleware";

const router = Router();

router.post(
  "/",
  validateFields(["produitId", "quantite_vendue", "agentId"]),
  checkStock,
  createVente
);

router.get("/", getVentes);

export default router;
