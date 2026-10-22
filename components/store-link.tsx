"use client";

import { trackAnalytics } from "@/components/visit-tracker";
import { site } from "@/lib/site";

type Props = { label?: string; className?: string };

const BagIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7h12l1 14H5L6 7Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);

export const StoreLink = ({ label = "Comprar na loja online", className = "" }: Props) => (
  <a
    href={site.storeUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackAnalytics("click", { destination: "store" }).catch(() => {})}
    className={`inline-flex items-center justify-center gap-3 rounded-full bg-dourado px-8 py-4 text-lg font-bold text-ameixa shadow-[0_10px_30px_-10px_var(--color-dourado)] transition-colors hover:bg-ameixa hover:text-white focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rosa ${className}`}
  >
    <BagIcon />
    {label}
  </a>
);
