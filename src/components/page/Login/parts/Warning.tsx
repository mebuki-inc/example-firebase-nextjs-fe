import type { FC } from 'react'
import styles from './warning.module.scss'

type Props = {
  text: string
}

export const Warning: FC<Props> = ({ text }) => {
  return <p className={styles.text}>{text}</p>
}
