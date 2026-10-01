import type { IntlMessage } from '@locmod/intl'
import type { PromoCodeErrorCode } from '@azuro-org/toolkit'


const genericError = {
  en: 'Something went wrong. Please try again',
}

// typed per code, so a reason added in a future toolkit release is a type error here
const errors: Record<PromoCodeErrorCode, IntlMessage> = {
  'bonus.promo_code_not_found': {
    en: 'Promo code not found',
  },
  'bonus.promo_code_deactivated': {
    en: 'This promo code is no longer active',
  },
  'bonus.promo_code_expired': {
    en: 'This promo code has expired',
  },
  'bonus.promo_code_unavailable': {
    en: 'This promo code is not available right now',
  },
  'bonus.promo_code_affiliate_mismatch': {
    en: 'This promo code is not valid on this site',
  },
  'bonus.promo_code_already_activated': {
    en: 'You have already used this promo code',
  },
  'bonus.promo_code_limit_reached': {
    en: 'This promo code has been fully redeemed',
  },
  'bonus.promo_code_busy': {
    en: 'Please try again in a moment',
  },
  'bonus.activate_promo_code_error': genericError,
  'unknown': genericError,
}

export default {
  placeholder: {
    en: 'Promo code',
  },
  apply: {
    en: 'Apply',
  },
  addedOnNetwork: {
    en: 'Your freebet was added on {network}. Switch to {network} to use it.',
  },
  genericError,
  errors,
}
