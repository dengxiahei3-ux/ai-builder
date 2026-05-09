"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSites } from "@/lib/site-store";
import Link from "next/link";
import {
  ArrowLeft, Save, Palette, Globe, Settings, MessageSquare, Eye,
  Search, BarChart3, Sparkles, Languages, Bell, Lock, Crown
} from "lucide-react";

const THEMES = [
  { name: "紫色（默认）", primary: "#7c3aed", bg: "#faf5ff" },
  { name: "蓝色商务", primary: "#2563eb", bg: "#eff6ff" },
  { name: "绿色自然", primary: "#059669", bg: "#ecfdf5" },
  { name: "红色热情", primary: "#dc2626", bg: "#fef2f2" },
  { name: "橙色活力", primary: "#ea580c", bg: "#fff7ed" },
  { name: "暗黑风格", primary: "#1e293b", bg: "#0f172a" },
];

// 付费模块配置
const PAID_MODULES = [
  {
    id: "seo",
    icon: Search,
    name: "SEO 优化",
    desc: "自动生成标题、描述、关键词，提交搜索引擎",
    price: "基础版",
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: "访客统计",
    desc: "查看网站访问量、来源、热门页面",
    price: "专业版",
  },
  {
    id: "ai_content",
    icon: Sparkles,
    name: "AI 内容生成",
    desc: "一键生成产品描述、博客文章、营销文案",
    price: "专业版",
  },
  {
    id: "multilang",
    icon: Languages,
    name: "多语言支持",
    desc: "自动翻译网站为多国语言",
    price: "专业版",
  },
  {
    id: "notify",
    icon: Bell,
    name: "微信通知",
    desc: "客户提交询盘时，微信实时推送通知",
    price: "专业版",
  },
  {
    id: "export",
    icon: Globe,
    name: "代码导出",
    desc: "下载完整网站代码，可部署到任意服务器",
    price: "专业版",
  },
];

const CHECKOUT_URL = "https://ai-builder.lemonsqueezy.com/checkout/buy/ee614ea7-4646-45a4-a04c-873a45d17053";

export default function SiteSettings() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.id as string;

  const [siteName, setSiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("0");
  const [pageCount, setPageCount] = useState(1);
  const [sections, setSections] = useState({
    hero: true,
    features: true,
    about: true,
    contact: true,
    footer: true,
  });
  const [saved, setSaved] = useState(false);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    const sites = getSites();
    const site = sites.find((s) => s.id === siteId);
    if (site) {
      setSiteName(site.name);
    }

    const settings = localStorage.getItem(`site_settings_${siteId}`);
    if (settings) {
      try {
        const s = JSON.parse(settings);
        setSelectedTheme(s.theme || "0");
        setDomain(s.domain || "");
        setPageCount(s.pageCount || 1);
        if (s.sections) setSections(s.sections);
      } catch (_) {}
    }
  }, [siteId]);

  function handleSave() {
    localStorage.setItem(
      `site_settings_${siteId}`,
      JSON.stringify({ theme: selectedTheme, domain, sections, pageCount })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const theme = THEMES[parseInt(selectedTheme)] || THEMES[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          返回控制台
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/create/preview?id=${siteId}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <Eye className="h-3.5 w-3.5" />
            预览
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 transition"
          >
            <Save className="h-3.5 w-3.5" />
            {saved ? "已保存 ✓" : "保存设置"}
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">{siteName}</h1>
      <p className={`text-sm mb-8 inline-flex rounded-full px-3 py-0.5 ${
        plan === "free" ? "bg-gray-100 text-gray-600" : "bg-violet-100 text-violet-700"
      }`}>
        {plan === "free" ? "免费版" : "付费版"}
      </p>

      <div className="space-y-6">
        {/* 基本设置 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">基本设置</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">网站名称</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">页面数量</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={plan === "free" ? 1 : 20}
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="flex-1 accent-violet-600"
                />
                <span className="text-sm font-medium w-8 text-center">{pageCount}</span>
              </div>
              {plan === "free" && (
                <p className="text-xs text-amber-600 mt-1">
                  免费版仅支持 1 页。升级后最多 20 页。
                </p>
              )}
            </div>

            {/* 自定义域名 — 付费功能 */}
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">自定义域名</span>
                {plan === "free" && <span className="text-xs rounded-full bg-amber-100 text-amber-700 px-2 py-0.5">付费功能</span>}
              </div>
              {plan === "free" ? (
                <div className="mt-2">
                  <input
                    type="text"
                    value="your-site.aibuilder.app"
                    disabled
                    className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                  />
                  <a href={CHECKOUT_URL} target="_blank" rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-violet-600 hover:underline"
                  >
                    <Crown className="h-3.5 w-3.5" />
                    升级后绑定你的域名
                  </a>
                </div>
              ) : (
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="www.yourdomain.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-400 transition"
                />
              )}
            </div>
          </div>
        </div>

        {/* 主题颜色 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">主题颜色</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {THEMES.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setSelectedTheme(String(i))}
                className={`rounded-xl border-2 p-3 text-center transition ${
                  selectedTheme === String(i)
                    ? "border-violet-600 ring-2 ring-violet-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="h-8 w-full rounded-lg mb-1" style={{ backgroundColor: t.primary }} />
                <span className="text-xs text-gray-500">{t.name.split("（")[0]}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 mb-2">预览</p>
            <div className="flex gap-2">
              <div className="rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: theme.primary }}>
                主按钮
              </div>
              <div className="rounded-lg px-4 py-2 text-sm" style={{ backgroundColor: theme.bg, color: theme.primary, border: `1px solid ${theme.primary}20` }}>
                次要按钮
              </div>
            </div>
          </div>
        </div>

        {/* 页面模块开关 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">页面模块</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">选择要在网站中显示的模块</p>
          <div className="space-y-3">
            {[
              { key: "hero", label: "首页大图/标题", desc: "网站最顶部的主视觉区域" },
              { key: "features", label: "特色功能/服务", desc: "展示你的核心卖点" },
              { key: "about", label: "关于我们", desc: "介绍公司或个人" },
              { key: "contact", label: "联系表单", desc: "让客户给你留言" },
              { key: "footer", label: "页脚", desc: "版权信息和底部链接" },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <div
                  onClick={() => setSections((prev) => ({ ...prev, [key]: !prev[key as keyof typeof sections] }))}
                  className={`relative h-6 w-11 rounded-full transition cursor-pointer ${
                    sections[key as keyof typeof sections] ? "bg-violet-600" : "bg-gray-300"
                  }`}
                >
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    sections[key as keyof typeof sections] ? "translate-x-5.5" : "translate-x-0.5"
                  }`} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 🚀 付费模块 */}
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-semibold">高级功能</h2>
            {plan === "free" && (
              <span className="text-xs rounded-full bg-amber-100 text-amber-700 px-3 py-0.5 font-medium">
                升级可用
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-6">
            升级套餐解锁这些高级功能，让网站更专业
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {PAID_MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div key={mod.id} className="rounded-xl border border-amber-100 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-medium">{mod.name}</h3>
                        <span className="text-xs rounded-full bg-amber-50 text-amber-600 px-2 py-0.5 border border-amber-200">
                          {mod.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{mod.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {plan === "free" && (
            <div className="mt-6 text-center">
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700 transition shadow-sm"
              >
                <Crown className="h-4 w-4" />
                升级基础版 — ¥36/月
              </a>
              <p className="text-xs text-gray-500 mt-2">解锁自定义域名 + SEO + 更多页面</p>
            </div>
          )}
        </div>

        {/* 询盘管理 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">询盘管理</h2>
          </div>
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">等待客户留言...</p>
          </div>
        </div>
      </div>

      {/* 底部保存 */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 transition shadow-sm"
        >
          <Save className="h-4 w-4" />
          {saved ? "已保存 ✓" : "保存所有设置"}
        </button>
      </div>
    </div>
  );
}
