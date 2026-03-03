import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const STORAGE_KEY = 'milka_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ essential: true, analytics: true, marketing: false, date: new Date().toISOString() }),
    );
    setVisible(false);
  };

  const acceptEssentialOnly = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ essential: true, analytics: false, marketing: false, date: new Date().toISOString() }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t('cookies.dialogLabel')}>
      <p>
        {t('cookies.text')}{' '}
        <Link to="/confidentialite">{t('cookies.policy')}</Link>
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="btn-primary" onClick={accept}>
          {t('cookies.acceptAll')}
        </button>
        <button
          type="button"
          onClick={acceptEssentialOnly}
          style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}
        >
          {t('cookies.essentialsOnly')}
        </button>
      </div>
    </div>
  );
}
