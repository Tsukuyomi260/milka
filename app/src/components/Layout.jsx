import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Settings, CircleUser, Bell, Search } from 'lucide-react';

const DOCK_ITEMS = [
  { path: '/', icon: Home },
  { path: '/carte', icon: MapPin },
  { path: '/parametres', icon: Settings },
  { path: '/profil', icon: CircleUser },
];

function getDockActiveIndex(pathname) {
  if (pathname === '/') return 0;
  if (pathname.startsWith('/carte')) return 1;
  if (pathname.startsWith('/parametres')) return 2;
  if (pathname.startsWith('/profil')) return 3;
  return 0;
}

export default function Layout({ children, showFilterBar = false, showFab = false, fabIcon: FabIcon, onFabClick }) {
  const location = useLocation();
  const activeIndex = getDockActiveIndex(location.pathname);

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

      {showFab && FabIcon && (
        <button type="button" className="fab" onClick={onFabClick} aria-label="Nouvelle demande">
          <FabIcon size={26} strokeWidth={2.5} />
        </button>
      )}

      <nav className="dock" aria-label="Navigation principale">
        <span
          className="dock-pill"
          style={{ '--dock-active-index': activeIndex }}
          aria-hidden="true"
        />
        <div className="dock-items">
          {DOCK_ITEMS.map(({ path, icon: Icon }) => {
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className={`dock-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={26} strokeWidth={2} />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
