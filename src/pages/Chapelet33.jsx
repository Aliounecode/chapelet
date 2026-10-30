import { dhikrs } from '../donnees/dhikrs.js';
import { useStockage } from '../hooks/useStockage.js';
import { signaler } from '../utils/retours.js';
import { couleurDuTour, variablesCouleur } from '../utils/couleurs.js';
import Chapelet from '../composants/Chapelet.jsx';
import Commandes from '../composants/Commandes.jsx';
import Icone from '../composants/Icones.jsx';
import TexteArabe from '../composants/TexteArabe.jsx';
import LegendeTajwid from '../composants/LegendeTajwid.jsx';

const ETAT_INITIAL = { dhikrId: null, phase: 0, compte: 0, termine: false };
const PERSO_INITIAL = { arabe: '', translit: 'Mon dhikr', sens: '', cible: 33 };

export default function Chapelet33({ retours, tajwid }) {
  const [etat, setEtat] = useStockage('tasbih.chapelet33', ETAT_INITIAL);
  const [perso, setPerso] = useStockage('tasbih.chapelet33.perso', PERSO_INITIAL);

  const dhikr = dhikrs.find((d) => d.id === etat.dhikrId) ?? null;

  /* ---------- Liste des prières ---------- */
  if (!dhikr) {
    return (
      <section className="page">
        <div className="page__intro">
          <h2 className="page__titre">Chapelet de 33</h2>
          <p className="page__texte">Choisissez la prière que vous souhaitez égrener.</p>
        </div>
        <ul className="liste-dhikrs">
          {dhikrs.map((d) => {
            const arabeUnique = d.phases.length === 1 && d.phases[0].arabe;
            return (
              <li key={d.id}>
                <button
                  type="button"
                  className="carte carte--bouton"
                  onClick={() => setEtat({ dhikrId: d.id, phase: 0, compte: 0, termine: false })}
                >
                  <span className="carte__arabe">
                    {arabeUnique ? (
                      <TexteArabe texte={d.phases[0].arabe} />
                    ) : (
                      <span aria-hidden="true">{d.personnalise ? '✎' : '٣٣'}</span>
                    )}
                  </span>
                  <span className="carte__corps">
                    <span className="carte__titre">{d.titre}</span>
                    <span className="carte__description">{d.description}</span>
                  </span>
                  <Icone nom="droite" taille={18} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  /* ---------- Compteur ---------- */
  const phases = dhikr.personnalise ? [perso] : dhikr.phases;
  const indexPhase = Math.min(etat.phase, phases.length - 1);
  const phase = phases[indexPhase];
  const couleur = couleurDuTour(indexPhase);
  const cibleTotale = phases.reduce((somme, p) => somme + p.cible, 0);
  const faites =
    phases.slice(0, indexPhase).reduce((somme, p) => somme + p.cible, 0) + etat.compte;

  const incrementer = () => {
    if (etat.termine) return;
    const compte = etat.compte + 1;
    if (compte < phase.cible) {
      signaler(retours, 'perle', { progression: compte / phase.cible });
      setEtat({ ...etat, compte });
      return;
    }
    if (indexPhase >= phases.length - 1) {
      signaler(retours, 'fin');
      setEtat({ ...etat, compte, termine: true });
    } else {
      signaler(retours, 'phase', { tour: indexPhase });
      setEtat({ ...etat, phase: indexPhase + 1, compte: 0 });
    }
  };

  const annuler = () => {
    if (etat.termine) {
      setEtat({ ...etat, termine: false, compte: Math.max(0, etat.compte - 1) });
    } else if (etat.compte > 0) {
      setEtat({ ...etat, compte: etat.compte - 1 });
    } else if (indexPhase > 0) {
      const precedente = phases[indexPhase - 1];
      setEtat({ ...etat, phase: indexPhase - 1, compte: precedente.cible - 1 });
    }
  };

  const remettreAZero = () => {
    if (window.confirm('Remettre ce chapelet à zéro ?')) {
      setEtat({ ...etat, phase: 0, compte: 0, termine: false });
    }
  };

  const changerCible = (valeur) => {
    const cible = Math.max(1, Math.min(9999, Number(valeur) || 1));
    setPerso({ ...perso, cible });
  };

  return (
    <section className="page">
      <button
        type="button"
        className="bouton bouton--discret bouton--retour"
        onClick={() => setEtat(ETAT_INITIAL)}
      >
        <Icone nom="retour" taille={18} />
        Toutes les prières
      </button>

      {phases.length > 1 ? (
        <ol className="etapes" aria-label="Étapes">
          {phases.map((_, i) => (
            <li
              key={i}
              style={variablesCouleur(couleurDuTour(i))}
              className={`etapes__point ${i < indexPhase || (etat.termine && i === indexPhase) ? 'etapes__point--faite' : ''} ${i === indexPhase && !etat.termine ? 'etapes__point--courante' : ''}`}
            />
          ))}
        </ol>
      ) : null}

      <div className="invocation" key={`invocation-${dhikr.id}-${indexPhase}`}>
        {phase.arabe ? (
          <TexteArabe
            balise="p"
            texte={phase.arabe}
            className={`invocation__arabe ${phase.arabe.length > 40 ? 'invocation__arabe--longue' : ''}`}
          />
        ) : null}
        <p className="invocation__translit">{phase.translit}</p>
        {phase.sens ? <p className="invocation__sens">{phase.sens}</p> : null}
      </div>

      <Chapelet
        key={`anneau-${dhikr.id}-${indexPhase}`}
        cible={phase.cible}
        compte={etat.compte}
        couleur={couleur}
        onIncrementer={incrementer}
        desactive={etat.termine}
        etiquette={phases.length > 1 ? `Tour ${indexPhase + 1} / ${phases.length} · ${couleur.nom}` : null}
      />

      <p className="progression">
        {faites} / {cibleTotale} au total
      </p>

      {etat.termine ? (
        <div className="termine" role="status" style={variablesCouleur(couleur)}>
          <span className="termine__icone">
            <Icone nom="coche" taille={26} />
          </span>
          <p className="termine__titre">Chapelet terminé</p>
          <p className="termine__texte">Qu’Allah accepte votre dhikr.</p>
          <button
            type="button"
            className="bouton bouton--principal"
            onClick={() => setEtat({ ...etat, phase: 0, compte: 0, termine: false })}
          >
            Recommencer
          </button>
        </div>
      ) : null}

      <Commandes
        onAnnuler={annuler}
        onRemettreAZero={remettreAZero}
        annulerDesactive={!etat.termine && etat.compte === 0 && indexPhase === 0}
      />

      {tajwid && phase.arabe ? <LegendeTajwid /> : null}

      {dhikr.personnalise ? (
        <details className="reglages" open={!perso.arabe}>
          <summary>Personnaliser cette prière</summary>
          <label className="champ">
            <span>Texte en arabe (facultatif)</span>
            <input
              type="text"
              lang="ar"
              dir="rtl"
              value={perso.arabe}
              onChange={(e) => setPerso({ ...perso, arabe: e.target.value })}
            />
          </label>
          <label className="champ">
            <span>Nom / transcription</span>
            <input
              type="text"
              value={perso.translit}
              onChange={(e) => setPerso({ ...perso, translit: e.target.value })}
            />
          </label>
          <label className="champ">
            <span>Signification (facultatif)</span>
            <input
              type="text"
              value={perso.sens}
              onChange={(e) => setPerso({ ...perso, sens: e.target.value })}
            />
          </label>
          <label className="champ">
            <span>Nombre de répétitions</span>
            <input
              type="number"
              min="1"
              max="9999"
              inputMode="numeric"
              value={perso.cible}
              onChange={(e) => changerCible(e.target.value)}
            />
          </label>
        </details>
      ) : null}
    </section>
  );
}
