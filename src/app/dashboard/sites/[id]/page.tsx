"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSites } from "@/lib/site-store";
import Link from "next/link";
import { ArrowLeft, Save, Palette, Globe, Settings, MessageSquare, Eye } from "lucide-react";

const THEMES = [
  { name: "紫色（默认）", primary: "#7c3aed", bg: "#faf5ff" },
  { name: "蓝色商务", primary: "#2563eb", bg: "#eff6ff" },
  { name: "绿色自然", primary: "#059669", bg: "#ecfdf5" },
  { name: "红色热情", primary: "#dc2626", bg: "#fef2f2" },
  { name: "橙色活力", primary: "#ea580c", bg: "#fff7ed" },
  { name: "暗黑风格", primary: "#1e293b", bg: "#0f172a" },
];

export default function SiteSettings() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.id as string;

  const [siteName, setSiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("0");
  const [sections, setSections] = useState({
    hero: true,
    features: true,
    about: true,
    contact: true,
    footer: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sites = getSites();
    const site = sites.find((s) => s.id === siteId);
    if (site) {
      setSiteName(site.name);
    }

    // 从 localStorage 加载设置
    const settings = localStorage.getItem(`site_settings_${siteId}`);
    if (settings) {
      try {
        const s = JSON.parse(settings);
        setSelectedTheme(s.theme || "0");
        setDomain(s.domain || "");
        if (s.sections) setSections(s.sections);
      } catch (_) {}
    }
  }, [siteId]);

  function handleSave() {
    localStorage.setItem(
      `site_settings_${siteId}`,
      JSON.stringify({ theme: selectedTheme, domain, sections })
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
            {saved ? "已保存" : "保存设置"}
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-8">{siteName} — 设置</h1>

      <div className="space-y-8">
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
              <label className="block text-sm text-gray-600 mb-1">自定义域名</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="例如：www.yourdomain.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-violet-400 transition"
              />
              <p className="text-xs text-gray-400 mt-1">
                需要将域名的 CNAME 记录指向你的 Vercel 地址
              </p>
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
                <div
                  className="h-8 w-full rounded-lg mb-1"
                  style={{ backgroundColor: t.primary }}
                />
                <span className="text-xs text-gray-500">{t.name.split("（")[0]}</span>
              </button>
            ))}
          </div>

          {/* 颜色预览 */}
          <div className="mt-4 rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-2">预览效果</p>
            <div className="flex gap-2">
              <div
                className="rounded-lg px-4 py-2 text-sm text-white"
                style={{ backgroundColor: theme.primary }}
              >
                主按钮
              </div>
              <div
                className="rounded-lg px-4 py-2 text-sm"
                style={{
                  backgroundColor: theme.bg,
                  color: theme.primary,
                  border: `1px solid ${theme.primary}20`,
                }}
              >
                次要按钮
              </div>
            </div>
          </div>
        </div>

        {/* 模块开关 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">页面模块</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">选择要在网站中显示哪些模块</p>
          <div className="space-y-3">
            {[
              { key: "hero", label: "首页大图/标题", desc: "网站最顶部的主视觉区域" },
              { key: "features", label: "特色功能/服务", desc: "展示你的核心卖点或服务" },
              { key: "about", label: "关于我们", desc: "介绍公司或个人" },
              { key: "contact", label: "联系表单", desc: "让客户给你留言" },
              { key: "footer", label: "页脚", desc: "版权信息和底部链接" },
            ].map(({ key, label, desc }) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <div
                  onClick={() =>
                    setSections((prev) => ({ ...prev, [key]: !prev[key as keyof typeof sections] }))
                  }
                  className={`relative h-6 w-11 rounded-full transition cursor-pointer ${
                    sections[key as keyof typeof sections] ? "bg-violet-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                      sections[key as keyof typeof sections] ? "translate-x-5.5" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 询盘管理 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-semibold">询盘管理</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            暂无询盘记录。当客户通过联系表单提交信息后，会在这里显示。
          </p>
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">等待客户留言...</p>
          </div>
        </div>
      </div>

      {/* 底部保存按钮 */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 transition"
        >
          <Save className="h-4 w-4" />
          {saved ? "已保存 ✓" : "保存所有设置"}
        </button>
      </div>
    </div>
  );
}
