import { Request, Response } from "express";
import Produit from "../models/produit.model";

export const createProduit = async (req: Request, res: Response) => {
  try {
    const produit = await Produit.create(req.body);
    res.status(201).json(produit);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getProduits = async (req: Request, res: Response) => {
  const produits = await Produit.findAll({ include: ["stock"] });
  res.json(produits);
};
