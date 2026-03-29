'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardHome() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
    } else {
      const userData = JSON.parse(user)
      router.push(`/dashboard/${userData.role}`)
    }
  }, [router])

  return null
}
