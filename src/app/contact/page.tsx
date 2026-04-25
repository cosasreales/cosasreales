"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PageShell from "@/components/PageShell";
import {
  CONTACT_CIRCLE,
  CONTACT_PORTRAIT,
  FUN_GRAPHIC,
  LINKS,
} from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function ContactPage() {
  const { tr, lang } = useLang();

  const textRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [circle, setCircle] = useState<{
    size: number;
    cx: number;
    cy: number;
  } | null>(null);

  // Circle edges touch the middle of the text block (left) and the middle of
  // the portrait (right). Centre = midpoint between them.
  useLayoutEffect(() => {
    const measure = () => {
      const t = textRef.current?.getBoundingClientRect();
      const p = portraitRef.current?.getBoundingClientRect();
      const s = stageRef.current?.getBoundingClientRect();
      if (!t || !p || !s) return;
      const tMid = t.left + t.width / 2;
      const pMid = p.left + p.width / 2;
      const size = pMid - tMid;
      const cx = (tMid + pMid) / 2 - s.left;
      const cy = (t.top + t.height / 2 + p.top + p.height / 2) / 2 - s.top;
      setCircle({ size, cx, cy });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (textRef.current) ro.observe(textRef.current);
    if (portraitRef.current) ro.observe(portraitRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Fun graphic anchored on the portrait, rotates to point at cursor.
  const funRef = useRef<HTMLImageElement>(null);
  const funAngle = useMotionValue(0);
  const smoothFun = useSpring(funAngle, {
    stiffness: 80,
    damping: 18,
    mass: 0.6,
  });
  const funRotate = useTransform(smoothFun, (v) => `${v}deg`);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const f = funRef.current;
      if (!f) return;
      const r = f.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      funAngle.set((Math.atan2(dy, dx) * 180) / Math.PI + 90);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [funAngle]);

  return (
    <PageShell>
      <div
        ref={stageRef}
        className="absolute inset-0 overflow-hidden"
      >
        {/* CONTACT ME loop — diameter spans text-middle ↔ portrait-middle. */}
        {circle && (
          <div
            className="absolute"
            style={{
              width: circle.size,
              height: circle.size,
              left: circle.cx,
              top: circle.cy,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CONTACT_CIRCLE[lang]}
              alt=""
              className="absolute inset-0 w-full h-full object-contain animate-spin-slow select-none pointer-events-none"
              draggable={false}
            />
          </div>
        )}

        {/* Foreground content. */}
        <div className="absolute inset-0 px-10 md:px-[60px] pt-24 md:pt-32 pb-20 pointer-events-none">
          <div className="h-full grid grid-cols-12 gap-x-8 items-center">
            {/* Text column */}
            <div className="col-span-12 md:col-span-6 flex items-center justify-center pointer-events-auto">
              <div
                ref={textRef}
                className="inline-flex flex-col items-start w-max max-w-full"
              >
                <h1
                  className="text-black font-bold tracking-[-0.04em] leading-none whitespace-nowrap"
                  style={{ fontSize: "clamp(32px, 4.4vw, 64px)" }}
                >
                  {tr("contact_title")}
                </h1>
                <div
                  className="mt-6 w-full text-brand font-bold tracking-[-0.04em] leading-none text-justify [text-align-last:justify] whitespace-nowrap"
                  style={{ fontSize: "clamp(13px, 1.15vw, 18px)" }}
                >
                  {tr("contact_location")}
                </div>
                <div
                  className="mt-3 flex w-full items-center justify-between text-brand font-bold tracking-[-0.04em]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 18px)" }}
                >
                  <a
                    href={`mailto:${LINKS.email}`}
                    className="underline underline-offset-4 hover:opacity-70"
                  >
                    EMAIL
                  </a>
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:opacity-70"
                  >
                    IG
                  </a>
                </div>
              </div>
            </div>

            {/* Portrait + anchored fun graphic */}
            <div className="col-span-12 md:col-span-6 flex items-center justify-center pointer-events-auto">
              <div
                ref={portraitRef}
                className="relative aspect-square w-full max-w-[640px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CONTACT_PORTRAIT}
                  alt="Samuel Martos"
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable={false}
                />
                <motion.img
                  ref={funRef}
                  src={FUN_GRAPHIC}
                  alt=""
                  style={{ rotate: funRotate }}
                  className="absolute left-[8%] top-[6%] w-[22%] h-auto pointer-events-none select-none will-change-transform"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
