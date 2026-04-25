"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import PageShell from "@/components/PageShell";
import {
  ABOUT_COPY,
  ABOUT_ROLES,
  ABOUT_SIDE,
  CV_PDF,
  CONTENT,
  EXHIBITIONS,
  FUN_GRAPHIC,
  NAME_CIRCLE,
} from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function AboutPage() {
  const { lang, tr } = useLang();
  const [showExhibitions, setShowExhibitions] = useState(false);

  const copy = ABOUT_COPY[lang];
  const roles = ABOUT_ROLES[lang];
  const side = ABOUT_SIDE[lang];

  // Align roles bottom to side-panel (services) bottom.
  const sideRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const [rolesBottom, setRolesBottom] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const target = sideRef.current?.getBoundingClientRect();
      const col = leftColRef.current?.getBoundingClientRect();
      if (!target || !col) return;
      setRolesBottom(col.bottom - target.bottom);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sideRef.current) ro.observe(sideRef.current);
    if (leftColRef.current) ro.observe(leftColRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [lang]);

  return (
    <PageShell>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: showExhibitions ? 0.3 : 1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={NAME_CIRCLE}
          alt=""
          className="w-auto h-auto max-w-[calc(110vw-140px)] max-h-[calc(120vh-140px)] object-contain animate-spin-slow select-none"
          draggable={false}
        />
      </div>

      <div className="absolute inset-0 z-10 px-10 md:px-[60px] pt-[160px] md:pt-[200px] pb-24 md:pb-28 overflow-hidden">
        <div className="h-full max-w-[1180px] mx-auto grid grid-cols-12 gap-x-10">
          {/* LEFT COLUMN: image + roles/exhibitions */}
          <div
            ref={leftColRef}
            className="col-span-12 md:col-span-7 flex flex-col min-h-0 relative"
          >
            <div className="relative w-full flex justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${CONTENT}/3_About Me/${encodeURIComponent("Imagen de Sam.png")}`}
                alt="Samuel Martos"
                className="w-auto h-auto max-w-full max-h-[48vh] select-none"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10 text-white font-bold tracking-[-0.04em] text-[13px] md:text-[14px]">
                <button
                  onClick={() => setShowExhibitions((v) => !v)}
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  {tr("about_exhibitions")}
                </button>
                <a
                  href={CV_PDF}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  {tr("about_cv")}
                </a>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showExhibitions ? (
                <motion.div
                  key="exhibitions"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="mt-12 text-black"
                >
                  <h3 className="text-[14px] font-bold tracking-[-0.04em] mb-4">
                    {lang === "es" ? "[ EXHIBICIONES ]" : "[ EXHIBITIONS ]"}
                  </h3>
                  <ul className="space-y-3 text-[13px] md:text-[14px] font-light tracking-[-0.04em] leading-[1.35]">
                    {EXHIBITIONS.map((ex, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[60px_1fr] gap-x-4 border-t border-black/30 pt-3"
                      >
                        <span>{ex.year}</span>
                        <span>{ex.title[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="roles"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  style={
                    rolesBottom !== null
                      ? { bottom: `${rolesBottom}px` }
                      : undefined
                  }
                  className="absolute left-[10px] flex flex-col items-center text-brand z-20"
                >
                  <InlineFunGraphic size={110} />
                  <ul className="mt-[20px] font-bold tracking-[-0.04em] text-[14px] md:text-[15px] leading-[1.2] text-center">
                    {roles.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: copy + side panel */}
          <div className="col-span-12 md:col-span-5 md:max-w-[420px]">
            <h2 className="text-brand font-bold tracking-[-0.04em] text-[24px] md:text-[28px] leading-[1.1] mb-3">
              {tr("about_title")}
            </h2>
            <div className="space-y-2.5 text-brand font-bold tracking-[-0.04em] text-[13px] md:text-[15px] leading-[1.3] hyphens-auto">
              {copy.map((p, i) => (
                <p
                  key={i}
                  className="text-justify [text-align-last:justify]"
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              ref={sideRef}
              className="mt-6 space-y-2.5 text-black font-light tracking-[-0.04em] text-[12px] md:text-[13px] leading-[1.3]"
            >
              <div>
                <div className="font-bold">{side.experience}</div>
                <div className="whitespace-pre-line">{side.experienceValue}</div>
              </div>
              <div>
                <div className="font-bold">{side.highlights}</div>
                <div className="whitespace-pre-line">{side.highlightsList}</div>
              </div>
              <div>
                <div className="font-bold">{side.past}</div>
                <div className="whitespace-pre-line">{side.pastList}</div>
              </div>
              <div>
                <div className="font-bold">{side.services}</div>
                <div className="whitespace-pre-line">{side.servicesList}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function InlineFunGraphic({ size = 90 }: { size?: number }) {
  const ref = useRef<HTMLImageElement>(null);
  const angle = useMotionValue(0);
  const smooth = useSpring(angle, { stiffness: 80, damping: 18, mass: 0.6 });
  const rotate = useTransform(smooth, (v) => `${v}deg`);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      angle.set((Math.atan2(dy, dx) * 180) / Math.PI + 90);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [angle]);

  return (
    <motion.img
      ref={ref}
      src={FUN_GRAPHIC}
      alt=""
      draggable={false}
      style={{
        width: size,
        height: size,
        rotate,
        objectFit: "contain",
        filter:
          "brightness(0) saturate(100%) invert(20%) sepia(99%) saturate(7475%) hue-rotate(225deg) brightness(96%) contrast(101%)",
      }}
      className="block select-none"
    />
  );
}
