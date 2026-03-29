'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    country: 'US'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match")
    return
  }

  setIsLoading(true)

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        companyName: formData.company,
        country: formData.country,
        role: "admin"
      })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      setIsLoading(false)
      return
    }

    // ✅ SAVE SESSION
    sessionStorage.setItem("userEmail", data.user.email)
    sessionStorage.setItem("userRole", data.user.role)

    // ✅ REDIRECT
    router.push("/admin")

  } catch (err) {
    setError("Signup failed")
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
        <div className="glass-card-lg border-white/15">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center text-3xl glow-purple">
                🚀
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Get Started</h1>
            <p className="text-white/60 text-sm">Admin setup for your company</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-3">
            {error && (
              <div className="glass-card bg-red-500/10 border-red-500/30 text-red-200 text-sm p-3">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Full Name</label>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Company Name</label>
              <Input
                type="text"
                name="company"
                placeholder="Acme Corporation"
                value={formData.company}
                onChange={handleChange}
                required
                className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="glass-input border-white/10 text-white bg-white/5 w-full"
              >
                <option value="US" className="bg-slate-900">US</option>
                <option value="UK" className="bg-slate-900">UK</option>
                <option value="CA" className="bg-slate-900">CA</option>
                <option value="AU" className="bg-slate-900">AU</option>
                <option value="DE" className="bg-slate-900">DE</option>
                <option value="FR" className="bg-slate-900">FR</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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
              <label className="block text-white/80 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="glass-input border-white/10 text-white placeholder:text-white/40 bg-white/5 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                >
                  {showConfirm ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full glass-button glow-purple-subtle bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-white/20 hover:border-purple-400/50 hover:from-purple-500/40 hover:to-pink-500/40 font-semibold mt-6 group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-white/60 text-sm border-t border-white/10 pt-6">
            Already have an account? <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
