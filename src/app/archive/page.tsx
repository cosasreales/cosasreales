"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { ARCHIVE, archivePath, type ArchiveItem } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const COLS =
  "grid-cols-[60px_minmax(0,220px)_minmax(0,140px)_minmax(0,200px)_1fr_minmax(0,220px)]";

export default function ArchivePage() {
  const { lang } = useLang();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const active = hoverIdx !== null ? ARCHIVE[hoverIdx] : null;

  const srcs = active && active.folder
    ? (active.images ?? (active.image ? [active.image] : [])).map((f) =>
        archivePath(active.folder as string, f),
      )
    : [];

  return (
    <PageShell>
      <div className="px-10 md:px-[60px] pt-24 md:pt-32 pb-20">
        <Header />
        <div className="border-t border-black/30">
          {ARCHIVE.map((item, i) => {
            const Row = item.link ? "a" : "div";
            const rowProps = item.link
              ? { href: item.link, target: "_blank", rel: "noreferrer" }
              : {};
            return (
              <Row
                key={i}
                {...rowProps}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx((h) => (h === i ? null : h))}
                style={{ color: "black" }}
                className={`grid ${COLS} gap-x-4 text-[13px] md:text-[14px] font-light tracking-[-0.04em] py-[8px] border-b border-black/30 no-underline transition-opacity ${
                  item.link ? "cursor-pointer" : ""
                } ${hoverIdx !== null && hoverIdx !== i ? "opacity-40" : "opacity-100"}`}
              >
                <span>{item.year}</span>
                <span className="truncate">{item.name[lang]}</span>
                <span className="truncate">{item.where[lang]}</span>
                <span className="truncate">{item.what[lang]}</span>
                <span aria-hidden />
                <span className="truncate">{item.role[lang]}</span>
              </Row>
            );
          })}
        </div>
        <Header />
      </div>

      <HoverPreview srcs={srcs} item={active} />
    </PageShell>
  );
}

function Header() {
  const { tr } = useLang();
  return (
    <div
      className={`grid ${COLS} gap-x-4 text-[13px] md:text-[14px] font-light tracking-[-0.04em] py-[8px] text-black/30`}
    >
      <span>{tr("archive_col_year")}</span>
      <span>{tr("archive_col_name")}</span>
      <span>{tr("archive_col_where")}</span>
      <span>{tr("archive_col_what")}</span>
      <span aria-hidden />
      <span>{tr("archive_col_role")}</span>
    </div>
  );
}

// Deterministic "random" from a string — same string always yields same number.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}
const rand = (seed: string, min: number, max: number) =>
  min + hash(seed) * (max - min);

function HoverPreview({
  srcs,
  item,
}: {
  srcs: string[];
  item: ArchiveItem | null;
}) {
  const key = item ? `${item.year}-${item.folder}` : "";
  // Zone = between end of "QUE ES" col and start of "ROL" col.
  // Left edge: 60px padding + 60px year + 220px nombre + 140px donde + 200px queEs + ~24px gap = 704px.
  // Right edge: 60px padding + 220px rol + ~24px gap = 304px from right.
  const zoneLeft = 704;
  const zoneRight = 304;
  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <AnimatePresence mode="wait">
        {srcs.length > 0 && (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute"
            style={{
              left: `${zoneLeft}px`,
              right: `${zoneRight}px`,
              top: "18vh",
              bottom: "14vh",
            }}
          >
            {srcs.map((src, i) => {
              const n = srcs.length;
              const slotW = 100 / n;
              const left = slotW * i;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <motion.img
                  key={src}
                  src={src}
                  alt=""
                  draggable={false}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className="absolute top-1/2 -translate-y-1/2 object-contain"
                  style={{
                    left: `${left}%`,
                    width: `${slotW * 0.9}%`,
                    maxHeight: "32vh",
                    height: "auto",
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
