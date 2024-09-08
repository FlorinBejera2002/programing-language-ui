export default function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      onClick={onLogout}
      className="text-white bg-red-500 px-4 py-2 rounded"
    >
      Logout
    </button>
  )
}
