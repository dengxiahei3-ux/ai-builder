import { NextRequest, NextResponse } from "next/server";

const LS_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { variantId, redirectUrl } = await request.json();

    if (!variantId || !LS_API_KEY) {
      return NextResponse.json({ error: "配置错误" }, { status: 500 });
    }

    // 创建 Lemon Squeezy 结账链接
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LS_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {},  // 可传用户ID等
            },
            product_options: {
              redirect_url: redirectUrl || "",
            },
          },
          relationships: {
            variant: {
              data: {
                type: "variants",
                id: String(variantId),
              },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("LS error:", data.errors);
      return NextResponse.json({ error: "创建结账失败" }, { status: 500 });
    }

    const checkoutUrl = data.data?.attributes?.url;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
