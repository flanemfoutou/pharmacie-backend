import { Request, Response, NextFunction } from "express";
import Stock from "../models/stock.model";

export const checkStock = async (req: Request, res: Response, next: NextFunction) => {
  const { produitId, quantite_vendue, quantite_commande } = req.body;

  if (!produitId) return res.status(400).json({ message: "ProduitId requis" });

  const stock = await Stock.findOne({ where: { produitId } });

  if (!stock) return res.status(404).json({ message: "Produit non trouvé dans le stock" });

  // Vérification pour vente
  if (quantite_vendue && stock.quantite_reelle < quantite_vendue) {
    return res.status(400).json({ message: "Stock insuffisant pour cette vente" });
  }

  // Vérification pour commande
  if (quantite_commande && stock.quantite_reelle < quantite_commande) {
    return res.status(400).json({ message: "Stock insuffisant pour cette commande" });
  }

  next(); // tout est OK
};
