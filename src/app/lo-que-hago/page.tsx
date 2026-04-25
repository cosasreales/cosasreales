"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PageShell from "@/components/PageShell";
import { PERSONAL_PROJECTS, personalProjectPath } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function LoQueHagoPage() {
  const { lang } = useLang();
  const list = useMemo(
    () => [...PERSONAL_PROJECTS, ...PERSONAL_PROJECTS],
    [],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 180, damping: 30, mass: 0.6 });
  const dragRef = useRef<{ startX: number; startVal: number } | null>(null);
  const widthRef = useRef(0);
  const idleRef = useRef<number>(0);

  // Render-time modular wrap so the spring never animates across the
  // discontinuity (that's what caused the "bounce back to start" feel).
  const renderX = useTransform(smoothX, (v) => {
    const half = widthRef.current / 2;
    if (half <= 0) return v;
    let nv = v % half;
    if (nv > 0) nv -= half;
    return nv;
  });

  useEffect(() => {
    const measure = () => {
      widthRef.current = trackRef.current?.scrollWidth ?? 0;
    };
    measure();
    const t1 = setTimeout(measure, 400);
    const t2 = setTimeout(measure, 1500);
    window.addEventListener("resize", measure);
    const imgs = trackRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const setX = useCallback(
    (v: number) => {
      x.set(v);
      idleRef.current = Date.now();
    },
    [x],
  );

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (Date.now() - idleRef.current > 2000) {
        x.set(x.get() - 0.6);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const d =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 1) return;
      e.preventDefault();
      setX(x.get() - d);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [x, setX]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { startX: e.clientX, startVal: x.get() };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    setX(dragRef.current.startVal + dx);
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <PageShell>
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ x: renderX }}
        >
          {list.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href={`/lo-que-hago/${p.slug}`}
              className="group relative h-[60vh] flex-shrink-0 block"
              onClick={(e) => {
                if (dragRef.current) e.preventDefault();
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personalProjectPath(p, p.cover)}
                alt={p.title[lang]}
                className="h-full w-auto object-cover select-none block"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 text-[11px] md:text-[12px] tracking-[0.1em] font-bold text-white opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/60 to-transparent">
                {p.title[lang].toUpperCase()}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </PageShell>
  );
}
