import type { NextPage } from 'next'

import { useCSR } from '../components/hooks'
import { Home } from '../components/pages/Home'

const Page: NextPage = () => {
  const execRouting = useCSR()
  if (!execRouting) {
    // ToDo: 必要あればローディング中のUIを表示する
    return null
  }
  return <Home />
}

export default Page
