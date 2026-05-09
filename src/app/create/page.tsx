"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Check } from "lucide-react";
import { getTemplates } from "@/lib/templates";
import { addSite } from "@/lib/site-store";

export default function CreatePage() {
  const router = useRouter();
  const templates = getTemplates();
  const [selected, setSelected] = useState("");
  const [siteName, setSiteName] = useState("");

  function handleCreate() {
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
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">创建你的网站</h1>
        <p className="mt-2 text-gray-500">选择一个模板，填上你的内容，一键上线</p>
      </div>

      {/* Site name */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="输入你的网站名称，例如：张三的作品集"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
        />
      </div>

      {/* Template grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`relative rounded-2xl border-2 p-6 text-left transition hover:shadow-md ${
              selected === t.id
                ? "border-violet-600 bg-violet-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {selected === t.id && (
              <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-violet-600 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <div className="text-3xl mb-3">{t.image}</div>
            <h3 className="font-semibold text-sm">{t.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{t.description}</p>
            <span className="inline-block mt-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
              {t.category}
            </span>
          </button>
        ))}
      </div>

      {/* Create button */}
      <div className="text-center mt-10">
        <button
          onClick={handleCreate}
          disabled={!selected || !siteName.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Sparkles className="h-4 w-4" />
          创建网站
        </button>
      </div>
    </div>
  );
}
