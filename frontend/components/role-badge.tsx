'use client'

interface RoleBadgeProps {
  role: 'admin' | 'manager' | 'employee'
  children: React.ReactNode
}

export function RoleBadge({ role, children }: RoleBadgeProps) {
  const styles = {
    admin: 'glass-card border-cyan-400/50 text-cyan-300 glow-blue-subtle',
    manager: 'glass-card border-purple-400/50 text-purple-300 glow-purple-subtle',
    employee: 'glass-card border-blue-400/50 text-blue-300 glow-blue-subtle'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all ${styles[role]}`}>
      {children}
    </span>
  )
}
