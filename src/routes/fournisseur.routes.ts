import { Router } from "express";
import { createFournisseur, getFournisseurs } from "../controllers/fournisseur.controller";
import { validateFields } from "../middlewares/validateFields.middleware";

const router = Router();

router.post("/", validateFields(["nom_fournisseur", "ville_fournisseur", "telephone_fournisseur"]), createFournisseur);
router.get("/", getFournisseurs);

export default router;
