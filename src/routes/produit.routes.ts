import { Router } from "express";
import { 
  createProduit,
  getProduits,
  getProduitById,
  updateProduit,
  deleteProduit
} from "../controllers/produit.controller";

const router = Router();

router.post("/", createProduit);
router.get("/", getProduits);
router.get("/:id", getProduitById);
router.put("/:id", updateProduit);
router.delete("/:id", deleteProduit);

export default router;
