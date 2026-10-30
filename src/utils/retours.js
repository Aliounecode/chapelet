import { vibrer } from './vibration.js';
import { jouerSon } from './son.js';

const MOTIFS_VIBRATION = {
  perle: 15,
  phase: [60, 40, 60],
  fin: [80, 60, 80, 60, 220],
  juste: 20,
  faux: [40, 30, 40],
};

/**
 * Retour sensoriel (vibration + son) pour un événement.
 * @param {{ vibration: boolean, son: string }} retours
 * @param {'perle'|'phase'|'fin'|'juste'|'faux'} evenement
 * @param {{ progression?: number, tour?: number }} [options]
 *   progression : avancement dans le tour (0 à 1), fait monter la note du son
 *   tour : numéro du tour (0, 1, 2…), change la note du bol de fin de tour
 */
export function signaler(retours, evenement, options) {
  vibrer(retours.vibration, MOTIFS_VIBRATION[evenement]);
  jouerSon(retours.son, evenement, options);
}
