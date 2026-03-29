'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'admin' | 'manager' | 'employee'>('employee')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!email || !password) return

  setIsLoading(true)

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      setIsLoading(false)
      return
    }

    // ✅ STORE USER DATA
    sessionStorage.setItem("userEmail", data.user.email)
    sessionStorage.setItem("userRole", data.user.role)

    // ✅ REDIRECT BASED ON ROLE
    const routes: Record<string, string> = {
      admin: "/admin",
      manager: "/manager",
      employee: "/employee"
    }

    router.push(routes[data.user.role])

  } catch (err) {
    alert("Login failed")
  }

  setIsLoading(false)
}

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card-lg border-white/15 mb-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center text-3xl glow-blue">
                💳
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">ReimbursePlus</h1>
            <p className="text-white/60 text-sm">Modern Expense Management</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Select Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'manager' | 'employee')}
                className="glass-input border-white/10 text-white bg-white/5 w-full"
              >
                <option value="employee" className="bg-slate-900">Employee - Submit expenses</option>
                <option value="manager" className="bg-slate-900">Manager - Review expenses</option>
                <option value="admin" className="bg-slate-900">Admin - Manage system</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full glass-button glow-blue-subtle bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border-white/20 hover:border-cyan-400/50 hover:from-cyan-500/40 hover:to-blue-500/40 font-semibold mt-6 group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>



          {/* Footer */}
          <div className="mt-6 text-center text-white/60 text-sm border-t border-white/10 pt-6">
            Don&apos;t have an account? <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
