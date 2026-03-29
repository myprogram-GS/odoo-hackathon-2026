'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { ApprovalTimeline } from '@/components/approval-timeline'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface Expense {
  id: string
  requestOwner: string
  category: string
  status: 'pending' | 'approved' | 'rejected'
  totalAmount: number
  currentStage: string
}

export default function ManagerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedExpense, setSelectedExpense] = useState<any>(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail')
    const userRole = sessionStorage.getItem('userRole')
    if (!userEmail || userRole !== 'manager') {
      router.push('/login')
      return
    }
    setUser({ email: userEmail, role: userRole, company: 'Demo Company' })
  }, [router])

  if (!user) return null

  const navItems: NavItem[] = [
    {
      label: 'Approvals',
      href: '/manager',
      icon: '✓'
    },
    {
      label: 'Reports',
      href: '/manager',
      icon: '📈'
    },
    {
      label: 'Settings',
      href: '/manager',
      icon: '⚙️'
    }
  ]

  const expenses: Expense[] = [
    {
      id: 'EXP-001',
      requestOwner: 'Sarah Chen',
      category: 'Travel',
      status: 'pending',
      totalAmount: 450.50,
      currentStage: 'Manager Review'
    },
    {
      id: 'EXP-002',
      requestOwner: 'Mike Johnson',
      category: 'Meals',
      status: 'pending',
      totalAmount: 125.75,
      currentStage: 'Manager Review'
    },
    {
      id: 'EXP-003',
      requestOwner: 'Emma Williams',
      category: 'Equipment',
      status: 'approved',
      totalAmount: 890.00,
      currentStage: 'Completed'
    },
    {
      id: 'EXP-004',
      requestOwner: 'John Davis',
      category: 'Travel',
      status: 'rejected',
      totalAmount: 320.25,
      currentStage: 'Rejected'
    }
  ]

  const filteredExpenses = expenses.filter(e => {
    if (activeTab === 'pending') return e.status === 'pending'
    if (activeTab === 'approved') return e.status === 'approved'
    if (activeTab === 'rejected') return e.status === 'rejected'
    return true
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar items={navItems} userRole={user.role} companyName={user.company} />

      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">Approvals Queue</h1>
            <p className="text-white/60 mt-2">Review and approve employee expense requests</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === 'pending'
                  ? 'border-purple-400 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              Pending ({expenses.filter(e => e.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === 'approved'
                  ? 'border-green-400 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              Approved ({expenses.filter(e => e.status === 'approved').length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === 'rejected'
                  ? 'border-red-400 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              Rejected ({expenses.filter(e => e.status === 'rejected').length})
            </button>
          </div>

          {/* Approvals Table */}
          <div className="glass-card-lg border-white/15 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-3 text-left font-semibold text-white">Request ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Request Owner</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Category</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Current Stage</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{expense.id}</td>
                      <td className="px-6 py-4 text-white">{expense.requestOwner}</td>
                      <td className="px-6 py-4 text-white/70 text-sm">{expense.category}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={expense.status}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </StatusBadge>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">${expense.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-xs text-white/70">{expense.currentStage}</td>
                      <td className="px-6 py-4">
                        {expense.status === 'pending' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedExpense(expense)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            Review
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedExpense(expense)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            View
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Approval Details Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl glass-card-lg border-white/15 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">{selectedExpense.id}</h2>
              <p className="text-white/60 text-sm mt-1">Expense Request from {selectedExpense.requestOwner}</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Employee</p>
                  <p className="text-sm font-medium text-white">{selectedExpense.requestOwner}</p>
                </div>
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Category</p>
                  <p className="text-sm font-medium text-white">{selectedExpense.category}</p>
                </div>
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Total Amount</p>
                  <p className="text-sm font-medium text-white">${selectedExpense.totalAmount.toFixed(2)}</p>
                </div>
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Status</p>
                  <StatusBadge status={selectedExpense.status}>
                    {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                  </StatusBadge>
                </div>
              </div>

              {/* Approval Timeline */}
              <div>
                <p className="text-sm font-medium text-white mb-3">Approval Timeline</p>
                <ApprovalTimeline
                  steps={[
                    { name: 'Submitted', status: 'completed' },
                    { name: 'Manager Review', status: selectedExpense.status !== 'pending' ? 'completed' : 'current' },
                    { name: 'Admin Approval', status: 'pending' }
                  ]}
                />
              </div>

              {/* Comments */}
              {selectedExpense.status === 'pending' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">Approval/Rejection Note</label>
                  <textarea
                    placeholder="Add any notes or reasons for approval/rejection..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5 resize-none h-24"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {
                    setSelectedExpense(null)
                    setComment('')
                  }}
                >
                  Close
                </Button>
                {selectedExpense.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 glow-red-subtle bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/25"
                      onClick={() => {
                        setSelectedExpense(null)
                        setComment('')
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      className="flex-1 glow-green-subtle bg-green-500/30 text-green-300 border-green-500/50 hover:bg-green-500/40"
                      onClick={() => {
                        setSelectedExpense(null)
                        setComment('')
                      }}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
