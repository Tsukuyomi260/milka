import { Link } from 'react-router-dom';
import { Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { useUi } from '../context/UIContext';
import { useI18n } from '../i18n';

export default function Parametres() {
  const { theme, setTheme, language, setLanguage } = useUi();
  const { t } = useI18n();

  const handleThemeChange = (value) => {
    if (value === 'light' || value === 'dark') {
      setTheme(value);
    }
  };

  const handleLanguageChange = (value) => {
    if (value === 'fr' || value === 'en') {
      setLanguage(value);
    }
  };

  return (
    <Layout>
      <h2 className="section-title">{t('settings.title')}</h2>
      <div className="settings-list">
        <Link to="/notifications" className="settings-item">
          <Bell size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">{t('settings.notifications')}</span>
            <p className="settings-item-desc">{t('settings.notificationsDesc')}</p>
          </div>
        </Link>
        <Link to="/confidentialite" className="settings-item">
          <Shield size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">{t('settings.privacy')}</span>
            <p className="settings-item-desc">{t('settings.privacyDesc')}</p>
          </div>
        </Link>
        <div className="settings-item" style={{ cursor: 'default' }}>
          <Palette size={22} className="settings-item-icon" />
          <div style={{ flex: 1 }}>
            <span className="settings-item-label">{t('settings.appearance')}</span>
            <p className="settings-item-desc">{t('settings.appearanceDesc')}</p>
          </div>
          <div className="settings-toggle-group" aria-label={t('settings.appearance')}>
            <button
              type="button"
              className={`settings-toggle ${theme === 'light' ? 'settings-toggle--active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              {t('settings.light')}
            </button>
            <button
              type="button"
              className={`settings-toggle ${theme === 'dark' ? 'settings-toggle--active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              {t('settings.dark')}
            </button>
          </div>
        </div>
        <div className="settings-item" style={{ cursor: 'default' }}>
          <Globe size={22} className="settings-item-icon" />
          <div style={{ flex: 1 }}>
            <span className="settings-item-label">{t('settings.language')}</span>
            <p className="settings-item-desc">{t('settings.languageDesc')}</p>
          </div>
          <div className="settings-toggle-group" aria-label={t('settings.language')}>
            <button
              type="button"
              className={`settings-toggle ${language === 'fr' ? 'settings-toggle--active' : ''}`}
              onClick={() => handleLanguageChange('fr')}
            >
              {t('settings.french')}
            </button>
            <button
              type="button"
              className={`settings-toggle ${language === 'en' ? 'settings-toggle--active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              {t('settings.english')}
            </button>
          </div>
        </div>
        <Link to="/cgu" className="settings-item">
          <HelpCircle size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">{t('settings.help')}</span>
            <p className="settings-item-desc">{t('settings.helpDesc')}</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
