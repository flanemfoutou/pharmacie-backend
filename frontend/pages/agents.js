import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => fetchAgents(), []);

  const fetchAgents = async () => {
    const res = await api.get("/agents");
    setAgents(res.data);
  };

  const addAgent = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/agents/${editingId}`, { name, role });
      setEditingId(null);
    } else {
      await api.post("/agents", { name, role });
    }
    setName("");
    setRole("");
    fetchAgents();
  };

  const editAgent = (a) => {
    setEditingId(a.id);
    setName(a.name);
    setRole(a.role);
  };

  const deleteAgent = async (id) => {
    await api.delete(`/agents/${id}`);
    fetchAgents();
  };

  return (
    <div>
      <Header title="Gestion des Agents" />
      <main className="container">
        <h2>Agents</h2>
        <form onSubmit={addAgent}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Rôle"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>

        <ul>
          {agents.map((a) => (
            <li key={a.id}>
              {a.name} - {a.role}{" "}
              <button onClick={() => editAgent(a)}>Éditer</button>
              <button onClick={() => deleteAgent(a.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
