import { Router } from "express";
import { createVente, getVentes, getVenteById, updateVente, deleteVente } from "../controllers/vente.controller";

const router = Router();

router.post("/", createVente);
router.get("/", getVentes);
router.get("/:id", getVenteById);
router.put("/:id", updateVente);
router.delete("/:id", deleteVente);

export default router;
