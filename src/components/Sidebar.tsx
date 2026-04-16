import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  GridIcon,
  SearchIcon,
  FlaskIcon,
  PenIcon,
  FileIcon,
  CloseIcon,
} from './Icons'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface SidebarLinkProps {
  to: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  onNavigate: () => void
}

const NAV_LINKS = [
  { to: '/', icon: HomeIcon, label: 'Home Feed (AI News)' },
  { to: '/categories', icon: GridIcon, label: 'Categories' },
  { to: '/search', icon: SearchIcon, label: 'Search Results' },
  { to: '/playground', icon: FlaskIcon, label: 'AI Playground' },
]

const CONTENT_LINKS = [
  { to: '/create', icon: PenIcon, label: 'Create / Edit Post' },
  { to: '/my-posts', icon: FileIcon, label: 'My Posts' },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[40] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-[50] w-64 flex flex-col border-r border-border backdrop-blur-sm bg-surface/95
          transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0 lg:shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L14 7L7 14L0 7L7 0Z" fill="#050505" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white tracking-wide">koby ai</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-muted hover:text-white transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, icon: Icon, label }) => (
            <SidebarLink key={to} to={to} icon={Icon} label={label} onNavigate={onClose} />
          ))}

          <div className="px-4 pt-6 pb-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Content
            </span>
          </div>

          {CONTENT_LINKS.map(({ to, icon: Icon, label }) => (
            <SidebarLink key={to} to={to} icon={Icon} label={label} onNavigate={onClose} />
          ))}
        </nav>

        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg">
            <div className="w-8 h-8 rounded-full border border-border bg-surface-card overflow-hidden">
              <img
                src="https://www.figma.com/api/mcp/asset/d64f9182-8685-495f-af37-defbcda9e86c"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Alex Writer</p>
              <p className="text-xs text-muted truncate">Profile & Settings</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

function SidebarLink({ to, icon: Icon, label, onNavigate }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
          isActive
            ? 'bg-accent/10 border border-accent/20 text-white font-medium'
            : 'text-muted hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span>{label}</span>
    </NavLink>
  )
}
