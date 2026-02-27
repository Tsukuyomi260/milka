import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Layout from '../components/Layout';
import Avatar from '../components/Avatar';
import { getArtisanAvatarUrl, getHeroImageUrl } from '../lib/images';

const EN_VEDETTE = [
  { id: '1', initiales: 'JK', online: true },
  { id: '2', initiales: 'MA', online: true },
  { id: '3', initiales: 'PG', online: false },
  { id: '4', initiales: 'CP', online: true },
  { id: '5', initiales: 'EP', online: true },
];

const PRÈS_DE_VOUS = [
  { id: '1', name: 'Jean Kouassi', metier: 'Mécanicien', note: 4.8, avis: 124, initiales: 'JK', distance: 'À 1,2 km' },
  { id: '2', name: 'Marie Adjo', metier: 'Coiffeuse', note: 4.9, avis: 89, initiales: 'MA', distance: 'À 2 km' },
];

const POPULAIRES = [
  { id: '3', name: 'Pascal Garage', metier: 'Garagiste', note: 4.6, initiales: 'PG' },
  { id: '4', name: 'Combi Pneus', metier: 'Vulcanisateur', note: 4.7, initiales: 'CP' },
  { id: '5', name: 'Électricité Pro', metier: 'Électricien', note: 4.5, initiales: 'EP' },
  { id: '1', name: 'Jean Kouassi', metier: 'Mécanicien', note: 4.8, initiales: 'JK' },
];

export default function Accueil() {
  return (
    <Layout showFilterBar showFab fabIcon={Plus} onFabClick={() => {}}>
      <section className="section-block">
        <h2 className="section-title">Vos artisans</h2>
        <div className="scroll-row">
          {EN_VEDETTE.map((a) => (
            <Link key={a.id} to={`/artisan/${a.id}`} className={`avatar-ring ${a.online ? 'online' : ''}`}>
              <Avatar src={getArtisanAvatarUrl(a.id, 128)} initiales={a.initiales} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Artisans près de vous</h2>
        <div className="scroll-row">
          {PRÈS_DE_VOUS.map((a) => (
            <Link
              key={a.id}
              to={`/artisan/${a.id}`}
              className="hero-card"
              style={{
              backgroundImage: getHeroImageUrl(a.id)
                ? `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%), url(${getHeroImageUrl(a.id)})`
                : 'linear-gradient(145deg, #2d2d32 0%, #1c1c1e 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            >
              <span className="hero-card-avatar">
                <Avatar src={getArtisanAvatarUrl(a.id, 88)} initiales={a.initiales} />
              </span>
              <span className="hero-card-title">{a.name}</span>
              <span className="hero-card-meta">
                ★ {a.note} · {a.avis} avis · {a.distance}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Populaires</h2>
        <div className="scroll-row">
          {POPULAIRES.map((a) => (
            <Link key={a.id} to={`/artisan/${a.id}`} className="artisan-card">
              <div className="artisan-card-avatar">
                <Avatar src={getArtisanAvatarUrl(a.id, 96)} initiales={a.initiales} />
              </div>
              <p className="artisan-card-name">{a.name}</p>
              <p className="artisan-card-metier">{a.metier}</p>
              <p className="artisan-card-note">★ {a.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
