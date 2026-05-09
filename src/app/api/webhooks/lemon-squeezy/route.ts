import { NextRequest, NextResponse } from "next/server";

const LS_WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("x-signature") || "";

    // 验证签名（可选，MVP阶段可以先不验证）
    const payload = JSON.parse(body);

    const eventName = payload.meta?.event_name;

    console.log("Lemon Squeezy webhook:", eventName);

    // 处理订阅事件
    switch (eventName) {
      case "order_created":
      case "subscription_created": {
        const data = payload.data;
        const customerEmail =
          data.attributes?.user_email ||
          data.attributes?.customer_email ||
          "";
        const variantId = data.attributes?.variant_id || "";

        console.log(`New subscription: ${customerEmail}, variant: ${variantId}`);
        // TODO: 在数据库中标记用户为已付费
        break;
      }

      case "subscription_cancelled": {
        const data = payload.data;
        const customerEmail =
          data.attributes?.user_email ||
          data.attributes?.customer_email ||
          "";

        console.log(`Subscription cancelled: ${customerEmail}`);
        // TODO: 在数据库中标记用户为已取消
        break;
      }

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
