import { eventsAsText, readEvents } from "@/lib/analytics";

export const runtime = "nodejs";

export const GET = async () => {
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
