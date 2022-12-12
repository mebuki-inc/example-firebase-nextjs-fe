import { My } from '../'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { handlers } from '../handers/fetchMy.handers'

export default {
  title: 'pages/My',
  component: My,
  argTypes: {}
} as ComponentMeta<typeof My>

const Template: ComponentStory<typeof My> = args => <My />

export const Default = Template.bind({})
Default.parameters = {
  msw: {
    handlers: [handlers.default]
  }
}
