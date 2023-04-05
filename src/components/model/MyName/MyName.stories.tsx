import { MyName } from './'
import { Meta, StoryObj } from '@storybook/react'
import { fetchMyHandlers } from './fixtures/fetchMyHandlers'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { authAtom } from '../../../state/atoms'

export default {
  component: MyName,
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
} as Meta<typeof MyName>

export const Default: StoryObj<typeof MyName> = {
  parameters: {
    msw: {
      handlers: [fetchMyHandlers.default]
    }
  }
}

export const Loading: StoryObj<typeof MyName> = {
  parameters: {
    msw: {
      handlers: [fetchMyHandlers.loading]
    }
  }
}

export const Error: StoryObj<typeof MyName> = {
  parameters: {
    msw: {
      handlers: [fetchMyHandlers.error]
    }
  }
}
