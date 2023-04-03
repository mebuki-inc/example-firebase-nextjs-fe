import type { Preview, StoryFn } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { withNextRouter } from '@gogaille/storybook-addon-next-router'

import '../src/styles/globals.scss'

// Initialize MSW
if (!global.test) {
  // only run this in the browser
  initialize({ onUnhandledRequest: 'bypass' })
}

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
    }
  }
}

export default preview

export const decorators = [
  (StoryFn: StoryFn) => (
    <>
      <StoryFn />
    </>
  ),
  mswDecorator,
  withNextRouter
]
