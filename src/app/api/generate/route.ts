import { NextRequest, NextResponse } from "next/server";

// 模拟 AI 生成 — MVP 阶段返回预设模板数据
// 上线后替换为真正的 GPT-4o mini API 调用

const MOCK_SITES: Record<string, { name: string; pages: number; style: string }> = {
  摄影: { name: "光影摄影作品集", pages: 4, style: "暗黑现代" },
  外贸: { name: "GlobalLighting 外贸官网", pages: 5, style: "商务专业" },
  博客: { name: "我的个人博客", pages: 3, style: "极简干净" },
  咖啡: { name: "晨光咖啡馆", pages: 4, style: "温暖复古" },
  科技: { name: "NovaTech 科技公司官网", pages: 5, style: "现代科技" },
  电商: { name: "优品商城", pages: 6, style: "明亮简洁" },
  教育: { name: "启航教育平台", pages: 5, style: "清新活力" },
  餐饮: { name: "味觉餐厅官网", pages: 4, style: "温暖精致" },
};

function generateSite(prompt: string) {
  let site = MOCK_SITES["科技"]; // 默认

  for (const [keyword, data] of Object.entries(MOCK_SITES)) {
    if (prompt.includes(keyword)) {
      site = data;
      break;
    }
  }

  const id = `site_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  return {
    id,
    name: site.name,
    pages: site.pages,
    style: site.style,
    theme: {
      primary: prompt.includes("暗黑") ? "#1a1a2e" : prompt.includes("温暖") ? "#c2885c" : "#7c3aed",
      secondary: prompt.includes("科技") ? "#06b6d4" : "#6d28d9",
    },
    sections: [
      { type: "hero", text: `${site.name} — 专业的${site.style}风格网站` },
      { type: "features", text: "三大核心优势" },
      { type: "about", text: "关于我们" },
      { type: "contact", text: "联系我们 — 期待您的咨询" },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "请输入需求描述" },
        { status: 400 }
      );
    }

    // 模拟生成延迟（1.5-3秒）
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1500));

    const result = generateSite(prompt);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "生成失败，请稍后重试" },
      { status: 500 }
    );
  }
}
