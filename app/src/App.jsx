import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/demandes" element={<Demandes />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/cgu" element={<CGU />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}
