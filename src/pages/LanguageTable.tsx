import { useState, useEffect } from 'react'
import {
  ProgrammingLanguage,
  fetchLanguages,
  deleteLanguage
} from '../api/programing-language'
import EditLanguageModal from '../components/EditeLanguageModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@/shadcn/components/ui/table'
import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/shadcn/components/ui/dialog'
import { useNavigate } from 'react-router-dom'

export default function LanguageList({ token }: { token: string }) {
  const [languages, setLanguages] = useState<ProgrammingLanguage[]>([])
  const [editLanguageId, setEditLanguageId] = useState<string | null>(null)
  const [deleteLanguageId, setDeleteLanguageId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchLanguages(token)
      setLanguages(langs)
    }
    loadLanguages()
  }, [token])

  const handleDelete = async (id: string) => {
    await deleteLanguage(id, token)
    setLanguages(languages.filter((lang) => lang.id !== id))
    setDeleteLanguageId(null)
  }

  const handleRowClick = (id: string) => {
    navigate(`/?action=quick-view&id=${id}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Programming Languages</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {languages.map((lang) => (
            <TableRow key={lang.id} onClick={() => handleRowClick(lang.id)}>
              <TableCell>{lang.id}</TableCell>
              <TableCell>{lang.name}</TableCell>
              <TableCell>{lang.creator}</TableCell>
              <TableCell>
                <Button onClick={() => setEditLanguageId(lang.id)}>Edit</Button>
                <Button onClick={() => setDeleteLanguageId(lang.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modale pentru Editare */}
      {editLanguageId && (
        <EditLanguageModal
          language={languages.find((lang) => lang.id === editLanguageId)!}
          token={token}
          onClose={() => setEditLanguageId(null)}
          onUpdate={(updatedLang) => {
            setLanguages((prev) =>
              prev.map((lang) =>
                lang.id === updatedLang.id ? updatedLang : lang
              )
            )
            setEditLanguageId(null)
          }}
        />
      )}

      {/* Modale pentru Ștergere */}
      {deleteLanguageId && (
        <Dialog open={true}>
          <DialogHeader>Delete Language</DialogHeader>
          <DialogContent>
            Are you sure you want to delete this language?
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => handleDelete(deleteLanguageId!)}>
                Delete
              </Button>
              <Button onClick={() => setDeleteLanguageId(null)}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
