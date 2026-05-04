"use client";

import {
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { notFound } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import PageShell from "@/components/PageShell";
import {
  PERSONAL_PROJECTS,
  personalProjectPath,
  type PersonalProject,
} from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function PersonalProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang } = useLang();
  const project = PERSONAL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const [stateB, setStateB] = useState(false);
  const coverSrc = personalProjectPath(project, project.cover);

  return (
    <PageShell>
      <div className="relative px-6 md:px-10 lg:px-[60px] pt-[180px] md:pt-[210px] lg:pt-[240px] pb-20 md:pb-24 lg:pb-28 h-[100dvh] flex flex-col">
        {/* Header row: title (left) + thumbnail (right) — flow naturally, side by side */}
        <div className="flex items-start justify-between gap-6 md:gap-10 shrink-0">
          <div className="min-w-0 flex-1">
            <h1
              className="font-bold text-black tracking-[-0.04em] whitespace-pre-line"
              style={{
                fontSize: "clamp(32px, 4.2vw, 64px)",
                lineHeight: 1,
              }}
            >
              {project.title[lang]}
            </h1>
            <div
              className="mt-5 font-normal text-black tracking-[-0.04em]"
              style={{ fontSize: "clamp(20px, 1.9vw, 32px)", lineHeight: 1 }}
            >
              {project.year}
            </div>
            <div
              className="mt-3 font-normal text-black tracking-[-0.04em] whitespace-pre-line"
              style={{ fontSize: "clamp(13px, 1.15vw, 18px)", lineHeight: 1 }}
            >
              {project.subtitle[lang]}
            </div>
          </div>

          <div className="shrink-0 w-[150px] md:w-[200px] lg:w-[220px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverSrc}
              alt=""
              className="w-full aspect-[3/2] object-cover select-none"
              draggable={false}
            />
            <button
              onClick={() => setStateB((v) => !v)}
              className="mt-2 text-[13px] md:text-[15px] tracking-[-0.04em] text-black/60 underline underline-offset-4 block hover:text-black"
            >
              {stateB
                ? lang === "es"
                  ? "Volver"
                  : "Go Back"
                : lang === "es"
                  ? "Leer Más"
                  : "Read More"}
            </button>
          </div>
        </div>

        {/* Main region — flows below the header row, fills remaining height */}
        <div className="relative flex-1 min-h-0 mt-8 md:mt-10 lg:mt-12 -mx-6 md:-mx-10 lg:-mx-[60px]">
          <AnimatePresence mode="wait">
            {!stateB ? (
              <motion.div
                key="A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <StateA project={project} />
              </motion.div>
            ) : (
              <motion.div
                key="B"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 px-6 md:px-10 lg:px-[60px] overflow-y-auto"
              >
                <StateB project={project} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}

/* -------------------------------- State A -------------------------------- */

function StateA({ project }: { project: PersonalProject }) {
  const ytId = project.videoUrl?.match(/youtu\.be\/([^?&]+)/)?.[1];
  if (ytId) {
    return (
      <div className="h-full flex items-center px-10 md:px-[60px]">
        <div className="aspect-video w-full max-w-[1100px]">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${ytId}`}
            title={project.title.es}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
  return <ImageLoop project={project} files={project.images ?? []} />;
}

function ImageLoop({
  project,
  files,
}: {
  project: PersonalProject;
  files: string[];
}) {
  const list = useMemo(() => {
    if (!files.length) return [];
    const reps = files.length === 1 ? 8 : files.length < 4 ? 4 : 2;
    return Array.from({ length: reps }, () => files).flat();
  }, [files]);

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
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div
        ref={trackRef}
        className="flex h-full items-center will-change-transform"
        style={{ x }}
      >
        {list.map((file, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={personalProjectPath(project, file)}
              alt=""
              className="h-full w-auto object-cover select-none block"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------------------- State B -------------------------------- */

function StateB({ project }: { project: PersonalProject }) {
  const { lang } = useLang();
  const body = project.longText[lang];

  // TRAPEGEL: 4-column layout — para1+2 | para3 | 3 bts side-by-side | para4.
  if (project.slug === "robots-en-pantallas" && project.btsImages?.length) {
    const paras = body.split(/\n\n+/);
    const [p1 = "", p2 = "", p3 = "", p4 = ""] = paras;
    const col1 = [p1, p2].filter(Boolean).join("\n\n");
    return (
      <div
        className="grid grid-cols-12 gap-y-8 gap-x-8 md:gap-x-[60px] text-brand font-bold tracking-[-0.04em] text-justify leading-[1.15]"
        style={{ fontSize: "clamp(14px, 1.25vw, 20px)" }}
      >
        <div className="col-span-12 md:col-span-3 whitespace-pre-line hyphens-auto">
          {col1}
        </div>
        <div className="col-span-12 md:col-span-3 whitespace-pre-line hyphens-auto">
          {p3}
        </div>
        <div className="col-span-12 md:col-span-3 flex flex-row gap-2 items-start">
          {project.btsImages.map((f, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={personalProjectPath(project, f)}
              alt=""
              className="w-1/3 h-auto object-cover"
            />
          ))}
        </div>
        <div className="col-span-12 md:col-span-3 whitespace-pre-line hyphens-auto">
          {p4}
        </div>
      </div>
    );
  }

  // Toda el agua: text on the left + miniatura grid on the right.
  if (project.slug === "toda-agua-de-los-lagos" && project.miniatura) {
    return (
      <div className="grid grid-cols-12 gap-8">
        <div
          className="col-span-12 md:col-span-5 text-brand font-bold tracking-[-0.04em] text-justify [text-align-last:justify] whitespace-pre-line leading-[1.15] max-w-[520px]"
          style={{ fontSize: "clamp(14px, 1.25vw, 20px)" }}
        >
          {body}
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 flex justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={personalProjectPath(project, project.miniatura)}
            alt=""
            className="w-full max-w-[360px] h-auto"
          />
        </div>
      </div>
    );
  }

  // Default: preserve every line break exactly as written (no column flow).
  return (
    <div
      className="text-brand font-bold tracking-[-0.04em] text-justify [text-align-last:justify] whitespace-pre-line leading-[1.15] max-w-[520px]"
      style={{ fontSize: "clamp(14px, 1.25vw, 20px)" }}
    >
      {body}
    </div>
  );
}
