import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/programing-language'
import { Button } from '../shadcn/components/ui/button'
import { Input } from '../shadcn/components/ui/input'
import logo from '../../public/Logo.webp'
import loginImage from '../../public/login-image.webp'
import { Code } from 'lucide-react'
interface LoginProps {
  onLogin: (token: string, username: string) => void
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
      console.log('Login response:', response)

      if (!response.token) {
        throw new Error('Token is missing in the response')
      }

      localStorage.setItem('token', response.token)
      onLogin(response.token, username)
      navigate('/programming-languages/overview')
    } catch (error) {
      setError('Login failed. Please try again.')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-32 items-center !max-h-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="w-[600px] max-h-screen p-24 bg-white rounded shadow-xl overflow-hidden !h-screen flex flex-col justify-center  gap-10 "
        >
          <div className="flex flex-col gap-5 border-b border-gray-400 pb-4">
            <img src={logo} alt="logo" className="w-20 rounded-sm ml-2" />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold font-mono flex mt-0 p-0">
                <Code className="w-6 h-6 mr-2" /> Languages
              </h3>
              <p className="text-gray-700 text-xs font-bold m-0">
                Advanced app for programming languages
              </p>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
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
            <Button
              type="submit"
              className="w-full hover:bg-gradient-to-bl bg-gradient-to-tl from-[#C0C7C7] to-[#5A6A6A] text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="flex justify-end items-center my-auto">
        <img
          src={loginImage}
          alt="logo"
          className="h-[700px] max-h-screen overflow-hidden rounded-lg"
        />
      </div>
    </div>
  )
}
