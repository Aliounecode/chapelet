/**
 * Moteur de tajwid (règles de base) — lecture de Hafs d'après 3Asim.
 *
 * Il découpe un texte arabe vocalisé en « groupes » (une lettre + ses signes), puis
 * attribue une règle de couleur à chaque groupe concerné. C'est une analyse
 * automatique par règles : elle convient très bien à des textes courts et bien
 * vocalisés (dhikr, noms, hadiths), mais elle ne remplace pas un mushaf imprimé
 * ni un professeur pour le Coran.
 */

/* ---------- Caractères ---------- */

const FATHA = 'َ';
const DAMMA = 'ُ';
const KASRA = 'ِ';
const SHADDA = 'ّ';
const SUKUN = 'ْ';
const MADDA = 'ٓ';
const ALIF_POIGNARD = 'ٰ';
const TANWIN = /[ًٌٍ]/;

const HAMZAS = 'ءأإؤئآ';
const GUTTURALES = `${HAMZAS}هعحغخ`; // izhar
const IDGHAM_AVEC_GHUNNA = 'ينمو';
const IDGHAM_SANS_GHUNNA = 'لر';
const IKHFA = 'صذثكجشقسدطزفتضظ';
const QALQALA = 'قطبجد';

/** Règles et libellés (utilisés aussi pour la légende). */
export const REGLES_TAJWID = [
  { id: 'madd-tabii', libelle: 'Madd naturel', detail: '2 temps' },
  { id: 'madd', libelle: 'Madd allongé', detail: '4 à 5 temps' },
  { id: 'madd-lazim', libelle: 'Madd obligatoire', detail: '6 temps' },
  { id: 'ghunna', libelle: 'Ghunna', detail: 'nasalisation' },
  { id: 'ikhfa', libelle: 'Ikhfa’', detail: 'dissimulation' },
  { id: 'idgham-ghunna', libelle: 'Idgham avec ghunna', detail: 'fusion nasale' },
  { id: 'idgham', libelle: 'Idgham sans ghunna', detail: 'fusion' },
  { id: 'iqlab', libelle: 'Iqlab', detail: 'noun → mim' },
  { id: 'qalqala', libelle: 'Qalqala', detail: 'rebond' },
  { id: 'muet', libelle: 'Lettre muette', detail: 'non prononcée' },
];

function estMarque(caractere) {
  const n = caractere.codePointAt(0);
  return (
    (n >= 0x064b && n <= 0x065f) ||
    n === 0x0670 ||
    (n >= 0x06d6 && n <= 0x06dc) ||
    (n >= 0x06df && n <= 0x06e8) ||
    (n >= 0x06ea && n <= 0x06ed)
  );
}

function estLettre(caractere) {
  const n = caractere.codePointAt(0);
  return (
    (n >= 0x0621 && n <= 0x064a) || n === 0x0671 || (n >= 0x066e && n <= 0x06d3)
  );
}

/* ---------- Écriture « uthmani » ---------- */

/**
 * Remplace l'alif de l'article « al- » par l'alif wasla (ٱ), comme dans le mushaf.
 * Ex. : الْحَمْدُ → ٱلْحَمْدُ ; وَاللَّهِ → وَٱللَّهِ
 */
export function versUthmani(texte) {
  return texte.replace(
    /(^|[\s«(])([وفبكل][ً-ْ]*)?ا(?=ل)/g,
    (_, avant, proclitique = '') => `${avant}${proclitique}ٱ`
  );
}

/* ---------- Découpage ---------- */

function decouperEnGroupes(mot) {
  const groupes = [];
  for (const c of mot) {
    if (estMarque(c) && groupes.length > 0) {
      groupes[groupes.length - 1].marques += c;
    } else {
      groupes.push({ base: c, marques: '', lettre: estLettre(c), regle: null });
    }
  }
  return groupes;
}

/** Article « al- » en début de mot (éventuellement après وَ ف ب ك ل). */
function infoArticle(lettres) {
  for (let k = 0; k <= 1; k += 1) {
    if (lettres[k]?.base === 'ٱ' && lettres[k + 1]?.base === 'ل') {
      const lam = lettres[k + 1];
      const suivante = lettres[k + 2];
      const solaire = !lam.marques.includes(SUKUN) && !!suivante?.marques.includes(SHADDA);
      return { indexAlif: k, indexLam: k + 1, solaire };
    }
  }
  return null;
}

/** Première lettre réellement prononcée du mot suivant. */
function initialeSonore(lettres) {
  if (!lettres || lettres.length === 0) return null;
  const article = infoArticle(lettres);
  if (article && article.indexAlif === 0) {
    return article.solaire ? lettres[article.indexLam + 1].base : 'ل';
  }
  if (lettres[0].base === 'ٱ') return lettres[1]?.base ?? null;
  return lettres[0].base;
}

/* ---------- Règles ---------- */

function regleNoun(suivante, memeMot) {
  if (!suivante) return null;
  if (GUTTURALES.includes(suivante)) return null; // izhar
  if (suivante === 'ب') return 'iqlab';
  if (IDGHAM_AVEC_GHUNNA.includes(suivante)) return memeMot ? null : 'idgham-ghunna';
  if (IDGHAM_SANS_GHUNNA.includes(suivante)) return 'idgham';
  if (IKHFA.includes(suivante)) return 'ikhfa';
  return null;
}

function estLettreDeMadd(groupe, precedent) {
  const { base, marques } = groupe;
  if (base === 'آ') return true;
  if (marques.includes(MADDA) || marques.includes(ALIF_POIGNARD)) return true;
  if (marques !== '' || !precedent) return false;
  if (base === 'ا') return precedent.marques.includes(FATHA);
  if (base === 'و') return precedent.marques.includes(DAMMA);
  if (base === 'ي') return precedent.marques.includes(KASRA);
  if (base === 'ى') return precedent.marques.includes(FATHA);
  return false;
}

function appliquerRegles(lettres, motSuivant) {
  const article = infoArticle(lettres);
  const articleSuivant = motSuivant ? infoArticle(motSuivant) : null;
  const initialeSuivante = initialeSonore(motSuivant);

  lettres.forEach((groupe, j) => {
    const { base, marques } = groupe;
    const precedent = lettres[j - 1];
    const suivant = lettres[j + 1];
    const dernier = j === lettres.length - 1;
    const aShadda = marques.includes(SHADDA);
    const aSukun = marques.includes(SUKUN);
    const suivante = suivant ? suivant.base : initialeSuivante;
    const suivantEstLourd =
      !!suivant && (suivant.marques.includes(SHADDA) || suivant.marques.includes(SUKUN));

    // 1. Lettres muettes : alif wasla et lam de l'article solaire
    if (base === 'ٱ') {
      groupe.regle = 'muet';
      return;
    }
    if (article && j === article.indexLam && article.solaire && !aSukun) {
      groupe.regle = 'muet';
      return;
    }

    // 2. Madd
    if (estLettreDeMadd(groupe, precedent)) {
      const forceAllongee = base === 'آ' || marques.includes(MADDA);
      const hamzaApres = HAMZAS.includes(suivante ?? '');
      // Lettre de madd en fin de mot devant un « al- » à lam prononcée : elle tombe
      const tombe =
        !forceAllongee &&
        !marques.includes(ALIF_POIGNARD) &&
        dernier &&
        articleSuivant &&
        articleSuivant.indexAlif === 0 &&
        !articleSuivant.solaire;
      if (tombe) groupe.regle = 'muet';
      else if (hamzaApres) groupe.regle = 'madd';
      else if (suivantEstLourd) groupe.regle = 'madd-lazim';
      else groupe.regle = forceAllongee ? 'madd' : 'madd-tabii';
      return;
    }

    // 3. Ghunna : noun ou mim avec shadda
    if ((base === 'ن' || base === 'م') && aShadda) {
      groupe.regle = 'ghunna';
      return;
    }

    // 4. Noun sakina et tanwin
    const nounSakina = base === 'ن' && aSukun;
    const tanwinFinal = TANWIN.test(marques) && dernier;
    if (nounSakina || tanwinFinal) {
      groupe.regle = regleNoun(suivante, !!suivant);
      return;
    }

    // 5. Mim sakina
    if (base === 'م' && aSukun) {
      if (suivante === 'ب') groupe.regle = 'ikhfa';
      else if (suivante === 'م') groupe.regle = 'idgham-ghunna';
      return;
    }

    // 6. Qalqala
    if (QALQALA.includes(base) && aSukun) {
      groupe.regle = 'qalqala';
    }
  });
}

/* ---------- API ---------- */

const cache = new Map();

/**
 * @returns {Array<{espace:true,texte:string} | {espace:false,groupes:Array<{base:string,marques:string,regle:string|null}>}>}
 */
export function analyserTajwid(texte) {
  if (cache.has(texte)) return cache.get(texte);

  const morceaux = versUthmani(texte).split(/(\s+)/).filter((m) => m !== '');
  const jetons = morceaux.map((morceau) =>
    /^\s+$/.test(morceau)
      ? { espace: true, texte: morceau }
      : { espace: false, groupes: decouperEnGroupes(morceau) }
  );

  // Mots réellement arabes (les signes de ponctuation isolés sont ignorés)
  const mots = jetons
    .filter((j) => !j.espace)
    .map((j) => ({ jeton: j, lettres: j.groupes.filter((g) => g.lettre) }))
    .filter((m) => m.lettres.length > 0);

  mots.forEach((mot, i) => appliquerRegles(mot.lettres, mots[i + 1]?.lettres ?? null));

  cache.set(texte, jetons);
  return jetons;
}
