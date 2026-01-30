'use client'

import React, { createContext, useContext } from 'react'
import type { Locale } from 'i18n/config'


const LocaleContext = createContext<Locale | null>(null)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): Locale {
  const locale = useContext(LocaleContext)
  if (locale === null) {
    return 'en'
  }
  return locale
}
