import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function CGU() {
  return (
    <Layout>
      <Link to="/profil" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Retour
      </Link>
      <div className="legal-page">
        <h1>Conditions générales d'utilisation (CGU)</h1>
        <p><strong>Dernière mise à jour :</strong> février 2025</p>

        <h2>1. Objet</h2>
        <p>Les présentes CGU régissent l’accès et l’utilisation de l’application Milka, plateforme de mise en relation entre clients et artisans.</p>

        <h2>2. Acceptation</h2>
        <p>L’utilisation de Milka implique l’acceptation des présentes CGU et de la politique de confidentialité. En cas de désaccord, merci de ne pas utiliser le service.</p>

        <h2>3. Description du service</h2>
        <p>Milka permet de rechercher des artisans par métier et localisation, de consulter leurs profils, notes et avis, et de les contacter ou de prendre rendez-vous. Les artisans peuvent s’inscrire et gérer leur visibilité via des abonnements.</p>

        <h2>4. Compte utilisateur</h2>
        <p>Vous vous engagez à fournir des informations exactes et à maintenir la confidentialité de vos identifiants. Vous êtes responsable des actions effectuées depuis votre compte.</p>

        <h2>5. Comportement attendu</h2>
        <p>Il est interdit d’utiliser Milka à des fins illégales, frauduleuses ou abusives (contenu trompeur, harcèlement, spam). Nous nous réservons le droit de suspendre ou supprimer tout compte en violation.</p>

        <h2>6. Contenu et avis</h2>
        <p>Les avis et contenus publiés doivent être sincères et respectueux. Milka se réserve le droit de modérer ou supprimer tout contenu contraire à la charte ou à la loi.</p>

        <h2>7. Propriété intellectuelle</h2>
        <p>L’application, son design, son code et la marque Milka sont protégés. Toute reproduction ou utilisation non autorisée est interdite.</p>

        <h2>8. Limitation de responsabilité</h2>
        <p>Milka met en relation utilisateurs et artisans mais n’est pas partie aux prestations réalisées entre eux. La responsabilité de Milka est limitée au fonctionnement de la plateforme.</p>

        <h2>9. Modifications</h2>
        <p>Les CGU peuvent évoluer. Les utilisateurs seront informés des changements importants ; la poursuite de l’utilisation vaut acceptation des nouvelles conditions.</p>

        <h2>10. Droit applicable et litiges</h2>
        <p>Le droit applicable et le tribunal compétent sont ceux du pays du siège de l’éditeur, sauf dispositions impératives contraires.</p>

        <p><Link to="/profil">Retour au profil</Link></p>
      </div>
    </Layout>
  );
}
