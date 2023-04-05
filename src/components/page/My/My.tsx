import type { FC } from 'react'
import { MyName } from '@/src/components/model/MyName'
import { Title } from '@/src/components/ui/Title'
import { useUserType } from './hooks'

export const My: FC = () => {
  const { typeText } = useUserType()

  return (
    <>
      <Title titleText="マイページ" />
      <h2>{typeText}</h2>
      <MyName />
    </>
  )
}
