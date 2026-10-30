/** Fait vibrer l'appareil si la vibration est activée et supportée. */
export function vibrer(active, motif) {
  if (!active) return;
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate(motif);
  }
}
