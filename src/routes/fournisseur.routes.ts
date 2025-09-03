import { Router } from "express";
import { createFournisseur, getFournisseurs, getFournisseurById, updateFournisseur, deleteFournisseur } from "../controllers/fournisseur.controller";

const router = Router();

router.post("/", createFournisseur);
router.get("/", getFournisseurs);
router.get("/:id", getFournisseurById);
router.put("/:id", updateFournisseur);
router.delete("/:id", deleteFournisseur);

export default router;
