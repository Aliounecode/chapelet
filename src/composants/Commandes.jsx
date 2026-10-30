import Icone from './Icones.jsx';

export default function Commandes({ onAnnuler, onRemettreAZero, annulerDesactive = false }) {
  return (
    <div className="commandes">
      <button
        type="button"
        className="bouton bouton--discret"
        onClick={onAnnuler}
        disabled={annulerDesactive}
      >
        <Icone nom="annuler" taille={18} />
        Annuler
      </button>
      <button type="button" className="bouton bouton--discret" onClick={onRemettreAZero}>
        <Icone nom="reset" taille={18} />
        Remettre à zéro
      </button>
    </div>
  );
}
