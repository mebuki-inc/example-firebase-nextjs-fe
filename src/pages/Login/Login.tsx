import type { FC } from 'react'

import { useSignIn } from './hooks/useSignIn'
import styles from './Login.module.scss'

export const Login: FC = () => {
  const { form, isValid } = useSignIn()

  console.log('isValid', isValid)

  return (
    <>
      <h1 className={styles.title}>ログイン画面</h1>
      <p>メールアドレス</p>
      <input {...form.register('mailAddress')} />
      {form.formState.errors.mailAddress?.message}

      <p>パスワード</p>
      <input type="password" {...form.register('password')} />
      {form.formState.errors.password?.message}

      <p>
        <button
          className={styles.button}
          disabled={!isValid}
          type="button"
          onClick={() => {
            alert('ログインしました')
          }}
        >
          ログイン
        </button>
      </p>
    </>
  )
}
