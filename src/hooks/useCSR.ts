import { useState, useEffect } from 'react'

import { ROUTES } from '../config/routes'
import { redirect, usePathname } from 'next/navigation'

export const useCSR = (): boolean => {
  const [execRouting, setExecRouting] = useState(false)
  const asPath = usePathname()

  useEffect(() => {
    if (!asPath || asPath === '/') {
      // `/`の場合はCSRしない
      setExecRouting(true)
      return
    }

    const isCSR = ROUTES.some(path => {
      if (new RegExp(`^${path.pattern}$`).test(asPath)) {
        // パスが定義されたパターンと合致する場合CSRする
        redirect(asPath)
        return true
      }
    })

    !isCSR && setExecRouting(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return execRouting
}
