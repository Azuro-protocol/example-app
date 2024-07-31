export default {
  connect: {
    en: 'Connect a wallet',
  },
  agree: {
    en: 'By connecting a wallet, you agree to',
  },
  privacyPolicy: {
    en: 'Azuro Protocol’s Privacy Policy',
  },
  success: {
    en: 'Wallet has been successfully connected',
  },
  waiting: {
    title: {
      en: 'Waiting for confirmation',
    },
    text: {
      en: 'Open wallet extension or mobile app and confirm the connection.',
    },
  },
  errors: {
    // 'UserRejectedRequestError': {
    '4001': {
      title: {
        en: 'Connection canceled',
      },
      text: {
        en: 'You have canceled the connection. Click below to try again.',
      },
    },
    // in case of injected it may be when it's busy by other user operation
    // 'ResourceUnavailableRpcError': {
    '-32002': {
      title: {
        en: 'Connection failed',
      },
      text: {
        en: 'Your wallet is already waiting for your action. Please complete or cancel it and try again.',
      },
    },
    default: {
      title: {
        en: 'Connection failed',
      },
      text: {
        en: 'There was an error, we are already working on it. Click below to try again.',
      },
    },
  },
}
