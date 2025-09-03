import { Request, Response, NextFunction } from "express";
import { Stock } from "../models";

// Créer un stock
export const createStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (err) { next(err); }
};

// Récupérer tous les stocks
export const getStocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) { next(err); }
};

// Récupérer un stock par ID
export const getStockById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock non trouvé" });
    res.json(stock);
  } catch (err) { next(err); }
};

// Mettre à jour un stock
export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock non trouvé" });
    await stock.update(req.body);
    res.json(stock);
  } catch (err) { next(err); }
};

// Supprimer un stock
export const deleteStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock non trouvé" });
    await stock.destroy();
    res.json({ message: "Stock supprimé" });
  } catch (err) { next(err); }
};
