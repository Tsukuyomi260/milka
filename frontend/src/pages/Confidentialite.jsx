import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function Confidentialite() {
  return (
    <Layout>
      <Link to="/profil" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Retour
      </Link>
      <div className="legal-page">
        <h1>Politique de confidentialité & protection des données</h1>
        <p><strong>Dernière mise à jour :</strong> février 2025</p>

        <h2>1. Responsable du traitement</h2>
        <p>Milka est une plateforme de mise en relation artisans–clients. Le responsable du traitement des données personnelles est l’entité éditrice de l’application Milka.</p>

        <h2>2. Données collectées</h2>
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du service :</p>
        <ul>
          <li>Données d’identification (nom, prénom, email, téléphone) pour les comptes utilisateurs et artisans.</li>
          <li>Données de localisation (avec votre consentement) pour afficher les artisans proches et la carte.</li>
          <li>Données de navigation et cookies (voir section Cookies), avec votre consentement.</li>
        </ul>

        <h2>3. Finalités et bases légales</h2>
        <p>Les données sont traitées pour : mise en relation, notation et avis, gestion des demandes et rendez-vous, amélioration du service. Les bases légales sont l’exécution du contrat, votre consentement (géolocalisation, cookies) et notre intérêt légitime (sécurité, statistiques agrégées).</p>

        <h2>4. Durée de conservation</h2>
        <p>Les données sont conservées pendant la durée du compte et, après clôture, pendant les délais légaux (comptabilité, litiges). Les logs et données techniques sont limités dans le temps.</p>

        <h2>5. Vos droits (RGPD)</h2>
        <p>Conformément au Règlement général sur la protection des données (RGPD), vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Accès</strong> : obtenir une copie de vos données personnelles.</li>
          <li><strong>Rectification</strong> : faire corriger des données inexactes.</li>
          <li><strong>Effacement</strong> : demander la suppression de vos données (« droit à l’oubli »).</li>
          <li><strong>Limitation</strong> : demander la limitation du traitement dans certains cas.</li>
          <li><strong>Portabilité</strong> : recevoir vos données dans un format structuré.</li>
          <li><strong>Opposition</strong> : vous opposer à un traitement fondé sur l’intérêt légitime.</li>
          <li><strong>Retirer votre consentement</strong> à tout moment pour les traitements fondés sur le consentement.</li>
        </ul>
        <p>Pour exercer ces droits : contactez-nous via l’app (Profil → Confidentialité) ou par email. Vous pouvez également introduire une réclamation auprès de l’autorité de contrôle de votre pays (CNIL en France).</p>

        <h2>6. Sécurité</h2>
        <p>Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données (accès limité, chiffrement, hébergement sécurisé).</p>

        <h2>7. Cookies et traceurs</h2>
        <p>Des cookies ou traceurs peuvent être utilisés pour le fonctionnement du site, la mesure d’audience et les préférences. Vous pouvez gérer vos choix via le bandeau de consentement et dans les paramètres de votre navigateur.</p>

        <h2>8. Modifications</h2>
        <p>Toute modification substantielle de cette politique sera portée à votre connaissance (notification in-app ou par email) et publiée sur cette page.</p>

        <p><Link to="/profil">Retour au profil</Link></p>
      </div>
    </Layout>
  );
}
