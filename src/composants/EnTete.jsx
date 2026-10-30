import Icone from "./Icones.jsx";

export default function EnTete({ sousTitre, onOuvrirReglages }) {
  return (
    <header className="entete">
      <div className="entete__marque">
        <span className="entete__arabe" lang="ar" dir="rtl"></span>
        <div>
          <h1 className="entete__titre">Krous</h1>
          <p className="entete__sous-titre">{sousTitre}</p>
        </div>
      </div>

      <button
        type="button"
        className="bouton-icone"
        onClick={onOuvrirReglages}
        aria-label="Ouvrir les réglages"
        title="Réglages"
      >
        <Icone nom="reglages" />
      </button>
    </header>
  );
}
