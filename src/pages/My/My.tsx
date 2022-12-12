import type { FC } from 'react'
import { useMy } from './hooks/useMy'
import { useEffect } from 'react'

export const My: FC = () => {
  const { name, fetch } = useMy()

  useEffect(() => {
    fetch().then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>マイページ</h1>
      <h3>ようこそ、{name}さん</h3>
    </>
  )
}
