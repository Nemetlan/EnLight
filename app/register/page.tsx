'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', whatsapp: '', email: '', password: '', confirm: '' })
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, [key]: event.target.value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(null); setMessage(null)
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    setPending(true)
    const { error: authError } = await createClient().auth.signUp({ email: form.email, password: form.password, options: { emailRedirectTo: `${window.location.origin}/auth/callback`, data: { full_name: form.fullName, phone: form.phone, whatsapp: form.whatsapp } } })
    if (authError) setError(authError.message.toLowerCase().includes('already') ? 'Unable to create this account. Check your details and try again.' : authError.message)
    else setMessage('Account created. Check your email to confirm your account before signing in.')
    setPending(false)
  }

  const field = (id: keyof typeof form, label: string, type = 'text', optional = false) => <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider" htmlFor={id}>{label}{optional ? ' (Optional)' : ''}</label><input id={id} type={type} value={form[id]} onChange={update(id)} required={!optional} autoComplete={id === 'fullName' ? 'name' : id === 'email' ? 'email' : type === 'tel' ? 'tel' : undefined} className="w-full px-3 py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111111] outline-none focus:bg-white focus:border-[#FF4D2E]" /></div>

  return <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4"><div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-8 border border-[#E5E7EB]/60"><div className="text-center mb-6"><div className="text-2xl sm:text-3xl font-black tracking-tight"><span className="text-[#FF4D2E]">En</span><span className="text-[#111111]">Light</span></div><p className="text-[11px] text-[#6B7280] mt-1">Create your account to start learning</p></div><form className="flex flex-col gap-3" onSubmit={handleSubmit}>{field('fullName', 'Full Name')}{field('phone', 'Phone Number', 'tel')}{field('whatsapp', 'WhatsApp Number', 'tel', true)}{field('email', 'Email Address', 'email')}<div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider" htmlFor="password">Password</label><div className="relative"><input id="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} autoComplete="new-password" required minLength={8} className="w-full px-3 py-2 pr-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111111] outline-none focus:bg-white focus:border-[#FF4D2E]" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div><div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider" htmlFor="confirm">Confirm Password</label><div className="relative"><input id="confirm" type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={update('confirm')} autoComplete="new-password" required className="w-full px-3 py-2 pr-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111111] outline-none focus:bg-white focus:border-[#FF4D2E]" /><button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div>{error && <p role="alert" className="text-xs text-[#C0391F]">{error}</p>}{message && <p role="status" className="text-xs text-emerald-700">{message}</p>}<button type="submit" disabled={pending} className="w-full py-2.5 bg-[#FF4D2E] text-white text-xs font-bold rounded-xl disabled:opacity-60">{pending ? 'Creating account…' : 'Create Account'}</button></form><div className="pt-3 mt-3 border-t border-[#E5E7EB]"><p className="text-center text-[11px] text-[#6B7280]">Already have an account? <Link href="/login" className="font-semibold text-[#FF4D2E] hover:underline">Sign in</Link></p></div></div></div>
}
