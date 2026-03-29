'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      href: '/dashboard/employee',
      icon: '📊'
    },
    {
      label: 'My Expenses',
      href: '/dashboard/employee?tab=expenses',
      icon: '💰'
    },
    {
      label: 'Settings',
      href: '/dashboard/employee?tab=settings',
      icon: '⚙️'
    }
  ]

  const summaryCards = [
    { label: 'Draft', value: expenses.filter(e => e.status === 'draft').length, color: 'bg-gray-500/10 text-gray-300' },
    { label: 'Pending', value: expenses.filter(e => e.status === 'pending').length, color: 'bg-blue-500/10 text-blue-300' },
    { label: 'Approved', value: expenses.filter(e => e.status === 'approved').length, color: 'bg-green-500/10 text-green-300' },
    { label: 'Rejected', value: expenses.filter(e => e.status === 'rejected').length, color: 'bg-red-500/10 text-red-300' }
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
            <h1 className="text-3xl font-bold text-foreground">My Expenses</h1>
            <p className="text-muted-foreground mt-2">Track and manage your expense submissions</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => (
              <Card key={i} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Expense Button */}
          <Button onClick={() => setShowForm(true)} size="lg" className="gap-2">
            + Submit New Expense
          </Button>

          {/* Expenses Table */}
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader>
              <CardTitle>Expense History</CardTitle>
              <CardDescription>All your submitted and draft expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left font-semibold text-foreground">ID</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Category</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Description</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Amount</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Date</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Stage</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.filter(e => e.amount > 0).map((expense) => (
                      <tr key={expense.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{expense.id}</td>
                        <td className="px-6 py-4 text-foreground text-sm">{expense.category}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm max-w-xs truncate">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 font-semibold text-foreground">${expense.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{expense.date}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={expense.status}>
                            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                          </StatusBadge>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">{expense.stage}</td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedExpense(expense)}
                            className="text-xs"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle>Submit Expense</CardTitle>
              <CardDescription>Fill in the details of your expense</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-input border border-input rounded-md text-foreground text-sm"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CAD</option>
                    <option>AUD</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-input border border-input rounded-md text-foreground text-sm"
                >
                  <option>Travel</option>
                  <option>Meals</option>
                  <option>Equipment</option>
                  <option>Software</option>
                  <option>Office</option>
                  <option>Training</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Describe what this expense is for..."
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-input border border-input rounded-md text-foreground text-sm resize-none h-20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Receipt</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or PDF (max. 5MB)</p>
                  <Input
                    type="file"
                    className="mt-2"
                    accept=".png,.jpg,.jpeg,.pdf"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
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
                  className="flex-1"
                  onClick={() => {
                    // Save as draft
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitExpense}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Expense Details Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-border">
              <CardTitle>{selectedExpense.id}</CardTitle>
              <CardDescription>{selectedExpense.category} Expense</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Amount</p>
                  <p className="text-lg font-bold text-foreground">${selectedExpense.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Date</p>
                  <p className="text-sm font-medium text-foreground">{selectedExpense.date}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Category</p>
                  <p className="text-sm font-medium text-foreground">{selectedExpense.category}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Status</p>
                  <StatusBadge status={selectedExpense.status}>
                    {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                  </StatusBadge>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-sm text-foreground">{selectedExpense.description}</p>
              </div>

              {/* Approval Timeline */}
              {selectedExpense.status !== 'draft' && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Approval Progress</p>
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
                  className="flex-1"
                  onClick={() => setSelectedExpense(null)}
                >
                  Close
                </Button>
                {selectedExpense.status === 'draft' && (
                  <Button
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
