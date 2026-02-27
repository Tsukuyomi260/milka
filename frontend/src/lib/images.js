/**
 * Images d'artisans : personnes à l'apparence africaine / béninoise,
 * photos de profil cohérentes avec le métier.
 * Sources : Pexels (licence gratuite).
 * En prod : remplacer par vos URLs (Supabase Storage, etc.).
 */

const PEXELS = 'https://images.pexels.com/photos';

function pexels(id, w = 400) {
  return `${PEXELS}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

/** Par métier : avatar (portrait) et hero (scène de travail) */
const PAR_METIER = {
  Mécanicien: {
    avatar: pexels(1099957, 256),   // Homme africain, portrait (Kenya)
    hero: pexels(3846390, 600),    // Mécanicien au travail, atelier
  },
  Coiffeuse: {
    avatar: pexels(10919399, 256), // Femme aux tresses (Johannesburg)
    hero: pexels(10919399, 600),   // Même scène coiffure / beauté
  },
  Garagiste: {
    avatar: pexels(4559597, 256),  // Homme africain, professionnel
    hero: pexels(3846390, 600),     // Atelier / réparation auto
  },
  Vulcanisateur: {
    avatar: pexels(1099957, 256),  // Homme africain
    hero: pexels(3846390, 600),    // Atelier mécanique / pneus
  },
  Électricien: {
    avatar: pexels(4559597, 256),  // Homme africain
    hero: pexels(3846390, 600),    // Atelier / travail technique
  },
};

/** Données des artisans (id → métier pour récupérer les bonnes images) */
const ARTISANS_METIER = {
  '1': 'Mécanicien',   // Jean Kouassi
  '2': 'Coiffeuse',    // Marie Adjo
  '3': 'Garagiste',    // Pascal Garage
  '4': 'Vulcanisateur', // Combi Pneus
  '5': 'Électricien',  // Électricité Pro
};

/** Avatar artisan : photo cohérente avec son métier (personnes à l'apparence africaine) */
export function getArtisanAvatarUrl(id, size = 128) {
  const metier = ARTISANS_METIER[id];
  const def = PAR_METIER.Mécanicien;
  return (metier && PAR_METIER[metier]) ? PAR_METIER[metier].avatar : def?.avatar ?? null;
}

/** Image de fond pour les grandes cartes "près de vous" : scène du métier */
export function getHeroImageUrl(id, width = 400, height = 300) {
  const metier = ARTISANS_METIER[id];
  const def = PAR_METIER.Mécanicien;
  return (metier && PAR_METIER[metier]) ? PAR_METIER[metier].hero : (def?.hero ?? null);
}

/** Image de fond pour le bandeau profil (Afrique / vie urbaine) */
export function getProfileCoverUrl() {
  return pexels(13786953, 1200); // Femme africaine, lumière (Nigeria)
}
