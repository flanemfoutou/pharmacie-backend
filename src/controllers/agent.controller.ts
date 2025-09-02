import { Request, Response } from "express";
import Agent from "../models/agent.model";

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { mat_agent, nom_prenom, genre, telephone } = req.body;
    const agent = await Agent.create({ mat_agent, nom_prenom, genre, telephone });
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getAgents = async (req: Request, res: Response) => {
  const agents = await Agent.findAll();
  res.json(agents);
};

export const getAgentById = async (req: Request, res: Response) => {
  const agent = await Agent.findByPk(req.params.id);
  if (!agent) return res.status(404).json({ message: "Agent introuvable" });
  res.json(agent);
};

export const updateAgent = async (req: Request, res: Response) => {
  try {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent introuvable" });

    await agent.update(req.body);
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteAgent = async (req: Request, res: Response) => {
  const agent = await Agent.findByPk(req.params.id);
  if (!agent) return res.status(404).json({ message: "Agent introuvable" });

  await agent.destroy();
  res.json({ message: "Agent supprimé" });
};
