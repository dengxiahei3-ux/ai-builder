"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2, MessageSquare, Plus, Grid } from "lucide-react";
import { getTemplates } from "@/lib/templates";
import { addSite } from "@/lib/site-store";

const EXAMPLES = [
  "帮我做一个摄影作品集网站，暗黑风格，大图展示",
  "外贸灯具公司官网，英文，展示产品和联系方式",
  "个人博客，简洁风格，有文章列表和关于我",
  "咖啡馆网站，温暖风格，显示菜单和地址",
];

export default function CreatePage() {
  const router = useRouter();
  const [mode, setMode] = useState<"ai" | "template">("ai");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Template mode
  const templates = getTemplates();
  const [selected, setSelected] = useState("");
  const [siteName, setSiteName] = useState("");

  // AI mode
  async function handleAiGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "生成失败");
        setLoading(false);
        return;
      }

      const id = `site_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
      addSite({
        id,
        name: typeof data.name === 'object' ? data.name.zh || data.name.en : data.name,
        description: prompt.trim(),
        createdAt: new Date().toISOString(),
        status: "draft",
        leads: 0,
      });
      // 存 AI 生成的完整数据到 localStorage
      localStorage.setItem(`ai_site_${id}`, JSON.stringify(data));
      router.push(`/create/preview?id=${id}`);
    } catch (e) {
      setError("网络错误，请重试");
      setLoading(false);
    }
  }

  // Template mode
  function handleTemplateCreate() {
    if (!selected || !siteName.trim()) return;
    const template = templates.find((t) => t.id === selected);
    if (!template) return;

    const id = `site_${Date.now()}`;
    addSite({
      id,
      name: siteName.trim(),
      description: template.name,
      createdAt: new Date().toISOString(),
      status: "draft",
      leads: 0,
    });
    router.push(`/create/preview?id=${id}&template=${selected}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Mode switch */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setMode("ai")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
            mode === "ai"
              ? "bg-violet-600 text-white"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          AI 对话生成
        </button>
        <button
          onClick={() => setMode("template")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
            mode === "template"
              ? "bg-violet-600 text-white"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Grid className="h-4 w-4" />
          选模板
        </button>
      </div>

      {mode === "ai" ? (
        /* ===== AI 聊天模式 ===== */
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">描述你想要的网站</h1>
            <p className="mt-1 text-gray-500 text-sm">像聊天一样说出你的需求，AI 自动生成</p>
          </div>

          {/* 聊天输入框 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：帮我做一个科技公司的官网，深蓝色主题，要有首页、产品展示、关于我们..."
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
              disabled={loading}
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">{prompt.length} 字</span>
              <button
                onClick={handleAiGenerate}
                disabled={loading || !prompt.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI 生成中...
                  </>
                ) : (
                  <>
                    生成网站
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </div>

          {/* 示例需求 */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-500 mb-3">试试说这些：</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 p-4 text-left text-sm text-gray-600 hover:border-violet-300 hover:bg-violet-50/50 transition"
                >
                  <MessageSquare className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>{ex}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ===== 模板模式 ===== */
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">选择一个模板</h1>
            <p className="mt-1 text-gray-500 text-sm">选好模板，填上你的内容，一键上线</p>
          </div>

          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="输入你的网站名称"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none focus:border-violet-400 mb-6 transition"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`relative rounded-2xl border-2 p-6 text-left transition hover:shadow-md ${
                  selected === t.id
                    ? "border-violet-600 bg-violet-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="text-3xl mb-3">{t.image}</div>
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{t.description}</p>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleTemplateCreate}
              disabled={!selected || !siteName.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
            >
              <Plus className="h-4 w-4" />
              创建网站
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
