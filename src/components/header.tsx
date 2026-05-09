"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Sparkles className="h-5 w-5 text-violet-600" />
          <span>AI<span className="text-violet-600">建站</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition">首页</Link>
          <Link href="/create" className="hover:text-gray-900 transition">创建网站</Link>
          <Link href="/pricing" className="hover:text-gray-900 transition">定价</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">我的网站</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/create"
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 transition"
          >
            免费开始
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm" onClick={() => setOpen(false)}>首页</Link>
          <Link href="/create" className="block text-sm" onClick={() => setOpen(false)}>创建网站</Link>
          <Link href="/pricing" className="block text-sm" onClick={() => setOpen(false)}>定价</Link>
          <Link href="/dashboard" className="block text-sm" onClick={() => setOpen(false)}>我的网站</Link>
          <Link
            href="/create"
            className="block text-center rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white"
            onClick={() => setOpen(false)}
          >
            免费开始
          </Link>
        </div>
      )}
    </header>
  );
}
