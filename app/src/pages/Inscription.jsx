import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function Inscription() {
  return (
    <Layout>
      <Link to="/connexion" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Retour
      </Link>
      <div className="glass-card glass-card-strong" style={{ padding: 28, maxWidth: 360, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.4rem', margin: '0 0 8px 0' }}>Créer un compte</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 24px 0', fontSize: '0.9rem' }}>
          Inscrivez-vous pour contacter des artisans et enregistrer vos favoris.
        </p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Nom</label>
          <input
            id="name"
            type="text"
            placeholder="Votre nom"
            required
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
          <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            required
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
          <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
          <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>Créer mon compte</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </div>
    </Layout>
  );
}
