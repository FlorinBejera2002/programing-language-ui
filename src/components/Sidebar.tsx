import { Button } from '@/shadcn/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/shadcn/components/ui/dropdown-menu'
import {
  Table,
  LogOut,
  Code,
  ListPlus,
  LayoutDashboard,
  CircleUserRound
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
type IProps = {
  username: string
  onLogout: () => void
}
export const Sidebar = ({ username, onLogout }: IProps) => {
  const navigate = useNavigate()
  return (
    <div className="h-screen w-[260px] bg-gradient-to-tl from-[#C0C7C7] to-[#5A6A6A] text-white flex flex-col p-4 fixed left-0">
      <h1 className="text-2xl font-bold mb-6 flex items-center border-b border-gray-400 pb-4">
        <Code className="w-6 h-6 mr-2" /> Languages
      </h1>

      <nav className="flex flex-col gap-4 items-start">
        <Button
          onClick={() => navigate('/programming-languages/overview')}
          variant="ghost"
          className="flex gap-2 items-center text-md w-full justify-start hover:bg-[#b7bfbf]"
        >
          <LayoutDashboard className="w-6 h-6" /> Overview
        </Button>

        <Button
          onClick={() => navigate('/programming-languages/table-languages')}
          variant="ghost"
          className="flex gap-2 items-center text-md w-full justify-start hover:bg-[#b7bfbf]"
        >
          <Table className="w-6 h-6" /> Table Languages
        </Button>

        <Button
          onClick={() => navigate('/programming-languages/new-language')}
          variant="ghost"
          className="flex gap-2 items-center text-md w-full justify-start hover:bg-[#b7bfbf]"
        >
          <ListPlus className="w-6 h-6" /> Add Language
        </Button>

        <div className=" "></div>
        <DropdownMenu>
          <DropdownMenuTrigger className="bottom-0 absolute left-0 flex gap-2 shadow-xl items-center p-3 w-full justify-start bg-[#5A6A6A]">
            <CircleUserRound className="w-6 h-6 " />
            <span className="mt-1 text-xl font-bold ">{username}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Button
                onClick={onLogout}
                variant="ghost"
                className="flex gap-2 bg-red-500 w-44 text-md font-bold items-center justify-start"
              >
                <LogOut className="w-5 h-5" /> Logout
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  )
}
