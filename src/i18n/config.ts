export const locales = [ 'en', 'zh' ] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
}

export const cookieName = 'NEXT_LOCALE'

export function isValidLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'zh'
}
