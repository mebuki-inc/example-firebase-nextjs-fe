import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots'
const path = require('path')

initStoryshots({
  configPath: path.resolve(__dirname, './main.js'),
  test: multiSnapshotWithOptions()
})
