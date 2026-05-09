"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSites } from "@/lib/site-store";
import type { StoredSite } from "@/lib/site-store";
import { Globe, Plus, ExternalLink, Mail } from "lucide-react";

export default function Dashboard() {
  const [sites, setSites] = useState<StoredSite[]>([]);

  useEffect(() => {
    setSites(getSites());
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">我的网站</h1>
          <p className="text-gray-500 text-sm mt-1">
            共 {sites.length} 个网站
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition"
        >
          <Plus className="h-4 w-4" />
          创建新网站
        </Link>
      </div>

      {sites.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
            <Globe className="h-8 w-8 text-violet-500" />
          </div>
          <h2 className="text-lg font-semibold mb-2">还没有网站</h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
            用 AI 在 30 秒内生成你的第一个网站，不需要任何代码
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 transition"
          >
            <Plus className="h-4 w-4" />
            创建第一个网站
          </Link>
        </div>
      ) : (
        /* Site list */
        <div className="space-y-4">
          {sites.map((site) => (
            <div
              key={site.id}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{site.name}</h3>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        site.status === "deployed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {site.status === "deployed" ? "已上线" : "草稿"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {site.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>
                      创建于{" "}
                      {new Date(site.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                    {site.leads > 0 && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {site.leads} 条询盘
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {site.status === "deployed" && site.url && (
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                      <ExternalLink className="h-3 w-3" />
                      访问
                    </a>
                  )}
                  <Link
                    href={`/create/preview?id=${site.id}`}
                    className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 transition"
                  >
                    编辑
                  </Link>
                  <Link
                    href={`/dashboard/sites/${site.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                  >
                    设置
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
