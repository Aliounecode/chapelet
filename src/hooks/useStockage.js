import { useEffect, useState } from 'react';

/**
 * Comme useState, mais la valeur est sauvegardée dans le localStorage
 * pour que le chapelet retrouve son état à la réouverture de l'application.
 */
export function useStockage(cle, valeurInitiale) {
  const [valeur, setValeur] = useState(() => {
    try {
      const brut = window.localStorage.getItem(cle);
      return brut !== null ? JSON.parse(brut) : valeurInitiale;
    } catch {
      return valeurInitiale;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(cle, JSON.stringify(valeur));
    } catch {
      /* stockage indisponible : on ignore */
    }
  }, [cle, valeur]);

  return [valeur, setValeur];
}
