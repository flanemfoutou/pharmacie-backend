import { Request, Response, NextFunction } from "express";
import { Agent } from "../models";

export const createAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await Agent.create(req.body);
    res.status(201).json(agent);
  } catch (err) { next(err); }
};

export const getAgents = async (req: Request, res: Response, next: NextFunction) => {
  try { const agents = await Agent.findAll(); res.json(agents); } catch (err) { next(err); }
};

export const getAgentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent non trouvé" });
    res.json(agent);
  } catch (err) { next(err); }
};

export const updateAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent non trouvé" });
    await agent.update(req.body);
    res.json(agent);
  } catch (err) { next(err); }
};

export const deleteAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent non trouvé" });
    await agent.destroy();
    res.json({ message: "Agent supprimé" });
  } catch (err) { next(err); }
};
