import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import { ROUTES } from '../../app/routes'

export const useCSR = (): boolean => {
  const [execRouting, setExecRouting] = useState(false)
  const { asPath } = useRouter()

  useEffect(() => {
    if (asPath === '/') {
      // `/`の場合はCSRしない
      setExecRouting(true)
      return
    }

    const isCSR = ROUTES.some(path => {
      if (new RegExp(`^${path.pattern}$`).test(asPath)) {
        // パスが定義されたパターンと合致する場合CSRする
        Router.replace(path.href, asPath).then()
        return true
      }
    })

    !isCSR && setExecRouting(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return execRouting
}
