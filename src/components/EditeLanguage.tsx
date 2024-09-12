import { useState, useEffect } from 'react'
import { fetchLanguageById, updateLanguage } from '../api/programing-language'
import { useNavigate, useParams } from 'react-router-dom'
import { IProgrammingLanguage } from '../types'
import { LanguageDetails } from './LanguageDetails'

type IProps = {
  token: string
}

export default function EditLanguageModal({ token }: IProps) {
  const [language, setLanguage] = useState<IProgrammingLanguage | null>(null)
  useState<IProgrammingLanguage | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchLanguageDetails = async () => {
      try {
        const fetchedLanguage = await fetchLanguageById(String(id), token)
        setLanguage(fetchedLanguage)
      } catch (error) {
        console.error('Failed to fetch language details', error)
      }
    }
    fetchLanguageDetails()
  }, [id, token])

  if (!language) return <div>Loading...</div>

  return (
    <div className="flex justify-center items-center mt-20">
      <LanguageDetails
        buttonColor="bg-black"
        functionSubmit={async ({
          name,
          creator,
          releaseYear,
          paradigm,
          popularity
        }) => {
          await updateLanguage(
            id as string,
            {
              name,
              creator,
              releaseYear,
              paradigm,
              popularity
            } as IProgrammingLanguage,
            token
          )

          setTimeout(() => {
            navigate('/programming-languages/table-languages')
          }, 2000)
        }}
        textButton="Save"
        valueState={language}
        successText="Language updated successfully"
      />
    </div>
  )
}
