import React, { useState, useEffect } from 'react'
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/shadcn/components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'
import { IdCard, TriangleAlert, Trash2, Pencil } from 'lucide-react'
import { Input } from '@/shadcn/components/ui/input'
import { IProgrammingLanguage } from 'types'
import { Checkbox } from '@/shadcn/components/ui/checkbox'

export const LanguageTable = ({ token }: { token: string }) => {
  const [languages, setLanguages] = useState<IProgrammingLanguage[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [alertDeleteLanguage, setAlertDeleteLanguage] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchLanguages(token)
      setLanguages(langs)
    }
    loadLanguages()
  }, [token])

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLanguages([])
    } else {
      setSelectedLanguages(languages.map((lang) => lang.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectLanguage = (id: string) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(
        selectedLanguages.filter((languageId) => languageId !== id)
      )
    } else {
      setSelectedLanguages([...selectedLanguages, id])
    }
  }

  const handleDeleteSelected = async () => {
    try {
      await selectedLanguages.map((languageId) =>
        deleteLanguage(languageId, token)
      )
      setLanguages(
        languages.filter((lang) => !selectedLanguages.includes(lang.id))
      )
      setSelectedLanguages([])
      setAlertDeleteLanguage(false)
    } catch (error) {
      console.error(
        'There was a problem deleting the selected languages:',
        error
      )
    }
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
            <TableHead className="w-6 h-6" onClick={handleSelectAll}>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </TableHead>
            <TableHead>
              <IdCard className="w-6 h-6" />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="text-end">
              {selectedLanguages.length > 0 && (
                <Button
                  className="bg-red-500 text-white "
                  onClick={() => {
                    setAlertDeleteLanguage(true)
                  }}
                >
                  <Trash2 className="w-6 h-6" />
                </Button>
              )}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {languages.map((lang) => (
            <TableRow key={lang.id} className="cursor-pointer">
              <TableCell
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectLanguage(lang.id)
                }}
              >
                <Checkbox
                  checked={selectedLanguages.includes(lang.id)}
                  className="z-20 cursor-pointer"
                  onChange={(e) => {
                    e.stopPropagation()
                    handleSelectLanguage(lang.id)
                  }}
                />
              </TableCell>
              <TableCell
                onClick={() => navigate(`/programming-languages/${lang.id}`)}
              >
                {lang.id}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/programming-languages/${lang.id}`)}
              >
                {lang.name}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/programming-languages/${lang.id}`)}
              >
                {lang.creator}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    navigate(`/programming-languages/edit-language/${lang.id}`)
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  className="text-red-500"
                  onClick={() => {
                    setSelectedLanguages([lang.id])
                    setAlertDeleteLanguage(true)
                  }}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {alertDeleteLanguage && (
        <AlertDialog
          open={alertDeleteLanguage}
          onOpenChange={setAlertDeleteLanguage}
        >
          <AlertDialogContent className="bg-white max-w-xs p-5">
            <AlertDialogHeader className="flex flex-col gap-2 justify-center items-center">
              <TriangleAlert className="w-10 h-10 text-red-700" />
              <AlertDialogTitle className="text-lg font-semibold">
                Are you sure you want to delete this language?
              </AlertDialogTitle>
            </AlertDialogHeader>

            <div className="flex justify-between mt-4">
              <Button
                onClick={() => {
                  setSelectedLanguages([])
                  setAlertDeleteLanguage(false)
                }}
                className="bg-black text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteSelected}
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
