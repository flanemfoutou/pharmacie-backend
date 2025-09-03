import { Router } from "express";
import { createStock, getStocks, getStockById, updateStock, deleteStock } from "../controllers/stock.controller";

const router = Router();

router.post("/", createStock);
router.get("/", getStocks);
router.get("/:id", getStockById);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;
