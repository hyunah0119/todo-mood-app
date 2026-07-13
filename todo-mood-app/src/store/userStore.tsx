import { create } from 'zustand'
import { getSavedUserName, removeSavedUserName } from '@/utils/userNameStorage'

interface userStore {
  userName : string,
  setUserName : (name:string) => void
  logout : () => void
}

export const useUserStore = create<userStore>((set) => ({
  userName : getSavedUserName(),
  setUserName : (name) => set({ userName : name }),
  logout : () => {
    removeSavedUserName();
    set({
      userName: ''
    })
  }
}))