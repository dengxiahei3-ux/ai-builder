"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Mail, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unconfirmed, setUnconfirmed] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUnconfirmed(false);

    // 尝试无密码登录（如果是刚注册的用户）
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        // 尝试自动确认
        try {
          const { data: signupData } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          });
          if (signupData?.user?.id) {
            await fetch("/api/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: signupData.user.id }),
            });
            // 再试一次登录
            const retry = await supabase.auth.signInWithPassword({ email, password });
            if (!retry.error) {
              router.push("/dashboard");
              return;
            }
          }
        } catch (_) {}
        setUnconfirmed(true);
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleResend() {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    if (error) {
      setError(error.message);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-bold text-center mb-8">登录</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">邮箱</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">密码</label>
          <input
            type="password"
            placeholder="输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {unconfirmed && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">
                  邮箱尚未验证
                </p>
                <p className="text-sm text-amber-700 mb-3">
                  请检查你的收件箱（包括垃圾邮件），点击验证邮件中的链接完成注册。
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm font-medium text-amber-800 underline hover:no-underline"
                >
                  重新发送验证邮件
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition shadow-sm"
        >
          {loading ? "登录中..." : "登录"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        还没有账号？
        <Link href="/auth/register" className="text-violet-600 hover:underline font-medium">
          注册
        </Link>
      </p>
    </div>
  );
}
