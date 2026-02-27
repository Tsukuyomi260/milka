import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Avatar from './Avatar';
import { getArtisanAvatarUrl } from '../lib/images';

const METIER_EMOJI = {
  Mécanicien: '🔧',
  Coiffeuse: '💇',
  Garagiste: '🚗',
  Vulcanisateur: '🔧',
  Électricien: '⚡',
};

const FEATURED = {
  id: '3',
  name: 'Pascal Garage',
  metier: 'Garagiste',
  note: 4.6,
  distance: 'À 0,8 km',
  left: 58,
  top: 42,
};

const NEARBY_ARTISANS = [
  { id: '1', name: 'Jean Kouassi', metier: 'Mécanicien', note: 4.8, distance: 'À 1,2 km', left: 28, top: 55 },
  { id: '2', name: 'Marie Adjo', metier: 'Coiffeuse', note: 4.9, distance: 'À 1,5 km', left: 72, top: 28 },
  { id: '4', name: 'Combi Pneus', metier: 'Vulcanisateur', note: 4.7, distance: 'À 2 km', left: 45, top: 68 },
  { id: '5', name: 'Électricité Pro', metier: 'Électricien', note: 4.5, distance: 'À 2,2 km', left: 78, top: 62 },
];

const ONLINE_COUNT = 12;
const USER_POSITION = { left: 22, top: 72 };

export default function NearbyMapCard() {
  return (
    <div className="nearby-map-card">
      <div className="nearby-map-card__live-badge">
        <span className="nearby-map-card__live-dot" aria-hidden="true" />
        <span>{ONLINE_COUNT} artisans en ligne</span>
      </div>

      <div className="nearby-map-card__map">
        <div className="nearby-map-card__map-bg" aria-hidden="true">
          <div className="nearby-map-card__map-grid" />
          <div className="nearby-map-card__map-park" />
        </div>

        <div
          className="nearby-map-card__user-dot"
          style={{ left: `${USER_POSITION.left}%`, top: `${USER_POSITION.top}%` }}
          title="Votre position"
          aria-label="Votre position"
        >
          <span className="nearby-map-card__user-halo" />
        </div>

        {NEARBY_ARTISANS.map((a) => (
          <Link
            key={a.id}
            to={`/artisan/${a.id}`}
            className="nearby-map-card__pin nearby-map-card__pin--dot"
            style={{ left: `${a.left}%`, top: `${a.top}%` }}
            aria-label={`${a.name}, ${a.metier}`}
          >
            <div className="nearby-map-card__mini-profil">
              <span className="nearby-map-card__mini-avatar">
                <Avatar src={getArtisanAvatarUrl(a.id, 64)} initiales={a.name.split(' ').map(n => n[0]).join('').slice(0, 2)} />
              </span>
              <div className="nearby-map-card__mini-info">
                <span className="nearby-map-card__mini-name">{a.name}</span>
                <span className="nearby-map-card__mini-meta">{a.metier} {METIER_EMOJI[a.metier] ?? '👤'} · {a.distance}</span>
                <span className="nearby-map-card__mini-note">★ {a.note}</span>
              </div>
            </div>
            <span className="nearby-map-card__pin-dot" aria-hidden="true" />
          </Link>
        ))}

        <Link
          to={`/artisan/${FEATURED.id}`}
          className="nearby-map-card__pin nearby-map-card__pin--featured"
          style={{ left: `${FEATURED.left}%`, top: `${FEATURED.top}%` }}
          aria-label={`${FEATURED.name}, ${FEATURED.metier}`}
        >
          <span className="nearby-map-card__pin-pulse" aria-hidden="true" />
          <div className="nearby-map-card__mini-profil nearby-map-card__mini-profil--featured">
            <span className="nearby-map-card__mini-avatar">
              <Avatar src={getArtisanAvatarUrl(FEATURED.id, 64)} initiales="PG" />
            </span>
            <div className="nearby-map-card__mini-info">
              <span className="nearby-map-card__mini-name">{FEATURED.name}</span>
              <span className="nearby-map-card__mini-meta">{FEATURED.metier} {METIER_EMOJI[FEATURED.metier] ?? '🚗'} · {FEATURED.distance}</span>
              <span className="nearby-map-card__mini-note">★ {FEATURED.note}</span>
            </div>
          </div>
          <span className="nearby-map-card__pin-dot nearby-map-card__pin-dot--featured" aria-hidden="true" />
        </Link>
      </div>

      <div className="nearby-map-card__cta">
        <span className="nearby-map-card__count">{ONLINE_COUNT} artisans à proximité</span>
        <Link to="/carte" className="nearby-map-card__btn">
          <MapPin size={18} strokeWidth={2} />
          Voir la carte
        </Link>
      </div>
    </div>
  );
}
