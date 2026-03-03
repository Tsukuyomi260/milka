import { Component } from 'react';
import { useI18n } from '../i18n';

function ErrorContent({ error }) {
  const { t } = useI18n();

  return (
    <div
      style={{
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
        color: '#1d1d1f',
        background: '#f5f5f7',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#F40009', marginTop: 0 }}>{t('error.title')}</h1>
      <p>
        <strong>{error?.message || t('error.generic')}</strong>
      </p>
      <pre style={{ background: '#fff', padding: 16, overflow: 'auto', fontSize: 12 }}>{error?.stack}</pre>
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{ padding: '12px 24px', background: '#F40009', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
      >
        {t('error.reload')}
      </button>
    </div>
  );
}

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorContent error={this.state.error} />;
    }
    return this.props.children;
  }
}
