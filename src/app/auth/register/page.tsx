"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/login` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/auth/login?registered=true");
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-bold text-center mb-8">注册</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400"
        />
        <input
          type="password"
          placeholder="密码（至少6位）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? "注册中..." : "注册"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        已有账号？
        <Link href="/auth/login" className="text-violet-600 hover:underline">
          登录
        </Link>
      </p>
    </div>
  );
}
