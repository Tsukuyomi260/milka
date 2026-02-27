import { Link } from 'react-router-dom';
import { Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import Layout from '../components/Layout';

export default function Parametres() {
  return (
    <Layout>
      <h2 className="section-title">Settings</h2>
      <div className="settings-list">
        <Link to="/notifications" className="settings-item">
          <Bell size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">Notifications</span>
            <p className="settings-item-desc">Alertes et rappels de rendez-vous</p>
          </div>
        </Link>
        <Link to="/confidentialite" className="settings-item">
          <Shield size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">Confidentialité</span>
            <p className="settings-item-desc">Données personnelles et RGPD</p>
          </div>
        </Link>
        <div className="settings-item" style={{ cursor: 'default' }}>
          <Palette size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">Apparence</span>
            <p className="settings-item-desc">Thème (à venir)</p>
          </div>
        </div>
        <div className="settings-item" style={{ cursor: 'default' }}>
          <Globe size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">Langue</span>
            <p className="settings-item-desc">Français</p>
          </div>
        </div>
        <Link to="/cgu" className="settings-item">
          <HelpCircle size={22} className="settings-item-icon" />
          <div>
            <span className="settings-item-label">Aide & CGU</span>
            <p className="settings-item-desc">Conditions et support</p>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
