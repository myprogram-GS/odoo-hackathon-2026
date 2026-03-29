'use client'

import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/status-badge'

interface ExpenseCardProps {
  id: string
  amount: number
  category: string
  description: string
  date: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  onClick?: () => void
}

export function ExpenseCard({
  id,
  amount,
  category,
  description,
  date,
  status,
  onClick
}: ExpenseCardProps) {
  return (
    <Card
      className="bg-card border-border cursor-pointer hover:border-primary/50 transition-all"
      onClick={onClick}
    >
      <CardContent className="pt-6 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-foreground">{id}</p>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <StatusBadge status={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StatusBadge>
        </div>

        <p className="text-sm text-foreground line-clamp-2">{description}</p>

        <div className="flex justify-between items-end pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">{date}</p>
          <p className="text-lg font-bold text-foreground">${amount.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
