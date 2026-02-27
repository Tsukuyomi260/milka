import { Link } from 'react-router-dom';
import { Shield, FileText, Settings } from 'lucide-react';
import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { getProfileCoverUrl } from '../lib/images';

export default function Profil() {
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
        <h1 className="profile-name">Mon compte</h1>
        <p className="profile-handle">@utilisateur</p>
        <p className="profile-bio">
          Connectez-vous pour gérer vos demandes, favoris et avis laissés aux artisans.
        </p>
        <div className="profile-stats">
          <Link to="/demandes" className="profile-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">Demandes</div>
          </Link>
          <Link to="/favoris" className="profile-stat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">Favoris</div>
          </Link>
          <div className="profile-stat">
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">Avis</div>
          </div>
        </div>
        <div className="profile-tags">
          <Link to="/favoris" className="profile-tag">Favoris</Link>
          <Link to="/demandes" className="profile-tag">Demandes</Link>
          <Link to="/connexion" className="profile-tag">Connexion</Link>
          <Link to="/inscription" className="profile-tag">Créer un compte</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link to="/confidentialite" className="settings-item">
            <Shield size={22} className="settings-item-icon" />
            <span className="settings-item-label">Confidentialité & données</span>
          </Link>
          <Link to="/parametres" className="settings-item">
            <Settings size={22} className="settings-item-icon" />
            <span className="settings-item-label">Paramètres</span>
          </Link>
          <Link to="/cgu" className="settings-item">
            <FileText size={22} className="settings-item-icon" />
            <span className="settings-item-label">Conditions d'utilisation</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
