import type { FC } from 'react'
import { useMy } from './hooks/useMy'
import { useRouter } from 'next/router'

export const My: FC = () => {
  const { isError, isLoading, my } = useMy()
  const { userType } = useRouter().query

  // エラーUI
  if (isError) {
    return (
      <>
        <h1>マイページ</h1>
        {isError && <h3>読み込みエラー</h3>}
      </>
    )
  }

  // ローディングUI
  if (isLoading || !my) {
    return (
      <>
        <h1>マイページ</h1>
        {isLoading && <h3>読込中</h3>}
      </>
    )
  }

  return (
    <>
      <h1>マイページ</h1>
      <h2>{userType === 'CONSUMER' ? '会員情報' : '管理者情報'}</h2>
      <h3>ようこそ、{my.name}さん</h3>
    </>
  )
}
