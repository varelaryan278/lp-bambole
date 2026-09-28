export type MetaEventName = "Lead" | "Contact";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const readCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.slice(name.length + 1);

export const trackMetaEvent = (eventName: MetaEventName) => {
  const eventId = crypto.randomUUID();

  window.fbq?.("track", eventName, {}, { eventID: eventId });

  const body = JSON.stringify({
    eventName,
    eventId,
    sourceUrl: window.location.href,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
  });

  fetch("/api/meta-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
};
