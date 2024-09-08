import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgrammingLanguage, createLanguage } from '../api/programing-language'
import { Button } from '../shadcn/components/ui/button'
import { Input } from '../shadcn/components/ui/input'

export default function AddLanguage({ token }: { token: string }) {
  const [newLanguage, setNewLanguage] = useState<ProgrammingLanguage>({
    id: '',
    name: '',
    creator: '',
    releaseYear: new Date().getFullYear(),
    paradigm: 'object-oriented',
    popularity: 0
  })
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await createLanguage(newLanguage, token)
    navigate('/home')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Language</h1>
      <Input
        value={newLanguage.name}
        onChange={(e) =>
          setNewLanguage({ ...newLanguage, name: e.target.value })
        }
      />
      <Input
        value={newLanguage.creator}
        onChange={(e) =>
          setNewLanguage({ ...newLanguage, creator: e.target.value })
        }
      />
      <Button onClick={handleSubmit} className="mt-4">
        Add Language
      </Button>
    </div>
  )
}
