import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => fetchFournisseurs(), []);

  const fetchFournisseurs = async () => {
    const res = await api.get("/fournisseurs");
    setFournisseurs(res.data);
  };

  const addFournisseur = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/fournisseurs/${editingId}`, { name, contact });
      setEditingId(null);
    } else {
      await api.post("/fournisseurs", { name, contact });
    }
    setName("");
    setContact("");
    fetchFournisseurs();
  };

  const editFournisseur = (f) => {
    setEditingId(f.id);
    setName(f.name);
    setContact(f.contact);
  };

  const deleteFournisseur = async (id) => {
    await api.delete(`/fournisseurs/${id}`);
    fetchFournisseurs();
  };

  return (
    <div>
      <Header title="Gestion des Fournisseurs" />
      <main className="container">
        <h2>Fournisseurs</h2>
        <form onSubmit={addFournisseur}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>

        <ul>
          {fournisseurs.map((f) => (
            <li key={f.id}>
              {f.name} - {f.contact}{" "}
              <button onClick={() => editFournisseur(f)}>Éditer</button>
              <button onClick={() => deleteFournisseur(f.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
