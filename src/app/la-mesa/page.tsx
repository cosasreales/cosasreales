"use client";

import { LINKS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import MobileDisclaimer from "@/components/MobileDisclaimer";

const CREDIT = {
  es: "Gracias Creadores de Imágenes por ayudarnos a encontrar nuestra forma de mirar.",
  en: "Thanks Creadores de Imágenes for helping us find our own way of seeing.",
};

const BACK = { es: "← Ir a Cosas Reales", en: "← Go to Cosas Reales" };
const CDI = {
  es: "Ir a Creadores de Imágenes →",
  en: "Go to Creadores de Imágenes →",
};

export default function LaMesaPage() {
  const { lang } = useLang();
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <MobileDisclaimer variant="tool" />
      <iframe
        src={`/la-mesa/index.html?lang=${lang}`}
        title="La Mesa"
        className="flex-1 w-full block border-0"
      />
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-4 py-1.5 border-t border-black/10 text-[10px] md:text-[11px] text-black">
        <a href="/" className="underline underline-offset-2 whitespace-nowrap">
          {BACK[lang]}
        </a>
        <p className="text-center text-black/70 leading-snug">
          {CREDIT[lang]}
        </p>
        <a
          href={LINKS.cdi}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 whitespace-nowrap"
        >
          {CDI[lang]}
        </a>
      </div>
    </div>
  );
}
