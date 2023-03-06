import { Login } from '../'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'pages/Login',
  component: Login,
  argTypes: {}
} as Meta<typeof Login>

const Template: StoryFn<typeof Login> = args => <Login />

export const Default = Template.bind({})
