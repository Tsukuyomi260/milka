import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { useI18n } from '../i18n';

export default function Inscription() {
  const { t } = useI18n();

  return (
    <Layout>
      <Link
        to="/connexion"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={20} /> {t('auth.back')}
      </Link>
      <div className="glass-card glass-card-strong" style={{ padding: 28, maxWidth: 360, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.4rem', margin: '0 0 8px 0' }}>{t('auth.registerTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 24px 0', fontSize: '0.9rem' }}>
          {t('auth.registerSubtitle')}
        </p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {t('auth.name')}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t('auth.namePlaceholder')}
            required
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
          <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {t('auth.email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            required
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
          <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {t('auth.password')}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
            required
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
          <button type="submit" className="btn-primary" style={{ marginTop: 8 }}>
            {t('auth.registerSubmit')}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {t('auth.haveAccount')}{' '}
          <Link to="/connexion">{t('auth.loginLink')}</Link>
        </p>
      </div>
    </Layout>
  );
}
