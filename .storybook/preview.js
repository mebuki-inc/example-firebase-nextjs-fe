import { RouterContext } from 'next/dist/shared/lib/router-context' // next 11.1
import '../src/components/styles/global.scss'

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
  )
]
