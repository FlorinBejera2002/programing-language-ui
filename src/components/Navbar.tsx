import { useRouter } from 'next/router'
import { Button } from '@/shadcn/components/ui/button'
export default function Navbar({ onLogout }: { onLogout: () => void }) {
  const router = useRouter()

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <div>
        <Button onClick={() => router.push('/')}>Home</Button>
        <Button onClick={() => router.push('/newLanguage')}>
          Add Language
        </Button>
      </div>
      <Button onClick={onLogout} className="bg-red-500">
        Logout
      </Button>
    </nav>
  )
}
