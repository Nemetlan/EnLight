'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Camera, Eye, EyeOff, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6 max-w-2xl">
        <h1 className="text-2xl font-black text-[#111111]">Profile Settings</h1>

        {/* Profile picture */}
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-base font-bold text-[#111111]">Profile Picture</h2>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl bg-[#D97706] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-black select-none">JM</span>
              <button
                aria-label="Upload profile picture"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF4D2E] rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
              >
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111111]">Jordan Mitchell</p>
              <p className="text-xs text-[#6B7280] mt-0.5">JPG or PNG, max 5 MB</p>
              <button className="mt-2 text-xs font-semibold text-[#FF4D2E] hover:underline">
                Upload new photo
              </button>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-base font-bold text-[#111111]">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                type="text"
                defaultValue="Jordan Mitchell"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#FF4D2E] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="initials">Name with Initials</label>
              <input
                id="initials"
                type="text"
                defaultValue="J. Mitchell"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] placeholder:text-[#9CA3AF] outline-none focus:border-[#FF4D2E] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-base font-bold text-[#111111]">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                defaultValue="+27 82 345 6789"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] outline-none focus:border-[#FF4D2E] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="whatsapp">WhatsApp Number</label>
              <input
                id="whatsapp"
                type="tel"
                defaultValue="+27 82 345 6789"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] outline-none focus:border-[#FF4D2E] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                defaultValue="jordan.mitchell@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] outline-none focus:border-[#FF4D2E] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-base font-bold text-[#111111]">Security</h2>

          {/* Change password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="current-password">Current Password</label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] outline-none focus:border-[#FF4D2E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" htmlFor="new-password">New Password</label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[#E5E7EB] text-sm text-[#111111] outline-none focus:border-[#FF4D2E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* 2FA toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#F4F5F7]">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#1E56FB]" />
              <div>
                <p className="text-sm font-semibold text-[#111111]">Two-Factor Authentication</p>
                <p className="text-xs text-[#6B7280]">Adds an extra layer of security to your account</p>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={twoFactor}
              onClick={() => setTwoFactor(!twoFactor)}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${twoFactor ? 'bg-[#FF4D2E]' : 'bg-[#D1D5DB]'}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-[#059669] text-white' : 'bg-[#FF4D2E] text-white hover:opacity-90'}`}
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AppShell>
  )
}
