import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { getArtisanAvatarUrl } from '../lib/images';

const FAVORIS = [
  { id: '1', name: 'Jean Kouassi', metier: 'Mécanicien', note: 4.8, initiales: 'JK' },
  { id: '2', name: 'Marie Adjo', metier: 'Coiffeuse', note: 4.9, initiales: 'MA' },
];

export default function Favoris() {
  return (
    <Layout>
      <h2 className="section-title">Favoris</h2>
      {FAVORIS.length > 0 ? (
        FAVORIS.map((a) => (
          <Link key={a.id} to={`/artisan/${a.id}`} className="list-card">
            <div className="list-card-avatar">
              <Avatar src={getArtisanAvatarUrl(a.id, 96)} initiales={a.initiales} />
            </div>
            <div className="list-card-body">
              <p className="list-card-title">{a.name}</p>
              <p className="list-card-subtitle">{a.metier}</p>
              <p className="list-card-meta">★ {a.note}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="empty-state glass-card" style={{ padding: 48 }}>
          <Heart size={64} strokeWidth={1.5} />
          <p><strong>Aucun favori</strong></p>
          <p>Enregistrez vos artisans préférés pour y accéder rapidement.</p>
          <Link to="/" className="btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>Découvrir</Link>
        </div>
      )}
    </Layout>
  );
}
