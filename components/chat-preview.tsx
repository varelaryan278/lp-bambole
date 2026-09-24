"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Crown } from "@/components/crown";

type Message =
  | { kind: "system"; text: string }
  | { kind: "msg"; text: string; time: string; photo?: string };

const messages: Message[] = [
  { kind: "system", text: "Você entrou usando o link de convite deste grupo" },
  { kind: "msg", text: "Bom dia, mamães! 💗 Promo relâmpago de hoje:", time: "09:12" },
  {
    kind: "msg",
    photo: "Vestido Petit Cherie",
    text: "Vestido Petit Cherie, tam 4 e 6\nDe R$ 219 por R$ 149\nSó 2 unidades. Quem quiser, me chama no privado 👇",
    time: "09:13",
  },
  {
    kind: "msg",
    photo: "Conjunto Mon Sucre",
    text: "Conjunto Mon Sucre, tam 2\nÚltima peça: R$ 99",
    time: "09:14",
  },
  { kind: "msg", text: "Tam 4 do vestido já foi! Restou o 6 💨", time: "09:31" },
  { kind: "msg", text: "Quer ver a próxima antes de todo mundo? Entra pelo botão rosa 💗", time: "09:32" },
];

const READ_MS = 1300;
const TYPING_MS = 1100;
const SYSTEM_MS = 900;
const LOOP_PAUSE_MS = 4500;

const bubbleMotion = {
  initial: { opacity: 0, y: 14, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
  transition: { type: "spring", stiffness: 420, damping: 28 },
} as const;

const Ticks = () => (
  <svg viewBox="0 0 16 11" aria-hidden="true" className="ml-1 inline-block h-3 w-4 text-[#53bdeb]" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M1 6l3 3 6-7" />
    <path d="M6 6l3 3 6-7" />
  </svg>
);

const Tail = () => (
  <span className="absolute -left-2 top-0 border-[8px] border-transparent border-r-white border-t-white" aria-hidden="true" />
);

const Typing = () => (
  <motion.div {...bubbleMotion} className="flex origin-top-left">
    <div className="relative rounded-lg rounded-tl-none bg-white px-3 py-2.5 shadow-sm">
      <Tail />
      <span className="flex gap-1">
        {[0, 0.15, 0.3].map((delay) => (
          <motion.span
            key={delay}
            className="block size-1.5 rounded-full bg-[#8696a0]"
            animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay }}
          />
        ))}
      </span>
    </div>
  </motion.div>
);

const Bubble = ({ message }: { message: Message }) => {
  if (message.kind === "system") {
    return (
      <motion.div {...bubbleMotion} className="flex justify-center">
        <span className="rounded-lg bg-white/90 px-3 py-1 text-center text-[11px] leading-snug text-[#54656f] shadow-sm">
          {message.text}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div {...bubbleMotion} className="flex origin-top-left">
      <div className="relative max-w-[88%] rounded-lg rounded-tl-none bg-white px-2 pb-1 pt-1.5 text-[13px] leading-snug text-[#111b21] shadow-sm">
        <Tail />
        <p className="mb-0.5 text-[12px] font-bold text-rosa">Bambolê Kids</p>
        {message.photo && (
          <div className="mb-1.5 flex h-28 items-end rounded-md bg-gradient-to-br from-nuvem via-[#f7c7d8] to-rosa/70 p-2">
            <span className="flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-ameixa">
              <Crown className="h-2.5 w-3.5 text-dourado" />
              {message.photo}
            </span>
          </div>
        )}
        <p className="whitespace-pre-line">{message.text}</p>
        <p className="mt-0.5 text-right text-[10px] text-[#667781]">
          {message.time}
          <Ticks />
        </p>
      </div>
    </motion.div>
  );
};

export const ChatPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;

    if (shown >= messages.length) {
      const timer = window.setTimeout(() => setShown(0), LOOP_PAUSE_MS);
      return () => window.clearTimeout(timer);
    }

    if (messages[shown].kind === "system") {
      const timer = window.setTimeout(() => setShown((s) => s + 1), SYSTEM_MS);
      return () => window.clearTimeout(timer);
    }

    const startTyping = window.setTimeout(() => setTyping(true), READ_MS);
    const deliver = window.setTimeout(() => {
      setTyping(false);
      setShown((s) => s + 1);
    }, READ_MS + TYPING_MS);
    return () => {
      window.clearTimeout(startTyping);
      window.clearTimeout(deliver);
    };
  }, [inView, shown]);

  const visible = messages.slice(0, shown);

  return (
    <div
      ref={ref}
      className="mx-auto w-[300px] overflow-hidden rounded-[2.2rem] border-[6px] border-ameixa bg-ameixa shadow-[0_30px_60px_-20px_rgba(58,31,44,0.5)]"
      role="img"
      aria-label="Exemplo de como as promoções chegam no grupo do WhatsApp"
    >
      <div className="flex items-center gap-2 bg-[#008069] px-3 py-3 text-white">
        <span className="flex size-9 items-center justify-center rounded-full bg-creme">
          <Crown className="h-4 w-6 text-dourado" />
        </span>
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-bold">GRUPO BAMBOLÊ KIDS 👑</p>
          <p className="truncate text-[11px] opacity-80">
            {typing ? "digitando…" : "Bambolê Kids, você"}
          </p>
        </div>
      </div>

      <div className="flex h-[420px] flex-col justify-end gap-2 overflow-hidden bg-[#efeae2] px-3 py-4 text-left">
        <AnimatePresence initial={false}>
          {visible.map((message, index) => (
            <Bubble key={`${message.kind}-${index}`} message={message} />
          ))}
          {typing && <Typing key="typing" />}
        </AnimatePresence>
      </div>

      <p className="bg-[#f0f2f5] px-3 py-3 text-center text-[11px] text-[#54656f]">
        Só administradores podem enviar mensagens
      </p>
    </div>
  );
};
