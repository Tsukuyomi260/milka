import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import Layout from '../components/Layout';

const NOTIFS = [
  { id: 1, titre: 'Rendez-vous confirmé', texte: 'Jean Kouassi a confirmé votre demande pour demain 14h.', date: 'Il y a 2 h' },
  { id: 2, titre: 'Nouvel avis', texte: 'Marie Adjo a répondu à votre avis.', date: 'Hier' },
];

export default function Notifications() {
  return (
    <Layout>
      <h2 className="section-title">Notifications</h2>
      {NOTIFS.length > 0 ? (
        NOTIFS.map((n) => (
          <div key={n.id} className="list-card" style={{ cursor: 'default', marginBottom: 10 }}>
            <div className="list-card-body">
              <p className="list-card-title">{n.titre}</p>
              <p className="list-card-subtitle">{n.texte}</p>
              <p className="list-card-meta">{n.date}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state glass-card" style={{ padding: 48 }}>
          <Bell size={64} strokeWidth={1.5} />
          <p><strong>Aucune notification</strong></p>
          <p>Les alertes et rappels apparaîtront ici.</p>
        </div>
      )}
    </Layout>
  );
}
