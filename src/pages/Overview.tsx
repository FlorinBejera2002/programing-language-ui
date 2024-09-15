import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/shadcn/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { IProgrammingLanguage } from '../types'
import { fetchLanguages } from '../api/programing-language'
import { useNavigate } from 'react-router-dom'
import logo from '../../public/Logo.webp'

export const Overview = ({ token }: { token: string }) => {
  const [languages, setLanguages] = useState<IProgrammingLanguage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const data = await fetchLanguages(token)

        const sortedLanguages = data.sort((a, b) => b.popularity - a.popularity)

        setLanguages(sortedLanguages)
        setLoading(false)
      } catch (err) {
        setError(`Failed to fetch programming languages. ${err}`)
        setLoading(false)
      }
    }

    loadLanguages()
  }, [token])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="p-6 flex flex-col gap-6 justify-center mt-0">
      <img src={logo} alt="logo" className="w-20 rounded-sm mb-5" />
      <h1 className="text-3xl font-bold">Overview</h1>
      <Card className="p-5">
        <CardContent>
          <CardTitle className="text-2xl font-bold mb-4">
            Programming Language Popularity
          </CardTitle>
          <CardDescription className="bg-white ">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={languages}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="popularity" fill="#5A6A6A" />
              </BarChart>
            </ResponsiveContainer>
          </CardDescription>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.slice(0, 3).map((lang) => (
          <Card
            key={lang.id}
            className="p-6 bg"
            onClick={() => navigate(`/programming-languages/${lang.id}`)}
          >
            <CardContent>
              <CardTitle className="text-xl font-bold mb-2">
                {lang.name}
              </CardTitle>
              <CardDescription className="text-gray-700">
                <strong>Creator:</strong> {lang.creator}
              </CardDescription>
              <CardDescription className="text-gray-700">
                <strong>Release Year:</strong> {lang.releaseYear}
              </CardDescription>
              <CardDescription className="text-gray-700">
                <strong>Paradigm:</strong> {lang.paradigm}
              </CardDescription>
              <CardDescription className="text-gray-700">
                <strong>Popularity:</strong> {lang.popularity}%
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
