import { My } from '../'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { handlers } from '../handers/fetchMy.handers'
import { SWRConfig } from 'swr'
import { authAtom } from '../../../state/atoms'

export default {
  title: 'pages/My',
  component: My,
  argTypes: {},
  decorators: [
    story => {
      return (
        <SWRConfig value={{ provider: () => new Map() }}>
          <RecoilRoot
            initializeState={({ set }: MutableSnapshot): void =>
              set(authAtom, { token: 'test-token' })
            }
          >
            {story()}
          </RecoilRoot>
        </SWRConfig>
      )
    }
  ]
} as ComponentMeta<typeof My>

const Template: ComponentStory<typeof My> = args => <My />

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [handlers.default]
  }
}

export const Error = Template.bind({})
Error.parameters = {
  msw: {
    handlers: [handlers.error]
  }
}
