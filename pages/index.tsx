import type { NextPage } from 'next'

import { useCSR } from '../src/hooks'
import { Home } from '../src/components/page/Home'

const Page: NextPage = () => {
  const execRouting = useCSR()
  if (!execRouting) {
    // ToDo: 必要あればローディング中のUIを表示する
    return null
  }
  return <Home />
}

export default Page
