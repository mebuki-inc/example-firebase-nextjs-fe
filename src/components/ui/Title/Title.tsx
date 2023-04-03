import type { FC } from 'react'
import styles from './title.module.scss'

type Props = {
  titleText: string
}

export const Title: FC<Props> = ({ titleText }) => {
  return <h1 className={styles.title}>{titleText}</h1>
}
