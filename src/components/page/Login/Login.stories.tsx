import { Login } from './index'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'page/Login',
  component: Login,
  argTypes: {}
} as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = args => <Login />

export const Default = Template.bind({})
