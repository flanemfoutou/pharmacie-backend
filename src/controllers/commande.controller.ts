import { Request, Response } from "express";
import Commande from "../models/commande.model";
import Stock from "../models/stock.model";

export const createCommande = async (req: Request, res: Response) => {
  try {
    const { produitId, quantite_commande, type_produit, prix, fournisseurId } = req.body;

    const stock = await Stock.findOne({ where: { produitId } });
    if (!stock) return res.status(404).json({ message: "Stock introuvable" });
    if (stock.quantite_reelle < quantite_commande)
      return res.status(400).json({ message: "Stock insuffisant pour la commande" });

    stock.quantite_reelle -= quantite_commande;
    await stock.save();

    const commande = await Commande.create({ produitId, quantite_commande, type_produit, prix, fournisseurId });
    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getCommandes = async (req: Request, res: Response) => {
  const commandes = await Commande.findAll();
  res.json(commandes);
};
