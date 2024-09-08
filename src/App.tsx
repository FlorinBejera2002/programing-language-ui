import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LanguageList from './pages/LanguageTable'
import Login from './pages/Login'
import LanguageDetail from './pages/DetailLanguage'
import AddLanguage from './pages/AddLanguage'

export function App() {
  const [token, setToken] = useState<null | string>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation() // Folosim useLocation pentru a obține pathname-ul curent

  // Verifică dacă există un token în localStorage la montarea componentei
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
    setIsAuthenticated(true)
    navigate('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    navigate('/login')
  }

  // Verifică dacă utilizatorul este autentificat și redirecționează
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, location.pathname])

  return (
    <div className="h-full">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      {isAuthenticated ? (
        <>
          {location.pathname === '/' && <LanguageList token={token!} />}
          {location.pathname === '/newLanguage' && (
            <AddLanguage token={token!} />
          )}
          {location.pathname.startsWith('/language/') && <LanguageDetail />}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}
