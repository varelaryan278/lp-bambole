import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const equal = (a: string, b: string) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
};

export const proxy = (request: NextRequest) => {
  const password = process.env.ANALYTICS_PASSWORD;
  if (!password) {
    return new Response("Configure ANALYTICS_PASSWORD no servidor.", { status: 503 });
  }

  const authorization = request.headers.get("authorization");
  let credentials = "";
  if (authorization?.startsWith("Basic ")) {
    try {
      credentials = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    } catch { /* invalid credentials */ }
  }
  if (!equal(credentials, `admin:${password}`)) {
    return new Response("Acesso restrito", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Painel Bambole", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/painel", "/api/analytics/export"],
};
