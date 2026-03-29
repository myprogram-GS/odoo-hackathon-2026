'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  items: SidebarItem[]
  userRole: string
  companyName: string
}

export function Sidebar({ items, userRole, companyName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('userRole')
    router.push('/login')
  }

  const getRoleIcon = () => {
    switch(userRole) {
      case 'admin':
        return '⚙️'
      case 'manager':
        return '👥'
      case 'employee':
        return '👤'
      default:
        return '👤'
    }
  }

  const getRoleGlow = () => {
    switch(userRole) {
      case 'admin':
        return 'glow-cyan'
      case 'manager':
        return 'glow-purple'
      case 'employee':
        return 'glow-blue'
      default:
        return 'glow-blue'
    }
  }

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} glass-card border-r border-white/10 transition-all duration-300 flex flex-col h-screen rounded-none`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg glass-card flex items-center justify-center text-lg ${getRoleGlow()}`}>
            {getRoleIcon()}
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-white truncate">ReimbursePlus</div>
              <div className="text-xs text-white/60 truncate">{companyName}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all glass-card border-transparent ${
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-white/10 text-white border-white/20 glow-blue-subtle'
                : 'text-white/80 hover:bg-white/10 hover:border-white/15 hover:text-white'
            }`}
            title={!isOpen ? item.label : ''}
          >
            <div className="flex-shrink-0 w-5 h-5">{item.icon}</div>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {isOpen && (
          <div className="glass-card p-3 border-white/10">
            <div className="font-medium text-white text-xs mb-1">Role</div>
            <div className="capitalize text-white/80 text-sm font-medium">{userRole}</div>
          </div>
        )}
        <Button
          onClick={handleLogout}
          className={`glass-button glow-red-subtle bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/25 hover:border-red-500/50 font-medium ${!isOpen ? 'p-0 h-10 w-10' : 'w-full'}`}
        >
          {isOpen ? 'Logout' : '⎋'}
        </Button>
      </div>
    </div>
  )
}
