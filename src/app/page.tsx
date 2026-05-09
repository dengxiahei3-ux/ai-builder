import Link from "next/link";
import { Sparkles, Globe, FileText, BarChart3, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm text-violet-700 mb-8">
            <Sparkles className="h-4 w-4" />
            已为 0 个网站提供 AI 生成服务
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              说句话
            </span>
            <br />
            你的网站就出来了
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            不懂代码？没关系。用中文描述你想要的网站，AI 在 30 秒内自动生成。
            支持自定义域名、询盘表单、SEO 优化。零基础也能做出专业网站。
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/create"
              className="rounded-full bg-violet-600 px-8 py-3.5 text-base font-medium text-white hover:bg-violet-700 transition shadow-lg shadow-violet-200"
            >
              免费创建你的网站
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-gray-300 px-8 py-3.5 text-base font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              查看定价
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">无需信用卡 · 30秒生成 · 一键部署上线</p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-24 sm:px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">三步搞定</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            从想法到上线，比点外卖还快
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "描述需求", desc: "用中文告诉AI你想要什么网站，越详细效果越好", color: "bg-violet-100 text-violet-700" },
              { step: "02", title: "AI 自动生成", desc: "AI 根据你的描述生成完整的网站，支持实时预览修改", color: "bg-indigo-100 text-indigo-700" },
              { step: "03", title: "一键部署上线", desc: "绑定域名，网站即刻上线。内置表单自动收集客户询盘", color: "bg-emerald-100 text-emerald-700" },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${item.color}`}>
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">为什么选我们</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            比海外工具便宜 5 倍，比传统建站快 100 倍
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "30秒生成", desc: "输入需求到网站生成，平均只需30秒" },
              { icon: Globe, title: "自定义域名", desc: "支持绑定你自己的域名，专业又可信" },
              { icon: FileText, title: "智能询盘表单", desc: "内置表单引擎，客户留言自动通知你" },
              { icon: BarChart3, title: "数据统计", desc: "访客量、询盘量一目了然" },
              { icon: Shield, title: "SEO 优化", desc: "自动生成标题、描述、关键词，搜索引擎友好" },
              { icon: Sparkles, title: "AI 持续升级", desc: "模型不断优化，你的网站越用越好" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-24 sm:px-6 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">简单透明的定价</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            无隐藏费用，随时取消
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "免费",
                price: "¥0",
                period: "",
                features: ["1 个网站", "子域名", "1 页", "基础模板"],
                cta: "免费开始",
                popular: false,
              },
              {
                name: "基础版",
                price: "¥29",
                period: "/月",
                features: ["1 个网站", "自定义域名", "最多 5 页", "询盘表单", "邮件通知"],
                cta: "立即订阅",
                popular: true,
              },
              {
                name: "专业版",
                price: "¥79",
                period: "/月",
                features: ["3 个网站", "自定义域名", "无限页面", "询盘表单", "数据统计", "优先支持"],
                cta: "立即订阅",
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-violet-600 text-white ring-4 ring-violet-200 scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium mb-4">
                    最受欢迎
                  </div>
                )}
                <h3 className={`text-xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? "text-white/70" : "text-gray-400"}>{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <svg className={`h-4 w-4 ${plan.popular ? "text-white" : "text-violet-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/create"
                  className={`mt-8 block w-full rounded-full py-2.5 text-center text-sm font-medium transition ${
                    plan.popular
                      ? "bg-white text-violet-700 hover:bg-gray-100"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">
            年付享 8 折优惠，联系客服获取企业定制方案
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">准备好了吗？</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            不需要代码、不需要设计、不需要等待。30 秒生成你的第一个网站。
          </p>
          <Link
            href="/create"
            className="inline-flex rounded-full bg-violet-600 px-8 py-3.5 text-base font-medium text-white hover:bg-violet-700 transition shadow-lg shadow-violet-200"
          >
            免费开始创建
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-600" />
            AI建站 — 让每个人都能拥有自己的网站
          </div>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-gray-600">定价</Link>
            <Link href="/create" className="hover:text-gray-600">创建</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
