"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getSites } from "@/lib/site-store";
import { getTemplate, type Template, type TemplatePage } from "@/lib/templates";
import Link from "next/link";
import { ArrowLeft, Check, Edit3, Loader2, Save, Globe, Languages } from "lucide-react";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const templateId = searchParams.get("template");
  const [template, setTemplate] = useState<Template | null>(null);
  const [siteName, setSiteName] = useState("");
  const [editing, setEditing] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [lang, setLang] = useState("zh");
  const [aiData, setAiData] = useState<any>(null);
  const [editContent, setEditContent] = useState<Record<string, any>>({});

  useEffect(() => {
    if (id) {
      const sites = getSites();
      const found = sites.find((s) => s.id === id);
      if (found) setSiteName(found.name);
    }
    if (templateId) {
      const t = getTemplate(templateId);
      if (t) {
        setTemplate(t);
        const initContent: Record<string, any> = {};
        t.pages.forEach((page) => {
          Object.assign(initContent, page.content);
        });
        setEditContent(initContent);
      }
    } else if (id) {
      // 加载 AI 生成的数据
      const stored = localStorage.getItem(`ai_site_${id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAiData(parsed);
      }
    }
  }, [id, templateId]);

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  function handleDeploy() {
    setDeployed(true);
  }

  // Render template preview based on template type
  function renderPreview() {
    const c = editContent;
    const t = template!;

    switch (template!.id) {
      case "photography":
        return (
          <div>
            <div className="bg-zinc-900 text-white px-8 py-24 text-center">
              <p className="text-sm text-zinc-400 uppercase tracking-widest mb-4">Portfolio</p>
              <h2 className="text-5xl font-light mb-4">{c.title || t.pages[0].content.title}</h2>
              <p className="text-zinc-400 max-w-lg mx-auto text-lg">{c.subtitle || t.pages[0].content.subtitle}</p>
            </div>
            <div className="px-8 py-16">
              <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
                {(c.features || t.pages[0].content.features).map((f: string, i: number) => (
                  <div key={i} className="text-center">
                    <div className="h-40 bg-zinc-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
                      {["📸", "🌅", "💼"][i]}
                    </div>
                    <p className="text-sm font-medium">{f}</p>
                  </div>
                ))}
              </div>
              <div className="max-w-2xl mx-auto mt-12 text-center">
                <h3 className="text-lg font-semibold mb-3">关于我</h3>
                <p className="text-gray-500">{c.about || t.pages[0].content.about}</p>
              </div>
            </div>
            <div className="bg-zinc-50 px-8 py-12 text-center">
              <h3 className="text-lg font-semibold mb-4">联系我</h3>
              <p className="text-gray-500 text-sm">{c.contactEmail || t.pages[0].content.contactEmail}</p>
            </div>
            <div className="px-8 py-4 text-center text-xs text-gray-400">
              © 2026 {siteName || template!.name}
            </div>
          </div>
        );

      case "business":
        return (
          <div>
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-8 py-24 text-center">
              <h2 className="text-4xl font-bold mb-4">{c.title}</h2>
              <p className="text-blue-100 max-w-lg mx-auto">{c.subtitle}</p>
              <div className="mt-8 inline-flex rounded-full bg-white/20 px-6 py-2.5 text-sm">了解更多</div>
            </div>
            <div className="px-8 py-16">
              <h3 className="text-center text-xl font-bold mb-10">我们的服务</h3>
              <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
                {(c.services || []).map((s: string, i: number) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-6 text-center">
                    <div className="text-3xl mb-3">{["💻", "🎨", "🔄"][i]}</div>
                    <h4 className="font-semibold text-sm">{s}</h4>
                  </div>
                ))}
              </div>
              <div className="max-w-2xl mx-auto mt-12 text-center">
                <h3 className="text-lg font-semibold mb-3">关于我们</h3>
                <p className="text-gray-500">{c.about}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-12 text-center">
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <p className="text-gray-500 text-sm">{c.contactEmail}</p>
            </div>
            <div className="px-8 py-4 text-center text-xs text-gray-400">
              © 2026 {siteName}
            </div>
          </div>
        );

      case "restaurant":
        return (
          <div>
            <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-8 py-24 text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-4xl font-bold mb-4">{c.title}</h2>
              <p className="text-amber-100 max-w-lg mx-auto">{c.subtitle}</p>
            </div>
            <div className="px-8 py-16">
              <h3 className="text-center text-xl font-bold mb-10">招牌推荐</h3>
              <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
                {(c.specialties || []).map((s: string, i: number) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-6 text-center">
                    <div className="text-4xl mb-3">{["🥩", "🍝", "🍷"][i]}</div>
                    <h4 className="font-semibold">{s}</h4>
                  </div>
                ))}
              </div>
              <div className="max-w-2xl mx-auto mt-12 text-center">
                <h3 className="text-lg font-semibold mb-3">关于我们</h3>
                <p className="text-gray-500">{c.about}</p>
              </div>
            </div>
            <div className="bg-amber-50 px-8 py-12 text-center">
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <p className="text-gray-500 text-sm">{c.contactEmail}</p>
              <p className="text-gray-500 text-sm mt-1">{c.address}</p>
            </div>
            <div className="px-8 py-4 text-center text-xs text-gray-400">
              © 2026 {siteName}
            </div>
          </div>
        );

      default:
        // Fallback: portfolio style
        return (
          <div>
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-24 text-center">
              <h2 className="text-4xl font-bold mb-4">{c.title}</h2>
              <p className="text-white/80 max-w-lg mx-auto">{c.subtitle}</p>
            </div>
            <div className="px-8 py-16">
              <h3 className="text-center text-xl font-bold mb-10">核心亮点</h3>
              <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
                {(c.highlights || c.skills || c.products || ["功能1", "功能2", "功能3"]).map((s: string, i: number) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-6 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center mb-3">
                      <span className="text-lg">{["⭐", "🔒", "💰"][i] || "✓"}</span>
                    </div>
                    <h4 className="font-semibold text-sm">{s}</h4>
                  </div>
                ))}
              </div>
              <div className="max-w-2xl mx-auto mt-12 text-center">
                <h3 className="text-lg font-semibold mb-3">关于我们</h3>
                <p className="text-gray-500">{c.about}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-12 text-center">
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <p className="text-gray-500 text-sm">{c.contactEmail}</p>
            </div>
            <div className="px-8 py-4 text-center text-xs text-gray-400">
              © 2026 {siteName}
            </div>
          </div>
        );
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/create" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          选择其他模板
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <Edit3 className="h-3.5 w-3.5" />
            {editing ? "完成编辑" : "编辑内容"}
          </button>
          {aiData && (
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === 'zh' ? 'English' : '中文'}
            </button>
          )}
          <button
            onClick={handleDeploy}
            disabled={deployed}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
          >
            {deployed ? (
              <>
                <Check className="h-4 w-4" />
                已上线
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                部署上线
              </>
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">{siteName}</h1>

      {/* Editor panel */}
      {editing && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Edit3 className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-semibold text-violet-800">编辑内容</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(editContent).map(([key, value]) => {
              if (Array.isArray(value)) return null; // Skip arrays for now
              return (
                <div key={key}>
                  <label className="block text-xs text-violet-700 mb-1">{key}</label>
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => setEditContent((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full rounded-lg border border-violet-200 px-3 py-2 text-sm bg-white outline-none focus:border-violet-400"
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setEditing(false)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5 text-sm text-white hover:bg-violet-700 transition"
          >
            <Save className="h-3.5 w-3.5" />
            保存
          </button>
        </div>
      )}

      {/* Website preview */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="mx-auto max-w-md rounded-md bg-white px-3 py-1.5 text-xs text-gray-400 text-center border border-gray-100">
              {siteName.toLowerCase().replace(/\s+/g, "-")}.aibuilder.app
            </div>
          </div>
        </div>
        {template ? renderPreview() : (aiData && <RenderAISite data={aiData} lang={lang} />)}
      </div>

      {deployed && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
          <Check className="h-5 w-5 text-emerald-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-800">网站已上线</p>
            <p className="text-sm text-emerald-600 break-all">
              https://{siteName.toLowerCase().replace(/\s+/g, "-")}.aibuilder.app
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function RenderAISite({ data, lang }: { data: any; lang: string }) {
  const t = (obj: any) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || obj.zh || '';
  };

  const theme = data.theme || {};
  const pages = data.pages || [];
  const homePage = pages[0] || {};
  const sections = homePage.sections || [];

  return (
    <div>
      {/* Hero */}
      {sections.filter((s: any) => s.type === 'hero').map((s: any, i: number) => {
        const c = s.content;
        return (
          <div key={i} className="px-8 py-20 text-center" style={{background: 'linear-gradient(135deg, ' + (theme.primary || '#7c3aed') + ', ' + (theme.secondary || '#6d28d9') + ')'}}>
            <h2 className="text-4xl font-bold text-white mb-4">{t(c?.title)}</h2>
            <p className="text-white/80 max-w-lg mx-auto text-lg">{t(c?.subtitle)}</p>
            {c?.cta && <div className="mt-8 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-medium" style={{color: theme.primary || '#7c3aed'}}>{t(c?.cta)}</div>}
          </div>
        );
      })}

      {/* Features */}
      {sections.filter((s: any) => s.type === 'features' || s.type === 'services').map((s: any, i: number) => {
        const c = s.content;
        const items = c?.items || [];
        return (
          <div key={i} className="px-8 py-16">
            <h3 className="text-center text-2xl font-bold mb-10">{t(c?.title) || '核心优势'}</h3>
            <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
              {(Array.isArray(items) ? items : typeof items === 'object' ? (items[lang] || items.en || items.zh || []) : []).map((item: string, j: number) => (
                <div key={j} className="rounded-xl border border-gray-100 p-6 text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                    <span className="text-lg">{['⭐','🔥','💡'][j] || '✓'}</span>
                  </div>
                  <h4 className="font-semibold">{typeof item === 'object' ? t(item) : item}</h4>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* About/Bio */}
      {sections.filter((s: any) => s.type === 'about' || s.type === 'bio').map((s: any, i: number) => {
        const c = s.content;
        return (
          <div key={i} className="bg-gray-50 px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">{t(c?.title) || '关于我们'}</h3>
            <p className="text-gray-500 max-w-lg mx-auto">{t(c?.description)}</p>
          </div>
        );
      })}

      {/* Quote */}
      {sections.filter((s: any) => s.type === 'quote').map((s: any, i: number) => {
        const c = s.content;
        return (
          <div key={i} className="px-8 py-12 text-center italic text-gray-500">
            <p className="text-lg">"{t(c?.text)}"</p>
            {c?.author && <p className="mt-2 text-sm">— {t(c?.author)}</p>}
          </div>
        );
      })}

      {/* Contact */}
      {sections.filter((s: any) => s.type === 'contact' || s.type === 'contact-form').map((s: any, i: number) => {
        const c = s.content;
        return (
          <div key={i} className="px-8 py-16 text-center bg-gray-50">
            <h3 className="text-2xl font-bold mb-6">{t(c?.title) || (lang === 'zh' ? '联系我们' : 'Contact Us')}</h3>
            {c?.email && <p className="text-gray-500">{c.email}</p>}
          </div>
        );
      })}

      {/* Footer */}
      <div className="px-8 py-4 text-center text-xs text-gray-400 border-t border-gray-100">
        <p>&copy; 2026 {typeof data.name === 'object' ? t(data.name) : data.name}</p>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
