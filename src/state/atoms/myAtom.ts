import { atom } from 'recoil'

type Atom = {
  id: string
  name: string
}

export const myAtom = atom<Atom>({
  key: 'my',
  default: {
    id: '',
    name: ''
  }
})
