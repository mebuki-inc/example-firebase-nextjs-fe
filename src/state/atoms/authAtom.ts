import { atom } from 'recoil'

type Atom = {
  /* JWT token */
  token: string
}

export const authAtom = atom<Atom>({
  key: 'auth',
  default: {
    token: ''
  }
})
