import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const SYSTEM_PROMPT = `你是专业的网站设计师和前端工程师。
根据用户的需求，输出一个 **双语 JSON** 格式的网站蓝图。
每个文本字段都包含中文(zh)和英文(en)两个版本。

输出格式：
{
  "name": {
    "zh": "中文网站名",
    "en": "English Site Name"
  },
  "style": "设计风格",
  "theme": { "primary": "#主色", "secondary": "#辅色" },
  "pages": [
    {
      "slug": "home",
      "title": { "zh": "首页", "en": "Home" },
      "sections": [
        {
          "type": "hero",
          "content": {
            "zh": { "title": "中文标题", "subtitle": "中文副标题", "cta": "按钮" },
            "en": { "title": "English Title", "subtitle": "English Subtitle", "cta": "Get Started" }
          }
        },
        {
          "type": "features",
          "content": {
            "zh": { "items": ["特点1", "特点2", "特点3"] },
            "en": { "items": ["Feature 1", "Feature 2", "Feature 3"] }
          }
        },
        {
          "type": "contact",
          "content": {
            "zh": { "title": "联系我们", "email": "info@example.com" },
            "en": { "title": "Contact Us", "email": "info@example.com" }
          }
        }
      ]
    }
  ]
}

注意：邮箱、电话号码等不变的内容不需要双语。
只输出 JSON，不要其他文字。`;

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
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
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
