import { Avatar, AvatarImage } from '@/shadcn/components/ui/avatar'
import { Button } from '../shadcn/components/ui/button'
export default function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <nav className="  p-4 flex justify-between">
      <div>Programming Languages</div>
      <Button
        className="relative h-10 w-10 rounded-full bg-gray-200"
        variant="ghost"
      >
        <Avatar className="h-10 w-10 ">
          <AvatarImage alt="user-logo" src="/boy.png" />
        </Avatar>
      </Button>
    </nav>
  )
}

// <Button onClick={onLogout} className="bg-red-500">
//   Logout
// </Button>
