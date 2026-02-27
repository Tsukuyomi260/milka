import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone } from 'lucide-react';
import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { getArtisanAvatarUrl } from '../lib/images';

const ARTISANS = {
  '1': { name: 'Jean Kouassi', metier: 'Mécanicien', note: 4.8, avis: 124, initiales: 'JK', adresse: 'Cocody, Abidjan', phone: '+225 07 00 00 00 01' },
  '2': { name: 'Marie Adjo', metier: 'Coiffeuse', note: 4.9, avis: 89, initiales: 'MA', adresse: 'Plateau, Abidjan', phone: '+225 07 00 00 00 02' },
  '3': { name: 'Pascal Garage', metier: 'Garagiste', note: 4.6, avis: 56, initiales: 'PG', adresse: 'Yopougon, Abidjan', phone: '+225 07 00 00 00 03' },
  '4': { name: 'Combi Pneus', metier: 'Vulcanisateur', note: 4.7, avis: 203, initiales: 'CP', adresse: 'Marcory, Abidjan', phone: '+225 07 00 00 00 04' },
  '5': { name: 'Électricité Pro', metier: 'Électricien', note: 4.5, avis: 42, initiales: 'EP', adresse: 'Riviera, Abidjan', phone: '+225 07 00 00 00 05' },
};

export default function ArtisanDetail() {
  const { id } = useParams();
  const artisan = ARTISANS[id];

  if (!artisan) {
    return (
      <Layout>
        <p>Artisan introuvable.</p>
        <Link to="/">Retour à l'accueil</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <ArrowLeft size={20} /> Retour
      </Link>
      <div className="glass-card glass-card-strong" style={{ padding: 24, textAlign: 'center' }}>
        <div className="profile-avatar" style={{ width: 88, height: 88, fontSize: '2rem', margin: '0 auto 16px' }}>
          <Avatar src={getArtisanAvatarUrl(id, 176)} initiales={artisan.initiales} />
        </div>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '1.35rem' }}>{artisan.name}</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{artisan.metier}</p>
        <p style={{ margin: '12px 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Star size={18} fill="var(--milka-red)" color="var(--milka-red)" /> {artisan.note} · {artisan.avis} avis
        </p>
      </div>
      <div className="glass-card" style={{ padding: 18, marginTop: 16 }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
          <MapPin size={20} /> {artisan.adresse}
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0, color: 'var(--text-secondary)' }}>
          <Phone size={20} /> {artisan.phone}
        </p>
      </div>
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button type="button" className="btn-primary" style={{ flex: 1 }}>Contacter</button>
        <button type="button" className="btn-ghost">Rendez-vous</button>
      </div>
    </Layout>
  );
}
