import { Request, Response, NextFunction } from "express";
import { Commande } from "../models";

export const createCommande = async (req: Request, res: Response, next: NextFunction) => {
  try { const commande = await Commande.create(req.body); res.status(201).json(commande); } catch (err) { next(err); }
};

export const getCommandes = async (req: Request, res: Response, next: NextFunction) => {
  try { const commandes = await Commande.findAll(); res.json(commandes); } catch (err) { next(err); }
};

export const getCommandeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    res.json(commande);
  } catch (err) { next(err); }
};

export const updateCommande = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    await commande.update(req.body);
    res.json(commande);
  } catch (err) { next(err); }
};

export const deleteCommande = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commande = await Commande.findByPk(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    await commande.destroy();
    res.json({ message: "Commande supprimée" });
  } catch (err) { next(err); }
};
