import { createContext } from 'react';

/** Réglages partagés : seuls ceux qui servent à l'affichage de l'arabe y sont lus. */
export const ReglagesContext = createContext({ tajwid: true });
