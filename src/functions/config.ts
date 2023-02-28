import _getConfig from 'next/config'
import { Config } from '../../config/type'

const _config = require('../../config/production')

/** 環境変数の型 */
type AppConfig = Config & {
  env: string
}

/** デフォルトのConfig */
const DEFAULT_CONFIG: AppConfig = {
  apiHost: _config.apiHost,
  firebase: _config.firebase,
  env: 'production'
}

const config = _getConfig()?.publicRuntimeConfig

export const getConfig = (): AppConfig => {
  if (['development', 'test'].includes(process.env.NODE_ENV)) {
    return {
      ...DEFAULT_CONFIG,
      apiHost: 'http://localhost'
    }
  }
  if (!config || Object.keys(config).length < 1) {
    return DEFAULT_CONFIG
  }
  return config
}
