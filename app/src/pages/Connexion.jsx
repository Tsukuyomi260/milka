import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function Connexion() {
  return (
    <Layout>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Retour
      </Link>
      <div className="glass-card glass-card-strong" style={{ padding: 28, maxWidth: 360, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.4rem', margin: '0 0 8px 0' }}>Connexion</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 24px 0', fontSize: '0.9rem' }}>
          Accédez à votre compte pour gérer vos demandes et favoris.
        </p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>Se connecter</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Pas de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </div>
    </Layout>
  );
}
