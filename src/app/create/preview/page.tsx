"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSites } from "@/lib/site-store";
import type { StoredSite } from "@/lib/site-store";
import Link from "next/link";
import { ArrowLeft, Check, Globe, Loader2, Sparkles } from "lucide-react";

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}

function PreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [site, setSite] = useState<StoredSite | null>(null);
  const [building, setBuilding] = useState(false);
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    if (id) {
      const sites = getSites();
      const found = sites.find((s) => s.id === id);
      if (found) setSite(found);
    }
  }, [id]);

  if (!site) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400">网站未找到</p>
      </div>
    );
  }

  function handleDeploy() {
    setBuilding(true);
    // 模拟部署过程
    setTimeout(() => {
      setBuilt(true);
      setBuilding(false);
    }, 3000);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/create"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          返回修改
        </Link>
        <div className="flex items-center gap-3">
          {built ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Check className="h-4 w-4" />
              已部署上线
            </span>
          ) : (
            <button
              onClick={handleDeploy}
              disabled={building}
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
            >
              {building ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  部署中...
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" />
                  部署上线
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{site.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{site.description}</p>
      </div>

      {/* Website Preview — 模拟生成结果 */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="mx-auto max-w-md rounded-md bg-white px-3 py-1.5 text-xs text-gray-400 text-center border border-gray-100">
              {site.name.toLowerCase().replace(/\s+/g, "-")}.aibuilder.app
            </div>
          </div>
        </div>

        {/* Preview content — 模拟网站展示 */}
        <div className="bg-white">
          {/* Hero Section */}
          <div className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1 text-xs text-white mb-6">
              <Sparkles className="h-3 w-3" />
              AI 自动生成
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{site.name}</h2>
            <p className="text-white/80 max-w-lg mx-auto text-lg">
              {site.description.length > 60
                ? site.description.slice(0, 60) + "..."
                : site.description}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-violet-700">
                了解更多
              </div>
              <div className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white">
                联系我们
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="px-8 py-16">
            <h3 className="text-center text-2xl font-bold mb-10">核心优势</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {["专业设计", "响应式布局", "SEO 优化"].map((f, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-6 text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                    <Sparkles className="h-5 w-5 text-violet-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{f}</h4>
                  <p className="text-sm text-gray-500">
                    由 AI 自动生成的{f}，开箱即用
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 px-8 py-16">
            <h3 className="text-center text-2xl font-bold mb-6">联系我们</h3>
            <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-400">
                  您的姓名
                </div>
                <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-400">
                  邮箱地址
                </div>
                <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-400 h-20">
                  留言内容
                </div>
                <div className="rounded-lg bg-violet-600 p-3 text-center text-sm font-medium text-white">
                  提交咨询
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 text-center text-sm text-gray-400">
            © 2026 {site.name}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Deployed URL */}
      {built && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
          <Check className="h-5 w-5 text-emerald-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-800">网站已上线</p>
            <p className="text-sm text-emerald-600 break-all">
              https://{site.name.toLowerCase().replace(/\s+/g, "-")}.aibuilder.app
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            管理
          </Link>
        </div>
      )}
    </div>
  );
}

