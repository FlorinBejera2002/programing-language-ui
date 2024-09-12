import { IProgrammingLanguage, IProgrammingParadigm } from '../types'
import { fetchNewLanguage } from '../api/programing-language'
import { LanguageDetails } from '@/components/LanguageDetails'
import { useNavigate } from 'react-router-dom'
const initialLanguageState: IProgrammingLanguage = {
  id: '',
  name: '',
  creator: '',
  releaseYear: 0,
  popularity: 0,
  paradigm: IProgrammingParadigm.functional
}

export const AddLanguage = ({ token }: { token: string }) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center mt-20">
      <LanguageDetails
        buttonColor="bg-black"
        functionSubmit={async (languageData) => {
          await fetchNewLanguage(languageData, token)
          setTimeout(() => {
            navigate('/programming-languages/table-languages')
          }, 2000)
        }}
        textButton="Add Language"
        valueState={initialLanguageState}
        successText="Language added successfully"
      />
    </div>
  )
}
