'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/status-badge'
import { RoleBadge } from '@/components/role-badge'
import AdminUserManagement from './components/user-management'
import AdminApprovalRules from './components/approval-rules'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail')
    const userRole = sessionStorage.getItem('userRole')
    if (!userEmail || userRole !== 'admin') {
      router.push('/login')
      return
    }
    setUser({ email: userEmail, role: userRole, company: 'Demo Company' })
  }, [router])

  if (!user) return null

  const navItems: NavItem[] = [
    {
      label: 'Overview',
      href: '/dashboard/admin',
      icon: '📊'
    },
    {
      label: 'Users',
      href: '/dashboard/admin?tab=users',
      icon: '👥'
    },
    {
      label: 'Approval Rules',
      href: '/dashboard/admin?tab=rules',
      icon: '⚙️'
    }
  ]

  const summaryCards = [
    { label: 'Total Users', value: '24', trend: '+3 this month' },
    { label: 'Pending Approvals', value: '12', trend: '-4 from last week' },
    { label: 'Approved This Month', value: '156', trend: '+12% increase' },
    { label: 'Rejected This Month', value: '8', trend: '2% rejection rate' }
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar items={navItems} userRole={user.role} companyName={user.company} />

      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage users and approval workflows</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === 'users'
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2.5 font-medium border-b-2 transition-all ${
                activeTab === 'rules'
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
            >
              Approval Rules
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, i) => (
                  <div key={i} className="glass-card-lg border-white/15 glow-blue-subtle">
                    <div className="pb-3">
                      <p className="text-xs font-medium text-white/60">{card.label}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">{card.value}</div>
                      <p className="text-xs text-white/50">{card.trend}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card-lg border-white/15">
                <div>
                  <h3 className="text-lg font-semibold text-white">Recent Approvals</h3>
                  <p className="text-white/60 text-sm mt-1">Latest expense approvals and rejections</p>
                </div>
                <div className="mt-6">
                  <div className="space-y-2">
                    {[
                      { id: 'EXP-001', user: 'Sarah Chen', amount: '$245.50', status: 'approved' },
                      { id: 'EXP-002', user: 'Mike Johnson', amount: '$1,230.00', status: 'pending' },
                      { id: 'EXP-003', user: 'Emma Williams', amount: '$89.99', status: 'approved' },
                      { id: 'EXP-004', user: 'John Davis', amount: '$456.75', status: 'rejected' },
                      { id: 'EXP-005', user: 'Lisa Brown', amount: '$678.00', status: 'pending' }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 glass-card border-white/10 hover:border-white/20 transition-all">
                        <div>
                          <p className="font-medium text-sm text-white">{item.id}</p>
                          <p className="text-xs text-white/60">{item.user}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-white">{item.amount}</p>
                          </div>
                          <StatusBadge status={item.status as any}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </StatusBadge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && <AdminUserManagement />}

          {/* Rules Tab */}
          {activeTab === 'rules' && <AdminApprovalRules />}
        </div>
      </main>
    </div>
  )
}
