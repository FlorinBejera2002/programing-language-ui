import React, { useState } from 'react'

import { IProgrammingLanguage, IProgrammingParadigm } from '../types'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/shadcn/components/ui/select'
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'
import { Card } from '@/shadcn/components/ui/card'
import { cn } from '../lib/utils'

type IProps = {
  buttonColor?: string
  functionSubmit: (language: IProgrammingLanguage) => void
  languageId?: string
  textButton: string
  valueState: IProgrammingLanguage
  successText?: string
}

export const LanguageDetails = ({
  buttonColor,
  functionSubmit,
  languageId,
  textButton,
  valueState,
  successText
}: IProps) => {
  const [name, setName] = useState(valueState.name)
  const [creator, setCreator] = useState(valueState.creator)
  const [releaseYear, setReleaseYear] = useState(valueState.releaseYear)
  const [popularity, setPopularity] = useState(valueState.popularity)
  const [paradigm, setParadigm] = useState<IProgrammingParadigm>(
    valueState.paradigm
  )
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      functionSubmit({
        releaseYear,
        id: languageId || valueState.id,
        name,
        popularity,
        paradigm,
        creator
      })
      setSuccessMessage(true)
      setErrorMessage(false)
    } catch (error) {
      console.error('Failed to fetch language details:', error)
      setSuccessMessage(false)
      setErrorMessage(true)
    }
  }

  return (
    <section className="space-y-6 w-[500px]">
      <Card className="max-w-4xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <label className="font-semibold text-sm" htmlFor="name">
                Name
              </label>
            </div>
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div>
            <div className="mb-2 block">
              <label className="font-semibold text-sm" htmlFor="creator">
                Creator
              </label>
            </div>
            <Input
              onChange={(e) => setCreator(e.target.value)}
              value={creator}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label className="font-semibold text-sm" htmlFor="popularity">
                Popularity
              </label>
            </div>
            <Input
              onChange={(e) => setPopularity(Number(e.target.value))}
              value={popularity}
              type="number"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label className="font-semibold text-sm" htmlFor="releaseYear">
                ReleaseYear
              </label>
            </div>
            <Input
              onChange={(e) => setReleaseYear(Number(e.target.value))}
              value={releaseYear}
              type="number"
            />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <label className="font-semibold text-sm" htmlFor="paradigm">
                Paradigm
              </label>
            </div>
            <Select
              value={paradigm}
              onValueChange={(value) =>
                setParadigm(value as IProgrammingParadigm)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a paradigm" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {Object.entries(IProgrammingParadigm).map(([key, value]) => (
                  <SelectItem
                    key={key}
                    value={value}
                    className="hover:bg-gray-100"
                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end items-center gap-20 mt-5">
            {successMessage && (
              <div className="text-sm text-green-500">
                <span>{successText}</span>
              </div>
            )}
            {errorMessage && (
              <div className="text-sm text-red-500">
                <span>Failed to fetch language details</span>
              </div>
            )}
            <Button
              className={cn(` w-fit text-white ${buttonColor}`)}
              type="submit"
            >
              {textButton}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}
