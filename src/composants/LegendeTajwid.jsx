import { REGLES_TAJWID } from '../utils/tajwid.js';

export default function LegendeTajwid({ ouverteParDefaut = false }) {
  return (
    <details className="legende" open={ouverteParDefaut}>
      <summary>Légende des couleurs du tajwid</summary>
      <ul className="legende__liste">
        {REGLES_TAJWID.map((regle) => (
          <li key={regle.id} className="legende__item">
            <span
              className="legende__pastille"
              style={{ background: `var(--tj-${regle.id})` }}
              aria-hidden="true"
            />
            <span>
              {regle.libelle}
              <span className="legende__detail"> · {regle.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="legende__note">
        Les voyelles (fatha, damma, kasra…) sont en doré. Coloration automatique : à vérifier avec
        un enseignant pour la récitation du Coran.
      </p>
    </details>
  );
}
