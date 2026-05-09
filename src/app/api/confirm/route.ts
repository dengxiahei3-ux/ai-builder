import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId || !SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "配置错误" }, { status: 500 });
    }

    // 用 service_role key 直接确认用户
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}/confirm`, {
      method: "PUT",
      headers: {
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Confirm error:", err);
      return NextResponse.json({ error: "确认失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Confirm error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
