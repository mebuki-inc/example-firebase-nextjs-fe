import type { FC } from 'react'
import { useMy } from './hooks/useMy'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const My: FC = () => {
  const { isError, name, fetch } = useMy()
  const { userType } = useRouter().query

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
      <h2>{userType === 'CONSUMER' ? '会員情報' : '管理者情報'}</h2>
      <h3>ようこそ、{name}さん</h3>
    </>
  )
}
