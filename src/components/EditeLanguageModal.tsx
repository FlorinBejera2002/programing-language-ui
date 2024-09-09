import { useState } from 'react'
import { ProgrammingLanguage, updateLanguage } from '../api/programing-language'
import { Button } from '../shadcn/components/ui/button'
import { Input } from '../shadcn/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader
} from '../shadcn/components/ui/dialog'

export default function EditLanguageModal({
  language,
  token,
  onClose,
  onUpdate
}: {
  language: ProgrammingLanguage
  token: string
  onClose: () => void
  onUpdate: (updatedLanguage: ProgrammingLanguage) => void
}) {
  const [updatedLanguage, setUpdatedLanguage] = useState(language)

  const handleSave = async () => {
    const updatedLang = await updateLanguage(
      language.id,
      updatedLanguage,
      token
    )
    onUpdate(updatedLang)
  }

  return (
    <Dialog open={false}>
      <DialogContent className="flex flex-col gap-4 bg-white p-6 rounded-lg">
        <DialogHeader>Edit Language</DialogHeader>
        <Input
          value={updatedLanguage.name}
          onChange={(e: any) =>
            setUpdatedLanguage({ ...updatedLanguage, name: e.target.value })
          }
        />
        <Input
          value={updatedLanguage.creator}
          onChange={(e: any) =>
            setUpdatedLanguage({ ...updatedLanguage, creator: e.target.value })
          }
        />
        {/* Include other fields similarly */}
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
  )
}
