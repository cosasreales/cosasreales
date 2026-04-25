"use client";

import { LINKS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import MobileDisclaimer from "@/components/MobileDisclaimer";

const CREDIT = {
  es: {
    pre: "La mesa de trabajo es una práctica que aprendí en ",
    link: "Creadores de Imágenes",
    post: ". Gracias CDI por ayudarme a encontrar mi forma de ver las cosas.",
  },
  en: {
    pre: "The work-table is a practice I learned at ",
    link: "Creadores de Imágenes",
    post: ". Thanks CDI for helping me find my way of seeing things.",
  },
};

const BACK = { es: "← volver a Cosas Reales", en: "← back to Cosas Reales" };

export default function LaMesaPage() {
  const { lang } = useLang();
  const c = CREDIT[lang];
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <MobileDisclaimer variant="tool" />
      <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-black/10 text-[11px] text-black">
        <a href="/" className="underline-hover whitespace-nowrap">
          {BACK[lang]}
        </a>
        <p className="text-right text-black/70 leading-snug">
          {c.pre}
          <a
            href={LINKS.cdi}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {c.link}
          </a>
          {c.post}
        </p>
      </div>
      <iframe
        src={`/la-mesa/index.html?lang=${lang}`}
        title="La Mesa"
        className="flex-1 w-full block border-0"
      />
    </div>
  );
}
