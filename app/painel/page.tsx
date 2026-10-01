import type { Metadata } from "next";
import { connection } from "next/server";
import { readEvents, type AnalyticsEvent } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Painel de tráfego",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo",
});
const dayFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
});
const dayKey = (date: Date) => {
  const parts = dayFormatter.formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
};
const visitorKey = (event: AnalyticsEvent) => event.visitorId || event.ip;
const location = (event: AnalyticsEvent) =>
  [event.city, event.region, event.country].filter(Boolean).join(" / ") || "Não identificada";

const summarize = (events: AnalyticsEvent[]) => {
  const visits = events.filter((event) => event.type === "visit");
  const clicks = events.filter((event) => event.type === "click");
  const contacts = events.filter((event) => event.type === "contact");
  const uniqueVisitors = new Set(visits.map(visitorKey)).size;
  const leadVisitors = new Set(clicks.map(visitorKey)).size;
  const clickCounts = new Map<string, number>();
  for (const event of clicks) {
    const key = visitorKey(event);
    clickCounts.set(key, (clickCounts.get(key) || 0) + 1);
  }
  return {
    visits: visits.length,
    uniqueVisitors,
    clicks: clicks.length,
    leads: leadVisitors,
    contacts: contacts.length,
    repeated: [...clickCounts.values()].filter((count) => count >= 2).length,
    threePlus: [...clickCounts.values()].filter((count) => count >= 3).length,
    group: clicks.filter((event) => event.destination === "group").length,
    direct: clicks.filter((event) => event.destination === "direct").length,
    rate: uniqueVisitors ? `${((leadVisitors / uniqueVisitors) * 100).toFixed(1).replace(".", ",")}%` : "0%",
  };
};

const Summary = ({ title, events }: { title: string; events: AnalyticsEvent[] }) => {
  const stats = summarize(events);
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ameixa">{title}</h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[
          ["Visitas", stats.visits],
          ["Visitantes", stats.uniqueVisitors],
          ["Cliques", stats.clicks],
          ["Leads", stats.leads],
          ["Conversão", stats.rate],
          ["2+ cliques", stats.repeated],
          ["3+ cliques", stats.threePlus],
          ["Contatos", stats.contacts],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-nuvem p-4">
            <p className="text-sm text-ameixa-suave">{label}</p>
            <p className="mt-1 text-3xl font-extrabold text-rosa">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ameixa-suave">Grupo: {stats.group} cliques · Privado: {stats.direct} cliques</p>
    </section>
  );
};

type Row = { label: string; visits: number; clicks: number; contacts: number };

const groupRows = (events: AnalyticsEvent[], key: (event: AnalyticsEvent) => string): Row[] => {
  const groups = new Map<string, Row>();
  for (const event of events) {
    const label = key(event) || "Não informado";
    const row = groups.get(label) || { label, visits: 0, clicks: 0, contacts: 0 };
    if (event.type === "visit") row.visits++;
    if (event.type === "click") row.clicks++;
    if (event.type === "contact") row.contacts++;
    groups.set(label, row);
  }
  return [...groups.values()].sort((a, b) => b.visits - a.visits || b.clicks - a.clicks);
};

const BarTable = ({ title, rows, empty }: { title: string; rows: Row[]; empty?: string }) => {
  const max = Math.max(1, ...rows.map((row) => row.visits));
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-5 space-y-4">
        {rows.slice(0, 10).map((row) => (
          <div key={row.label}>
            <div className="flex justify-between gap-3 text-sm">
              <span className="min-w-0 truncate font-semibold" title={row.label}>{row.label}</span>
              <span className="shrink-0 text-ameixa-suave">{row.visits} visitas · {row.clicks} cliques · {row.contacts} contatos</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-nuvem">
              <div className="h-full rounded-full bg-rosa" style={{ width: `${row.visits / max * 100}%` }} />
            </div>
          </div>
        ))}
        {!rows.length && <p className="text-ameixa-suave">{empty || "Ainda não há dados."}</p>}
      </div>
    </section>
  );
};

const DailyChart = ({ events }: { events: AnalyticsEvent[] }) => {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return dayKey(date);
  });
  const rows = groupRows(events.filter((event) => days.includes(dayKey(new Date(event.at)))), (event) => dayKey(new Date(event.at)));
  const byDay = new Map(rows.map((row) => [row.label, row]));
  const max = Math.max(1, ...rows.map((row) => Math.max(row.visits, row.clicks)));
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold">Últimos 7 dias</h2>
      <p className="mt-1 text-sm text-ameixa-suave">Rosa: visitas · Dourado: cliques</p>
      <div className="mt-5 space-y-4">
        {days.map((day) => {
          const row = byDay.get(day) || { visits: 0, clicks: 0, contacts: 0 };
          return (
            <div key={day} className="grid grid-cols-[80px_1fr_90px] items-center gap-3 text-sm">
              <span className="font-semibold">{day.slice(8)}/{day.slice(5, 7)}</span>
              <div className="space-y-1">
                <div className="h-2.5 rounded-full bg-nuvem"><div className="h-full rounded-full bg-rosa" style={{ width: `${row.visits / max * 100}%` }} /></div>
                <div className="h-2.5 rounded-full bg-[#f7ebca]"><div className="h-full rounded-full bg-dourado" style={{ width: `${row.clicks / max * 100}%` }} /></div>
              </div>
              <span className="text-right text-ameixa-suave">{row.visits} / {row.clicks}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const RecentContacts = ({ events }: { events: AnalyticsEvent[] }) => {
  const contacts = events.filter((event) => event.type === "contact").slice(-20).reverse();
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold">Contatos recebidos</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-nuvem text-ameixa-suave"><tr><th className="py-2">Data</th><th>Nome</th><th>Telefone</th><th>Local</th><th>Origem</th><th>Campanha</th></tr></thead>
          <tbody>{contacts.map((event, index) => (
            <tr key={`${event.at}-${index}`} className="border-b border-nuvem/60">
              <td className="py-3">{dateFormatter.format(new Date(event.at))}</td>
              <td>{event.name || "—"}</td><td>{event.phone || "—"}</td>
              <td>{location(event)}</td><td>{event.source || "—"}</td><td>{event.campaign || "—"}</td>
            </tr>
          ))}</tbody>
        </table>
        {!contacts.length && <p className="py-5 text-ameixa-suave">Nenhum contato enviado ainda.</p>}
      </div>
    </section>
  );
};

const RecentClicks = ({ events }: { events: AnalyticsEvent[] }) => {
  const counts = new Map<string, number>();
  const clicks = events.filter((event) => event.type === "click").map((event) => {
    const key = visitorKey(event);
    const count = (counts.get(key) || 0) + 1;
    counts.set(key, count);
    return { event, count };
  }).slice(-20).reverse();
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-bold">Últimos cliques</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="border-b border-nuvem text-ameixa-suave"><tr><th className="py-2">Data</th><th>IP</th><th>Local</th><th>Destino</th><th>Origem</th><th>Campanha</th><th>Repetição</th></tr></thead>
          <tbody>{clicks.map(({ event, count }, index) => (
            <tr key={`${event.at}-${index}`} className="border-b border-nuvem/60">
              <td className="py-3">{dateFormatter.format(new Date(event.at))}</td>
              <td>{event.ip}</td><td>{location(event)}</td>
              <td>{event.destination === "group" ? "Grupo" : "Privado"}</td>
              <td>{event.source || "—"}</td><td>{event.campaign || "—"}</td>
              <td>{count}º clique</td>
            </tr>
          ))}</tbody>
        </table>
        {!clicks.length && <p className="py-5 text-ameixa-suave">Nenhum clique registrado ainda.</p>}
      </div>
    </section>
  );
};

const Painel = async () => {
  await connection();
  let events: AnalyticsEvent[];
  try {
    events = await readEvents();
  } catch {
    return <main className="mx-auto max-w-4xl p-8">Não foi possível ler os dados. Confira a configuração do armazenamento.</main>;
  }
  const today = dayKey(new Date());
  const todayEvents = events.filter((event) => dayKey(new Date(event.at)) === today);
  const locations = groupRows(events, location);
  const sources = groupRows(events, (event) => event.source || "Não informado");
  const mediums = groupRows(events, (event) => event.medium || "Não informado");
  const campaigns = groupRows(events.filter((event) => event.campaign), (event) => event.campaign || "");
  const creatives = groupRows(events.filter((event) => event.content), (event) => event.content || "");

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-rosa">Painel de tráfego</h1>
          <p className="mt-2 text-ameixa-suave">Visitas, origem, localização aproximada, cliques e contatos.</p>
        </div>
        <a href="/api/analytics/export" className="rounded-full bg-rosa px-5 py-3 font-bold text-white hover:bg-rosa-escuro">Baixar registros .txt</a>
      </div>
      <Summary title="Hoje" events={todayEvents} />
      <Summary title="Desde o início" events={events} />
      <DailyChart events={events} />
      <div className="grid gap-6 lg:grid-cols-2">
        <BarTable title="Geografia" rows={locations} />
        <BarTable title="Origem do tráfego" rows={sources} />
        <BarTable title="Mídia UTM" rows={mediums} />
        <BarTable title="Campanhas UTM" rows={campaigns} empty="Adicione utm_campaign aos links dos anúncios para ver as campanhas aqui." />
        <BarTable title="Criativos UTM" rows={creatives} empty="Use utm_content para diferenciar anúncios e criativos." />
        <section className="rounded-3xl bg-white p-6 text-sm leading-relaxed text-ameixa-suave shadow-sm">
          <h2 className="font-display text-2xl font-bold text-ameixa">Como ler os números</h2>
          <p className="mt-4">Visitantes e leads usam o identificador do navegador. Registros antigos usam IP como aproximação. Conversão = visitantes que clicaram ÷ visitantes que acessaram.</p>
          <p className="mt-3">Geografia vem do IP e pode estar imprecisa. Ela aparece quando a hospedagem envia país, estado e cidade. Contatos são nomes ou telefones enviados no formulário do terceiro clique.</p>
          <p className="mt-3">Cliques não confirmam entrada no grupo nem compra. Atualize a página para ver os eventos recentes.</p>
        </section>
      </div>
      <RecentContacts events={events} />
      <RecentClicks events={events} />
    </main>
  );
};

export default Painel;
