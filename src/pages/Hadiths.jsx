import { useMemo, useState } from 'react';
import { categories, hadiths } from '../donnees/hadiths.js';
import { useStockage } from '../hooks/useStockage.js';
import Icone from '../composants/Icones.jsx';
import TexteArabe from '../composants/TexteArabe.jsx';
import LegendeTajwid from '../composants/LegendeTajwid.jsx';

const LANGUES = [
  { id: 'les-deux', libelle: 'Arabe + Français' },
  { id: 'arabe', libelle: 'Arabe' },
  { id: 'francais', libelle: 'Français' },
];

function CarteHadith({ hadith, langue }) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    const texte = `${hadith.arabe}\n\n${hadith.francais}\n\n— ${hadith.narrateur} (${hadith.source})`;
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(true);
      setTimeout(() => setCopie(false), 1600);
    } catch {
      /* presse-papiers indisponible : on ignore */
    }
  };

  return (
    <article className="hadith">
      <header className="hadith__entete">
        <span className="hadith__categorie">{hadith.categorie}</span>
        <button type="button" className="bouton-icone bouton-icone--petit" onClick={copier} aria-label="Copier le hadith">
          <Icone nom={copie ? 'coche' : 'copie'} taille={18} />
        </button>
      </header>

      {langue !== 'francais' ? (
        <TexteArabe balise="p" className="hadith__arabe" texte={hadith.arabe} />
      ) : null}
      {langue !== 'arabe' ? <p className="hadith__francais">{hadith.francais}</p> : null}

      <footer className="hadith__source">
        Rapporté par {hadith.narrateur} · {hadith.source}
      </footer>
    </article>
  );
}

export default function Hadiths({ tajwid }) {
  const [categorie, setCategorie] = useState('Tous');
  const [langue, setLangue] = useStockage('tasbih.hadiths.langue', 'les-deux');

  const affiches = useMemo(
    () => (categorie === 'Tous' ? hadiths : hadiths.filter((h) => h.categorie === categorie)),
    [categorie]
  );

  return (
    <section className="page">
      <div className="page__intro">
        <h2 className="page__titre">Hadiths</h2>
        <p className="page__texte">Paroles du Prophète ﷺ, en arabe et en français.</p>
      </div>

      {tajwid ? <LegendeTajwid /> : null}

      <div className="segments" role="group" aria-label="Langue d’affichage">
        {LANGUES.map((l) => (
          <button
            key={l.id}
            type="button"
            className={`segments__item ${langue === l.id ? 'segments__item--actif' : ''}`}
            aria-pressed={langue === l.id}
            onClick={() => setLangue(l.id)}
          >
            {l.libelle}
          </button>
        ))}
      </div>

      <div className="puces" role="group" aria-label="Catégories">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`puce ${categorie === c ? 'puce--active' : ''}`}
            aria-pressed={categorie === c}
            onClick={() => setCategorie(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="liste-hadiths">
        {affiches.map((h) => (
          <CarteHadith key={h.id} hadith={h} langue={langue} />
        ))}
      </div>
    </section>
  );
}
