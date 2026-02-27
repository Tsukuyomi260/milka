import { MapPin } from 'lucide-react';
import Layout from '../components/Layout';

export default function Carte() {
  return (
    <Layout>
      <div className="glass-card glass-card-strong" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <MapPin size={56} strokeWidth={1.5} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
        <h2 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>Carte des artisans</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Géolocalisez les artisans autour de vous. La carte sera connectée au backend pour afficher les professionnels en temps réel.
        </p>
      </div>
    </Layout>
  );
}
