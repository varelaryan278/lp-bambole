import { crownPath } from "@/lib/crown-path";

type Props = { className?: string };

export const Crown = ({ className = "" }: Props) => (
  <svg viewBox="0 0 64 44" aria-hidden="true" className={className} fill="currentColor">
    <path d={crownPath} />
    <circle cx="2.5" cy="10" r="2.5" />
    <circle cx="61.5" cy="10" r="2.5" />
    <circle cx="32" cy="3" r="3" />
  </svg>
);
