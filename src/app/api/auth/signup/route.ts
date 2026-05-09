import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function supabaseAdmin(path: string, options: any = {}) {
  const url = `${SUPABASE_URL}${path}`;
  const headers: any = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };
  if (options.headers) Object.assign(headers, options.headers);

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "参数错误" }, { status: 400 });
    }

    // 第一步：尝试直接创建已确认的用户
    const create = await supabaseAdmin("/auth/v1/admin/users", {
      method: "POST",
      body: {
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name || "" },
      },
    });

    if (create.ok) {
      return NextResponse.json({ success: true, id: create.data.id });
    }

    const msg = (create.data.msg || create.data.message || "").toLowerCase();

    // 如果用户已存在，用 admin API 查找并确认
    if (msg.includes("already registered") || msg.includes("already exists")) {
      // 通过登录来验证
      const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "apikey": SERVICE_ROLE_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok && loginData.user) {
        // 能登录，说明已确认
        return NextResponse.json({ success: true, id: loginData.user.id });
      }

      if (loginData.error_description?.includes("Email not confirmed")) {
        // 已注册但未确认 → 重置密码并确认
        const userId = loginData.user?.id;
        if (userId) {
          // 尝试重新确认
          await supabaseAdmin(`/auth/v1/admin/users/${userId}`, {
            method: "PUT",
            body: { password, email_confirm: true },
          });

          // 再试一次登录
          const retry = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: "POST",
            headers: {
              "apikey": SERVICE_ROLE_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const retryData = await retry.json();
          if (retry.ok && retryData.user) {
            return NextResponse.json({ success: true, id: retryData.user.id });
          }
        }
      }

      return NextResponse.json({ error: "该邮箱已注册，请直接登录" }, { status: 400 });
    }

    return NextResponse.json({ error: msg || "注册失败" }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
