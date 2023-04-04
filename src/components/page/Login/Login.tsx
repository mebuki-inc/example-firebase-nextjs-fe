import type { FC } from 'react'

import { useSignIn } from './hooks'
import { Warning } from './parts/Warning'
import { Title } from '../../ui/Title'
import styles from './login.module.scss'

export const Login: FC = () => {
  const { form, isValid } = useSignIn()

  return (
    <>
      <Title titleText="ログイン画面" />
      <p>メールアドレス</p>
      <input {...form.register('mailAddress')} />
      <Warning text={form.formState.errors.mailAddress?.message ?? ''} />

      <p>パスワード</p>
      <input type="password" {...form.register('password')} />
      <Warning text={form.formState.errors.password?.message ?? ''} />

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
