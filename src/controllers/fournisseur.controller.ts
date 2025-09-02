import { Request, Response } from "express";
import Fournisseur from "../models/fournisseur.model";

export const createFournisseur = async (req: Request, res: Response) => {
  try {
    const fournisseur = await Fournisseur.create(req.body);
    res.status(201).json(fournisseur);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getFournisseurs = async (req: Request, res: Response) => {
  const fournisseurs = await Fournisseur.findAll();
  res.json(fournisseurs);
};
