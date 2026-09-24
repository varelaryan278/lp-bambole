type Props = { className?: string };

export const Crown = ({ className = "" }: Props) => (
  <svg viewBox="0 0 64 44" aria-hidden="true" className={className} fill="currentColor">
    <path d="M6 38h52l4-26-15 11-15-19-15 19L2 12l4 26Zm0 2a3 3 0 0 0 0 4h52a3 3 0 0 0 0-4H6Z" />
    <circle cx="2.5" cy="10" r="2.5" />
    <circle cx="61.5" cy="10" r="2.5" />
    <circle cx="32" cy="3" r="3" />
  </svg>
);
