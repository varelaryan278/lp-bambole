import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { validPanelKey } from "@/lib/panel-auth";

const cookieName = "bambole_painel";

export const proxy = (request: NextRequest) => {
  const key = process.env.ANALYTICS_ACCESS_KEY || process.env.ANALYTICS_PASSWORD;
  if (!key) {
    return new Response("Configure ANALYTICS_ACCESS_KEY no servidor.", { status: 503 });
  }

  const urlKey = request.nextUrl.searchParams.get("chave");
  if (validPanelKey(urlKey)) {
    const destination = request.nextUrl.clone();
    destination.searchParams.delete("chave");
    const response = NextResponse.redirect(destination);
    response.cookies.set(cookieName, key, {
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  }
  if (!validPanelKey(request.cookies.get(cookieName)?.value)) {
    return new Response("Acesso restrito. Abra o link privado do painel.", {
      status: 403,
      headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
    });
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
};

export const config = {
  matcher: ["/painel", "/api/analytics/export"],
};
