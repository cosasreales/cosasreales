"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LOGO, SAM_STRIP } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function Header({ headerSlot }: { headerSlot?: ReactNode }) {
  const { lang, setLang } = useLang();

  return (
    <header className="pointer-events-none absolute top-0 left-0 right-0 z-40 flex items-end justify-between p-6 md:p-8">
      <Link
        href="/home"
        className="pointer-events-auto block w-[140px] md:w-[190px]"
        aria-label="Cosas Reales — home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Cosas Reales" className="w-full h-auto" />
      </Link>

      <div className="flex items-end gap-6 md:gap-8">
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          aria-label="Toggle language"
          className="pointer-events-auto text-[11px] md:text-[12px] tracking-[0.15em] text-black underline-hover"
        >
          {lang === "es" ? "EN" : "ES"}
        </button>

        {headerSlot && (
          <div className="pointer-events-auto">{headerSlot}</div>
        )}

        <Link
          href="/about"
          className="pointer-events-auto flex items-end gap-4 md:gap-5"
        >
          <div className="text-right hidden sm:block">
            <div className="text-[12px] md:text-[13px] font-bold text-black leading-tight">
              Samuel Martos
            </div>
            <div className="text-[11px] md:text-[12px] text-black leading-tight">
              {lang === "es"
                ? "Artista & Consultor Creativo"
                : "Artist & Creative Consultant"}
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SAM_STRIP}
            alt="Samuel Martos"
            className="h-8 md:h-10 w-auto select-none"
            draggable={false}
          />
        </Link>
      </div>
    </header>
  );
}
