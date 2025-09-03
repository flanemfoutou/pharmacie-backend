import { Request, Response, NextFunction } from "express";
import { Produit } from "../models";

// Créer un produit
export const createProduit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const produit = await Produit.create(req.body);
    res.status(201).json(produit);
  } catch (err) {
    next(err);
  }
};

// Récupérer tous les produits
export const getProduits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const produits = await Produit.findAll();
    res.json(produits);
  } catch (err) {
    next(err);
  }
};

// Récupérer un produit par ID
export const getProduitById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un produit
export const updateProduit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    await produit.update(req.body);
    res.json(produit);
  } catch (err) {
    next(err);
  }
};

// Supprimer un produit
export const deleteProduit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    await produit.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    next(err);
  }
};
