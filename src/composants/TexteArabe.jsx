import { memo, useContext, useMemo } from 'react';
import { ReglagesContext } from '../contexte/ReglagesContext.js';
import { analyserTajwid } from '../utils/tajwid.js';

function Groupe({ groupe, tajwid }) {
  const { base, marques, regle } = groupe;
  if (tajwid && regle) {
    return <span className={`tj tj-${regle}`}>{base + marques}</span>;
  }
  if (!marques) return base;
  return (
    <>
      {base}
      <span className="harakat">{marques}</span>
    </>
  );
}

/**
 * Texte arabe vocalisé, en écriture de Hafs (police Scheherazade New),
 * avec voyelles en couleur et règles de tajwid colorées (selon les réglages).
 */
function TexteArabe({ texte, balise: Balise = 'span', className = '' }) {
  const { tajwid } = useContext(ReglagesContext);
  const jetons = useMemo(() => analyserTajwid(texte), [texte]);

  return (
    <Balise className={`arabe ${className}`.trim()} lang="ar" dir="rtl">
      {jetons.map((jeton, i) =>
        jeton.espace ? (
          jeton.texte
        ) : (
          <span key={i}>
            {jeton.groupes.map((groupe, k) => (
              <Groupe key={k} groupe={groupe} tajwid={tajwid} />
            ))}
          </span>
        )
      )}
    </Balise>
  );
}

export default memo(TexteArabe);
