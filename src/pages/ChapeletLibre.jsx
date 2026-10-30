import { useStockage } from '../hooks/useStockage.js';
import { signaler } from '../utils/retours.js';
import { couleurDuTour } from '../utils/couleurs.js';
import Chapelet from '../composants/Chapelet.jsx';
import Commandes from '../composants/Commandes.jsx';

const CIBLE = 100;
const ETAT_INITIAL = { compte: 0, tours: 0, libelle: '' };

export default function ChapeletLibre({ retours }) {
  const [etat, setEtat] = useStockage('tasbih.libre', ETAT_INITIAL);
  const total = etat.tours * CIBLE + etat.compte;
  const couleur = couleurDuTour(etat.tours);

  const incrementer = () => {
    const compte = etat.compte + 1;
    if (compte >= CIBLE) {
      signaler(retours, 'phase', { tour: etat.tours });
      setEtat({ ...etat, compte: 0, tours: etat.tours + 1 });
    } else {
      signaler(retours, 'perle', { progression: compte / CIBLE });
      setEtat({ ...etat, compte });
    }
  };

  const annuler = () => {
    if (etat.compte > 0) {
      setEtat({ ...etat, compte: etat.compte - 1 });
    } else if (etat.tours > 0) {
      setEtat({ ...etat, tours: etat.tours - 1, compte: CIBLE - 1 });
    }
  };

  const remettreAZero = () => {
    if (window.confirm('Remettre le compteur libre à zéro ?')) {
      setEtat({ ...etat, compte: 0, tours: 0 });
    }
  };

  return (
    <section className="page">
      <div className="page__intro">
        <h2 className="page__titre">Chapelet libre</h2>
        <p className="page__texte">
          Dites ce que vous voulez : le chapelet compte pour vous, par tours de 100.
        </p>
      </div>

      <label className="champ champ--centre">
        <span className="sr-only">Intention ou dhikr du moment</span>
        <input
          type="text"
          placeholder="Votre dhikr ou votre intention (facultatif)"
          value={etat.libelle}
          onChange={(e) => setEtat({ ...etat, libelle: e.target.value })}
          maxLength={80}
        />
      </label>

      <Chapelet
        cible={CIBLE}
        compte={etat.compte}
        couleur={couleur}
        onIncrementer={incrementer}
        etiquette={`Tour ${etat.tours + 1} · ${couleur.nom}`}
      />

      <dl className="stats">
        <div className="stats__item">
          <dt>Tours</dt>
          <dd>{etat.tours}</dd>
        </div>
        <div className="stats__item">
          <dt>Total</dt>
          <dd>{total}</dd>
        </div>
      </dl>

      <Commandes
        onAnnuler={annuler}
        onRemettreAZero={remettreAZero}
        annulerDesactive={etat.compte === 0 && etat.tours === 0}
      />
    </section>
  );
}
