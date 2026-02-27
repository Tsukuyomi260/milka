import { Component } from 'react';

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
      return (
        <div style={{
          padding: 24,
          fontFamily: 'system-ui, sans-serif',
          color: '#1d1d1f',
          background: '#f5f5f7',
          minHeight: '100vh',
        }}>
          <h1 style={{ color: '#F40009', marginTop: 0 }}>Erreur</h1>
          <p><strong>{this.state.error?.message || 'Une erreur est survenue.'}</strong></p>
          <pre style={{ background: '#fff', padding: 16, overflow: 'auto', fontSize: 12 }}>
            {this.state.error?.stack}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ padding: '12px 24px', background: '#F40009', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
