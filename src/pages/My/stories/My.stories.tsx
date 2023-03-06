import { My } from '../'
import { Meta, StoryFn } from '@storybook/react'
import { handlers } from '../handers/fetchMy.handers'

export default {
  title: 'pages/My',
  component: My,
  argTypes: {}
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
