import { useState, useEffect } from 'react'
import { fetchLanguages, deleteLanguage } from '../api/programing-language'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shadcn/components/ui/table'
import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/shadcn/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import { IdCard } from 'lucide-react'
import { Input } from '@/shadcn/components/ui/input'
import { IProgrammingLanguage } from 'types'

export default function LanguageList({ token }: { token: string }) {
  const [languages, setLanguages] = useState<IProgrammingLanguage[]>([])
  const [deleteLanguageId, setDeleteLanguageId] = useState<string | null>(null)
  const navigate = useNavigate()

  // Fetch the languages on component mount
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
    navigate(`?action=edit&id=${id}`)
  }

  return (
    <div className="flex flex-col max-w-6xl mx-auto justify-center items-center h-screen">
      <div className="flex justify-between items-center pb-4 w-full">
        <Input placeholder="Search..." className="w-fit" />
        <Button className="">hidden</Button>
      </div>

      <Table className="border rounded-md w-full">
        <TableHeader>
          <TableRow>
            <TableHead>
              <IdCard className="w-6 h-6" />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {languages.map((lang) => (
            <TableRow key={lang.id} className="cursor-pointer">
              <TableCell onClick={() => handleRowClick(lang.id)}>
                {lang.id}
              </TableCell>
              <TableCell onClick={() => handleRowClick(lang.id)}>
                {lang.name}
              </TableCell>
              <TableCell onClick={() => handleRowClick(lang.id)}>
                {lang.creator}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button onClick={() => navigate(`/edit/${lang.id}`)}>
                  Edit
                </Button>
                <Button onClick={() => setDeleteLanguageId(lang.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog pentru confirmare ștergere */}
      {deleteLanguageId && (
        <Dialog open={true} onOpenChange={() => setDeleteLanguageId(null)}>
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
