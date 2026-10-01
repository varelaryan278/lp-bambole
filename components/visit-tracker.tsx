"use client";

import { useEffect } from "react";

const visitorKey = "bambole_visitor_id";

export const getVisitorId = () => {
  try {
    let id = window.localStorage.getItem(visitorKey);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(visitorKey, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
};

export const trackAnalytics = (
  type: "visit" | "click" | "contact",
  details: { destination?: "group" | "direct"; name?: string; phone?: string } = {},
) => {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer ? new URL(document.referrer).hostname : "";
  const externalReferrer = referrer && referrer !== window.location.hostname ? referrer : "";
  return fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      ...details,
      visitorId: getVisitorId(),
      source: params.get("utm_source") || externalReferrer || "direto",
      medium: params.get("utm_medium"),
      campaign: params.get("utm_campaign"),
      content: params.get("utm_content"),
      term: params.get("utm_term"),
      referrer: externalReferrer,
    }),
    keepalive: true,
  });
};

export const VisitTracker = () => {
  useEffect(() => {
    trackAnalytics("visit").catch(() => {});
  }, []);
  return null;
};
