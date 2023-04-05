import { My } from './'
import { Meta, StoryObj } from '@storybook/react'
import { fetchMyHandlers } from '../../model/MyName/fixtures/fetchMyHandlers'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { authAtom } from '../../../state/atoms'

export default {
  component: My,
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

export const Default: StoryObj<typeof My> = {
  parameters: {
    msw: {
      handlers: [fetchMyHandlers.default]
    },
    nextRouter: {
      query: {
        userType: 'CONSUMER'
      }
    }
  }
}

export const Loading: StoryObj<typeof My> = {
  parameters: {
    msw: {
      handlers: [fetchMyHandlers.loading]
    }
  }
}

export const Error: StoryObj<typeof My> = {
  parameters: {
    msw: {
      handlers: [fetchMyHandlers.error]
    }
  }
}
