export default function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <a href="/">Dashboard</a> | 
        <a href="/fournisseurs">Fournisseurs</a> | 
        <a href="/produits">Produits</a> | 
        <a href="/agents">Agents</a> | 
        <a href="/clients">Clients</a> | 
        <a href="/stocks">Stocks</a> | 
        <a href="/commandes">Commandes</a>
      </nav>
    </header>
  );
}
