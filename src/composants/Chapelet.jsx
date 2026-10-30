import { useMemo } from 'react';
import { variablesCouleur } from '../utils/couleurs.js';

const TAILLE = 320;
const CENTRE = TAILLE / 2;
const RAYON = 140;

/**
 * Anneau de perles cliquable.
 * - cible : nombre de perles (33, 100…)
 * - compte : nombre de perles déjà égrenées
 * - couleur : couleur du tour en cours ({ principale, claire })
 */
export default function Chapelet({
  cible,
  compte,
  onIncrementer,
  couleur,
  etiquette,
  desactive = false,
}) {
  const perles = useMemo(() => {
    const pas = 360 / cible;
    const rayonPerle = Math.min(7.5, ((2 * Math.PI * RAYON) / cible) * 0.36);
    return Array.from({ length: cible }, (_, i) => {
      const angle = ((-90 + pas / 2 + i * pas) * Math.PI) / 180;
      return {
        i,
        x: CENTRE + RAYON * Math.cos(angle),
        y: CENTRE + RAYON * Math.sin(angle),
        r: rayonPerle,
      };
    });
  }, [cible]);

  return (
    <button
      type="button"
      className="chapelet"
      style={couleur ? variablesCouleur(couleur) : undefined}
      onClick={onIncrementer}
      disabled={desactive}
      aria-label={`Compter. ${compte} sur ${cible}`}
    >
      <svg viewBox={`0 0 ${TAILLE} ${TAILLE}`} className="chapelet__svg" aria-hidden="true">
        <circle cx={CENTRE} cy={CENTRE} r={RAYON} className="chapelet__fil" />
        <path d={`M${CENTRE} 6 l6 9 l-6 9 l-6 -9 z`} className="chapelet__imam" />
        {perles.map((p) => (
          <circle
            key={p.i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            className={[
              'perle',
              p.i < compte ? 'perle--faite' : '',
              p.i === compte - 1 ? 'perle--active' : '',
            ].join(' ')}
          />
        ))}
      </svg>

      <span className="chapelet__centre">
        <span className="chapelet__nombre">{compte}</span>
        <span className="chapelet__cible">sur {cible}</span>
        {etiquette ? <span className="chapelet__etiquette">{etiquette}</span> : null}
      </span>
    </button>
  );
}
