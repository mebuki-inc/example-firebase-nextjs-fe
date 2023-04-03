import type { FC } from 'react'

import { useSignIn } from './hooks/useSignIn'
import styles from './login.module.scss'
import { Title } from '../../ui/Title'

export const Login: FC = () => {
  const { form, isValid } = useSignIn()

  return (
    <>
      <Title titleText="ログイン画面" />
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
