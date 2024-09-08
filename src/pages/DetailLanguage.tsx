import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from '../shadcn/components/ui/dialog'
import { ProgrammingLanguage } from '../api/programing-language'
import { Button } from '../shadcn/components/ui/button'

export default function LanguageDetail({
  language,
  onClose
}: {
  language?: ProgrammingLanguage
  onClose?: () => void
}) {
  return (
    <Dialog show={true} onClose={onClose}>
      <DialogHeader>Language Details</DialogHeader>
      <DialogContent>
        <p>
          <strong>ID:</strong> {language!.id}
        </p>
        <p>
          <strong>Name:</strong> {language!.name}
        </p>
        <p>
          <strong>Creator:</strong> {language!.creator}
        </p>
        <p>
          <strong>Release Year:</strong> {language!.releaseYear}
        </p>
        <p>
          <strong>Paradigm:</strong> {language!.paradigm}
        </p>
      </DialogContent>
      <DialogFooter>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </Dialog>
  )
}
