import { useEffect, useMemo, useState } from "react";
import { useStockage } from "./hooks/useStockage.js";
import { ReglagesContext } from "./contexte/ReglagesContext.js";
import { STYLES_SON } from "./utils/son.js";
import EnTete from "./composants/EnTete.jsx";
import NavBas from "./composants/NavBas.jsx";
import Reglages from "./composants/Reglages.jsx";
import Chapelet33 from "./pages/Chapelet33.jsx";
import ChapeletLibre from "./pages/ChapeletLibre.jsx";
import Noms from "./pages/Noms.jsx";
import Hadiths from "./pages/Hadiths.jsx";
import Quizz from "./pages/Quizz.jsx";
import PiedDePage from "./composants/PiedDePage.jsx";

const onglets = [
  {
    id: "chapelet33",
    libelle: "Chapelet",
    icone: "chapelet33",
    sousTitre: "Prières en 33",
  },
  {
    id: "libre",
    libelle: "Libre",
    icone: "libre",
    sousTitre: "Chapelet de 100",
  },
  {
    id: "noms",
    libelle: "Noms",
    icone: "noms",
    sousTitre: "Les 99 Noms d’Allah",
  },
  {
    id: "hadiths",
    libelle: "Hadiths",
    icone: "hadiths",
    sousTitre: "Arabe et français",
  },
  {
    id: "quizz",
    libelle: "Quizz",
    icone: "quizz",
    sousTitre: "Testez vos connaissances",
  },
];

const REGLAGES_PAR_DEFAUT = {
  son: "doux",
  vibration: true,
  tajwid: true,
  tailleArabe: "grand",
};

const ECHELLES_ARABE = { normal: 1, grand: 1.15, "tres-grand": 1.3 };

export default function App() {
  const [ongletActif, setOngletActif] = useStockage(
    "tasbih.onglet",
    "chapelet33",
  );
  const [reglagesStockes, setReglagesStockes] = useStockage(
    "tasbih.reglages",
    REGLAGES_PAR_DEFAUT,
  );
  const [reglagesOuverts, setReglagesOuverts] = useState(false);

  // Réglages complets et valides (ajoute les valeurs par défaut, écarte un ancien son disparu)
  const reglages = useMemo(() => {
    const fusion = { ...REGLAGES_PAR_DEFAUT, ...reglagesStockes };
    if (!STYLES_SON.some((s) => s.id === fusion.son))
      fusion.son = REGLAGES_PAR_DEFAUT.son;
    if (!(fusion.tailleArabe in ECHELLES_ARABE))
      fusion.tailleArabe = REGLAGES_PAR_DEFAUT.tailleArabe;
    return fusion;
  }, [reglagesStockes]);

  const changerReglages = (modifications) =>
    setReglagesStockes({ ...reglages, ...modifications });

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--arabe-echelle",
      String(ECHELLES_ARABE[reglages.tailleArabe]),
    );
  }, [reglages.tailleArabe]);

  const contexte = useMemo(
    () => ({ tajwid: reglages.tajwid }),
    [reglages.tajwid],
  );
  const retours = useMemo(
    () => ({ vibration: reglages.vibration, son: reglages.son }),
    [reglages.vibration, reglages.son],
  );

  const onglet = onglets.find((o) => o.id === ongletActif) ?? onglets[0];

  const choisir = (id) => {
    setOngletActif(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <ReglagesContext.Provider value={contexte}>
      <div className="app">
        <EnTete
          sousTitre={onglet.sousTitre}
          onOuvrirReglages={() => setReglagesOuverts(true)}
        />

        <main className="contenu" key={onglet.id}>
          {onglet.id === "chapelet33" && (
            <Chapelet33 retours={retours} tajwid={reglages.tajwid} />
          )}
          {onglet.id === "libre" && <ChapeletLibre retours={retours} />}
          {onglet.id === "noms" && <Noms tajwid={reglages.tajwid} />}
          {onglet.id === "hadiths" && <Hadiths tajwid={reglages.tajwid} />}
          {onglet.id === "quizz" && <Quizz retours={retours} />}
          <PiedDePage />
        </main>

        <NavBas onglets={onglets} actif={onglet.id} onChoisir={choisir} />

        {reglagesOuverts ? (
          <Reglages
            reglages={reglages}
            onChanger={changerReglages}
            onFermer={() => setReglagesOuverts(false)}
          />
        ) : null}
      </div>
    </ReglagesContext.Provider>
  );
}
