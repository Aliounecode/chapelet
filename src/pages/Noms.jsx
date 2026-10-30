import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { noms } from '../donnees/noms.js';
import Icone from '../composants/Icones.jsx';
import TexteArabe from '../composants/TexteArabe.jsx';
import LegendeTajwid from '../composants/LegendeTajwid.jsx';

/** Retire accents et majuscules pour une recherche tolérante. */
const normaliser = (texte) =>
  texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Un nom « du jour » stable pour la journée. */
function nomDuJour() {
  const maintenant = new Date();
  const debut = new Date(maintenant.getFullYear(), 0, 0);
  const jourDeLAnnee = Math.floor((maintenant - debut) / 86400000);
  return noms[jourDeLAnnee % noms.length];
}

function FicheNom({ numero, onFermer, onChanger }) {
  const nom = noms[numero - 1];

  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'Escape') onFermer();
      if (e.key === 'ArrowLeft') onChanger(numero > 1 ? numero - 1 : noms.length);
      if (e.key === 'ArrowRight') onChanger(numero < noms.length ? numero + 1 : 1);
    };
    window.addEventListener('keydown', surTouche);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', surTouche);
      document.body.style.overflow = debordement;
    };
  }, [numero, onFermer, onChanger]);

  return createPortal(
    <div className="fiche-fond" onClick={onFermer}>
      <div
        className="fiche"
        role="dialog"
        aria-modal="true"
        aria-label={nom.translit}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="bouton-icone fiche__fermer" onClick={onFermer} aria-label="Fermer">
          <Icone nom="fermer" />
        </button>
        <p className="fiche__numero">
          {String(nom.numero).padStart(2, '0')} / {noms.length}
        </p>
        <TexteArabe balise="p" className="fiche__arabe" texte={nom.arabe} />
        <h3 className="fiche__translit">{nom.translit}</h3>
        <p className="fiche__sens">{nom.sens}</p>
        <div className="fiche__nav">
          <button
            type="button"
            className="bouton bouton--discret"
            onClick={() => onChanger(numero > 1 ? numero - 1 : noms.length)}
          >
            <Icone nom="gauche" taille={18} />
            Précédent
          </button>
          <button
            type="button"
            className="bouton bouton--discret"
            onClick={() => onChanger(numero < noms.length ? numero + 1 : 1)}
          >
            Suivant
            <Icone nom="droite" taille={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Noms({ tajwid }) {
  const [recherche, setRecherche] = useState('');
  const [ouvert, setOuvert] = useState(null);
  const duJour = useMemo(nomDuJour, []);

  const resultats = useMemo(() => {
    const terme = normaliser(recherche.trim());
    if (!terme) return noms;
    return noms.filter(
      (n) =>
        normaliser(n.translit).includes(terme) ||
        normaliser(n.sens).includes(terme) ||
        String(n.numero) === terme ||
        n.arabe.includes(recherche.trim())
    );
  }, [recherche]);

  return (
    <section className="page">
      <div className="page__intro">
        <h2 className="page__titre">Les 99 Noms d’Allah</h2>
        <p className="page__texte">Touchez un nom pour lire sa signification.</p>
      </div>

      <button type="button" className="nom-du-jour" onClick={() => setOuvert(duJour.numero)}>
        <span className="nom-du-jour__etiquette">Nom du jour</span>
        <TexteArabe className="nom-du-jour__arabe" texte={duJour.arabe} />
        <span className="nom-du-jour__translit">{duJour.translit}</span>
      </button>

      {tajwid ? <LegendeTajwid /> : null}

      <label className="recherche">
        <Icone nom="recherche" taille={18} />
        <input
          type="search"
          placeholder="Rechercher un nom, un numéro, un sens…"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </label>

      {resultats.length === 0 ? (
        <p className="vide">Aucun nom ne correspond à « {recherche} ».</p>
      ) : (
        <ul className="grille-noms">
          {resultats.map((n) => (
            <li key={n.numero}>
              <button type="button" className="tuile" onClick={() => setOuvert(n.numero)}>
                <span className="tuile__numero">{n.numero}</span>
                <TexteArabe className="tuile__arabe" texte={n.arabe} />
                <span className="tuile__translit">{n.translit}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {ouvert ? (
        <FicheNom numero={ouvert} onFermer={() => setOuvert(null)} onChanger={setOuvert} />
      ) : null}
    </section>
  );
}
