import type { FC } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

import '../src/styles/globals.scss'

const Dynamic = dynamic<AppProps>(
  () => import('../src/components/functional/App').then(mod => mod.App),
  {
    ssr: false
  }
)

const MyApp: FC<AppProps> = props => <Dynamic {...props} />
export default MyApp
