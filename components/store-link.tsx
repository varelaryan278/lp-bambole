"use client";

import { trackAnalytics } from "@/components/visit-tracker";
import { site } from "@/lib/site";

type Props = { label?: string; className?: string };

const BagIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7h12l1 14H5L6 7Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);

export const StoreLink = ({ label = "Ou compre direto na loja online", className = "" }: Props) => (
  <a
    href={site.storeUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackAnalytics("click", { destination: "store" }).catch(() => {})}
    className={`inline-flex items-center gap-2 font-bold text-rosa underline decoration-rosa/40 underline-offset-4 transition-colors hover:text-rosa-escuro hover:decoration-rosa focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado ${className}`}
  >
    <BagIcon />
    {label}
    <span aria-hidden="true">→</span>
  </a>
);
