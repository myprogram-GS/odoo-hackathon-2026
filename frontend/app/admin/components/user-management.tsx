'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RoleBadge } from '@/components/role-badge'

const mockUsers = [
  { id: '1', name: 'Sarah Chen', role: 'manager', manager: '-', email: 'sarah@company.com' },
  { id: '2', name: 'Mike Johnson', role: 'employee', manager: 'Sarah Chen', email: 'mike@company.com' },
  { id: '3', name: 'Emma Williams', role: 'employee', manager: 'Sarah Chen', email: 'emma@company.com' },
  { id: '4', name: 'John Davis', role: 'manager', manager: '-', email: 'john@company.com' },
  { id: '5', name: 'Lisa Brown', role: 'employee', manager: 'John Davis', email: 'lisa@company.com' },
  { id: '6', name: 'Alex Martinez', role: 'employee', manager: 'John Davis', email: 'alex@company.com' }
]

export default function AdminUserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          + Add User
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search users by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {/* Users Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-6 py-3 text-left font-semibold text-foreground">User</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Role</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Manager</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role as any}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </RoleBadge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.manager}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Form Modal */}
      {(showForm || selectedUser) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card">
            <CardHeader>
              <CardTitle>{selectedUser ? 'Edit User' : 'Add New User'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Full name" defaultValue={selectedUser?.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="user@company.com" defaultValue={selectedUser?.email} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <select className="w-full px-3 py-2 bg-input border border-input rounded-md text-foreground text-sm">
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Manager</label>
                <select className="w-full px-3 py-2 bg-input border border-input rounded-md text-foreground text-sm">
                  <option>-</option>
                  <option>Sarah Chen</option>
                  <option>John Davis</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowForm(false)
                    setSelectedUser(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowForm(false)
                    setSelectedUser(null)
                  }}
                >
                  {selectedUser ? 'Update' : 'Create'} User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
