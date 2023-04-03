import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { act, render } from '@testing-library/react'
import { setupServer } from 'msw/node'

const converter = new Stories2SnapsConverter()

initStoryshots({
  asyncJest: true,
  test: async ({ story, context, done }) => {
    const endpoints = context.parameters.msw?.handlers ?? []
    const server = setupServer(...endpoints)
    server.listen()

    try {
      const jsx = story.render()
      const { unmount, rerender, container } = await render(jsx)

      // データ取得後に再描画する
      // DOMはloadingの後にsuccess/errorをrenderするので、2回目のrenderが終わってからsnapshotを行う
      await act(() => new Promise(resolve => setTimeout(resolve)))
      await rerender(jsx)
      const snapshotFileName = converter.getSnapshotFileName(context)
      expect(container).toMatchSpecificSnapshot(snapshotFileName)

      unmount()
      done!()
    } finally {
      server.close()
    }
  }
})
