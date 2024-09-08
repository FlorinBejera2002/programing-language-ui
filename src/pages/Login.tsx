import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { loginUser } from '../api/programing-language'
import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'

export default function LoginPage({
  onLogin
}: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault() // Previne reîncărcarea paginii la submit
    try {
      const response = await loginUser({ username, password })
      localStorage.setItem('token', response.user.token)
      onLogin(response.user.token) // Actualizează starea de autentificare
      router.push('/')
    } catch (error) {
      setError('Invalid credentials. Please try again.')
      console.error('Failed to login:', error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-1/3 p-6 bg-white rounded shadow-md"
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
