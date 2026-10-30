import { useState } from 'react';
import { compterParTheme, questions, themes } from '../donnees/quizz.js';
import { useStockage } from '../hooks/useStockage.js';
import { signaler } from '../utils/retours.js';
import Icone from '../composants/Icones.jsx';

const NB_QUESTIONS = 10;
const LETTRES = ['A', 'B', 'C', 'D'];

function melanger(tableau) {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** Tire les questions d'un thème et mélange les réponses de chacune. */
function preparerPartie(themeId) {
  const reservoir =
    themeId === 'mixte' ? questions : questions.filter((q) => q.theme === themeId);
  const tirage = melanger(reservoir)
    .slice(0, NB_QUESTIONS)
    .map((q) => {
      const options = melanger([q.bonne, ...q.fausses]);
      return { ...q, options, indexBonne: options.indexOf(q.bonne) };
    });
  return { themeId, questions: tirage, index: 0, choix: null, score: 0, erreurs: [], fini: false };
}

function messageFinal(ratio) {
  if (ratio >= 0.9) return 'Ma cha Allah, excellent !';
  if (ratio >= 0.7) return 'Très bien, continuez ainsi !';
  if (ratio >= 0.5) return 'Bien ! Encore un peu de révision.';
  return 'Courage, chaque quizz vous fait progresser.';
}

function libelleTheme(themeId) {
  if (themeId === 'mixte') return 'Quizz mixte';
  return themes.find((t) => t.id === themeId)?.libelle ?? '';
}

/* ---------- Accueil : choix du thème ---------- */

function Accueil({ meilleurs, onChoisir }) {
  const meilleur = (id) => meilleurs[id];

  return (
    <section className="page">
      <div className="page__intro">
        <h2 className="page__titre">Quizz</h2>
        <p className="page__texte">Testez vos connaissances sur l’islam, {NB_QUESTIONS} questions à la fois.</p>
      </div>

      <button type="button" className="theme theme--mixte" onClick={() => onChoisir('mixte')}>
        <span className="theme__corps">
          <span className="theme__titre">Quizz mixte</span>
          <span className="theme__description">Un peu de tout, tiré au hasard</span>
        </span>
        <span className="theme__fleche">
          <Icone nom="droite" taille={20} />
        </span>
      </button>

      <ul className="liste-themes">
        {themes.map((theme) => {
          const record = meilleur(theme.id);
          return (
            <li key={theme.id}>
              <button type="button" className="theme" onClick={() => onChoisir(theme.id)}>
                <span className="theme__corps">
                  <span className="theme__titre">{theme.libelle}</span>
                  <span className="theme__description">{theme.description}</span>
                  <span className="theme__meta">
                    {compterParTheme(theme.id)} questions
                    {record ? ` · Meilleur score : ${record.score}/${record.total}` : ''}
                  </span>
                </span>
                <span className="theme__fleche">
                  <Icone nom="droite" taille={20} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Question en cours ---------- */

function Question({ partie, onChoisir, onSuivant, onQuitter }) {
  const question = partie.questions[partie.index];
  const repondu = partie.choix !== null;
  const juste = repondu && partie.choix === question.indexBonne;
  const total = partie.questions.length;
  const avancement = ((partie.index + (repondu ? 1 : 0)) / total) * 100;
  const derniere = partie.index + 1 === total;

  return (
    <section className="page">
      <button type="button" className="bouton bouton--discret bouton--retour" onClick={onQuitter}>
        <Icone nom="retour" taille={18} />
        {libelleTheme(partie.themeId)}
      </button>

      <div className="quizz-haut">
        <p className="quizz-haut__compte">
          Question {partie.index + 1} / {total}
        </p>
        <p className="quizz-haut__score">Score : {partie.score}</p>
      </div>
      <div className="barre" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={partie.index + (repondu ? 1 : 0)}>
        <span className="barre__remplie" style={{ width: `${avancement}%` }} />
      </div>

      <h3 className="question" key={question.id}>
        {question.question}
      </h3>

      <ul className="options">
        {question.options.map((option, i) => {
          let etat = '';
          if (repondu) {
            if (i === question.indexBonne) etat = 'option--juste';
            else if (i === partie.choix) etat = 'option--fausse';
            else etat = 'option--eteinte';
          }
          return (
            <li key={option}>
              <button
                type="button"
                className={`option ${etat}`}
                onClick={() => onChoisir(i)}
                disabled={repondu}
              >
                <span className="option__lettre">{LETTRES[i]}</span>
                <span className="option__texte">{option}</span>
                {repondu && i === question.indexBonne ? (
                  <span className="option__icone"><Icone nom="coche" taille={20} /></span>
                ) : null}
                {repondu && i === partie.choix && i !== question.indexBonne ? (
                  <span className="option__icone"><Icone nom="fermer" taille={20} /></span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite">
        {repondu ? (
          <div className={`retour ${juste ? 'retour--juste' : 'retour--faux'}`}>
            <p className="retour__titre">
              {juste ? 'Bonne réponse !' : `Pas tout à fait. La bonne réponse : ${question.bonne}`}
            </p>
            <p className="retour__texte">{question.explication}</p>
            <button type="button" className="bouton bouton--principal" onClick={onSuivant}>
              {derniere ? 'Voir mon score' : 'Question suivante'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ---------- Résultat ---------- */

function Resultat({ partie, meilleur, onRejouer, onAccueil }) {
  const total = partie.questions.length;
  const ratio = partie.score / total;
  const rayon = 52;
  const circonference = 2 * Math.PI * rayon;

  return (
    <section className="page">
      <div className="page__intro">
        <h2 className="page__titre">{libelleTheme(partie.themeId)}</h2>
        <p className="page__texte">{messageFinal(ratio)}</p>
      </div>

      <div className="resultat">
        <svg viewBox="0 0 120 120" className="resultat__anneau" aria-hidden="true">
          <circle cx="60" cy="60" r={rayon} className="resultat__fond" />
          <circle
            cx="60"
            cy="60"
            r={rayon}
            className="resultat__valeur"
            strokeDasharray={circonference}
            strokeDashoffset={circonference * (1 - ratio)}
          />
        </svg>
        <p className="resultat__score">
          {partie.score}
          <span> / {total}</span>
        </p>
        {meilleur ? (
          <p className="resultat__record">
            Meilleur score : {meilleur.score}/{meilleur.total}
          </p>
        ) : null}
      </div>

      <div className="commandes">
        <button type="button" className="bouton bouton--principal" onClick={onRejouer}>
          Rejouer
        </button>
        <button type="button" className="bouton" onClick={onAccueil}>
          Autres thèmes
        </button>
      </div>

      {partie.erreurs.length > 0 ? (
        <div className="revision">
          <h3 className="revision__titre">À revoir</h3>
          <ul className="revision__liste">
            {partie.erreurs.map((q) => (
              <li key={q.id} className="revision__item">
                <p className="revision__question">{q.question}</p>
                <p className="revision__reponse">{q.bonne}</p>
                <p className="revision__explication">{q.explication}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

/* ---------- Page ---------- */

export default function Quizz({ retours }) {
  const [meilleurs, setMeilleurs] = useStockage('tasbih.quizz.meilleurs', {});
  const [partie, setPartie] = useState(null);

  if (!partie) {
    return <Accueil meilleurs={meilleurs} onChoisir={(id) => setPartie(preparerPartie(id))} />;
  }

  const choisir = (i) => {
    if (partie.choix !== null) return;
    const question = partie.questions[partie.index];
    const juste = i === question.indexBonne;
    signaler(retours, juste ? 'juste' : 'faux');
    setPartie({
      ...partie,
      choix: i,
      score: partie.score + (juste ? 1 : 0),
      erreurs: juste ? partie.erreurs : [...partie.erreurs, question],
    });
  };

  const suivant = () => {
    if (partie.index + 1 < partie.questions.length) {
      setPartie({ ...partie, index: partie.index + 1, choix: null });
      return;
    }
    const total = partie.questions.length;
    const ancien = meilleurs[partie.themeId];
    if (!ancien || partie.score / total > ancien.score / ancien.total) {
      setMeilleurs({ ...meilleurs, [partie.themeId]: { score: partie.score, total } });
    }
    setPartie({ ...partie, fini: true });
  };

  if (partie.fini) {
    const record = meilleurs[partie.themeId];
    const total = partie.questions.length;
    const meilleur =
      !record || partie.score / total >= record.score / record.total
        ? { score: partie.score, total }
        : record;
    return (
      <Resultat
        partie={partie}
        meilleur={meilleur}
        onRejouer={() => setPartie(preparerPartie(partie.themeId))}
        onAccueil={() => setPartie(null)}
      />
    );
  }

  return (
    <Question
      partie={partie}
      onChoisir={choisir}
      onSuivant={suivant}
      onQuitter={() => setPartie(null)}
    />
  );
}
