import AppRouter from './routes/AppRouter'
import { useUserStore } from '@/store/userStore'
import { getSavedUserName } from '@/utils/userNameStorage'
import { useEffect } from 'react'
import './App.css'

function App() {
  const { setUserName } = useUserStore();

  useEffect(() => {
    const savedUserName = getSavedUserName();

    if (savedUserName) {
      setUserName(savedUserName)
    }
  }, [setUserName]);

  return (
    <AppRouter />
  )
}

export default App
