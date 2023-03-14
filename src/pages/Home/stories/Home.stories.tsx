import { Home } from '../'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'pages/Home',
  component: Home,
  argTypes: {}
} as Meta<typeof Home>

const Template: StoryFn<typeof Home> = args => <Home />

export const Default = Template.bind({})
