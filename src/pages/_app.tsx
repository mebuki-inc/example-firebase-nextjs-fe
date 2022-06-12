import type { FC } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const Dynamic = dynamic<AppProps>(() => import('../components/app').then(mod => mod.App), {
  ssr: false
})

const MyApp: FC<AppProps> = props => <Dynamic {...props} />
export default MyApp
