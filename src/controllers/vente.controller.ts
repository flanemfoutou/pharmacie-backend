import { Request, Response, NextFunction } from "express";
import { Vente } from "../models";

export const createVente = async (req: Request, res: Response, next: NextFunction) => {
  try { const vente = await Vente.create(req.body); res.status(201).json(vente); } catch (err) { next(err); }
};

export const getVentes = async (req: Request, res: Response, next: NextFunction) => {
  try { const ventes = await Vente.findAll(); res.json(ventes); } catch (err) { next(err); }
};

export const getVenteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vente = await Vente.findByPk(req.params.id);
    if (!vente) return res.status(404).json({ message: "Vente non trouvée" });
    res.json(vente);
  } catch (err) { next(err); }
};

export const updateVente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vente = await Vente.findByPk(req.params.id);
    if (!vente) return res.status(404).json({ message: "Vente non trouvée" });
    await vente.update(req.body);
    res.json(vente);
  } catch (err) { next(err); }
};

export const deleteVente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vente = await Vente.findByPk(req.params.id);
    if (!vente) return res.status(404).json({ message: "Vente non trouvée" });
    await vente.destroy();
    res.json({ message: "Vente supprimée" });
  } catch (err) { next(err); }
};
