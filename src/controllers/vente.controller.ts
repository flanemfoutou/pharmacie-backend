import { Request, Response } from "express";
import Vente from "../models/vente.model";
import Stock from "../models/stock.model";

export const createVente = async (req: Request, res: Response) => {
  try {
    const { produitId, quantite_vendue, agentId } = req.body;

    const stock = await Stock.findOne({ where: { produitId } });
    if (!stock) return res.status(404).json({ message: "Stock introuvable" });
    if (stock.quantite_reelle < quantite_vendue)
      return res.status(400).json({ message: "Stock insuffisant pour cette vente" });

    const prix_unitaire = stock.prix_unitaire;
    const prix_total = quantite_vendue * prix_unitaire;

    const vente = await Vente.create({ produitId, quantite_vendue, agentId, prix_unitaire, prix_total });

    stock.quantite_reelle -= quantite_vendue;
    await stock.save();

    res.status(201).json(vente);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getVentes = async (req: Request, res: Response) => {
  const ventes = await Vente.findAll();
  res.json(ventes);
};
