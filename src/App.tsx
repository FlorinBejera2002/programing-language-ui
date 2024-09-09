import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LanguageTable from './pages/LanguageTable'
import { LoginPage } from './pages/Login'
import LanguageDetail from './pages/DetailLanguage'
import EditLanguageModal from './components/EditeLanguageModal'
import { AddLanguage } from './pages/AddLanguage'

export function App() {
  const [token, setToken] = useState<null | string>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()

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
    try {
      localStorage.setItem('token', token)
      setToken(token)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      console.error('Failed to set token:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="h-full">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      {isAuthenticated ? (
        <>
          <Routes>
            <Route path="/" element={<LanguageTable token={token!} />} />
            <Route
              path="/new-language"
              element={<AddLanguage token={token!} />}
            />
            <Route
              path="/edite/:id"
              element={<EditLanguageModal token={token!} />}
            />
          </Routes>
          <LanguageDetail token={token!} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}
