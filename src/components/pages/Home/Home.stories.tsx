import { Home } from './'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'pages/Home',
  component: Home,
  argTypes: {}
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = args => <Home />

export const Default = Template.bind({})
