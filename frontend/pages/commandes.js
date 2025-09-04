import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Commandes() {
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientId, setClientId] = useState("");
  const [productId, setProductId] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Charger commandes, clients et produits au démarrage
  useEffect(() => {
    fetchCommandes();
    fetchClients();
    fetchProducts();
  }, []);

  const fetchCommandes = async () => {
    const res = await api.get("/commandes");
    setCommandes(res.data);
  };

  const fetchClients = async () => {
    const res = await api.get("/clients");
    setClients(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/produits");
    setProducts(res.data);
  };

  // Ajouter ou modifier une commande
  const addCommande = async (e) => {
    e.preventDefault();
    if (!clientId || !productId || !status) return;

    if (editingId) {
      await api.put(`/commandes/${editingId}`, { clientId, productId, status });
      setEditingId(null);
    } else {
      await api.post("/commandes", { clientId, productId, status });
    }

    setClientId("");
    setProductId("");
    setStatus("");
    fetchCommandes();
  };

  // Préparer l'édition d'une commande
  const editCommande = (c) => {
    setEditingId(c.id);
    setClientId(c.clientId);
    setProductId(c.productId);
    setStatus(c.status);
  };

  // Supprimer une commande
  const deleteCommande = async (id) => {
    await api.delete(`/commandes/${id}`);
    fetchCommandes();
  };

  return (
    <div>
      <Header title="Gestion des Commandes" />
      <main className="container">
        <h2>Commandes</h2>

        {/* Formulaire ajout / édition */}
        <form onSubmit={addCommande}>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">Sélectionnez un client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Sélectionnez un produit</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Statut"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />

          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>

        {/* Liste des commandes */}
        <ul>
          {commandes.map((c) => (
            <li key={c.id}>
              Client: {clients.find(cl => cl.id === c.clientId)?.name || "Inconnu"} - 
              Produit: {products.find(p => p.id === c.productId)?.name || "Inconnu"} - 
              {c.status}{" "}
              <button onClick={() => editCommande(c)}>Éditer</button>
              <button onClick={() => deleteCommande(c.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
