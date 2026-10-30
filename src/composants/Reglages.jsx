import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icone from './Icones.jsx';
import LegendeTajwid from './LegendeTajwid.jsx';
import TexteArabe from './TexteArabe.jsx';
import { STYLES_SON, jouerSon } from '../utils/son.js';
import { useInstallation } from '../hooks/useInstallation.js';

const TAILLES = [
  { id: 'normal', libelle: 'Normal' },
  { id: 'grand', libelle: 'Grand' },
  { id: 'tres-grand', libelle: 'Très grand' },
];

function Interrupteur({ actif, onBasculer, libelle, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={actif}
      className="reglage reglage--interrupteur"
      onClick={onBasculer}
    >
      <span className="reglage__texte">
        <span className="reglage__libelle">{libelle}</span>
        {description ? <span className="reglage__description">{description}</span> : null}
      </span>
      <span className={`interrupteur ${actif ? 'interrupteur--actif' : ''}`}>
        <span className="interrupteur__bouton" />
      </span>
    </button>
  );
}

export default function Reglages({ reglages, onChanger, onFermer }) {
  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'Escape') onFermer();
    };
    window.addEventListener('keydown', surTouche);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', surTouche);
      document.body.style.overflow = debordement;
    };
  }, [onFermer]);

  const { peutInstaller, installer, installee, iosManuel } = useInstallation();

  const choisirSon = (id) => {
    onChanger({ son: id });
    jouerSon(id, 'perle', { progression: 0.45 }); // aperçu
  };

  return createPortal(
    <div className="fiche-fond" onClick={onFermer}>
      <div
        className="fiche fiche--reglages"
        role="dialog"
        aria-modal="true"
        aria-label="Réglages"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="bouton-icone fiche__fermer" onClick={onFermer} aria-label="Fermer">
          <Icone nom="fermer" />
        </button>

        <h2 className="reglages-titre">Réglages</h2>

        <section className="reglage">
          <p className="reglage__libelle">Son des perles</p>
          <div className="reglage__choix">
            {STYLES_SON.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`puce ${reglages.son === s.id ? 'puce--active' : ''}`}
                aria-pressed={reglages.son === s.id}
                onClick={() => choisirSon(s.id)}
              >
                {s.libelle}
              </button>
            ))}
          </div>
        </section>

        <Interrupteur
          actif={reglages.vibration}
          onBasculer={() => onChanger({ vibration: !reglages.vibration })}
          libelle="Vibration"
          description="Un léger retour à chaque perle (téléphone)"
        />

        <Interrupteur
          actif={reglages.tajwid}
          onBasculer={() => onChanger({ tajwid: !reglages.tajwid })}
          libelle="Tajwid en couleurs"
          description="Colore les règles de lecture dans le texte arabe"
        />

        <section className="reglage">
          <p className="reglage__libelle">Taille de l’arabe</p>
          <div className="segments" role="group" aria-label="Taille de l’arabe">
            {TAILLES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`segments__item ${reglages.tailleArabe === t.id ? 'segments__item--actif' : ''}`}
                aria-pressed={reglages.tailleArabe === t.id}
                onClick={() => onChanger({ tailleArabe: t.id })}
              >
                {t.libelle}
              </button>
            ))}
          </div>
          <p className="reglage__apercu">
            <TexteArabe texte="مَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ" />
          </p>
        </section>

        {reglages.tajwid ? <LegendeTajwid ouverteParDefaut /> : null}

        <section className="reglage">
          <p className="reglage__libelle">Application</p>
          {installee ? (
            <p className="reglage__description">Installée : l’application fonctionne aussi sans connexion.</p>
          ) : peutInstaller ? (
            <>
              <p className="reglage__description">
                Installez Tasbih sur votre écran d’accueil : plein écran, et utilisable sans connexion.
              </p>
              <button type="button" className="bouton bouton--principal" onClick={installer}>
                Installer l’application
              </button>
            </>
          ) : iosManuel ? (
            <p className="reglage__description">
              Sur iPhone / iPad : touchez le bouton Partager de Safari, puis « Sur l’écran d’accueil ».
            </p>
          ) : (
            <p className="reglage__description">
              Utilisez le menu de votre navigateur : « Installer l’application » ou « Ajouter à l’écran d’accueil ».
            </p>
          )}
        </section>
      </div>
    </div>,
    document.body
  );
}
