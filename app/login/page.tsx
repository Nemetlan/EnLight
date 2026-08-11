'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react'

// SVG Google Icon component
function GoogleIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* OG Background Accent Radial Circles */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[600px] h-[600px] rounded-full border border-gray-200/80 flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full border border-gray-200/80 flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full border border-gray-200/80" />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl shadow-black/5 w-full max-w-xs sm:max-w-sm p-6 sm:p-8 flex flex-col justify-between border border-[#E5E7EB]">

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1">
            <span className="text-3xl font-black tracking-tight text-[#FF4D2E]">En</span>
            <span className="text-3xl font-black tracking-tight text-[#111111]">Light</span>
            <span className="h-2 w-2 rounded-full bg-[#C6F232] ml-0.5" />
          </div>
          <p className="text-xs text-[#6B7280] mt-1 font-semibold tracking-wide uppercase text-[10px]">
            Learning Platform Portal
          </p>
        </div>

        {/* Form Body */}
        <form className="flex flex-col gap-3 my-auto pt-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Google SSO */}
          <button
            type="button"
            className="w-full py-2.5 px-4 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#111111] text-xs font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.98]"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-0.5">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1"
              htmlFor="login-email"
            >
              <Mail size={12} className="text-[#9CA3AF]" /> Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full px-3.5 py-2 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-medium text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:bg-white focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1"
                htmlFor="login-password"
              >
                <Lock size={12} className="text-[#9CA3AF]" /> Password
              </label>
              <button
                type="button"
                className="text-[10px] font-bold text-[#FF4D2E] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full px-3.5 py-2 pr-10 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-medium text-[#111111] outline-none focus:bg-white focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111111] transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Primary Action: Sign In Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#111111] text-white text-xs font-bold rounded-2xl hover:bg-[#222222] active:scale-[0.98] transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 mt-1"
          >
            <span>Sign In to EnLight</span>
            <ArrowRight size={14} className="text-[#C6F232]" />
          </button>

          {/* Secondary Action: Register Button */}
          <Link
            href="/register"
            className="w-full py-2.5 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] hover:border-[#111111] text-[#111111] text-xs font-bold rounded-2xl transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <UserPlus size={14} className="text-[#FF4D2E]" />
            <span>Create New Account</span>
          </Link>
        </form>

        {/* Footer Link */}
        <div className="pt-3 border-t border-[#E5E7EB]">
          <p className="text-center text-[11px] text-[#6B7280]">
            {"Need platform access? "}
            <Link href="/dashboard" className="font-bold text-[#FF4D2E] hover:underline">
              Contact your tutor
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}