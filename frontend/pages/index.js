import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div>
      <Header title="Dashboard - Pharmacie" />

      <main className="container">
        <h2>Bienvenue sur le Dashboard</h2>
        <p>Choisissez un module pour commencer :</p>

        <div className="dashboard-links">
          <a href="/fournisseurs" className="dashboard-button">Fournisseurs</a>
          <a href="/produits" className="dashboard-button">Produits</a>
          <a href="/agents" className="dashboard-button">Agents</a>
          <a href="/clients" className="dashboard-button">Clients</a>
          <a href="/stocks" className="dashboard-button">Stocks</a>
          <a href="/commandes" className="dashboard-button">Commandes</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
