import { Router } from "express";
import { createStock, getStocks } from "../controllers/stock.controller";
import { validateFields } from "../middlewares/validateFields.middleware";

const router = Router();

router.post(
  "/",
  validateFields(["produitId", "type_produit", "quantite_reelle", "prix_unitaire"]),
  createStock
);

router.get("/", getStocks);

export default router;
