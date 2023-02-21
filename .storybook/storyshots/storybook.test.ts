import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { act, render } from '@testing-library/react'
import path from 'path'
import { setupServer } from 'msw/node'

const converter = new Stories2SnapsConverter()

initStoryshots({
  configPath: path.resolve(__dirname, './main.js'),
  asyncJest: true,
  test: async ({ story, context, done }) => {
    const endpoints = context.parameters.msw?.handlers ?? []
    const server = setupServer(...endpoints)
    server.listen()

    try {
      const jsx = story.render()
      const { unmount, rerender, container } = await render(jsx)

      // wait for state changes
      await act(() => new Promise(resolve => setTimeout(resolve)))

      await rerender(jsx)
      // expect(container).toMatchSnapshot()

      const snapshotFileName = converter.getSnapshotFileName(context)
      expect(container).toMatchSpecificSnapshot(snapshotFileName)

      unmount()
      done!()
    } finally {
      server.close()
    }
  }
})
