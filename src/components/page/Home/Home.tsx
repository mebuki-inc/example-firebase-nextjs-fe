import type { FC } from 'react'
import Link from 'next/link'

import { Title } from '../../ui/Title'

export const Home: FC = () => {
  return (
    <>
      <Title titleText="Home画面" />
      <section>
        <h2>メニュー</h2>
        <ul>
          <li>
            <Link href={'/login'}>ログイン画面（/login）</Link>
          </li>
        </ul>
      </section>
    </>
  )
}
