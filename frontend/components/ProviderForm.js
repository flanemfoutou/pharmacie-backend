import { useState } from "react";
import api from "../services/api";

export default function ProviderForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/providers", { name, contact });
      alert("Fournisseur ajouté !");
      setName("");
      setContact("");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du fournisseur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="provider-form">
      <input
        type="text"
        placeholder="Nom du fournisseur"
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
      <button type="submit">Ajouter</button>
    </form>
  );
}
