import { useState } from 'react';

/**
 * Avatar avec image (placeholder ou URL) ou initiales si pas d'image / erreur de chargement.
 * @param {string} src - URL de l'image (optionnel)
 * @param {string} initiales - Ex. "JK"
 * @param {string} className - Classes CSS additionnelles
 * @param {object} style - Styles inline
 */
export default function Avatar({ src, initiales, className = '', style = {} }) {
  const [error, setError] = useState(false);
  const showImg = src && !error;

  if (showImg) {
    return (
      <img
        src={src}
        alt=""
        className={className}
        style={{ objectFit: 'cover', ...style }}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <span className={className} style={style}>
      {initiales || '?'}
    </span>
  );
}
