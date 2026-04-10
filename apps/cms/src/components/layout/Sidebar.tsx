import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Package,
  Grid3X3,
  Layers,
  Image,
  Palette,
  Star,
  Users,
  MessageSquare,
  Mail,
  Settings,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { cn } from '../../lib/utils'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pages', icon: FileText, label: 'Pages' },
  { href: '/products', icon: Package, label: 'Products' },
  { href: '/categories', icon: Grid3X3, label: 'Categories' },
  { href: '/collections', icon: Layers, label: 'Collections' },
  { href: '/media', icon: Image, label: 'Media' },
  { href: '/theme', icon: Palette, label: 'Theme' },
  { type: 'divider', label: 'Content' },
  { href: '/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/team', icon: Users, label: 'Team' },
  { href: '/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { href: '/newsletter', icon: Mail, label: 'Newsletter' },
  { type: 'divider', label: 'System' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'https://greathouses.in'

export function Sidebar() {
  const location = useLocation()
  const { user } = useAuthStore()

  return (
    <aside className="w-[240px] flex-shrink-0 h-screen bg-sidebar-bg border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <p className="text-sidebar-active font-semibold text-sm tracking-widest uppercase">Great Houses</p>
        <p className="text-sidebar-muted text-xs mt-0.5">CMS Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item, i) => {
          if ('type' in item && item.type === 'divider') {
            return (
              <div key={i} className="px-3 pt-5 pb-1">
                <p className="text-[10px] text-sidebar-muted font-medium tracking-widest uppercase">{item.label}</p>
              </div>
            )
          }

          const NavItem = item as typeof navItems[0] & { href: string; icon: typeof LayoutDashboard }
          const isActive = location.pathname === NavItem.href ||
            (NavItem.href !== '/' && location.pathname.startsWith(NavItem.href))

          return (
            <Link
              key={NavItem.href}
              to={NavItem.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 group mb-0.5',
                isActive
                  ? 'bg-sidebar-hover text-sidebar-active'
                  : 'text-sidebar-muted hover:text-sidebar-text hover:bg-sidebar-hover'
              )}
            >
              <NavItem.icon
                size={16}
                className={cn(
                  'flex-shrink-0 transition-colors',
                  isActive ? 'text-sidebar-active' : 'text-sidebar-muted group-hover:text-sidebar-text'
                )}
              />
              <span className="flex-1">{NavItem.label}</span>
              {isActive && <ChevronRight size={12} className="text-sidebar-active opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* User + View Site */}
      <div className="border-t border-sidebar-border p-4 space-y-3">
        <a
          href={FRONTEND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sidebar-muted hover:text-gold text-xs transition-colors"
        >
          <ExternalLink size={12} />
          View Live Site
        </a>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <span className="text-gold text-xs font-semibold">
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sidebar-text text-xs font-medium truncate">{user?.name}</p>
            <p className="text-sidebar-muted text-[10px] truncate">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
