/**
 * Sons doux synthétisés avec la Web Audio API (aucun fichier audio).
 *
 * Idée : un petit « tic » feutré, dont la hauteur monte doucement sur une gamme
 * pentatonique à mesure que le tour avance, avec une réverbération légère.
 * Fin de tour : un son de bol. Fin du chapelet : un accord apaisé.
 */

export const STYLES_SON = [
  { id: 'doux', libelle: 'Doux · progressif' },
  { id: 'bois', libelle: 'Bois discret' },
  { id: 'aucun', libelle: 'Silencieux' },
];

export const STYLE_SON_PAR_DEFAUT = 'doux';

// Ré majeur pentatonique : toutes les notes s'accordent entre elles.
const GAMME = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99];
// Note du bol de fin de tour : monte à chaque tour.
const NOTES_BOL = [293.66, 369.99, 440.0, 587.33];

/* ---------- Chaîne audio (filtre doux + réverbération) ---------- */

const chaines = new WeakMap();

function reponseImpulsionnelle(ctx) {
  const longueur = Math.floor(ctx.sampleRate * 1.8);
  const tampon = ctx.createBuffer(2, longueur, ctx.sampleRate);
  for (let canal = 0; canal < 2; canal += 1) {
    const donnees = tampon.getChannelData(canal);
    for (let i = 0; i < longueur; i += 1) {
      donnees[i] = (Math.random() * 2 - 1) * (1 - i / longueur) ** 3;
    }
  }
  return tampon;
}

function obtenirChaine(ctx) {
  if (chaines.has(ctx)) return chaines.get(ctx);

  const entree = ctx.createGain();
  const filtre = ctx.createBiquadFilter();
  filtre.type = 'lowpass';
  filtre.frequency.value = 3000;
  filtre.Q.value = 0.3;

  const direct = ctx.createGain();
  direct.gain.value = 0.9;

  const reverb = ctx.createConvolver();
  reverb.buffer = reponseImpulsionnelle(ctx);
  const humide = ctx.createGain();
  humide.gain.value = 0.32;

  entree.connect(filtre);
  filtre.connect(direct).connect(ctx.destination);
  filtre.connect(reverb).connect(humide).connect(ctx.destination);

  chaines.set(ctx, entree);
  return entree;
}

/* ---------- Briques sonores ---------- */

/** Note sinusoïdale à enveloppe douce, avec harmoniques optionnelles [rapport, poids]. */
function ton(ctx, sortie, { freq, duree, volume, attaque = 0.008, retard = 0, partiels = [] }) {
  const debut = ctx.currentTime + retard;
  const enveloppe = ctx.createGain();
  enveloppe.gain.setValueAtTime(0.0001, debut);
  enveloppe.gain.exponentialRampToValueAtTime(volume, debut + attaque);
  enveloppe.gain.exponentialRampToValueAtTime(0.0001, debut + duree);
  enveloppe.connect(sortie);

  [[1, 1], ...partiels].forEach(([rapport, poids]) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * rapport;
    const niveau = ctx.createGain();
    niveau.gain.value = poids;
    osc.connect(niveau).connect(enveloppe);
    osc.start(debut);
    osc.stop(debut + duree + 0.05);
  });
}

/** Petit « tic » feutré (bruit filtré très court) : la sensation de la perle. */
function clic(ctx, sortie, { volume = 0.035, frequence = 1400, retard = 0 } = {}) {
  const debut = ctx.currentTime + retard;
  const longueur = Math.floor(ctx.sampleRate * 0.03);
  const tampon = ctx.createBuffer(1, longueur, ctx.sampleRate);
  const donnees = tampon.getChannelData(0);
  for (let i = 0; i < longueur; i += 1) {
    donnees[i] = (Math.random() * 2 - 1) * (1 - i / longueur) ** 2;
  }
  const source = ctx.createBufferSource();
  source.buffer = tampon;
  const filtre = ctx.createBiquadFilter();
  filtre.type = 'bandpass';
  filtre.frequency.value = frequence;
  filtre.Q.value = 0.8;
  const niveau = ctx.createGain();
  niveau.gain.value = volume;
  source.connect(filtre).connect(niveau).connect(sortie);
  source.start(debut);
}

/* ---------- Événements ---------- */

function perle(ctx, sortie, style, progression) {
  if (style === 'bois') {
    clic(ctx, sortie, { volume: 0.12, frequence: 1100 });
    ton(ctx, sortie, { freq: 330, duree: 0.12, volume: 0.09, partiels: [[2.4, 0.2]] });
    return;
  }

  const p = Math.min(0.999, Math.max(0, progression));
  const freq = GAMME[Math.floor(p * GAMME.length)];
  ton(ctx, sortie, {
    freq,
    duree: 0.45,
    volume: 0.08 + 0.06 * p,
    partiels: [
      [2, 0.12],
      [3, 0.03],
    ],
  });
  clic(ctx, sortie);
  // Les dernières perles d'un tour s'illuminent d'un léger scintillement
  if (p >= 0.88) {
    ton(ctx, sortie, { freq: freq * 2, duree: 0.9, volume: 0.035, retard: 0.02 });
  }
}

function bol(ctx, sortie, tour) {
  const freq = NOTES_BOL[((tour % NOTES_BOL.length) + NOTES_BOL.length) % NOTES_BOL.length];
  ton(ctx, sortie, {
    freq,
    duree: 2.4,
    volume: 0.12,
    attaque: 0.02,
    partiels: [
      [2.0, 0.3],
      [2.76, 0.1],
      [4.2, 0.04],
    ],
  });
  ton(ctx, sortie, { freq: freq * 1.5, duree: 1.8, volume: 0.05, attaque: 0.02, retard: 0.15 });
}

function accordFinal(ctx, sortie) {
  [293.66, 369.99, 440.0, 587.33].forEach((freq, i) => {
    ton(ctx, sortie, {
      freq,
      duree: 3,
      volume: 0.09,
      attaque: 0.03,
      retard: i * 0.16,
      partiels: [
        [2, 0.25],
        [3, 0.08],
      ],
    });
  });
}

function bonneReponse(ctx, sortie) {
  ton(ctx, sortie, { freq: 440.0, duree: 0.5, volume: 0.07, partiels: [[2, 0.15]] });
  ton(ctx, sortie, { freq: 587.33, duree: 0.7, volume: 0.08, retard: 0.11, partiels: [[2, 0.15]] });
}

/**
 * Fait entendre un événement sur un contexte audio donné
 * (temps réel, ou OfflineAudioContext pour les tests).
 */
export function synthetiser(ctx, style, evenement, options = {}) {
  if (!style || style === 'aucun') return;
  const sortie = obtenirChaine(ctx);

  if (evenement === 'perle') perle(ctx, sortie, style, options.progression ?? 0);
  else if (evenement === 'phase') bol(ctx, sortie, options.tour ?? 0);
  else if (evenement === 'fin') accordFinal(ctx, sortie);
  else if (evenement === 'juste') bonneReponse(ctx, sortie);
}

/* ---------- Temps réel ---------- */

let contexte = null;

function obtenirContexte() {
  if (typeof window === 'undefined') return null;
  const Constructeur = window.AudioContext || window.webkitAudioContext;
  if (!Constructeur) return null;
  if (!contexte) contexte = new Constructeur();
  if (contexte.state === 'suspended') contexte.resume();
  return contexte;
}

/**
 * @param {string} style  'doux' | 'bois' | 'aucun'
 * @param {'perle'|'phase'|'fin'|'juste'} evenement
 * @param {{progression?: number, tour?: number}} options
 */
export function jouerSon(style, evenement, options) {
  if (!style || style === 'aucun') return;
  try {
    const ctx = obtenirContexte();
    if (ctx) synthetiser(ctx, style, evenement, options);
  } catch {
    /* audio indisponible : on ignore */
  }
}
