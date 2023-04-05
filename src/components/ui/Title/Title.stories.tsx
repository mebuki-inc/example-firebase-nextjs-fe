import { Title } from './Title'
import { Meta, StoryObj } from '@storybook/react'

export default { component: Title } as Meta<typeof Title>

export const Default: StoryObj<typeof Title> = {
  args: {
    titleText: 'サンプルタイトル'
  }
}
