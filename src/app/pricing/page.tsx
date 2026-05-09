import Link from "next/link";

const CHECKOUT_URL = "https://ai-builder.lemonsqueezy.com/checkout/buy/ee614ea7-4646-45a4-a04c-873a45d17053";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold">简单透明的会员</h1>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          无隐藏费用，随时取消。所有套餐均含 AI 生成功能
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
        {[
          {
            name: "免费",
            price: "¥0",
            period: "",
            features: ["1 个网站", "子域名", "1 个页面", "基础模板"],
            href: "/create",
            popular: false,
          },
          {
            name: "基础版",
            price: "¥36",
            period: "/月（$5）",
            features: [
              "1 个网站",
              "自定义域名",
              "最多 5 个页面",
              "AI 自动生成",
              "询盘表单",
              "邮件通知",
            ],
            href: CHECKOUT_URL,
            popular: true,
          },
          {
            name: "专业版",
            price: "¥99",
            period: "/月（$14）",
            features: [
              "3 个网站",
              "自定义域名",
              "无限页面",
              "AI 自动生成",
              "询盘表单 + 微信通知",
              "数据统计",
              "优先支持",
            ],
            href: CHECKOUT_URL + "?plan=pro",
            popular: false,
            premium: true,
          },
        ].map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 ${
              plan.popular
                ? "bg-violet-600 text-white ring-4 ring-violet-200 scale-105 relative"
                : plan.premium
                ? "bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 text-white border-2 border-amber-400/40 shadow-2xl shadow-amber-900/30 relative overflow-hidden"
                : "bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200"
            }`}
          >
            {plan.premium && <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-bl-full" />}
            {plan.premium && (
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-xl" />
            )}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex rounded-full bg-violet-800 px-4 py-1 text-xs font-medium text-white">
                最受欢迎
              </div>
            )}
            <h3 className={`text-lg font-semibold ${plan.popular ? "" : plan.premium ? "text-white" : "text-gray-900"}`}>
              {plan.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className={plan.popular ? "text-white/70" : "text-gray-500"}>{plan.period}</span>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <svg
                    className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-white" : plan.premium ? "text-amber-400" : "text-violet-600"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {plan.name === "免费" ? (
              <Link href="/create"
                className="mt-8 block w-full rounded-full py-2.5 text-center text-sm font-medium transition border border-gray-300 text-gray-700 hover:bg-gray-50">
                免费开始
              </Link>
            ) : (
              <a
                href={plan.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 block w-full rounded-full py-2.5 text-center text-sm font-medium transition ${
                  plan.popular
                    ? "bg-white text-violet-700 hover:bg-gray-100"
                    : plan.premium
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                立即订阅
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        支付由 Lemon Squeezy 安全处理。支持信用卡、支付宝等。
      </p>

      <div className="mt-20 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-8">常见问题</h2>
        <div className="space-y-6">
          {[
            { q: "需要会写代码吗？", a: "完全不需要。用中文描述需求，AI 自动生成完整网站。" },
            { q: "可以绑定自己的域名吗？", a: "基础版及以上支持绑定自定义域名。" },
            { q: "AI 生成需要额外付费吗？", a: "不需要，订阅费用已包含 AI 生成。" },
            { q: "可以随时取消吗？", a: "是的，随时取消订阅，已生成的网站继续保留。" },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-sm mb-1">{q}</h3>
              <p className="text-sm text-gray-600">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
