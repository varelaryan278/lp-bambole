import type { NextRequest } from "next/server";
import { saveEvent, type AnalyticsEvent } from "@/lib/analytics";

export const runtime = "nodejs";

const clean = (value: unknown) =>
  typeof value === "string" ? value.replace(/[\r\n\t]/g, " ").slice(0, 120) : undefined;

const cleanHeader = (value: string | null, length = 100) =>
  value?.replace(/[\r\n\t]/g, " ").slice(0, length) || undefined;

const decodeCity = (value: string | null) => {
  if (!value) return undefined;
  try {
    return cleanHeader(decodeURIComponent(value));
  } catch {
    return cleanHeader(value);
  }
};

export const POST = async (request: NextRequest) => {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) {
        return Response.json({ error: "Origem inválida" }, { status: 403 });
      }
    } catch {
      return Response.json({ error: "Origem inválida" }, { status: 403 });
    }
  }

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (input.type !== "visit" && input.type !== "click" && input.type !== "contact") {
    return Response.json({ error: "Evento inválido" }, { status: 400 });
  }
  if (input.type === "click" && input.destination !== "group" && input.destination !== "direct") {
    return Response.json({ error: "Destino inválido" }, { status: 400 });
  }
  const name = clean(input.name)?.trim();
  const phone = typeof input.phone === "string" ? input.phone.replace(/\D/g, "").slice(0, 15) : undefined;
  if (input.type === "contact" && (!name && !phone || (phone && phone.length < 10))) {
    return Response.json({ error: "Informe nome ou telefone válido" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "desconhecido";
  const event: AnalyticsEvent = {
    at: new Date().toISOString(),
    type: input.type,
    ip: ip.slice(0, 64),
    visitorId: typeof input.visitorId === "string" && /^[0-9a-f-]{36}$/i.test(input.visitorId)
      ? input.visitorId : undefined,
    ...(input.type === "click" ? { destination: input.destination as "group" | "direct" } : {}),
    source: clean(input.source),
    medium: clean(input.medium),
    campaign: clean(input.campaign),
    content: clean(input.content),
    term: clean(input.term),
    referrer: clean(input.referrer),
    country: cleanHeader(request.headers.get("x-vercel-ip-country"), 2),
    region: cleanHeader(request.headers.get("x-vercel-ip-country-region"), 8),
    city: decodeCity(request.headers.get("x-vercel-ip-city")),
    ...(input.type === "contact" ? { name, phone } : {}),
  };

  try {
    await saveEvent(event);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Falha ao registrar analytics", error);
    return Response.json({ error: "Não foi possível registrar o evento" }, { status: 503 });
  }
};
