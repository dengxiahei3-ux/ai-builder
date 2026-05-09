import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "请输入需求描述" }, { status: 400 });
    }
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: "AI 未配置" }, { status: 500 });
    }

    const completion = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [
          {
            role: "system",
            content: `你是专业的网站设计师和前端工程师。
根据用户的需求，输出一个 JSON 格式的网站蓝图。

输出格式：
{
  "name": "网站名称",
  "style": "设计风格描述",
  "theme": { "primary": "#主色", "secondary": "#辅色" },
  "pages": [
    {
      "slug": "home",
      "title": "首页",
      "sections": [
        { "type": "hero", "content": { "title": "主标题", "subtitle": "副标题", "cta": "按钮文字" } },
        { "type": "features", "content": { "items": ["特点1", "特点2", "特点3"] } },
        { "type": "contact", "content": { "title": "联系我们" } }
      ]
    }
  ]
}

只输出 JSON，不要其他文字。`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!completion.ok) {
      const err = await completion.text();
      console.error("DeepSeek error:", err);
      return NextResponse.json({ error: "AI 生成失败" }, { status: 500 });
    }

    const data = await completion.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "AI 返回为空" }, { status: 500 });
    }

    // 解析 JSON
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const site = JSON.parse(cleaned);

    return NextResponse.json({
      id: `site_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      ...site,
      prompt,
    });
  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json({ error: "生成失败：" + (error.message || "") }, { status: 500 });
  }
}
