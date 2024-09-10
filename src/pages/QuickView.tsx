import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '../shadcn/components/ui/sheet'
import {
  Code,
  IdCard,
  UserPlus,
  CalendarDays,
  Code2,
  Layers
} from 'lucide-react'
import { Card } from '@/shadcn/components/ui/card'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchLanguageById } from '../api/programing-language'
import { IProgrammingLanguage } from 'types'

export const LanguageDetail = ({ token }: { token: string }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [language, setLanguage] = useState<IProgrammingLanguage | null>(null)

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const languageDetails = await fetchLanguageById(id, token)
          setLanguage(languageDetails)
        } catch (error) {
          console.error('Failed to fetch language details:', error)
        }
      }
      fetchDetails()
    }
  }, [id, token])

  const handleClose = () => {
    navigate('/programming-languages')
  }

  return (
    <Sheet open={!!id} onOpenChange={handleClose}>
      <SheetContent className="bg-white p-6 rounded-tl-md rounded-bl-md gap-5 flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Code className="w-6 h-6 mr-2" />
            Details
          </SheetTitle>
        </SheetHeader>
        {language && (
          <Card className="flex flex-col gap-2 p-3">
            <div className="flex items-center gap-2">
              <IdCard className="w-4 h-4" />
              {language.id}
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              {language.name}
            </div>
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              {language.creator}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {language.releaseYear}
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {language.paradigm}
            </div>
          </Card>
        )}
      </SheetContent>
    </Sheet>
  )
}
