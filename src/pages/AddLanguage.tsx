import { useNavigate } from 'react-router-dom'

import { IProgrammingLanguage, IProgrammingParadigm } from '../types'
import { fetchNewLanguage } from '../api/programing-language'
import { LanguageDetails } from '@/components/LanguageDetails'
const initialLanguageState: IProgrammingLanguage = {
  id: 0,
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
        buttonColor="blue"
        functionSubmit={async (languageData) => {
          await fetchNewLanguage(languageData, token)
          navigate('/')
        }}
        textButton="Add Language"
        valueState={initialLanguageState}
      />
    </div>
  )
}
