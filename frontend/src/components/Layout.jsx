import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Heart, CircleUser, Bell, Search } from 'lucide-react';
import { useI18n } from '../i18n';

const DOCK_ITEMS = [
  { path: '/', icon: Home, labelKey: 'nav.home' },
  { path: '/carte', icon: MapPin, labelKey: 'nav.map' },
  { path: '/favoris', icon: Heart, labelKey: 'nav.favorites' },
  { path: '/profil', icon: CircleUser, labelKey: 'nav.profile' },
];

function getDockActiveIndex(pathname) {
  if (pathname === '/') return 0;
  if (pathname.startsWith('/carte')) return 1;
  if (pathname.startsWith('/favoris')) return 2;
  if (
    pathname.startsWith('/profil') ||
    pathname.startsWith('/parametres') ||
    pathname.startsWith('/confidentialite') ||
    pathname.startsWith('/cgu')
  ) {
    return 3;
  }
  return 0;
}

export default function Layout({ children, showFilterBar = false, showFab = false, fabIcon: FabIcon, onFabClick }) {
  const location = useLocation();
  const activeIndex = getDockActiveIndex(location.pathname);
  const { t } = useI18n();

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo" aria-hidden="true">M</div>
          <h1 className="app-header-title">Milka</h1>
        </div>
        <div className="app-header-actions">
          <Link to="/recherche" aria-label="Rechercher">
            <Search size={22} strokeWidth={2} />
          </Link>
          <Link to="/notifications" aria-label="Notifications">
            <Bell size={22} strokeWidth={2} />
          </Link>
          <Link to="/profil" aria-label="Profil">
            <CircleUser size={22} strokeWidth={2} />
          </Link>
        </div>
      </header>

      {showFilterBar && (
        <div className="filter-bar">
          <button type="button" className="filter-pill active">Tous <span>12</span></button>
          <button type="button" className="filter-pill">Mécaniciens <span>4</span></button>
          <button type="button" className="filter-pill">Coiffeurs <span>3</span></button>
          <button type="button" className="filter-pill">Vulcanisateurs <span>2</span></button>
          <button type="button" className="filter-pill">Garagistes <span>3</span></button>
        </div>
      )}

      <main className="main-content">
        {children}
      </main>

      {createPortal(
        <>
          {showFab && FabIcon && (
            <button type="button" className="fab" onClick={onFabClick} aria-label="Nouvelle demande">
              <FabIcon size={26} strokeWidth={2.5} />
            </button>
          )}
          <nav className="dock" aria-label="Navigation principale">
          <div className="dock-items">
            <span
              className="dock-pill"
              style={{ '--dock-active-index': activeIndex }}
              aria-hidden="true"
            />
            {DOCK_ITEMS.map(({ path, icon: Icon, labelKey }) => {
              let isActive;
              if (path === '/') {
                isActive = location.pathname === '/';
              } else if (path === '/profil') {
                isActive = ['/profil', '/parametres', '/confidentialite', '/cgu'].some((p) =>
                  location.pathname.startsWith(p),
                );
              } else {
                isActive = location.pathname.startsWith(path);
              }
              const label = t(labelKey);
              return (
                <Link
                  key={path}
                  to={path}
                  className={`dock-item ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={label}
                >
                  <span className="dock-item__icon">
                    <Icon size={24} strokeWidth={2} />
                  </span>
                  <span className="dock-item__label">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        </>,
        document.body
      )}
    </div>
  );
}
