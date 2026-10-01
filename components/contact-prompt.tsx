"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackAnalytics } from "@/components/visit-tracker";

type Props = {
  href: string;
  onClose: () => void;
};

export const ContactPrompt = ({ href, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanName && !cleanPhone) {
      setError("Informe seu nome ou telefone para enviar.");
      return;
    }
    if (cleanPhone && cleanPhone.length < 10) {
      setError("Confira o telefone com DDD.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const response = await trackAnalytics("contact", { name: cleanName, phone: cleanPhone });
      if (!response.ok) throw new Error("save failed");
      window.location.assign(href);
    } catch {
      setError("Não conseguimos salvar agora. Você ainda pode continuar para o WhatsApp.");
      setSaving(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="contact-prompt-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border-0 bg-creme p-6 text-ameixa shadow-2xl backdrop:bg-ameixa/60 sm:p-8"
    >
      <h2 id="contact-prompt-title" className="font-display text-2xl font-bold text-rosa">
        Quer ajuda para escolher?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ameixa-suave">
        Vimos que você se interessou pelas ofertas. Deixe seu nome ou telefone se quiser que a gente entre em contato.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm font-bold" htmlFor="lead-name">Nome</label>
        <input
          id="lead-name"
          name="name"
          autoComplete="name"
          maxLength={120}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-rosa/30 bg-white px-4 py-3 outline-rosa"
          placeholder="Seu nome"
        />
        <label className="block text-sm font-bold" htmlFor="lead-phone">Telefone com DDD</label>
        <input
          id="lead-phone"
          name="tel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-xl border border-rosa/30 bg-white px-4 py-3 outline-rosa"
          placeholder="(49) 99999-9999"
        />
        {error && <p role="alert" className="text-sm font-semibold text-rosa-escuro">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-rosa px-5 py-3 font-bold text-white hover:bg-rosa-escuro disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Enviar e continuar"}
        </button>
      </form>
      <a
        href={href}
        className="mt-4 block text-center text-sm font-semibold text-ameixa-suave underline underline-offset-4"
      >
        Continuar sem preencher
      </a>
      <p className="mt-5 text-xs leading-relaxed text-ameixa-suave">
        Seus dados serão usados apenas para contato sobre as peças da Bambolê Kids.
      </p>
    </dialog>
  );
};
