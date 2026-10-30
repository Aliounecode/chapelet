/**
 * Une couleur par tour (33 perles, ou 100 en mode libre).
 * Le premier tour garde l'or d'origine, puis les couleurs se succèdent.
 */
export const COULEURS_TOURS = [
  { id: 'or', nom: 'Or', principale: '#d9b36c', claire: '#f1d9a3' },
  { id: 'emeraude', nom: 'Émeraude', principale: '#4fc99a', claire: '#aaf0d4' },
  { id: 'saphir', nom: 'Saphir', principale: '#6aa8f0', claire: '#bdd9ff' },
  { id: 'rose', nom: 'Rose', principale: '#e58ab0', claire: '#f8c8dc' },
  { id: 'ambre', nom: 'Ambre', principale: '#f0924f', claire: '#ffd2aa' },
  { id: 'amethyste', nom: 'Améthyste', principale: '#a98cf0', claire: '#d9ccff' },
];

export function couleurDuTour(indexTour) {
  const n = COULEURS_TOURS.length;
  return COULEURS_TOURS[((indexTour % n) + n) % n];
}

/** Variables CSS à poser sur un élément pour qu'il prenne la couleur du tour. */
export function variablesCouleur(couleur) {
  return { '--perle': couleur.principale, '--perle-claire': couleur.claire };
}
