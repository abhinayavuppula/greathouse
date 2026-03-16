import { Bell, LogOut, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { api } from '../../lib/api'
import { toast } from 'sonner'
import { queryClient } from '../../lib/queryClient'

interface TopBarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
    } catch {
      // OK to fail silently
    }
    logout()
    queryClient.clear()
    navigate('/login')
    toast.success('Logged out successfully')
  }

  return (
    <header className="h-14 bg-white border-b border-border flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {actions}

        <button
          onClick={handleLogout}
          title="Log out"
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  )
}
