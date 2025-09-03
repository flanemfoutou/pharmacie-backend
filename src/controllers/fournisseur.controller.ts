import { Request, Response, NextFunction } from "express";
import { Fournisseur } from "../models";

export const createFournisseur = async (req: Request, res: Response, next: NextFunction) => {
  try { const fournisseur = await Fournisseur.create(req.body); res.status(201).json(fournisseur); } catch (err) { next(err); }
};

export const getFournisseurs = async (req: Request, res: Response, next: NextFunction) => {
  try { const fournisseurs = await Fournisseur.findAll(); res.json(fournisseurs); } catch (err) { next(err); }
};

export const getFournisseurById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fournisseur = await Fournisseur.findByPk(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    res.json(fournisseur);
  } catch (err) { next(err); }
};

export const updateFournisseur = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fournisseur = await Fournisseur.findByPk(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    await fournisseur.update(req.body);
    res.json(fournisseur);
  } catch (err) { next(err); }
};

export const deleteFournisseur = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fournisseur = await Fournisseur.findByPk(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    await fournisseur.destroy();
    res.json({ message: "Fournisseur supprimé" });
  } catch (err) { next(err); }
};
