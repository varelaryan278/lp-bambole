import "server-only";

import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type AnalyticsEvent = {
  at: string;
  type: "visit" | "click" | "contact";
  ip: string;
  visitorId?: string;
  destination?: "group" | "direct";
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  country?: string;
  region?: string;
  city?: string;
  name?: string;
  phone?: string;
};

const filePath = path.join(process.cwd(), "data", "analytics.txt");
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisKey = "bambole:analytics:events";

const useRedis = Boolean(redisUrl && redisToken);

const assertStorage = () => {
  if (process.env.VERCEL && !useRedis) {
    throw new Error("Configure UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN para registrar eventos na Vercel.");
  }
};

const redisCommand = async (command: (string | number)[]) => {
  const response = await fetch(redisUrl!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Falha no armazenamento: ${response.status}`);
  const result = await response.json();
  if (result.error) throw new Error("Falha no armazenamento dos eventos.");
  return result.result;
};

export const saveEvent = async (event: AnalyticsEvent) => {
  assertStorage();
  const line = JSON.stringify(event);
  if (useRedis) {
    await redisCommand(["RPUSH", redisKey, line]);
    return;
  }
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${line}\n`, "utf8");
};

export const readEvents = async (): Promise<AnalyticsEvent[]> => {
  assertStorage();
  let lines: string[];
  if (useRedis) {
    lines = (await redisCommand(["LRANGE", redisKey, 0, -1])) ?? [];
  } else {
    try {
      lines = (await readFile(filePath, "utf8")).split("\n");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
  }
  return lines.filter(Boolean).map((line) => JSON.parse(line) as AnalyticsEvent);
};

export const eventsAsText = (events: AnalyticsEvent[]) =>
  events.map((event) => JSON.stringify(event)).join("\n") + (events.length ? "\n" : "");
