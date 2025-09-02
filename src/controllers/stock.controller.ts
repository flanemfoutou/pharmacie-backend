import { Request, Response } from "express";
import Stock from "../models/stock.model";

export const createStock = async (req: Request, res: Response) => {
  try {
    const { produitId, type_produit, quantite_reelle, prix_unitaire } = req.body;
    const prix_total = quantite_reelle * prix_unitaire;

    const stock = await Stock.create({ produitId, type_produit, quantite_reelle, prix_unitaire, prix_total });
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getStocks = async (req: Request, res: Response) => {
  const stocks = await Stock.findAll();
  res.json(stocks);
};
