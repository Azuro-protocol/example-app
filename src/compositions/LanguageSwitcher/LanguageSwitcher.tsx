'use client'

import React from 'react'
import { setCookie } from 'cookies-next'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import { Icon } from 'components/ui'
import { Dropdown } from 'components/inputs'
import { useLocale } from 'contexts'
import { cookieName, localeNames, locales, type Locale } from 'i18n/config'

import messages from './messages'


const COOKIE_MAX_AGE = 365 * 24 * 60 * 60

const LanguageSwitcher: React.FC = () => {
  const currentLocale = useLocale()

  const handleSelect = (locale: Locale) => {
    if (locale === currentLocale) return
    setCookie(cookieName, locale, { maxAge: COOKIE_MAX_AGE, path: '/' })
    window.location.reload()
  }

  const content = (
    <div className="border border-grey-20 p-2 min-w-[8rem] bg-bg-l2 rounded-md">
      <div className="text-caption-12 text-grey-60 px-2 py-1">
        <Message value={messages.label} />
      </div>
      {
        locales.map((locale) => (
          <button
            key={locale}
            type="button"
            className={cx(
              'w-full text-left text-caption-13 px-2 py-1.5 rounded transition',
              locale === currentLocale
                ? 'bg-grey-15 text-grey-90'
                : 'text-grey-60 hover:bg-grey-10 hover:text-grey-90'
            )}
            onClick={() => handleSelect(locale)}
          >
            {localeNames[locale]}
          </button>
        ))
      }
    </div>
  )

  return (
    <Dropdown
      className="group"
      contentClassName="mb:p-0"
      buttonClassName="wd:h-10 -wd:h-8"
      content={content}
      placement="bottomRight"
    >
      <div className="flex items-center text-grey-60 ui-open:text-grey-90 hover:text-grey-90">
        <span className="text-caption-13 mr-1">{localeNames[currentLocale]}</span>
        <Icon className="size-5 ui-open:rotate-180" name="interface/caret_down" />
      </div>
    </Dropdown>
  )
}

export default LanguageSwitcher
