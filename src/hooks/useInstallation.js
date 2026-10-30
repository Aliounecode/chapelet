import { useEffect, useState } from 'react';

const estInstallee = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

const estIOS = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

/**
 * Gère l'installation de la PWA :
 *  - `peutInstaller` : le navigateur propose l'installation (Android / Chrome / Edge) ;
 *  - `installer()` : affiche la boîte d'installation ;
 *  - `installee` : déjà lancée comme application ;
 *  - `iosManuel` : iPhone/iPad (Safari), installation via « Ajouter à l'écran d'accueil ».
 */
export function useInstallation() {
  const [invite, setInvite] = useState(null);
  const [installee, setInstallee] = useState(estInstallee);

  useEffect(() => {
    const surInvite = (e) => {
      e.preventDefault();
      setInvite(e);
    };
    const surInstallation = () => {
      setInvite(null);
      setInstallee(true);
    };
    window.addEventListener('beforeinstallprompt', surInvite);
    window.addEventListener('appinstalled', surInstallation);
    return () => {
      window.removeEventListener('beforeinstallprompt', surInvite);
      window.removeEventListener('appinstalled', surInstallation);
    };
  }, []);

  const installer = async () => {
    if (!invite) return;
    invite.prompt();
    await invite.userChoice;
    setInvite(null);
  };

  return {
    peutInstaller: Boolean(invite),
    installer,
    installee,
    iosManuel: estIOS() && !installee,
  };
}
