'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/status-badge'
import { ApprovalTimeline } from '@/components/approval-timeline'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  stage: string
}

export default function EmployeeDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'EXP-101',
      amount: 245.50,
      category: 'Travel',
      description: 'Flight to New York for client meeting',
      date: '2024-03-15',
      status: 'approved',
      stage: 'Completed'
    },
    {
      id: 'EXP-102',
      amount: 89.99,
      category: 'Meals',
      description: 'Team lunch celebration',
      date: '2024-03-10',
      status: 'approved',
      stage: 'Completed'
    },
    {
      id: 'EXP-103',
      amount: 450.00,
      category: 'Travel',
      description: 'Hotel accommodation for project',
      date: '2024-03-18',
      status: 'pending',
      stage: 'Manager Review'
    },
    {
      id: 'EXP-104',
      amount: 0,
      category: '',
      description: '',
      date: '',
      status: 'draft',
      stage: 'Draft'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<any>(null)
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    category: 'Travel',
    description: '',
    date: '',
    receipt: null
  })

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail')
    const userRole = sessionStorage.getItem('userRole')
    if (!userEmail || userRole !== 'employee') {
      router.push('/login')
      return
    }
    setUser({ email: userEmail, role: userRole, company: 'Demo Company' })
  }, [router])

  if (!user) return null

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/employee',
      icon: '📊'
    },
    {
      label: 'My Expenses',
      href: '/employee',
      icon: '💰'
    },
    {
      label: 'Settings',
      href: '/employee',
      icon: '⚙️'
    }
  ]

  const summaryCards = [
    { label: 'Draft', value: expenses.filter(e => e.status === 'draft').length },
    { label: 'Pending', value: expenses.filter(e => e.status === 'pending').length },
    { label: 'Approved', value: expenses.filter(e => e.status === 'approved').length },
    { label: 'Rejected', value: expenses.filter(e => e.status === 'rejected').length }
  ]

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitExpense = () => {
    if (formData.amount && formData.category && formData.description && formData.date) {
      const newExpense: Expense = {
        id: `EXP-${String(expenses.length + 100).slice(-3)}`,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
        status: 'pending',
        stage: 'Manager Review'
      }
      setExpenses([...expenses, newExpense])
      setShowForm(false)
      setFormData({
        amount: '',
        currency: 'USD',
        category: 'Travel',
        description: '',
        date: '',
        receipt: null
      })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar items={navItems} userRole={user.role} companyName={user.company} />

      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white">My Expenses</h1>
            <p className="text-white/60 mt-2">Track and manage your expense submissions</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => (
              <div key={i} className="glass-card-lg border-white/15 glow-blue-subtle">
                <div className="pb-3">
                  <p className="text-xs font-medium text-white/60">{card.label}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">{card.value}</div>
                  <p className="text-xs text-white/50">Expense records</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Expense Button */}
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="gap-2 glow-blue-subtle bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border-white/20 hover:border-cyan-400/50 hover:from-cyan-500/40 hover:to-blue-500/40"
          >
            + Submit New Expense
          </Button>

          {/* Expenses Table */}
          <div className="glass-card-lg border-white/15 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Expense History</h3>
              <p className="text-white/60 text-sm mt-1">All your submitted and draft expenses</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-3 text-left font-semibold text-white">ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Category</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Description</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Stage</th>
                    <th className="px-6 py-3 text-left font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.filter(e => e.amount > 0).map((expense) => (
                    <tr key={expense.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{expense.id}</td>
                      <td className="px-6 py-4 text-white text-sm">{expense.category}</td>
                      <td className="px-6 py-4 text-white/70 text-sm max-w-xs truncate">
                        {expense.description}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">${expense.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-white/70 text-sm">{expense.date}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={expense.status}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </StatusBadge>
                      </td>
                      <td className="px-6 py-4 text-xs text-white/70">{expense.stage}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedExpense(expense)}
                          className="text-xs bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl glass-card-lg border-white/15">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Submit Expense</h2>
              <p className="text-white/60 text-sm mt-1">Fill in the details of your expense</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    step="0.01"
                    className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleFormChange}
                    className="glass-input border-white/10 text-white bg-white/5 w-full"
                  >
                    <option value="USD" className="bg-slate-900">USD</option>
                    <option value="EUR" className="bg-slate-900">EUR</option>
                    <option value="GBP" className="bg-slate-900">GBP</option>
                    <option value="CAD" className="bg-slate-900">CAD</option>
                    <option value="AUD" className="bg-slate-900">AUD</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="glass-input border-white/10 text-white bg-white/5 w-full"
                >
                  <option value="Travel" className="bg-slate-900">Travel</option>
                  <option value="Meals" className="bg-slate-900">Meals</option>
                  <option value="Equipment" className="bg-slate-900">Equipment</option>
                  <option value="Software" className="bg-slate-900">Software</option>
                  <option value="Office" className="bg-slate-900">Office</option>
                  <option value="Training" className="bg-slate-900">Training</option>
                  <option value="Other" className="bg-slate-900">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Description</label>
                <textarea
                  placeholder="Describe what this expense is for..."
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5 resize-none h-20 w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Date</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="glass-input border-white/10 text-white bg-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Receipt</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                  <p className="text-sm text-white/60 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-white/50">PNG, JPG or PDF (max. 5MB)</p>
                  <Input
                    type="file"
                    className="mt-2 glass-input border-white/10 text-white/70"
                    accept=".png,.jpg,.jpeg,.pdf"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({
                      amount: '',
                      currency: 'USD',
                      category: 'Travel',
                      description: '',
                      date: '',
                      receipt: null
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {
                    // Save as draft
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  className="flex-1 glow-blue-subtle bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border-white/20 hover:border-cyan-400/50 hover:from-cyan-500/40 hover:to-blue-500/40"
                  onClick={handleSubmitExpense}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expense Details Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl glass-card-lg border-white/15 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">{selectedExpense.id}</h2>
              <p className="text-white/60 text-sm mt-1">{selectedExpense.category} Expense</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Amount</p>
                  <p className="text-lg font-bold text-white">${selectedExpense.amount.toFixed(2)}</p>
                </div>
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Date</p>
                  <p className="text-sm font-medium text-white">{selectedExpense.date}</p>
                </div>
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Category</p>
                  <p className="text-sm font-medium text-white">{selectedExpense.category}</p>
                </div>
                <div className="glass-card p-3 border-white/10">
                  <p className="text-xs font-medium text-white/60 mb-1">Status</p>
                  <StatusBadge status={selectedExpense.status}>
                    {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                  </StatusBadge>
                </div>
              </div>

              <div className="glass-card p-4 border-white/10">
                <p className="text-xs font-medium text-white/60 mb-2">Description</p>
                <p className="text-sm text-white">{selectedExpense.description}</p>
              </div>

              {/* Approval Timeline */}
              {selectedExpense.status !== 'draft' && (
                <div>
                  <p className="text-sm font-medium text-white mb-3">Approval Progress</p>
                  <ApprovalTimeline
                    steps={[
                      { name: 'Submitted', status: 'completed' },
                      { name: 'Manager Review', status: selectedExpense.status !== 'pending' ? 'completed' : 'current' },
                      { name: 'Admin Approval', status: selectedExpense.status === 'approved' ? 'completed' : 'pending' }
                    ]}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 glow-blue-subtle bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border-white/20 hover:border-cyan-400/50 hover:from-cyan-500/40 hover:to-blue-500/40"
                  onClick={() => setSelectedExpense(null)}
                >
                  Close
                </Button>
                {selectedExpense.status === 'draft' && (
                  <Button
                    variant="outline"
                    className="flex-1 glow-red-subtle bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/25"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
