"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setRegistered(true);
    }
  }

  async function handleResend() {
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    if (error) {
      setError(error.message);
    }
    setResending(false);
  }

  if (registered) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
            <Mail className="h-8 w-8 text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold mb-3">验证你的邮箱</h1>
          <p className="text-gray-500 mb-2">
            我们已发送验证邮件到
          </p>
          <p className="font-medium text-gray-900 mb-6">{email}</p>
          <p className="text-sm text-gray-400 mb-8">
            请检查你的收件箱（以及垃圾邮件），点击邮件中的链接完成注册。
          </p>

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full rounded-full bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition mb-3"
          >
            {resending ? "发送中..." : "重新发送验证邮件"}
          </button>

          <button
            onClick={() => router.push("/auth/login")}
            className="w-full rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            前往登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-bold text-center mb-8">创建你的账号</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">昵称</label>
          <input
            type="text"
            placeholder="你的昵称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          />
        </div>
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
            placeholder="至少6位，包含字母和数字"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition shadow-sm"
        >
          {loading ? "注册中..." : "注册"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        已有账号？
        <Link href="/auth/login" className="text-violet-600 hover:underline font-medium">
          登录
        </Link>
      </p>
    </div>
  );
}
