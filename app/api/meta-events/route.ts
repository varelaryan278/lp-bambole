import type { NextRequest } from "next/server";

const GRAPH_VERSION = "v24.0";
const allowedEvents = new Set(["Lead", "Contact"]);

export const POST = async (request: NextRequest) => {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return new Response(null, { status: 204 });

  const { eventName, eventId, sourceUrl, fbp, fbc } = await request.json();
  if (!allowedEvents.has(eventName) || typeof eventId !== "string") {
    return Response.json({ error: "invalid event" }, { status: 400 });
  }

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: "website",
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbp,
          fbc,
        },
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  return new Response(null, { status: response.ok ? 204 : 502 });
};
