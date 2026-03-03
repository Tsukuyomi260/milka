import { useUi } from './context/UIContext'

const MESSAGES = {
  fr: {
    'nav.home': 'Accueil',
    'nav.map': 'Carte',
    'nav.favorites': 'Favoris',
    'nav.profile': 'Profil',

    'home.yourArtisans': 'Vos artisans',
    'home.nearbyArtisans': 'Artisans près de vous',
    'home.popular': 'Populaires',
    'home.nearby.liveBadge': '{count} artisans en ligne',
    'home.nearby.count': '{count} artisans à proximité',
    'home.nearby.viewMap': 'Voir la carte',

    'requests.title': 'Mes demandes',
    'requests.emptyTitle': 'Aucune demande',
    'requests.emptyText': 'Vos prises de contact et rendez-vous apparaîtront ici.',

    'favorites.title': 'Favoris',
    'favorites.emptyTitle': 'Aucun favori',
    'favorites.emptyText': 'Enregistrez vos artisans préférés pour y accéder rapidement.',
    'favorites.discover': 'Découvrir',

    'notifications.title': 'Notifications',
    'notifications.emptyTitle': 'Aucune notification',
    'notifications.emptyText': 'Les alertes et rappels apparaîtront ici.',

    'profile.title': 'Mon compte',
    'profile.handle': '@utilisateur',
    'profile.bio': 'Connectez-vous pour gérer vos demandes, favoris et avis laissés aux artisans.',
    'profile.stats.requests': 'Demandes',
    'profile.stats.favorites': 'Favoris',
    'profile.stats.reviews': 'Avis',
    'profile.tags.favorites': 'Favoris',
    'profile.tags.requests': 'Demandes',
    'profile.tags.login': 'Connexion',
    'profile.tags.register': 'Créer un compte',
    'profile.privacy': 'Confidentialité & données',
    'profile.settings': 'Paramètres',
    'profile.terms': "Conditions d'utilisation",

    'settings.title': 'Paramètres',
    'settings.notifications': 'Notifications',
    'settings.notificationsDesc': 'Alertes et rappels de rendez-vous',
    'settings.privacy': 'Confidentialité',
    'settings.privacyDesc': 'Données personnelles et RGPD',
    'settings.appearance': 'Apparence',
    'settings.appearanceDesc': 'Mode clair ou sombre',
    'settings.language': 'Langue',
    'settings.languageDesc': 'Choisissez la langue de l’interface',
    'settings.help': 'Aide & CGU',
    'settings.helpDesc': 'Conditions et support',
    'settings.light': 'Clair',
    'settings.dark': 'Sombre',
    'settings.french': 'Français',
    'settings.english': 'Anglais',

    'map.title': 'Carte des artisans',
    'map.subtitle': 'Visualisez les artisans disponibles autour de vous. Les données sont simulées pour le moment en attendant le backend.',

    'search.placeholder': "Métier, nom d'artisan...",
    'search.label': 'Rechercher un artisan ou un métier',
    'search.empty': 'Saisissez un métier ou un nom pour trouver des artisans.',

    'auth.loginTitle': 'Connexion',
    'auth.loginSubtitle': 'Accédez à votre compte pour gérer vos demandes et favoris.',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.loginSubmit': 'Se connecter',
    'auth.noAccount': 'Pas de compte ?',
    'auth.registerLink': 'Créer un compte',

    'auth.registerTitle': 'Créer un compte',
    'auth.registerSubtitle': 'Inscrivez-vous pour contacter des artisans et enregistrer vos favoris.',
    'auth.name': 'Nom',
    'auth.namePlaceholder': 'Votre nom',
    'auth.emailPlaceholder': 'votre@email.com',
    'auth.passwordPlaceholder': '••••••••',
    'auth.registerSubmit': 'Créer mon compte',
    'auth.haveAccount': 'Déjà un compte ?',
    'auth.loginLink': 'Se connecter',
    'auth.back': 'Retour',

    'artisan.back': 'Retour',
    'artisan.notFound': 'Artisan introuvable.',
    'artisan.backHome': "Retour à l'accueil",
    'artisan.reviewsCount': '{count} avis',
    'artisan.contact': 'Contacter',
    'artisan.appointment': 'Rendez-vous',

    'legal.back': 'Retour',
    'legal.backProfile': 'Retour au profil',

    'cookies.dialogLabel': 'Consentement cookies',
    'cookies.text':
      'Nous utilisons des cookies pour le fonctionnement du site et, avec votre accord, pour mesurer l’audience. Vos données sont protégées conformément à notre politique de confidentialité (RGPD).',
    'cookies.policy': 'politique de confidentialité',
    'cookies.acceptAll': 'Tout accepter',
    'cookies.essentialsOnly': 'Essentiels uniquement',

    'error.title': 'Erreur',
    'error.generic': 'Une erreur est survenue.',
    'error.reload': 'Recharger la page',
  },
  en: {
    'nav.home': 'Home',
    'nav.map': 'Map',
    'nav.favorites': 'Favorites',
    'nav.profile': 'Profile',

    'home.yourArtisans': 'Your artisans',
    'home.nearbyArtisans': 'Artisans near you',
    'home.popular': 'Popular',
    'home.nearby.liveBadge': '{count} artisans online',
    'home.nearby.count': '{count} artisans nearby',
    'home.nearby.viewMap': 'View map',

    'requests.title': 'My requests',
    'requests.emptyTitle': 'No request',
    'requests.emptyText': 'Your contacts and appointments will appear here.',

    'favorites.title': 'Favorites',
    'favorites.emptyTitle': 'No favorite',
    'favorites.emptyText': 'Save your favorite artisans for quick access.',
    'favorites.discover': 'Discover',

    'notifications.title': 'Notifications',
    'notifications.emptyTitle': 'No notification',
    'notifications.emptyText': 'Alerts and reminders will appear here.',

    'profile.title': 'My account',
    'profile.handle': '@user',
    'profile.bio': 'Log in to manage your requests, favorites and reviews.',
    'profile.stats.requests': 'Requests',
    'profile.stats.favorites': 'Favorites',
    'profile.stats.reviews': 'Reviews',
    'profile.tags.favorites': 'Favorites',
    'profile.tags.requests': 'Requests',
    'profile.tags.login': 'Login',
    'profile.tags.register': 'Create account',
    'profile.privacy': 'Privacy & data',
    'profile.settings': 'Settings',
    'profile.terms': 'Terms of use',

    'settings.title': 'Settings',
    'settings.notifications': 'Notifications',
    'settings.notificationsDesc': 'Alerts and appointment reminders',
    'settings.privacy': 'Privacy',
    'settings.privacyDesc': 'Personal data and GDPR',
    'settings.appearance': 'Appearance',
    'settings.appearanceDesc': 'Light or dark mode',
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose the app language',
    'settings.help': 'Help & Terms',
    'settings.helpDesc': 'Terms and support',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.french': 'French',
    'settings.english': 'English',

    'map.title': 'Artisans map',
    'map.subtitle': 'See available artisans around you. Data is simulated for now while we connect the backend.',

    'search.placeholder': 'Trade, artisan name...',
    'search.label': 'Search for an artisan or trade',
    'search.empty': 'Type a trade or a name to find artisans.',

    'auth.loginTitle': 'Login',
    'auth.loginSubtitle': 'Access your account to manage your requests and favorites.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loginSubmit': 'Sign in',
    'auth.noAccount': 'No account yet?',
    'auth.registerLink': 'Create an account',

    'auth.registerTitle': 'Create an account',
    'auth.registerSubtitle': 'Sign up to contact artisans and save your favorites.',
    'auth.name': 'Name',
    'auth.namePlaceholder': 'Your name',
    'auth.emailPlaceholder': 'you@email.com',
    'auth.passwordPlaceholder': '••••••••',
    'auth.registerSubmit': 'Create my account',
    'auth.haveAccount': 'Already have an account?',
    'auth.loginLink': 'Sign in',
    'auth.back': 'Back',

    'artisan.back': 'Back',
    'artisan.notFound': 'Artisan not found.',
    'artisan.backHome': 'Back to home',
    'artisan.reviewsCount': '{count} reviews',
    'artisan.contact': 'Contact',
    'artisan.appointment': 'Appointment',

    'legal.back': 'Back',
    'legal.backProfile': 'Back to profile',

    'cookies.dialogLabel': 'Cookie consent',
    'cookies.text':
      'We use cookies for the proper functioning of the site and, with your consent, for audience measurement. Your data is protected in accordance with our privacy policy (GDPR).',
    'cookies.policy': 'privacy policy',
    'cookies.acceptAll': 'Accept all',
    'cookies.essentialsOnly': 'Essentials only',

    'error.title': 'Error',
    'error.generic': 'An error has occurred.',
    'error.reload': 'Reload page',
  },
}

function formatMessage(template, params) {
  if (!params) return template
  return Object.keys(params).reduce((acc, key) => acc.replaceAll(`{${key}}`, String(params[key])), template)
}

export function useI18n() {
  const { language } = useUi()
  const dict = MESSAGES[language] || MESSAGES.fr

  const t = (key, params) => {
    const base = dict[key] ?? MESSAGES.fr[key] ?? key
    return formatMessage(base, params)
  }

  return { t, lang: language }
}

