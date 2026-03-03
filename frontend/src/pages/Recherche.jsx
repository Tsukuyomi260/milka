import { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import { useI18n } from '../i18n';

export default function Recherche() {
  const [query, setQuery] = useState('');
  const { t } = useI18n();

  return (
    <Layout>
      <div className="glass-card" style={{ padding: 12, marginBottom: 20 }}>
        <label htmlFor="search-input" className="visually-hidden">
          {t('search.label')}
        </label>
        <input
          id="search-input"
          type="search"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid var(--glass-border)',
            background: 'rgba(255,255,255,0.5)',
          }}
          autoFocus
        />
      </div>
      <div className="empty-state glass-card" style={{ padding: 48 }}>
        <Search size={64} strokeWidth={1.5} />
        <p>{t('search.empty')}</p>
      </div>
    </Layout>
  );
}
