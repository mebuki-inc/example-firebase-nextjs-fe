import { My } from '../'
import { Meta, StoryFn } from '@storybook/react'
import { handlers } from '../handers/fetchMy.handlers'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { authAtom } from '../../../state/atoms'

export default {
  title: 'pages/My',
  component: My,
  argTypes: {},
  decorators: [
    StoryFn => {
      return (
        <SWRConfig value={{ provider: () => new Map() }}>
          <RecoilRoot
            initializeState={({ set }: MutableSnapshot): void =>
              set(authAtom, { token: 'test-token' })
            }
          >
            {StoryFn()}
          </RecoilRoot>
        </SWRConfig>
      )
    }
  ]
} as Meta<typeof My>

const Template: StoryFn<typeof My> = args => <My />

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [handlers.default]
  },
  nextRouter: {
    query: {
      userType: 'CONSUMER'
    }
  }
}

export const Error = Template.bind({})
Error.parameters = {
  msw: {
    handlers: [handlers.error]
  }
}
