import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import CookieConsent from './components/CookieConsent';
import Accueil from './pages/Accueil';
import Carte from './pages/Carte';
import Demandes from './pages/Demandes';
import Profil from './pages/Profil';
import ArtisanDetail from './pages/ArtisanDetail';
import Recherche from './pages/Recherche';
import Confidentialite from './pages/Confidentialite';
import CGU from './pages/CGU';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Parametres from './pages/Parametres';
import Favoris from './pages/Favoris';
import Notifications from './pages/Notifications';
import { UiProvider } from './context/UIContext';
import './index.css';

const routes = [
  { path: '/', element: <Accueil /> },
  { path: '/connexion', element: <Connexion /> },
  { path: '/inscription', element: <Inscription /> },
  { path: '/carte', element: <Carte /> },
  { path: '/parametres', element: <Parametres /> },
  { path: '/demandes', element: <Demandes /> },
  { path: '/profil', element: <Profil /> },
  { path: '/artisan/:id', element: <ArtisanDetail /> },
  { path: '/recherche', element: <Recherche /> },
  { path: '/favoris', element: <Favoris /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/confidentialite', element: <Confidentialite /> },
  { path: '/cgu', element: <CGU /> },
];

function AnimatedRoutes() {
  const location = useLocation();
  const element = useRoutes(routes);
  return (
    <div key={location.pathname} className="page-transition">
      {element}
    </div>
  );
}

export default function App() {
  return (
    <UiProvider>
      <BrowserRouter>
        <AnimatedRoutes />
        <CookieConsent />
      </BrowserRouter>
    </UiProvider>
  );
}
