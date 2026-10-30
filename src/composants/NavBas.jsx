import Icone from './Icones.jsx';

export default function NavBas({ onglets, actif, onChoisir }) {
  return (
    <nav className="nav" aria-label="Navigation principale">
      {onglets.map((onglet) => (
        <button
          key={onglet.id}
          type="button"
          className={`nav__item ${actif === onglet.id ? 'nav__item--actif' : ''}`}
          onClick={() => onChoisir(onglet.id)}
          aria-current={actif === onglet.id ? 'page' : undefined}
        >
          <Icone nom={onglet.icone} />
          <span>{onglet.libelle}</span>
        </button>
      ))}
    </nav>
  );
}
