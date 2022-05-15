import type { FC } from 'react'
import Link from 'next/link'

export const Home: FC = () => {
  return (
    <>
      <h1>Home画面</h1>
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
