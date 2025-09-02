import { Router } from "express";
import { createProduit, getProduits } from "../controllers/produit.controller";
import { validateFields } from "../middlewares/validateFields.middleware";

const router = Router();

router.post("/", validateFields(["nom_produit", "fournisseurId"]), createProduit);
router.get("/", getProduits);

export default router;
