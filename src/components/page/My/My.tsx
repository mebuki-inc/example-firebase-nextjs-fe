import type { FC } from 'react'
import { MyName } from '../../model/MyName'
import { Title } from '../../ui/Title'
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
