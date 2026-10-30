const chemins = {
  chapelet33: (
    <circle cx="12" cy="12" r="8" strokeDasharray="0.1 3.1" strokeWidth="3" />
  ),
  libre: (
    <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
  ),
  noms: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
  hadiths: (
    <>
      <path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z" />
      <path d="M8 17h10" />
    </>
  ),
  vibration: (
    <>
      <rect x="8" y="5" width="8" height="14" rx="1.5" />
      <path d="M4 9v6M20 9v6" />
    </>
  ),
  son: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 9a4.2 4.2 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  sonCoupe: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M17 9.5l4.5 5M21.5 9.5l-4.5 5" />
    </>
  ),
  reglages: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  quizz: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.3 1-1.3 1.9" />
      <path d="M12 16.9v.1" />
    </>
  ),
  retour: <path d="M15 5l-7 7 7 7" />,
  annuler: (
    <>
      <path d="M9 7L4 12l5 5" />
      <path d="M4 12h10a6 6 0 0 1 6 6" />
    </>
  ),
  reset: (
    <>
      <path d="M4 12a8 8 0 1 0 3-6.2" />
      <path d="M4 4v4h4" />
    </>
  ),
  recherche: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  copie: (
    <>
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  fermer: <path d="M6 6l12 12M18 6L6 18" />,
  gauche: <path d="M14 6l-6 6 6 6" />,
  droite: <path d="M10 6l6 6-6 6" />,
  coche: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

export default function Icone({ nom, taille = 22 }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {chemins[nom]}
    </svg>
  );
}
