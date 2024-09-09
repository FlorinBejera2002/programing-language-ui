import { useState } from 'react'

import { IProgrammingLanguage, IProgrammingParadigm } from '../types'
import { Select } from '@/shadcn/components/ui/select'
import { FormLabel } from '@/shadcn/components/ui/form'
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'

type IProps = {
  buttonColor?: string
  functionSubmit: (language: IProgrammingLanguage) => void
  languageId?: number
  textButton: string
  valueState: IProgrammingLanguage
}

export const LanguageDetails = ({
  buttonColor,
  functionSubmit,
  languageId,
  textButton,
  valueState
}: IProps) => {
  const [name, setName] = useState(valueState.name)
  const [creator, setCreator] = useState(valueState.creator)
  const [releaseYear, setReleaseYear] = useState(valueState.releaseYear)
  const [popularity, setPopularity] = useState(valueState.popularity)
  const [paradigm, setParadigm] = useState<IProgrammingParadigm>(
    valueState.paradigm
  )

  const handleSubmit = () => {
    functionSubmit({
      releaseYear,
      id: languageId!,
      name,
      popularity,
      paradigm,
      creator
    })
  }

  return (
    <section className="space-y-6 w-96">
      <form>
        <div>
          <div className="mb-2 block">
            <FormLabel htmlFor="name">Name</FormLabel>
          </div>
          <Input onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <div className="mb-2 block">
            <FormLabel htmlFor="creator">Creator</FormLabel>
          </div>
          <Input onChange={(e) => setCreator(e.target.value)} value={creator} />
        </div>
        <div>
          <div className="mb-2 block">
            <FormLabel htmlFor="popularity">Popularity</FormLabel>
          </div>
          <Input
            onChange={(e) => setPopularity(Number(e.target.value))}
            value={popularity}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <FormLabel htmlFor="releaseYear">ReleaseYear</FormLabel>
          </div>
          <Input
            onChange={(e) => setReleaseYear(Number(e.target.value))}
            value={releaseYear}
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <FormLabel htmlFor="paradigm">Paradigm</FormLabel>
          </div>
          <Select
            onValueChange={(e: any) =>
              setParadigm(e.target.value as IProgrammingParadigm)
            }
            value={paradigm}
          >
            {Object.entries(IProgrammingParadigm).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>
        <Button className="" color={buttonColor} onClick={handleSubmit}>
          {textButton}
        </Button>
      </form>
    </section>
  )
}
