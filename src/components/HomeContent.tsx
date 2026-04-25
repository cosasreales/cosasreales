"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import clsx from "clsx";
import { HOME_IMAGES } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export type Mode = "dynamic" | "horizontal";

export default function HomeContent({
  mode,
  interactive = true,
}: {
  mode: Mode;
  interactive?: boolean;
}) {
  return (
    <div className="px-6 md:px-8 w-full">
      <div className="relative h-[calc(100vh-14rem)] md:h-[calc(100vh-12rem)] w-full overflow-hidden">
        {mode === "dynamic" && <DynamicLoop />}
        {mode === "horizontal" && <HorizontalLoop interactive={interactive} />}
      </div>
    </div>
  );
}

export function ModeSelector({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  const { tr } = useLang();
  const items: Array<{ key: Mode; glyph: string; label: string }> = [
    { key: "dynamic", glyph: "✱", label: tr("view_dynamic") },
    { key: "horizontal", glyph: "⇌", label: tr("view_horizontal") },
  ];
  return (
    <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-black">
      {items.map((it, i) => (
        <div key={it.key} className="flex items-center gap-2">
          <button
            onClick={() => onChange(it.key)}
            aria-label={it.label}
            className={clsx(
              "px-0.5 transition",
              mode === it.key ? "opacity-100" : "opacity-50 hover:opacity-90",
            )}
          >
            [{it.glyph}]
          </button>
          {i < items.length - 1 && <span className="text-black/40">-</span>}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- Dynamic -------------------------------- */

interface TrailNode {
  id: number;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  born: number;
}

const TRAIL_MIN_DIST = 110;
const TRAIL_LIFE = 6000;

function DynamicLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<TrailNode[]>([]);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const idRef = useRef(0);
  const poolRef = useRef<string[]>([]);
  const poolIdxRef = useRef(0);

  useEffect(() => {
    const pool = [...HOME_IMAGES];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    poolRef.current = pool;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setNodes((ns) => ns.filter((n) => now - n.born < TRAIL_LIFE + 600));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const last = lastRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.hypot(dx, dy) < TRAIL_MIN_DIST) return;
    }
    lastRef.current = { x, y };
    const pool = poolRef.current;
    if (!pool.length) return;
    const src = pool[poolIdxRef.current % pool.length];
    poolIdxRef.current += 1;
    const aspect = 0.65 + Math.random() * 0.6;
    const w = 160 + Math.random() * 120;
    const id = idRef.current++;
    setNodes((ns) => [
      ...ns.slice(-24),
      {
        id,
        src,
        x,
        y,
        w,
        h: w * aspect,
        rotate: (Math.random() - 0.5) * 10,
        born: Date.now(),
      },
    ]);
  }, []);

  const onMouseLeave = () => {
    lastRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="absolute inset-0"
    >
      <AnimatePresence>
        {nodes.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.7, ease: "easeOut" },
              scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute pointer-events-none"
            style={{
              left: n.x,
              top: n.y,
              width: n.w,
              height: n.h,
              translateX: "-50%",
              translateY: "-50%",
              rotate: `${n.rotate}deg`,
              backgroundImage: `url("${n.src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <FadeOut bornAt={n.born} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function FadeOut({ bornAt }: { bornAt: number }) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const delay = Math.max(0, TRAIL_LIFE - (Date.now() - bornAt));
    const t = setTimeout(() => setGone(true), delay);
    return () => clearTimeout(t);
  }, [bornAt]);
  return (
    <motion.div
      className="absolute inset-0 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: gone ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeIn" }}
    />
  );
}

/* ------------------------------- Horizontal ------------------------------- */

function HorizontalLoop({ interactive }: { interactive: boolean }) {
  const list = useMemo(() => [...HOME_IMAGES, ...HOME_IMAGES], []);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const dragRef = useRef<{ startX: number; startVal: number } | null>(null);
  const halfRef = useRef(0);
  const idleRef = useRef<number>(0);

  const wrap = useCallback((v: number) => {
    const half = halfRef.current;
    if (half <= 0) return v;
    let nv = v % half;
    if (nv > 0) nv -= half;
    return nv;
  }, []);

  // Track the inner track width so wrapping is correct after images load.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      halfRef.current = el.scrollWidth / 2;
      x.set(wrap(x.get()));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Re-measure as each image loads.
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [x, wrap]);

  const setX = useCallback(
    (v: number) => {
      x.set(wrap(v));
      idleRef.current = Date.now();
    },
    [x, wrap],
  );

  // Idle auto-scroll.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (Date.now() - idleRef.current > 2000) {
        x.set(wrap(x.get() - dt * 0.04));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x, wrap]);

  useEffect(() => {
    if (!interactive) return;
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 1) return;
      e.preventDefault();
      setX(x.get() - d);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [x, setX, interactive]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
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
        style={{ x }}
      >
        {list.map((src, i) => (
          <div key={i} className="h-[60vh] flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-auto object-cover select-none"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

