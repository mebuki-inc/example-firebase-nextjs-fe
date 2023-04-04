import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useUserType = () => {
  const { userType } = useRouter().query

  const [typeText, setTypeText] = useState<string>('')

  useEffect(() => {
    if (typeof userType === 'string') {
      if (userType === 'CONSUMER') setTypeText('会員情報')
      if (userType === 'COMPANY') setTypeText('管理者情報')
    }
  }, [userType])

  return {
    typeText
  }
}
