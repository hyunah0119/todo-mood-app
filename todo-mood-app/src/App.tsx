import AppRouter from './routes/AppRouter'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'
import './App.css'

function App() {
  const { setUserName } = useUserStore();

  useEffect(() => {
    const saveUser = localStorage.getItem('userName');

    if (saveUser) {
      setUserName(saveUser)
    }
  }, []);

  return (
    <AppRouter />
  )
}

export default App
