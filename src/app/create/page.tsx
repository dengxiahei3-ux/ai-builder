"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { addSite } from "@/lib/site-store";

const EXAMPLES = [
  "帮我做一个摄影作品集网站，暗黑风格，要有作品展示和联系表单",
  "我做外贸出口灯具的，帮我做一个英文产品展示落地页",
  "个人博客网站，简洁风格，要有文章列表和关于我页面",
  "本地咖啡馆网站，温暖风格，展示菜单和地址信息",
];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) throw new Error("生成失败");

      const data = await res.json();

      // 存到本地
      addSite({
        id: data.id,
        name: data.name,
        description: prompt.trim(),
        createdAt: new Date().toISOString(),
        status: "draft",
        leads: 0,
      });

      // 跳转到预览页
      router.push(`/create/preview?id=${data.id}`);
    } catch (e) {
      setError("生成失败，请稍后重试");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">创建你的网站</h1>
        <p className="mt-2 text-gray-500">用中文描述你想要什么样的网站</p>
      </div>

      {/* Input area */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：帮我做一个科技公司的官网，深蓝色主题，要有首页、产品展示、关于我们、联系方式四个页面..."
          className="w-full min-h-[160px] resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          disabled={loading}
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">{prompt.length} 个字符</span>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI 正在生成...
              </>
            ) : (
              <>
                生成网站
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Examples */}
      <div className="mt-12">
        <h2 className="text-sm font-medium text-gray-500 mb-3">试试这些需求：</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="rounded-xl border border-gray-200 p-4 text-left text-sm text-gray-600 hover:border-violet-300 hover:bg-violet-50/50 transition text-balance"
            >
              <Sparkles className="mb-2 h-4 w-4 text-violet-500" />
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
