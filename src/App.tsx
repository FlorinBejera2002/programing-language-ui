import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from './components/Navbar'
import LanguageList from './pages/LanguageTable'
import Login from './pages/Login'
import LanguageDetail from './pages/DetailLanguage'
import AddLanguage from './pages/AddLanguage'

export function App() {
  const [token, setToken] = useState<null | string>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  // Verifică dacă există un token în localStorage la montarea componentei
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
    setIsAuthenticated(true)
    router.push('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    router.push('/login')
  }

  // Verifică dacă utilizatorul este autentificat și redirecționează
  useEffect(() => {
    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="h-full">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      {isAuthenticated ? (
        <>
          {router.pathname === '/' && <LanguageList token={token!} />}
          {router.pathname === '/newLanguage' && <AddLanguage token={token!} />}
          {router.pathname.startsWith('/language/') && <LanguageDetail />}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}
