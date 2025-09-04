import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Produits() {
  const [produits, setProduits] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => fetchProduits(), []);

  const fetchProduits = async () => {
    const res = await api.get("/produits");
    setProduits(res.data);
  };

  const addProduit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/produits/${editingId}`, { name, price });
      setEditingId(null);
    } else {
      await api.post("/produits", { name, price });
    }
    setName("");
    setPrice("");
    fetchProduits();
  };

  const editProduit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
  };

  const deleteProduit = async (id) => {
    await api.delete(`/produits/${id}`);
    fetchProduits();
  };

  return (
    <div>
      <Header title="Gestion des Produits" />
      <main className="container">
        <h2>Produits</h2>
        <form onSubmit={addProduit}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>

        <ul>
          {produits.map((p) => (
            <li key={p.id}>
              {p.name} - {p.price} FCFA{" "}
              <button onClick={() => editProduit(p)}>Éditer</button>
              <button onClick={() => deleteProduit(p.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
