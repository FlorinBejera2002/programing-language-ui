import { useNavigate } from 'react-router-dom'
import { Button } from '../shadcn/components/ui/button'
export default function Navbar({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <div>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/newLanguage')}>Add Language</Button>
      </div>
      <Button onClick={onLogout} className="bg-red-500">
        Logout
      </Button>
    </nav>
  )
}
