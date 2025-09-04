import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Charger les stocks et les produits au démarrage
  useEffect(() => {
    fetchStocks();
    fetchProducts();
  }, []);

  const fetchStocks = async () => {
    const res = await api.get("/stocks");
    setStocks(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/produits");
    setProducts(res.data);
  };

  // Ajouter ou modifier un stock
  const addStock = async (e) => {
    e.preventDefault();
    if (!productId || !quantity) return;

    if (editingId) {
      await api.put(`/stocks/${editingId}`, { productId, quantity });
      setEditingId(null);
    } else {
      await api.post("/stocks", { productId, quantity });
    }

    setProductId("");
    setQuantity("");
    fetchStocks();
  };

  // Préparer l'édition d'un stock
  const editStock = (s) => {
    setEditingId(s.id);
    setProductId(s.productId);
    setQuantity(s.quantity);
  };

  // Supprimer un stock
  const deleteStock = async (id) => {
    await api.delete(`/stocks/${id}`);
    fetchStocks();
  };

  return (
    <div>
      <Header title="Gestion du Stock" />
      <main className="container">
        <h2>Stocks</h2>

        {/* Formulaire ajout / édition */}
        <form onSubmit={addStock}>
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
            type="number"
            placeholder="Quantité"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
        </form>

        {/* Liste des stocks */}
        <ul>
          {stocks.map((s) => (
            <li key={s.id}>
              {products.find(p => p.id === s.productId)?.name || "Produit inconnu"} - {s.quantity} unités{" "}
              <button onClick={() => editStock(s)}>Éditer</button>
              <button onClick={() => deleteStock(s.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
