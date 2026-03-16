import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { api } from '../../lib/api'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import type { User } from '@greathouses/shared-types'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      const { accessToken, user } = res.data.data
      login(user as User, accessToken)
      navigate('/', { replace: true })
      toast.success(`Welcome back, ${user.name}!`)
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { error?: string } } }).response?.data?.error ?? 'Login failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-[#c9a96e] font-semibold text-sm tracking-widest uppercase mb-1">Great Houses India</p>
          <p className="text-white/50 text-xs">CMS Management Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-xl font-semibold text-foreground mb-1">Sign In</h1>
          <p className="text-sm text-muted-foreground mb-6">Administrative access only</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-medium text-muted-foreground block mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                placeholder="admin@greathouses.in"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground block mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full px-3 py-2.5 pr-10 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-2.5 bg-[#1a1a1a] text-white rounded-md text-sm font-medium hover:bg-[#2a2a2a] disabled:opacity-50 transition-colors mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          © 2025 Great Houses India · Restricted Access
        </p>
      </div>
    </div>
  )
}
