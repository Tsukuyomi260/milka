import { Link } from 'react-router-dom';
import { Shield, FileText, Settings } from 'lucide-react';
import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { getProfileCoverUrl } from '../lib/images';
import { useI18n } from '../i18n';

export default function Profil() {
  const { t } = useI18n();

  return (
    <Layout>
      <div
        className="profile-hero"
        style={{ backgroundImage: `url(${getProfileCoverUrl()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="profile-hero-blur" aria-hidden="true" />
      </div>
      <div className="profile-card">
        <div className="profile-avatar">
          <Avatar
            src="https://i.pravatar.cc/160?u=milka-user"
            initiales="U"
          />
        </div>
        <h1 className="profile-name">{t('profile.title')}</h1>
        <p className="profile-handle">{t('profile.handle')}</p>
        <p className="profile-bio">
          {t('profile.bio')}
        </p>
        <div className="profile-stats">
          <Link to="/demandes" className="profile-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">{t('profile.stats.requests')}</div>
          </Link>
          <Link to="/favoris" className="profile-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">{t('profile.stats.favorites')}</div>
          </Link>
          <div className="profile-stat">
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">{t('profile.stats.reviews')}</div>
          </div>
        </div>
        <div className="profile-tags">
          <Link to="/favoris" className="profile-tag">{t('profile.tags.favorites')}</Link>
          <Link to="/demandes" className="profile-tag">{t('profile.tags.requests')}</Link>
          <Link to="/connexion" className="profile-tag">{t('profile.tags.login')}</Link>
          <Link to="/inscription" className="profile-tag">{t('profile.tags.register')}</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link to="/confidentialite" className="settings-item">
            <Shield size={22} className="settings-item-icon" />
            <span className="settings-item-label">{t('profile.privacy')}</span>
          </Link>
          <Link to="/parametres" className="settings-item">
            <Settings size={22} className="settings-item-icon" />
            <span className="settings-item-label">{t('settings.title')}</span>
          </Link>
          <Link to="/cgu" className="settings-item">
            <FileText size={22} className="settings-item-icon" />
            <span className="settings-item-label">{t('profile.terms')}</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
