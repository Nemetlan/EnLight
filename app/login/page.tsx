'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError(null)
    const { error: authError } = await createClient().auth.signInWithPassword({ email, password })
    if (authError) setError(authError.message.toLowerCase().includes('confirm') ? 'Please confirm your email before signing in.' : 'Invalid email or password.')
    else window.location.assign('/dashboard')
    setPending(false)
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="relative z-10 bg-white rounded-3xl shadow-xl shadow-black/5 w-full max-w-xs sm:max-w-sm p-6 sm:p-8 border border-[#E5E7EB]">
        <div className="text-center">
          <div className="inline-flex items-center gap-1"><span className="text-3xl font-black tracking-tight text-[#FF4D2E]">En</span><span className="text-3xl font-black tracking-tight text-[#111111]">Light</span><span className="h-2 w-2 rounded-full bg-[#C6F232] ml-0.5" /></div>
          <p className="text-xs text-[#6B7280] mt-1 font-semibold tracking-wide uppercase text-[10px]">Learning Platform Portal</p>
        </div>
        <form className="flex flex-col gap-3 my-auto pt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1" htmlFor="login-email"><Mail size={12} /> Email Address</label><input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required className="w-full px-3.5 py-2 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#111111] outline-none focus:bg-white focus:border-[#111111]" /></div>
          <div className="flex flex-col gap-1.5"><div className="flex items-center justify-between"><label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1" htmlFor="login-password"><Lock size={12} /> Password</label><Link href="/forgot-password" className="text-[10px] font-bold text-[#FF4D2E] hover:underline">Forgot?</Link></div><div className="relative"><input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="w-full px-3.5 py-2 pr-10 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs text-[#111111] outline-none focus:bg-white focus:border-[#111111]" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div>
          {error && <p role="alert" className="text-xs text-[#C0391F]">{error}</p>}
          <button type="submit" disabled={pending} className="w-full py-2.5 bg-[#111111] text-white text-xs font-bold rounded-2xl disabled:opacity-60 flex items-center justify-center gap-2 mt-1"><span>{pending ? 'Signing in…' : 'Sign In to EnLight'}</span><ArrowRight size={14} className="text-[#C6F232]" /></button>
          <Link href="/register" className="w-full py-2.5 bg-white border border-[#E5E7EB] text-[#111111] text-xs font-bold rounded-2xl flex items-center justify-center gap-2"><UserPlus size={14} className="text-[#FF4D2E]" /><span>Create New Account</span></Link>
        </form>
        <div className="pt-3 mt-3 border-t border-[#E5E7EB]"><p className="text-center text-[11px] text-[#6B7280]">Need platform access? <Link href="/dashboard" className="font-bold text-[#FF4D2E] hover:underline">Contact your tutor</Link></p></div>
      </div>
    </div>
  )
}
