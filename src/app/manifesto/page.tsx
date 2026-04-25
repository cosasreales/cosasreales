"use client";

import PageShell from "@/components/PageShell";
import { MANIFESTO, MANIFESTO_CIRCLE } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function ManifestoPage() {
  const { lang } = useLang();
  return (
    <PageShell>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Rotating circle of "MANIFIESTO / MANIFESTO" text */}
        <div
          className="relative aspect-square flex items-center justify-center"
          style={{ width: "min(calc(100vh - 200px), 92vw)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MANIFESTO_CIRCLE[lang]}
            alt=""
            className="absolute inset-0 w-full h-full object-contain animate-spin-slow select-none pointer-events-none"
            draggable={false}
          />

          {/* Text fits inside the inner circle. Square inscribed in a circle
              of diameter D has side D/√2 ≈ 71% — we go a touch tighter. */}
          <article
            className="relative z-10 text-center text-brand font-bold whitespace-pre-line"
            style={{
              width: "min(50vh, 50vw)",
              fontSize: "clamp(9px, 1.45vmin, 16px)",
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
            }}
          >
            {MANIFESTO[lang]}
          </article>
        </div>
      </div>
    </PageShell>
  );
}
