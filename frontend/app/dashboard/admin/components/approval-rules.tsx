'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminApprovalRules() {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Standard Flow',
      flowType: 'sequential',
      approvers: ['Manager', 'Admin'],
      threshold: 100,
      managerApprover: true,
      specialApprover: false
    },
    {
      id: 2,
      name: 'High Value Flow',
      flowType: 'sequential',
      approvers: ['Manager', 'Finance Lead', 'CFO'],
      threshold: 1000,
      managerApprover: true,
      specialApprover: true
    }
  ])

  const [editingRule, setEditingRule] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Approval Rules Configuration</h2>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          + New Rule
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Configure approval workflows, sequence of approvers, and thresholds
      </p>

      {/* Rules Cards */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  <CardDescription>Threshold: ${rule.threshold}+</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingRule(rule)
                      setShowForm(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Flow Type</p>
                  <p className="text-sm capitalize text-foreground">{rule.flowType}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Manager Approver</p>
                  <p className="text-sm text-foreground">{rule.managerApprover ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Approval Sequence</p>
                <div className="flex gap-2 flex-wrap">
                  {rule.approvers.map((approver, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground">
                        {approver}
                      </span>
                      {i < rule.approvers.length - 1 && (
                        <span className="text-muted-foreground">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {rule.specialApprover && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-xs font-medium text-blue-300">Special Approver Enabled</p>
                  <p className="text-xs text-blue-200 mt-1">
                    Requires approval from designated special approver for high-value requests
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card">
            <CardHeader>
              <CardTitle>{editingRule ? 'Edit Approval Rule' : 'Create New Rule'}</CardTitle>
              <CardDescription>Configure the approval workflow for this rule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rule Name</label>
                  <Input
                    placeholder="e.g., Standard Flow"
                    defaultValue={editingRule?.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Approval Threshold ($)</label>
                  <Input
                    type="number"
                    placeholder="1000"
                    defaultValue={editingRule?.threshold}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Flow Type</label>
                <select className="w-full px-3 py-2 bg-input border border-input rounded-md text-foreground text-sm">
                  <option selected={editingRule?.flowType === 'sequential'}>Sequential</option>
                  <option>Parallel</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Approvers (in order)</label>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex gap-2">
                    <Input placeholder={`Approver ${i + 1}`} defaultValue={editingRule?.approvers?.[i]} />
                    {i === 2 && (
                      <Button variant="outline" size="sm">
                        +
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={editingRule?.managerApprover}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Manager must be first approver</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={editingRule?.specialApprover}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Require special approver</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowForm(false)
                    setEditingRule(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowForm(false)
                    setEditingRule(null)
                  }}
                >
                  {editingRule ? 'Update' : 'Create'} Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
