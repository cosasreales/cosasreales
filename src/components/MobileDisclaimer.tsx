"use client";

import { useLang } from "@/lib/i18n";

const COPY = {
  es: {
    title: "VERSIÓN MOBILE EN DESARROLLO",
    body: "Esta web está pensada para verse en desktop. La versión mobile está en proceso — por ahora algunos contenidos pueden no adaptarse bien.",
    foot: "Volvé desde una computadora para la experiencia completa.",
  },
  en: {
    title: "MOBILE VERSION IN PROGRESS",
    body: "This site is designed for desktop. The mobile version is still in progress — some content may not adapt well for now.",
    foot: "Visit from a computer for the full experience.",
  },
};

export default function MobileDisclaimer({
  variant = "site",
}: {
  variant?: "site" | "tool";
}) {
  const { lang } = useLang();
  const c = COPY[lang];
  const title =
    variant === "tool"
      ? lang === "es"
        ? "LA MESA SOLO FUNCIONA EN DESKTOP"
        : "LA MESA IS DESKTOP ONLY"
      : c.title;
  const body =
    variant === "tool"
      ? lang === "es"
        ? "Esta herramienta requiere un mouse y una pantalla amplia. Volvé desde una computadora para usarla."
        : "This tool needs a mouse and a wide screen. Come back from a computer to use it."
      : c.body;
  return (
    <div
      className={`md:hidden fixed inset-0 bg-white text-black flex flex-col items-center justify-center px-8 text-center ${
        variant === "tool" ? "z-[110]" : "z-[100]"
      }`}
    >
      <p className="text-[11px] tracking-[0.2em] mb-4">{title}</p>
      <p className="text-[13px] leading-relaxed max-w-[28rem] mb-6">{body}</p>
      {variant === "site" && (
        <p className="text-[11px] text-black/60 max-w-[28rem]">{c.foot}</p>
      )}
    </div>
  );
}
