import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { MapPin } from 'lucide-react'
import Layout from '../components/Layout'
import { useI18n } from '../i18n'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

const artisansSimules = [
  {
    id: 1,
    nom: 'Abdou Méca',
    metier: 'Mécanicien',
    lng: 2.334, 
    lat: 6.411,
  },
  {
    id: 2,
    nom: 'Aïcha Beauté',
    metier: 'Coiffeuse',
    lng: 2.4205,
    lat: 6.359,
  },
  {
    id: 3,
    nom: 'Tunde Électricité',
    metier: 'Électricien',
    lng: 2.444,
    lat: 6.365,
  },
]

export default function Carte() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [mapError, setMapError] = useState('')
  const { t } = useI18n()

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

      artisansSimules.forEach((artisan) => {
        const el = document.createElement('div')
        el.style.width = '24px'
        el.style.height = '24px'
        el.style.borderRadius = '999px'
        el.style.background = '#F40009'
        el.style.border = '2px solid white'
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'

        const popupHtml = `
          <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; min-width: 180px;">
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">${artisan.nom}</div>
            <div style="font-size: 13px; color: #6b7280;">${artisan.metier}</div>
          </div>
        `

        const popup = new mapboxgl.Popup({ offset: 16 }).setHTML(popupHtml)

        new mapboxgl.Marker(el).setLngLat([artisan.lng, artisan.lat]).setPopup(popup).addTo(map)
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

  return (
    <Layout>
      <div className="glass-card glass-card-strong" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
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
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
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
              Ajoutez une variable <code>VITE_MAPBOX_TOKEN</code> dans un fichier <code>.env.local</code> à la racine du projet frontend.
            </div>
          </div>
        ) : (
          <div
            ref={mapContainerRef}
            style={{
              marginTop: 12,
              borderRadius: 16,
              overflow: 'hidden',
              width: '100%',
              height: '65vh',
              boxShadow: '0 18px 45px rgba(15,23,42,0.35)',
            }}
          />
        )}
      </div>
    </Layout>
  )
}
