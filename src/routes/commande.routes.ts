import { Router } from "express";
import { createCommande, getCommandes, getCommandeById, updateCommande, deleteCommande } from "../controllers/commande.controller";

const router = Router();

router.post("/", createCommande);
router.get("/", getCommandes);
router.get("/:id", getCommandeById);
router.put("/:id", updateCommande);
router.delete("/:id", deleteCommande);

export default router;
