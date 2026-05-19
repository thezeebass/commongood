import { create } from 'zustand'

interface AuthStore {
  token: string | null
  user: any | null
  setAuth: (token: string, user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('auth_token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  setAuth: (token, user) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },
  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },
}))
