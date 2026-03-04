import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { MapPin } from 'lucide-react'
import Layout from '../components/Layout'
import { useI18n } from '../i18n'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

// Données artisans enrichies (proches du workflow maquette)
const ARTISANS = [
  {
    id: 1,
    nom: 'Aïcha Beauté',
    metier: 'Coiffeuse',
    emoji: '✂️',
    note: 4.9,
    avis: 128,
    distance: '320m',
    temps: '5 min',
    prix: '2 000 – 8 000 FCFA',
    disponible: true,
    featured: true,
    bio: 'Spécialiste tresses africaines et soins capillaires depuis 12 ans. Reconnue pour sa précision et son accueil.',
    services: ['Tresses', 'Défrisage', 'Soins', 'Coupe'],
    horaires: 'Lun–Sam · 8h–19h',
    photos: ['#F9C6C6', '#FADADD', '#F7B2B7'],
    phone: '+229 64 00 00 01',
    // Environs de Cotonou (approx)
    lng: 2.4267,
    lat: 6.37,
    reviews: [
      { auteur: 'Marie K.', note: 5, texte: 'Excellent travail, très propre !', date: 'Il y a 2j' },
      { auteur: 'Fatou D.', note: 5, texte: 'Je recommande vivement, très pro.', date: 'Il y a 5j' },
    ],
  },
  {
    id: 2,
    nom: 'Pascal Garage',
    metier: 'Garagiste',
    emoji: '🔧',
    note: 4.6,
    avis: 89,
    distance: '650m',
    temps: '9 min',
    prix: '5 000 – 50 000 FCFA',
    disponible: true,
    featured: false,
    bio: "Mécanicien expert toutes marques. Diagnostic rapide, pièces d'origine garanties.",
    services: ['Vidange', 'Freins', 'Climatisation', 'Diagnostic'],
    horaires: 'Lun–Sam · 7h–18h',
    photos: ['#C6D9F9', '#B8CFF0', '#A8C2E8'],
    phone: '+229 64 00 00 02',
    lng: 2.434,
    lat: 6.373,
    reviews: [
      { auteur: 'Jean P.', note: 5, texte: 'Rapide et honnête. Prix corrects.', date: 'Il y a 1j' },
      { auteur: 'Koffi A.', note: 4, texte: 'Bon travail mais attente un peu longue.', date: 'Il y a 1 sem' },
    ],
  },
  {
    id: 3,
    nom: 'Combi Pneus',
    metier: 'Vulcanisateur',
    emoji: '🛞',
    note: 4.7,
    avis: 203,
    distance: '1.1km',
    temps: '14 min',
    prix: '1 000 – 15 000 FCFA',
    disponible: false,
    featured: false,
    bio: 'Vulcanisation express, montage et équilibrage. Ouvert 7j/7.',
    services: ['Vulcanisation', 'Montage', 'Équilibrage', 'Gonflage'],
    horaires: 'Lun–Dim · 6h30–21h',
    photos: ['#C6F9D2', '#B8F0C2', '#A8E8B2'],
    phone: '+229 64 00 00 03',
    lng: 2.418,
    lat: 6.365,
    reviews: [{ auteur: 'Ama S.', note: 5, texte: 'Service ultra rapide, merci !', date: 'Il y a 3j' }],
  },
  {
    id: 4,
    nom: 'Électro Plus',
    metier: 'Électricien',
    emoji: '⚡',
    note: 4.5,
    avis: 56,
    distance: '800m',
    temps: '11 min',
    prix: '3 000 – 30 000 FCFA',
    disponible: true,
    featured: false,
    bio: 'Installation électrique, dépannage et maintenance. Certifié.',
    services: ['Installation', 'Dépannage', 'Maintenance', 'Climatisation'],
    horaires: 'Lun–Ven · 8h–18h',
    photos: ['#FFF3C6', '#FFEDB8', '#FFE5A8'],
    phone: '+229 64 00 00 04',
    lng: 2.422,
    lat: 6.377,
    reviews: [
      { auteur: 'Claire M.', note: 4, texte: 'Compétent, je referai appel à lui.', date: 'Il y a 2 sem' },
    ],
  },
]

const JOURS = ['Lun 3', 'Mar 4', 'Mer 5', 'Jeu 6', 'Ven 7', 'Sam 8']
const HEURES = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

function Stars({ note, size = 12 }) {
  const full = Math.floor(note)
  return (
    <span style={{ color: '#FFB800', fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </span>
  )
}

function DispoBadge({ disponible }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: disponible ? '#E8F8EE' : '#F5F5F5',
        color: disponible ? '#1DB954' : '#999',
        fontSize: 11,
        fontWeight: 700,
        padding: '3px 9px',
        borderRadius: 50,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: disponible ? '#1DB954' : '#ccc',
          display: 'inline-block',
        }}
      />
      {disponible ? 'Disponible' : 'Fermé'}
    </span>
  )
}

function BottomSheet({ state, children }) {
  const heights = { hidden: 0, peek: 130, mid: 260, full: '80%' }
  const h = heights[state] ?? 0

  if (state === 'hidden') return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderRadius: '20px 20px 0 0',
        height: h,
        transition: 'height 0.32s cubic-bezier(.32,.72,0,1)',
        boxShadow: '0 -12px 40px rgba(15,23,42,0.35)',
        zIndex: 30,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 34, height: 4, background: '#E0E0E0', borderRadius: 999 }} />
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 0 16px' }}>{children}</div>
    </div>
  )
}

function PreviewContent({ artisan, onClose, onVoirProfil, onCall, onDirections }) {
  return (
    <div style={{ padding: '6px 16px 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${artisan.photos[0]}, ${artisan.photos[1]})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
              border: artisan.disponible ? '2.5px solid #1DB954' : '2.5px solid #E0E0E0',
            }}
          >
            {artisan.emoji}
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: '#1A1A1A',
                letterSpacing: -0.3,
              }}
            >
              {artisan.nom}
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>{artisan.metier}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
              <Stars note={artisan.note} size={11} />
              <span style={{ fontSize: 11, color: '#999' }}>
                {artisan.note} · {artisan.distance}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <DispoBadge disponible={artisan.disponible} />
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#F2F2F7',
              border: 'none',
              borderRadius: 50,
              width: 28,
              height: 28,
              cursor: 'pointer',
              fontSize: 14,
              color: '#666',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { icon: '🕐', label: artisan.temps },
          { icon: '💰', label: artisan.prix },
          { icon: '⭐', label: `${artisan.avis} avis` },
        ].map(({ icon, label }) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: '#F5F5F5',
              borderRadius: 12,
              padding: '8px 6px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16 }}>{icon}</div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: '#555',
                marginTop: 2,
                lineHeight: 1.3,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button
          type="button"
          onClick={onCall}
          style={{
            flex: 1,
            padding: '12px',
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            color: '#1A1A1A',
            cursor: 'pointer',
          }}
        >
          📞 Appeler
        </button>
        <button
          type="button"
          onClick={onVoirProfil}
          style={{
            flex: 2,
            padding: '12px',
            background: '#E8262A',
            border: 'none',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 3px 12px rgba(232,38,42,0.3)',
          }}
        >
          Voir le profil →
        </button>
      </div>

      <div style={{ marginTop: 8 }}>
        <button
          type="button"
          onClick={onDirections}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            color: '#1A1A1A',
            cursor: 'pointer',
          }}
        >
          🧭 Démarrer l’itinéraire
        </button>
      </div>
    </div>
  )
}

function ProfilContent({ artisan, onClose, onRdv, onCall, onDirections }) {
  const [tab, setTab] = useState('infos')

  return (
    <div>
      <div
        style={{
          padding: '6px 16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 50,
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#666',
          }}
        >
          ✕
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Profil</span>
        <button
          type="button"
          style={{
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 50,
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          ♡
        </button>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${artisan.photos[0]}, ${artisan.photos[1]})`,
            borderRadius: 20,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 52,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {artisan.emoji}
          {artisan.featured && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: '#E8262A',
                color: 'white',
                fontSize: 10,
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 50,
                letterSpacing: 0.5,
              }}
            >
              TOP
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#1A1A1A',
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              {artisan.nom}
            </h2>
            <p style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{artisan.metier}</p>
          </div>
          <DispoBadge disponible={artisan.disponible} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <Stars note={artisan.note} size={13} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{artisan.note}</span>
          <span style={{ fontSize: 12, color: '#AAA' }}>({artisan.avis} avis)</span>
          <span style={{ fontSize: 12, color: '#CCC' }}>·</span>
          <span style={{ fontSize: 12, color: '#888' }}>📍 {artisan.distance}</span>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: '#FFF0F0',
            borderRadius: 8,
            padding: '4px 10px',
            marginTop: 8,
            fontSize: 12,
            fontWeight: 600,
            color: '#E8262A',
          }}
        >
          💰 {artisan.prix}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 0,
          margin: '14px 16px 0',
          background: '#F2F2F7',
          borderRadius: 12,
          padding: 3,
        }}
      >
        {['infos', 'services', 'avis'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '7px 0',
              background: tab === t ? 'white' : 'transparent',
              border: 'none',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: tab === t ? 700 : 500,
              color: tab === t ? '#1A1A1A' : '#888',
              cursor: 'pointer',
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {t === 'infos' ? 'À propos' : t === 'services' ? 'Services' : 'Avis'}
          </button>
        ))}
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        {tab === 'infos' && (
          <div>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{artisan.bio}</p>
            <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666' }}>
                🕐 <span>{artisan.horaires}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666' }}>
                🚶 <span>{artisan.temps} à pied</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'services' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {artisan.services.map((s) => (
              <span
                key={s}
                style={{
                  background: '#F5F5F5',
                  borderRadius: 50,
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#333',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {tab === 'avis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {artisan.reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  background: '#F9F9F9',
                  borderRadius: 14,
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{r.auteur}</span>
                  <span style={{ fontSize: 11, color: '#BBB' }}>{r.date}</span>
                </div>
                <Stars note={r.note} size={11} />
                <p
                  style={{
                    fontSize: 12,
                    color: '#666',
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {r.texte}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '20px 16px 0', display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={onCall}
          style={{
            flex: 1,
            padding: '14px',
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            color: '#1A1A1A',
            cursor: 'pointer',
          }}
        >
          📞 Appeler
        </button>
        <button
          type="button"
          onClick={onRdv}
          style={{
            flex: 2,
            padding: '14px',
            background: '#E8262A',
            border: 'none',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(232,38,42,0.3)',
          }}
        >
          📅 Prendre RDV
        </button>
      </div>

      <div style={{ padding: '8px 16px 0' }}>
        <button
          type="button"
          onClick={onDirections}
          style={{
            width: '100%',
            padding: '12px',
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            color: '#1A1A1A',
            cursor: 'pointer',
          }}
        >
          🧭 Démarrer l’itinéraire
        </button>
      </div>
    </div>
  )
}

function RdvModal({ artisan, onClose }) {
  const [jour, setJour] = useState(0)
  const [heure, setHeure] = useState(null)
  const [step, setStep] = useState('select')

  if (step === 'success') {
    return (
      <div style={{ padding: '30px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#1A1A1A',
            letterSpacing: -0.3,
            margin: 0,
          }}
        >
          RDV confirmé !
        </h3>
        <p style={{ fontSize: 13, color: '#888', marginTop: 6, lineHeight: 1.6 }}>
          Votre rendez-vous chez <strong>{artisan.nom}</strong>
          <br />
          {JOURS[jour]} · {heure}
        </p>
        <div
          style={{
            background: '#F2F2F7',
            borderRadius: 16,
            padding: '14px 16px',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 28 }}>{artisan.emoji}</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{artisan.nom}</div>
            <div style={{ fontSize: 12, color: '#888' }}>
              {JOURS[jour]} · {heure} · {artisan.distance}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: 20,
            width: '100%',
            padding: '14px',
            background: '#E8262A',
            border: 'none',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Parfait, merci !
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '6px 0 0' }}>
      <div
        style={{
          padding: '0 16px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #F5F5F5',
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A' }}>Prendre RDV</div>
          <div style={{ fontSize: 12, color: '#888' }}>{artisan.nom}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: '#F2F2F7',
            border: 'none',
            borderRadius: 50,
            width: 32,
            height: 32,
            cursor: 'pointer',
            fontSize: 16,
            color: '#666',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: 16 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#888',
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Choisir un jour
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {JOURS.map((j, i) => (
            <button
              key={j}
              type="button"
              onClick={() => setJour(i)}
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                background: jour === i ? '#E8262A' : '#F2F2F7',
                color: jour === i ? 'white' : '#555',
                border: 'none',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {j}
            </button>
          ))}
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#888',
            margin: '16px 0 10px',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Choisir une heure
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {HEURES.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHeure(h)}
              style={{
                padding: '10px 0',
                background: heure === h ? '#E8262A' : '#F2F2F7',
                color: heure === h ? 'white' : '#555',
                border: 'none',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {h}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={heure === null}
          onClick={() => setStep('success')}
          style={{
            marginTop: 20,
            width: '100%',
            padding: '14px',
            background: heure ? '#E8262A' : '#E0E0E0',
            border: 'none',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            color: heure ? 'white' : '#AAA',
            cursor: heure ? 'pointer' : 'not-allowed',
            boxShadow: heure ? '0 4px 16px rgba(232,38,42,0.3)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          Confirmer le rendez-vous
        </button>
      </div>
    </div>
  )
}

export default function Carte() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [mapError, setMapError] = useState('')
  const [selectedArtisan, setSelectedArtisan] = useState(null)
  const [sheetState, setSheetState] = useState('peek') // hidden | peek | mid | full
  const [mode, setMode] = useState('preview') // preview | profil | rdv
  const { t } = useI18n()

  const handleCall = (artisan) => {
    if (!artisan?.phone || typeof window === 'undefined') return
    const tel = artisan.phone.replace(/\s+/g, '')
    window.location.href = `tel:${tel}`
  }

  const handleDirections = (artisan) => {
    if (!artisan || typeof window === 'undefined') return
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${artisan.lat},${artisan.lng}`,
    )}`
    window.open(url, '_blank')
  }

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setMapError("La carte n'est pas configurée. Ajoutez VITE_MAPBOX_TOKEN dans votre fichier d'environnement.")
      return
    }

    mapboxgl.accessToken = MAPBOX_TOKEN

    if (mapRef.current || !mapContainerRef.current) return

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.4267, 6.3703], // Cotonou, Bénin
        zoom: 12,
      })

      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      ARTISANS.forEach((artisan) => {
        const el = document.createElement('button')
        el.type = 'button'
        el.style.border = 'none'
        el.style.background = 'transparent'
        el.style.padding = '0'
        el.style.cursor = 'pointer'

        const pill = document.createElement('div')
        pill.style.position = 'relative'
        pill.style.display = 'inline-flex'
        pill.style.alignItems = 'center'
        pill.style.gap = '4px'
        pill.style.padding = '4px 10px'
        pill.style.borderRadius = '999px'
        pill.style.background = '#ffffff'
        pill.style.border = '2px solid #E8262A'
        pill.style.color = '#1A1A1A'
        pill.style.fontSize = '11px'
        pill.style.fontWeight = '700'
        pill.style.boxShadow = '0 4px 14px rgba(0,0,0,0.25)'

        const arrow = document.createElement('div')
        arrow.style.position = 'absolute'
        arrow.style.bottom = '-6px'
        arrow.style.left = '50%'
        arrow.style.transform = 'translateX(-50%) rotate(45deg)'
        arrow.style.width = '8px'
        arrow.style.height = '8px'
        arrow.style.background = '#ffffff'
        arrow.style.borderBottom = '2px solid #E8262A'
        arrow.style.borderRight = '2px solid #E8262A'
        arrow.style.borderRadius = '1px'

        const emojiSpan = document.createElement('span')
        emojiSpan.textContent = artisan.emoji

        const nameSpan = document.createElement('span')
        nameSpan.textContent = artisan.nom.split(' ')[0]

        pill.appendChild(emojiSpan)
        pill.appendChild(nameSpan)
        pill.appendChild(arrow)

        if (artisan.featured) {
          const pulse = document.createElement('div')
          pulse.style.position = 'absolute'
          pulse.style.inset = '-6px'
          pulse.style.borderRadius = '50px'
          pulse.style.background = 'rgba(232,38,42,0.12)'
          pill.insertBefore(pulse, pill.firstChild)
        }

        el.appendChild(pill)

        el.addEventListener('click', (e) => {
          e.stopPropagation()
          setSelectedArtisan(artisan)
          setMode('preview')
          setSheetState('mid')
        })

        // eslint-disable-next-line no-new
        new mapboxgl.Marker(el).setLngLat([artisan.lng, artisan.lat]).addTo(map)
      })
    } catch (err) {
      setMapError("Impossible d'afficher la carte. Veuillez réessayer plus tard.")
      console.error(err)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const handleCloseSheet = () => {
    setSelectedArtisan(null)
    setMode('preview')
    setSheetState('peek')
  }

  const artisansDisponibles = ARTISANS.filter((a) => a.disponible).length

  return (
    <Layout>
      <div
        className="glass-card glass-card-strong"
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(244,0,9,0.08)',
            }}
          >
            <MapPin size={20} strokeWidth={1.7} style={{ color: '#F40009' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{t('map.title')}</h2>
            <p
              style={{
                margin: '4px 0 0 0',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
              }}
            >
              {t('map.subtitle')}
            </p>
          </div>
        </div>

        {mapError ? (
          <div
            style={{
              marginTop: 12,
              padding: '16px 14px',
              borderRadius: 12,
              background: 'rgba(244,0,9,0.06)',
              color: '#991b1b',
              fontSize: '0.9rem',
              lineHeight: 1.4,
            }}
          >
            {mapError}
            <div style={{ marginTop: 8, fontSize: '0.8rem', color: '#7f1d1d' }}>
              Ajoutez une variable <code>VITE_MAPBOX_TOKEN</code> dans un fichier <code>.env.local</code> à la
              racine du projet frontend.
            </div>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              marginTop: 12,
              borderRadius: 16,
              overflow: 'hidden',
              width: '100%',
              height: '65vh',
              boxShadow: '0 18px 45px rgba(15,23,42,0.35)',
            }}
          >
            <div
              ref={mapContainerRef}
              style={{
                position: 'absolute',
                inset: 0,
              }}
            />

            {/* Badge dispo en haut à gauche */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(10px)',
                borderRadius: 999,
                padding: '5px 12px',
                fontSize: 11,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
                zIndex: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#E8262A',
                  display: 'inline-block',
                }}
              />
              {artisansDisponibles} artisans disponibles
            </div>

            {/* Bottom sheet workflow */}
            <BottomSheet state={sheetState}>
              {!selectedArtisan && (
                <div>
                  <div
                    style={{
                      padding: '4px 16px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#1A1A1A',
                      }}
                    >
                      {ARTISANS.length} artisans proches
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      padding: '10px 16px 0',
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {ARTISANS.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          setSelectedArtisan(a)
                          setMode('preview')
                          setSheetState('mid')
                        }}
                        style={{
                          flexShrink: 0,
                          width: 110,
                          height: 70,
                          background: `linear-gradient(135deg, ${a.photos[0]}, ${a.photos[1]})`,
                          border: 'none',
                          borderRadius: 16,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '8px 10px',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{a.emoji}</span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginTop: 2,
                            lineHeight: 1.2,
                          }}
                        >
                          {a.nom.split(' ')[0]}
                        </span>
                        <span style={{ fontSize: 9, color: '#555' }}>★ {a.note}</span>
                        {a.disponible && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 6,
                              right: 6,
                              width: 7,
                              height: 7,
                              borderRadius: '50%',
                              background: '#1DB954',
                              border: '1.5px solid white',
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedArtisan && mode === 'preview' && (
                <PreviewContent
                  artisan={selectedArtisan}
                  onClose={handleCloseSheet}
                  onVoirProfil={() => {
                    setMode('profil')
                    setSheetState('full')
                  }}
                  onCall={() => handleCall(selectedArtisan)}
                  onDirections={() => handleDirections(selectedArtisan)}
                />
              )}

              {selectedArtisan && mode === 'profil' && (
                <ProfilContent
                  artisan={selectedArtisan}
                  onClose={handleCloseSheet}
                  onRdv={() => {
                    setMode('rdv')
                    setSheetState('full')
                  }}
                  onCall={() => handleCall(selectedArtisan)}
                  onDirections={() => handleDirections(selectedArtisan)}
                />
              )}

              {selectedArtisan && mode === 'rdv' && (
                <RdvModal
                  artisan={selectedArtisan}
                  onClose={() => {
                    setMode('profil')
                    setSheetState('full')
                  }}
                />
              )}
            </BottomSheet>
          </div>
        )}
      </div>
    </Layout>
  )
}
