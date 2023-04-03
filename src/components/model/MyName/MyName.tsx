import type { FC } from 'react'
import { useMy } from './hooks/useMy'

export const MyName: FC = () => {
  const { isError, isLoading, my } = useMy()

  // エラーUI
  if (isError) {
    return <h3>読み込みエラー</h3>
  }

  // ローディングUI
  if (isLoading || !my) {
    return <h3>読込中</h3>
  }

  return <h3>ようこそ、{my.name}さん</h3>
}
