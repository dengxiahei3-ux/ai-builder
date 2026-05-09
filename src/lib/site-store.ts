// 模拟数据存储 — MVP 阶段用 localStorage，后面换成 Supabase

"use client";

export interface StoredSite {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "draft" | "deployed";
  url?: string;
  leads: number;
}

export function getSites(): StoredSite[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("aibuilder_sites");
  return data ? JSON.parse(data) : [];
}

export function addSite(site: StoredSite) {
  const sites = getSites();
  sites.unshift(site);
  localStorage.setItem("aibuilder_sites", JSON.stringify(sites));
}

export function updateSite(id: string, updates: Partial<StoredSite>) {
  const sites = getSites();
  const idx = sites.findIndex((s) => s.id === id);
  if (idx !== -1) {
    sites[idx] = { ...sites[idx], ...updates };
    localStorage.setItem("aibuilder_sites", JSON.stringify(sites));
  }
}
