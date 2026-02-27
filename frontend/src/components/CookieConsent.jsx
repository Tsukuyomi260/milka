import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'milka_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ essential: true, analytics: true, marketing: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  const acceptEssentialOnly = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ essential: true, analytics: false, marketing: false, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Consentement cookies">
      <p>
        Nous utilisons des cookies pour le fonctionnement du site et, avec votre accord, pour mesurer l’audience.
        Vos données sont protégées conformément à notre <Link to="/confidentialite">politique de confidentialité</Link> (RGPD).
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="btn-primary" onClick={accept}>
          Tout accepter
        </button>
        <button type="button" onClick={acceptEssentialOnly} style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Essentiels uniquement
        </button>
      </div>
    </div>
  );
}
