'use client'

interface StatusBadgeProps {
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'urgent' | 'active' | 'inactive'
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const styles = {
    draft: 'glass-card border-white/20 text-white/70',
    pending: 'glass-card border-blue-400/50 text-blue-300 glow-blue-subtle',
    approved: 'glass-card border-green-400/50 text-green-300 glow-green-subtle',
    rejected: 'glass-card border-red-400/50 text-red-300 glow-red-subtle',
    urgent: 'glass-card border-orange-400/50 text-orange-300 glow-orange-subtle',
    active: 'glass-card border-green-400/50 text-green-300 glow-green-subtle',
    inactive: 'glass-card border-white/20 text-white/50'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all ${styles[status]}`}>
      {children}
    </span>
  )
}
