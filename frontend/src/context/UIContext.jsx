import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const UiContext = createContext(null)

const THEME_STORAGE_KEY = 'milka-theme'
const LANG_STORAGE_KEY = 'milka-lang'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  const browserLang = window.navigator.language?.toLowerCase() || 'fr'
  return browserLang.startsWith('en') ? 'en' : 'fr'
}

export function UiProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-lang', language)
    window.localStorage.setItem(LANG_STORAGE_KEY, language)
  }, [language])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
    }),
    [theme, language],
  )

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi() {
  const ctx = useContext(UiContext)
  if (!ctx) {
    throw new Error('useUi doit être utilisé dans un UiProvider')
  }
  return ctx
}

