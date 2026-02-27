import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { getArtisanAvatarUrl } from '../lib/images';

const DEMANDES = [
  { id: '1', artisan: 'Jean Kouassi', metier: 'Mécanicien', initiales: 'JK', date: 'Aujourd\'hui', statut: 'En attente' },
  { id: '2', artisan: 'Marie Adjo', metier: 'Coiffeuse', initiales: 'MA', date: 'Hier', statut: 'Confirmé' },
  { id: '3', artisan: 'Pascal Garage', metier: 'Garagiste', initiales: 'PG', date: 'Il y a 2 j.', statut: 'Terminé' },
];

export default function Demandes() {
  return (
    <Layout>
      <h2 className="section-title">Mes demandes</h2>
      {DEMANDES.length > 0 ? (
        DEMANDES.map((d) => (
          <Link key={d.id} to={`/artisan/${d.id}`} className="list-card">
            <div className="list-card-avatar">
              <Avatar src={getArtisanAvatarUrl(d.id, 96)} initiales={d.initiales} />
            </div>
            <div className="list-card-body">
              <p className="list-card-title">{d.artisan}</p>
              <p className="list-card-subtitle">{d.metier}</p>
              <p className="list-card-meta">{d.date} · {d.statut}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="empty-state glass-card" style={{ padding: 48 }}>
          <MessageCircle size={64} strokeWidth={1.5} />
          <p><strong>Aucune demande</strong></p>
          <p>Vos prises de contact et rendez-vous apparaîtront ici.</p>
        </div>
      )}
    </Layout>
  );
}
