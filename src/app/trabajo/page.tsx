"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { WORK } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const PASSWORD = "ITPAYSTHEBILLS";
const STORAGE_KEY = "cr-work-unlocked";

const COLS = "grid-cols-[100px_1.4fr_1fr_3fr_1fr]";

export default function WorkPage() {
  const { tr, lang } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toUpperCase() === PASSWORD) {
      setUnlocked(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!unlocked) {
    return (
      <PageShell>
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
          <form onSubmit={submit} className="flex flex-col items-center gap-3">
            <label className="text-[11px] tracking-[0.15em] text-brand/70">
              {tr("password_label")}
            </label>
            <input
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              className="border border-brand/30 px-3 py-1.5 w-[260px] text-[13px] outline-none focus:border-brand"
              type="password"
            />
            {error && (
              <span className="text-[11px] text-red-600">
                {tr("wrong_password")}
              </span>
            )}
          </form>
        </div>
      </PageShell>
    );
  }

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
