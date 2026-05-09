"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles, LogOut, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 获取当前登录用户
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });

    // 监听登录状态变化
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

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
          <Link href="/pricing" className="hover:text-gray-900 transition">会员</Link>
          <Link href="/dashboard" className="hover:text-gray-900 transition">我的网站</Link>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition"
              >
                <User className="h-4 w-4" />
                {user.user_metadata?.full_name || user.email?.split("@")[0] || "用户"}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-500 hover:bg-gray-50 transition"
              >
                退出
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 transition">
                登录
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 transition"
              >
                免费开始
              </Link>
            </>
          )}
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
          <Link href="/pricing" className="block text-sm" onClick={() => setOpen(false)}>会员</Link>
          <Link href="/dashboard" className="block text-sm" onClick={() => setOpen(false)}>我的网站</Link>

          {user ? (
            <>
              <div className="text-sm text-gray-500 pt-2 border-t border-gray-100">
                {user.user_metadata?.full_name || user.email}
              </div>
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="block w-full text-left text-sm text-gray-500"
              >
                退出登录
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block text-sm" onClick={() => setOpen(false)}>登录</Link>
              <Link
                href="/auth/register"
                className="block text-center rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white"
                onClick={() => setOpen(false)}
              >
                免费开始
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
