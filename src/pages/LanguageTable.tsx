import React, { useState, useEffect } from 'react'
import {
  deleteLanguage,
  fetchLanguages,
  fetchLanguagesByKeyword
} from '../api/programing-language'
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
import { TriangleAlert, Trash2, Pencil, ArrowUp, ArrowDown } from 'lucide-react'
import { Input } from '@/shadcn/components/ui/input'
import { IProgrammingLanguage } from 'types'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shadcn/components/ui/select'

export const LanguageTable = ({ token }: { token: string }) => {
  const [languages, setLanguages] = useState<IProgrammingLanguage[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [alertDeleteLanguage, setAlertDeleteLanguage] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortBy, setSortBy] = useState('name')
  const [page, setPage] = useState(0)
  // const [pageSize] = useState(10)
  // const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    const loadLanguages = async () => {
      if (searchTerm !== '') {
        setLanguages([])
        const filterData = await fetchLanguagesByKeyword(
          searchTerm,
          sortOrder,
          sortBy,
          token
        )
        console.log('Languages after filtering and sorting:', filterData)
        setLanguages(filterData)
      } else {
        const data = await fetchLanguages(token)
        console.log('Languages without filtering:', data)
        setLanguages(data)
      }
    }
    loadLanguages()
  }, [searchTerm, sortOrder, sortBy, token])

  // useEffect(() => {
  //   const loadLanguages = async () => {
  //     try {
  //       const data = await fetchLanguagesWithPagination(page, pageSize, token)
  //       setLanguages(data.items)
  //       setTotalPages(data.totalPages)
  //     } catch (error) {
  //       console.error('Error loading languages:', error)
  //     }
  //   }

  //   loadLanguages()
  // }, [page, pageSize, token])

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
      <div className="flex justify-between items-center pb-4 w-full max-w-4xl">
        <Input
          placeholder="Search..."
          className="w-fit"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="">hidden</Button>
      </div>
      <div className="border rounded-md w-full max-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-6 h-6 pl-5" onClick={handleSelectAll}>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </TableHead>

              <TableHead>
                <Select value={''}>
                  <SelectTrigger className="border-none shadow-none space-x-2 ">
                    <SelectValue />
                    Nume
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value="asc"
                      onClick={() => {
                        setSortOrder('asc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowUp className="w-3 h-3" />
                        asc
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="desc"
                      onClick={() => {
                        setSortOrder('desc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowDown className="w-3 h-3" />
                        desc
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableHead>

              <TableHead>
                <Select value={''}>
                  <SelectTrigger className="border-none shadow-none space-x-2">
                    <SelectValue />
                    Creator
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value="asc"
                      onClick={() => {
                        setSortOrder('asc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowUp className="w-3 h-3" />
                        asc
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="desc"
                      onClick={() => {
                        setSortOrder('desc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowDown className="w-3 h-3" />
                        desc
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableHead>

              <TableHead>
                <Select value={''}>
                  <SelectTrigger className="border-none shadow-none space-x-2">
                    <SelectValue />
                    Relese Year
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value="asc"
                      onClick={() => {
                        setSortOrder('asc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowUp className="w-3 h-3" />
                        asc
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="desc"
                      onClick={() => {
                        setSortOrder('desc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowDown className="w-3 h-3" />
                        desc
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableHead>

              <TableHead>
                <Select value={''}>
                  <SelectTrigger className="border-none shadow-none space-x-2">
                    <SelectValue />
                    Populaity
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value="asc"
                      onClick={() => {
                        setSortOrder('asc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowUp className="w-3 h-3" />
                        asc
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="desc"
                      onClick={() => {
                        setSortOrder('desc')
                        setSortBy('id')
                      }}
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ArrowDown className="w-3 h-3" />
                        desc
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableHead>

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
              <TableRow
                key={lang.id}
                className="cursor-pointer hover:bg-gray-100 text-gray-700"
              >
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
                  {lang.name}
                </TableCell>

                <TableCell
                  onClick={() => navigate(`/programming-languages/${lang.id}`)}
                >
                  {lang.creator}
                </TableCell>
                <TableCell
                  onClick={() => navigate(`/programming-languages/${lang.id}`)}
                >
                  {lang.releaseYear}
                </TableCell>
                <TableCell
                  onClick={() => navigate(`/programming-languages/${lang.id}`)}
                >
                  {lang.popularity}
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation()
                      navigate(
                        `/programming-languages/edit-language/${lang.id}`
                      )
                    }}
                  >
                    <Pencil className="w-3 h-3" />
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
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(0, prev - 1))}
        >
          Previous
        </Button>
        <span>{/* Page {page + 1} of {totalPages} */}</span>
        <Button
        // disabled={page >= totalPages - 1}
        // onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
        >
          Next
        </Button>
      </div>

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
