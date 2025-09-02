import { Router } from "express";
import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../controllers/agent.controller";
import { validateFields } from "../middlewares/validateFields.middleware";

const router = Router();

router.post("/", validateFields(["mat_agent", "nom_prenom", "genre", "telephone"]), createAgent);
router.get("/", getAgents);
router.get("/:id", getAgentById);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);

export default router;
