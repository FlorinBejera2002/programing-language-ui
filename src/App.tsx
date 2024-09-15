import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { LanguageTable } from './pages/LanguageTable'
import { LoginPage } from './pages/Login'
import { LanguageDetail } from './pages/QuickView'
import { AddLanguage } from './pages/AddLanguage'
import EditLanguageModal from './components/EditeLanguage'
import { Sidebar } from './components/Sidebar'
import { Overview } from './pages/Overview'

export function App() {
  const [token, setToken] = useState<null | string>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<null | string>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
      setUsername(storedUsername)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogin = (token: string, username: string) => {
    try {
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
      setToken(token)
      setIsAuthenticated(true)
      navigate('/programming-languages/overview')
    } catch (error) {
      console.error('Failed to set token:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken(null)
    setUsername(null)
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="h-full w-full">
      {isAuthenticated && (
        <Sidebar username={username!} onLogout={handleLogout} />
      )}
      {isAuthenticated ? (
        <div className={`flex-1 ${isAuthenticated ? 'ml-64' : ''}`}>
          <div className="p-4">
            <Routes>
              <Route
                path="/programming-languages/table-languages"
                element={<LanguageTable token={token!} />}
              />
              <Route
                path="/programming-languages/new-language"
                element={<AddLanguage token={token!} />}
              />
              <Route
                path="/programming-languages/:id"
                element={<LanguageDetail token={token!} />}
              />
              <Route
                path="/programming-languages/edit-language/:id"
                element={<EditLanguageModal token={token!} />}
              />
              <Route
                path="/programming-languages/overview"
                element={<Overview token={token!} />}
              />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}
