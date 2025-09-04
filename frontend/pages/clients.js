import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => fetchClients(), []);

  const fetchClients = async () => {
    const res = await api.get("/clients");
    setClients(res.data);
  };

  const addClient = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/clients/${editingId}`, { name, email });
      setEditingId(null);
    } else {
      await api.post("/clients", { name, email });
    }
    setName("");
    setEmail("");
    fetchClients();
  };

  const editClient = (c) => {
    setEditingId(c.id);
    setName(c.name);
    setEmail(c.email);
  };

  const deleteClient = async (id) => {
    await api.delete(`/clients/${id}`);
    fetchClients();
  };

  return (
    <div>
      <Header title="Gestion des Clients" />
      <main className="container">
        <h2>Clients</h2>
        <form onSubmit={addClient}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>

        <ul>
          {clients.map((c) => (
            <li key={c.id}>
              {c.name} - {c.email}{" "}
              <button onClick={() => editClient(c)}>Éditer</button>
              <button onClick={() => deleteClient(c.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
