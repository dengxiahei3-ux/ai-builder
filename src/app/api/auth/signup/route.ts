import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "参数错误" }, { status: 400 });
    }

    // 用 service_role 直接创建已确认的用户，不走邮件
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name || "" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data.msg || data.message || JSON.stringify(data);
      if (msg.includes("already registered") || msg.includes("already exists")) {
        return NextResponse.json({ error: "该邮箱已注册，请直接登录" }, { status: 400 });
      }
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
