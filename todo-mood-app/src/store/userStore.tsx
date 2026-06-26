import { create } from 'zustand'

interface userStore {
  userName : string,
  setUserName : (name:string) => void
  logout : () => void
}

export const useUserStore = create<userStore>((set) => ({
  userName : '',
  setUserName : (name) => set({ userName : name }),
  logout : () => {
    localStorage.removeItem("userName");
    set({
      userName: ''
    })
  }
}))