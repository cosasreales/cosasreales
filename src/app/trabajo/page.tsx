"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { WORK } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const COLS = "grid-cols-[100px_1.4fr_1fr_3fr_1fr]";

export default function WorkPage() {
  const { lang } = useLang();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <PageShell>
      <div className="px-10 md:px-[60px] pt-24 md:pt-32 pb-20">
        <Header />
        <div className="border-t border-black/30">
          {WORK.map((item, i) => (
            <Link
              key={item.slug}
              href={`/trabajo/${item.slug}`}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() =>
                setHoverIdx((h) => (h === i ? null : h))
              }
              style={{ color: "black" }}
              className={`grid ${COLS} gap-x-4 text-[13px] md:text-[14px] font-light tracking-[-0.04em] py-[8px] border-b border-black/30 no-underline transition-opacity ${
                hoverIdx !== null && hoverIdx !== i
                  ? "opacity-40"
                  : "opacity-100"
              }`}
            >
              <span>{item.year}</span>
              <span className="truncate">{item.client}</span>
              <span className="truncate">{item.agency}</span>
              <span className="truncate pr-4">{item.description[lang]}</span>
              <span className="truncate">{item.role[lang]}</span>
            </Link>
          ))}
        </div>
        <Header />
      </div>
    </PageShell>
  );
}

function Header() {
  const { tr } = useLang();
  return (
    <div
      className={`grid ${COLS} gap-x-4 text-[13px] md:text-[14px] font-light tracking-[-0.04em] py-[8px] text-black/30`}
    >
      <span>{tr("work_col_year")}</span>
      <span>{tr("work_col_client")}</span>
      <span>{tr("work_col_agency")}</span>
      <span>{tr("work_col_description")}</span>
      <span>{tr("work_col_role")}</span>
    </div>
  );
}
