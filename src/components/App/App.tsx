import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

/**
 * ToDo: アプリケーションの共通処理を追記する
 */
export const App: FC<AppProps> = ({ Component }) => {
  return (
    <RecoilRoot>
      <Component />
    </RecoilRoot>
  )
}
