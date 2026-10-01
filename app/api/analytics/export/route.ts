import { eventsAsText, readEvents } from "@/lib/analytics";
import { validPanelKey } from "@/lib/panel-auth";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export const GET = async (request: NextRequest) => {
  if (!validPanelKey(request.cookies.get("bambole_painel")?.value)) {
    return new Response("Acesso restrito", { status: 403 });
  }
  try {
    const events = await readEvents();
    return new Response(eventsAsText(events), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="analytics-bambole.txt"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Falha ao exportar analytics", error);
    return new Response("Não foi possível ler os eventos.", { status: 503 });
  }
};
