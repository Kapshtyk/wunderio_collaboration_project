import '../styles/globals.css'
import i18n from './i18next'
import { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light'
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    i18n
  },
  globals: {
    locale: 'en',
    locales: {
      en: 'English',
      fi: 'Suomi',
      sv: 'Svenska'
    }
  }
}

export default preview
