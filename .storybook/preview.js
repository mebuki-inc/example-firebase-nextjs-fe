import { RouterContext } from 'next/dist/shared/lib/router-context' // next 11.1
import { initialize, mswDecorator } from 'msw-storybook-addon'

import '../src/styles/globals.scss'

// Initialize MSW
if (!global.test) {
  // only run this in the browser
  initialize()
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
    query: {}
  }
}

export const decorators = [
  Story => (
    <>
      <Story />
    </>
  ),
  mswDecorator
]
