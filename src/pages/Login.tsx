import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/programing-language'
import { Button } from '../shadcn/components/ui/button'
import { Input } from '../shadcn/components/ui/input'
interface LoginProps {
  onLogin: (token: string) => void
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await loginUser(username, password)
      console.log('Login response:', response) // Afișează răspunsul API

      if (!response.token) {
        // Dacă tokenul lipsește
        throw new Error('Token is missing in the response')
      }

      localStorage.setItem('token', response.token)
      onLogin(response.token)
      navigate('/')
    } catch (error) {
      setError('Login failed. Please try again.')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-1/4 p-6 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          className="mb-4"
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="mb-4"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}
