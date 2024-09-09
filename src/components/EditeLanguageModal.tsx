import { useState, useEffect } from 'react'
import { fetchLanguageById, updateLanguage } from '../api/programing-language'
import { Button } from '../shadcn/components/ui/button'
import { Input } from '../shadcn/components/ui/input'
import { Card, CardHeader, CardContent } from '@/shadcn/components/ui/card'
import { useParams, useNavigate } from 'react-router-dom'
import { IProgrammingLanguage } from 'types'

export default function EditLanguageModal({ token }: { token: string }) {
  const { id } = useParams() // Extrage ID-ul din URL
  const [language, setLanguage] = useState<IProgrammingLanguage | null>(null)
  const [updatedLanguage, setUpdatedLanguage] =
    useState<IProgrammingLanguage | null>(null)
  const navigate = useNavigate()

  // Fetch limbajul de programare folosind ID-ul din URL
  useEffect(() => {
    const fetchLanguageDetails = async () => {
      if (id) {
        const fetchedLanguage = await fetchLanguageById(id, token)
        setLanguage(fetchedLanguage)
        setUpdatedLanguage(fetchedLanguage) // Inițializează formularul cu datele existente
      }
    }
    fetchLanguageDetails()
  }, [id, token])

  // Gestionează salvarea modificărilor
  const handleSave = async () => {
    if (updatedLanguage) {
      await updateLanguage(id as string, updatedLanguage, token)
      navigate('/') // După salvare, redirecționează înapoi la lista principală
    }
  }

  // Dacă limbajul nu a fost încă preluat, afișează "Loading"
  if (!language) return <div>Loading...</div>

  return (
    <Card className="max-w-lg mx-auto p-6">
      <CardHeader>
        <h2>Edit Language</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* <Input
          value={updatedLanguage?.name || ''}
          onChange={(e: any) =>
            setUpdatedLanguage({ ...updatedLanguage, name: e.target.value })
          }
        /> */}
        <Input
          value={updatedLanguage?.creator || ''}
          onChange={(e: any) => {
            if (updatedLanguage) {
              setUpdatedLanguage({
                ...updatedLanguage,
                creator: e.target.value
              })
            }
          }}
        />
        {/* Includeți alte câmpuri similare */}
        <div className="flex gap-4 justify-end">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => navigate('/')}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  )
}
