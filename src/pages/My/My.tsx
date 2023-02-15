import type { FC } from 'react'
import { useMy } from './hooks/useMy'
import { useEffect } from 'react'

export const My: FC = () => {
  const { isError, name, fetch } = useMy()

  useEffect(() => {
    fetch().then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // エラーUI
  if (isError) {
    return (
      <>
        <h1>マイページ</h1>
        {isError && <h3>読み込みエラー</h3>}
      </>
    )
  }

  return (
    <>
      <h1>マイページ</h1>
      <h3>ようこそ、{name}さん</h3>
    </>
  )
}
