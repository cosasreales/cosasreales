"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { CONTENT, WORK, workPath, type WorkItem } from "@/lib/content";
import { useLang, type Lang } from "@/lib/i18n";
import IllyLayout from "./IllyLayout";

// Per-project content overrides. Keeps this file as the single source of
// truth for what shows in each Work subpage.
interface Block {
  type: "image" | "video" | "youtube" | "heading" | "text" | "partners";
  src?: string; // path under Content/8_Work /<folder>/
  url?: string;
  text?: { es: string; en: string } | string;
  items?: Array<{ label: string; src: string }>;
}

const WORK_CONTENT: Record<string, Block[]> = {
  twitch: [
    {
      type: "heading",
      text: {
        es: "[ NARRATIVE DESIGN ] Reinventando el rol de Twitch en Social.",
        en: "[ NARRATIVE DESIGN ] Reinventing Twitch's role in Social.",
      },
    },
    {
      type: "text",
      text: {
        es: "Parte de un pitch para repensar cómo Twitch aparece en redes sociales: menos plataforma, más cultura en vivo.",
        en: "Part of a pitch to rethink how Twitch shows up on social: less platform, more live culture.",
      },
    },
  ],
  figma: [
    {
      type: "heading",
      text: {
        es: "[ META-DESIGN ] Presentando una estrategia de comms y media.",
        en: "[ META-DESIGN ] Pitching a comms and media strategy.",
      },
    },
    {
      type: "text",
      text: {
        es: "Un sistema visual loopable para el pitch de Figma — diseñado dentro de Figma, sobre Figma.",
        en: "A loopable visual system for the Figma pitch — designed inside Figma, about Figma.",
      },
    },
    { type: "image", src: "Figma_loop.gif" },
  ],
  "google-for-startups": [],
  mubi: [
    {
      type: "heading",
      text: {
        es: "[ BRAND CAMPAIGN ] Una carta de amor al cine argentino.",
        en: "[ BRAND CAMPAIGN ] A love letter to Argentine cinema.",
      },
    },
    {
      type: "text",
      text: {
        es: "Una campaña para MUBI celebrando el cine argentino: remeras con directores y escenas icónicas, piezas en redes y un film corto.",
        en: "A campaign for MUBI celebrating Argentine cinema: tees featuring directors and iconic scenes, social pieces, and a short film.",
      },
    },
  ],
  grammarly: [
    {
      type: "heading",
      text: {
        es: "[ PAID MEDIA ] Campañas mensuales para Grammarly.",
        en: "[ PAID MEDIA ] Monthly paid media campaigns for Grammarly.",
      },
    },
    {
      type: "text",
      text: {
        es: "Always-on paid media: concepts, sizzles y sistemas visuales que mostraron cómo Grammarly ayuda a escribir mejor, más rápido.",
        en: "Always-on paid media: concepts, sizzles and visual systems showing how Grammarly helps you write better, faster.",
      },
    },
    { type: "image", src: "Grammarly.gif" },
  ],
  "turks-caicos": [
    {
      type: "heading",
      text: {
        es: "[ BRANDING ] Una evolución, no una revolución, para Turks & Caicos.",
        en: "[ BRANDING ] An evolution, not a revolution, for Turks & Caicos.",
      },
    },
    {
      type: "text",
      text: {
        es: "Rediseño del sistema visual del destino: una paleta, tipografía y lenguaje gráfico que se sienten a Caribe sin abandonar lo que ya funcionaba.",
        en: "A refresh of the destination's visual system: palette, typography and graphic language that feel distinctly Caribbean without leaving behind what already worked.",
      },
    },
    { type: "image", src: "Turks_and_Caicos_1.gif" },
    { type: "image", src: "Turks_and_Caicos_2.gif" },
    { type: "image", src: "Turks_and_Caicos_3.gif" },
    { type: "image", src: "Turks_and_Caicos_4.gif" },
  ],
  "google-io": [
    {
      type: "heading",
      text: {
        es: "[ SOCIAL ] Anunciando la nueva era Gemini de Google I/O.",
        en: "[ SOCIAL ] Announcing Google I/O's new Gemini era.",
      },
    },
    {
      type: "text",
      text: {
        es: "Contenido para redes sociales acompañando el anuncio de la era Gemini en Google I/O: hero pieces, stickers y piezas always-on.",
        en: "Social content for Google I/O announcing the Gemini era: hero pieces, stickers, and always-on assets.",
      },
    },
  ],
  audi: [],
  spotify: [
    {
      type: "heading",
      text: {
        es: "[ AUTOMATION ] Campañas globales de performance en 20+ mercados.",
        en: "[ AUTOMATION ] Global performance campaigns across 20+ markets.",
      },
    },
    {
      type: "text",
      text: {
        es: "Sistemas de paid media automatizados para Spotify: templates escalables que se adaptan a cada mercado sin perder la identidad.",
        en: "Automated paid media systems for Spotify: scalable templates that adapt to every market without losing identity.",
      },
    },
  ],
  "ar-tech": [
    {
      type: "heading",
      text: {
        es: "[ AR ] Exploraciones 3D y filtros de realidad aumentada.",
        en: "[ AR ] 3D explorations and AR filters.",
      },
    },
    {
      type: "text",
      text: {
        es: "Experimentos en Blender y AR: lentes de vidrio, templates de logo y pruebas que exploran cómo se puede habitar una marca en tres dimensiones.",
        en: "Experiments in Blender and AR: glass lenses, logo templates, and tests exploring how a brand can live in three dimensions.",
      },
    },
  ],
};

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { tr, lang } = useLang();

  const item = WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  const blocks = WORK_CONTENT[slug] ?? [];
  const googleClass = item.isGoogle ? "font-google" : "";
  const radiusClass = item.isGoogle ? "rounded-[18px] overflow-hidden" : "";

  return (
    <PageShell>
      <div className={`px-6 md:px-10 lg:px-[60px] pt-40 md:pt-48 lg:pt-56 pb-32 lg:pb-40 ${googleClass}`}>
        <div className="data-head grid grid-cols-[70px_1.4fr_1fr_2.2fr_1fr] lg:grid-cols-[100px_1.4fr_1fr_3fr_1fr] text-[11px] tracking-[0.1em] text-black/30 pb-3 border-b border-black/20">
          <span>{tr("work_col_year")}</span>
          <span>{tr("work_col_client")}</span>
          <span>{tr("work_col_agency")}</span>
          <span>{tr("work_col_description")}</span>
          <span>{tr("work_col_role")}</span>
        </div>
        <div className="data-row grid grid-cols-[70px_1.4fr_1fr_2.2fr_1fr] lg:grid-cols-[100px_1.4fr_1fr_3fr_1fr] text-[13px] font-bold py-3 border-b border-black/10 text-black">
          <span>{item.year}</span>
          <span>{item.client}</span>
          <span>{item.agency}</span>
          <span className="pr-4">{item.description[lang]}</span>
          <span>{item.role[lang]}</span>
        </div>

        <Link
          href="/trabajo"
          className="inline-block mt-4 text-[11px] underline text-black/50 hover:text-black"
        >
          {tr("back")}
        </Link>

        {slug === "fifa-world-cup-26" ? (
          <FifaLayout item={item} lang={lang} />
        ) : slug === "illy" ? (
          <IllyLayout item={item} lang={lang} />
        ) : slug === "twitch" ? (
          <TwitchLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "turks-caicos" ? (
          <TurksLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "spotify" ? (
          <SpotifyLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "ar-tech" ? (
          <ArTechLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "mubi" ? (
          <MubiLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "google-io" ? (
          <GoogleIOLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "google-for-startups" ? (
          <GoogleStartupsLayout item={item} lang={lang} blocks={blocks} />
        ) : slug === "audi" ? (
          <AudiLayout item={item} lang={lang} />
        ) : (
        <div className="grid grid-cols-12 gap-8 mt-10 text-black">
          <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
            {blocks
              .filter((b) => b.type === "heading" || b.type === "text")
              .map((b, i) => {
                const text =
                  typeof b.text === "string" ? b.text : b.text?.[lang];
                return (
                  <p
                    key={i}
                    className={b.type === "heading" ? "font-bold" : ""}
                  >
                    {text}
                  </p>
                );
              })}
          </div>
          <div className="col-span-12 md:col-span-8 space-y-6">
            {blocks
              .filter(
                (b) =>
                  b.type === "image" ||
                  b.type === "video" ||
                  b.type === "youtube",
              )
              .map((b, i) => {
                if (b.type === "youtube" && b.url) {
                  const id =
                    b.url.match(/youtu\.be\/([^?&]+)/)?.[1] ??
                    b.url.match(/v=([^&]+)/)?.[1];
                  return (
                    <div
                      key={i}
                      className={`aspect-video w-full ${radiusClass}`}
                    >
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${id}`}
                        title={item.client}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                if (!b.src) return null;
                const src = workPath(item.folder, b.src);
                const isVideo =
                  b.type === "video" ||
                  /\.(mp4|mov|webm)$/i.test(b.src);
                return (
                  <div key={i} className={`w-full ${radiusClass}`}>
                    {isVideo ? (
                      <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto block"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="w-full h-auto" />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        )}
      </div>
    </PageShell>
  );
}

function TwitchLayout({
  item,
  lang,
  blocks,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const g1 = workPath(item.folder, "1_twitch.gif");
  const g2 = workPath(item.folder, "2_twitch.gif");
  const g3 = workPath(item.folder, "3_twitch.png");

  return (
    <div className="mt-10 text-black space-y-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
          {blocks
            .filter((b) => b.type === "heading" || b.type === "text")
            .map((b, i) => {
              const text =
                typeof b.text === "string" ? b.text : b.text?.[lang];
              return (
                <p
                  key={i}
                  className={b.type === "heading" ? "font-bold" : ""}
                >
                  {text}
                </p>
              );
            })}
        </div>
        <div className="col-span-12 md:col-span-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={g1} alt="" className="w-full h-auto" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g2} alt="" className="w-full h-auto" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g3} alt="" className="w-full h-auto" />
    </div>
  );
}

function TurksLayout({
  item,
  lang,
  blocks,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const g1 = workPath(item.folder, "Turks_and_Caicos_1.gif");
  const g2 = workPath(item.folder, "Turks_and_Caicos_2.gif");
  const g3 = workPath(item.folder, "Turks_and_Caicos_3.gif");
  const g4 = workPath(item.folder, "Turks_and_Caicos_4.gif");

  return (
    <div className="mt-10 text-black space-y-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
          {blocks
            .filter((b) => b.type === "heading" || b.type === "text")
            .map((b, i) => {
              const text =
                typeof b.text === "string" ? b.text : b.text?.[lang];
              return (
                <p
                  key={i}
                  className={b.type === "heading" ? "font-bold" : ""}
                >
                  {text}
                </p>
              );
            })}
        </div>
        <div className="col-span-12 md:col-span-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={g1} alt="" className="w-full h-auto" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g2} alt="" className="w-full h-auto" />

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={g3}
          alt=""
          className="col-span-12 md:col-span-7 md:col-start-6 w-full h-auto"
        />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g4} alt="" className="w-full h-auto" />
    </div>
  );
}

function SpotifyLayout({
  item,
  lang,
  blocks,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const g2023 = workPath(item.folder, "2023.gif");
  const g2024 = workPath(item.folder, "2024.gif");
  const s2025 = workPath(item.folder, "2025.png");
  const s20252 = workPath(item.folder, "2025-2.png");

  return (
    <div className="mt-10 text-black space-y-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
          {blocks
            .filter((b) => b.type === "heading" || b.type === "text")
            .map((b, i) => {
              const text =
                typeof b.text === "string" ? b.text : b.text?.[lang];
              return (
                <p
                  key={i}
                  className={b.type === "heading" ? "font-bold" : ""}
                >
                  {text}
                </p>
              );
            })}
        </div>
        <div className="col-span-12 md:col-span-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={g2023} alt="" className="w-full h-auto" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={g2024} alt="" className="w-full h-auto" />

      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s20252} alt="" className="max-w-[60%] h-auto" />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s2025} alt="" className="w-full h-auto" />
    </div>
  );
}

function ArTechLayout({
  item,
  lang,
  blocks,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const a1 = workPath(item.folder, "1.gif");
  const a2 = workPath(item.folder, "2.png");
  const a3 = workPath(item.folder, "3.png");
  const a4 = workPath(item.folder, "4.png");

  return (
    <div className="mt-10 text-black space-y-10">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
          {blocks
            .filter((b) => b.type === "heading" || b.type === "text")
            .map((b, i) => {
              const text =
                typeof b.text === "string" ? b.text : b.text?.[lang];
              return (
                <p
                  key={i}
                  className={b.type === "heading" ? "font-bold" : ""}
                >
                  {text}
                </p>
              );
            })}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a2} alt="" className="w-1/2 h-auto pt-4" />
        </div>
        <div className="col-span-12 md:col-span-8 flex justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a1} alt="" className="max-w-full h-auto" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a3} alt="" className="w-full h-auto" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a4} alt="" className="w-full h-auto" />
    </div>
  );
}

function MubiLayout({
  item,
  lang,
  blocks,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const p2 = workPath(item.folder, "2_mubi.png");
  const p3 = workPath(item.folder, "3_mubi.png");
  const p4 = workPath(item.folder, "4_mubi-smaller.png.png");
  const p5 = workPath(item.folder, "5_mubi.png");
  const p6 = workPath(item.folder, "6_mubi.png");

  const YT = ({ id }: { id: string }) => (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="MUBI"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <div className="mt-10 text-black space-y-10">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
          {blocks
            .filter((b) => b.type === "heading" || b.type === "text")
            .map((b, i) => {
              const text =
                typeof b.text === "string" ? b.text : b.text?.[lang];
              return (
                <p
                  key={i}
                  className={b.type === "heading" ? "font-bold" : ""}
                >
                  {text}
                </p>
              );
            })}
        </div>
        <div className="col-span-12 md:col-span-8">
          <YT id="0COTm1fYNcI" />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p2} alt="" className="w-full h-auto" />

      <div className="grid grid-cols-12 gap-8 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p3}
          alt=""
          className="col-span-12 md:col-span-8 w-full h-auto"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p4}
          alt=""
          className="col-span-12 md:col-span-4 w-full h-auto"
        />
      </div>

      <div className="flex gap-4 items-stretch w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p5}
          alt=""
          className="min-w-0 w-full h-auto block"
          style={{ flex: "0.5625 1 0" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p6}
          alt=""
          className="min-w-0 w-full h-auto block"
          style={{ flex: "1.779 1 0" }}
        />
      </div>

      <YT id="GdZR9mXe9HU" />
    </div>
  );
}

function GoogleIOLayout({
  item,
  lang,
  blocks,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const wp = (f: string) => workPath(item.folder, f);
  const i1 = wp("1.webp");
  const i2 = wp("2-google io.gif");
  const i3 = wp("3-google io.gif");
  const i4 = wp("4-google io.gif");
  const i5 = wp("5-google io.gif");
  const i6 = wp("6-google io.gif");
  const i8 = wp("8-google io.jpeg");
  const i9 = wp("9-google io.gif");
  const i10 = wp("10-google io.gif");
  const i11 = wp("11-google io.gif");
  const i12 = wp("12-google io.gif");
  const stickers = Array.from({ length: 9 }, (_, n) =>
    `${CONTENT}/8_Work /${encodeURIComponent(item.folder)}/${encodeURIComponent("Stickers")}/${encodeURIComponent(`${n + 1}_stickers_google io.gif`)}`,
  );

  const r = "rounded-[22px] overflow-hidden";
  const gap = "gap-6";

  return (
    <div className={`mt-10 text-black space-y-6`}>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4 space-y-4 text-[13px] leading-[1.55]">
          {blocks
            .filter((b) => b.type === "heading" || b.type === "text")
            .map((b, i) => {
              const text =
                typeof b.text === "string" ? b.text : b.text?.[lang];
              return (
                <p
                  key={i}
                  className={b.type === "heading" ? "font-bold" : ""}
                >
                  {text}
                </p>
              );
            })}
        </div>
        <div className={`col-span-12 md:col-span-8 ${r}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i1} alt="" className="w-full h-auto block" />
        </div>
      </div>

      {/* Row: 2 + 3 — same height, together full width */}
      <div className={`flex ${gap} items-stretch w-full`}>
        <div className={r} style={{ flex: "1.775 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i2} alt="" className="w-full h-auto block" />
        </div>
        <div className={r} style={{ flex: "1 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i3} alt="" className="w-full h-auto block" />
        </div>
      </div>

      {/* Row: 4, 5, 6 — centered, same spacing, narrower (extra L/R padding) */}
      <div className={`flex ${gap} justify-center px-[10%]`}>
        {[i4, i5, i6].map((src, i) => (
          <div key={i} className={`flex-1 ${r}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* Row: 7 (sticker block) + 8 — same height, full width */}
      <div className={`flex ${gap} items-stretch w-full`}>
        <div
          className={`${r} bg-[#F7F7F7] p-4`}
          style={{ flex: "1 1 0" }}
        >
          <div className="grid grid-cols-3 gap-2 w-full h-full">
            {stickers.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                className="w-full h-full object-contain"
              />
            ))}
          </div>
        </div>
        <div
          className={r}
          style={{ flex: "1.951 1 0", aspectRatio: "1200 / 615" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i8} alt="" className="w-full h-full object-cover block" />
        </div>
      </div>

      {/* Row: 9, 10, 11 — same line, full width */}
      <div className={`grid grid-cols-3 ${gap}`}>
        {[i9, i10, i11].map((src, i) => (
          <div key={i} className={r}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* Row: 12 — full width */}
      <div className={r}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={i12} alt="" className="w-full h-auto block" />
      </div>
    </div>
  );
}

function GoogleStartupsLayout({
  item,
  lang,
}: {
  item: WorkItem;
  lang: Lang;
  blocks: Block[];
}) {
  const f = item.folder;
  const wp = (n: number, ext: string) =>
    workPath(f, `${n}-google for startups.${ext}`);
  const img = {
    i1: wp(1, "jpg"),
    i2: wp(2, "jpg"),
    i4: wp(4, "gif"),
    i5: wp(5, "jpg"),
    i6: wp(6, "png"),
    i7: wp(7, "png"),
    i8: wp(8, "jpg"),
    i9: wp(9, "gif"),
    i10: wp(10, "png"),
    i11: wp(11, "gif"),
    i12: wp(12, "gif"),
    i13: wp(13, "gif"),
    i14: wp(14, "jpg"),
    i15: wp(15, "jpg"),
    i16: wp(16, "gif"),
    i17: wp(17, "jpg"),
    i18: wp(18, "png"),
    i19: wp(19, "png"),
    i20: wp(20, "png"),
    i21: wp(21, "jpg"),
    i22: wp(22, "png"),
    i23: wp(23, "png"),
  };

  const r = "rounded-[22px] overflow-hidden";

  const Step = ({ label, title }: { label: string; title: string }) => (
    <div>
      <p className="text-[13px] leading-[1.2]">{label}</p>
      <h2
        className="font-bold tracking-[-0.04em] leading-[1.05] whitespace-pre-line mt-2"
        style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
      >
        {title}
      </h2>
    </div>
  );

  const artDirCopy = {
    es: (
      <>
        <p className="font-bold">Dirección de Arte</p>
        <p className="mt-4">
          Formato social-first — Diseñado para las plataformas donde la gente
          realmente consume contenido, no adaptado del broadcast.
        </p>
        <p className="mt-3">
          La cámara es una pantalla — Vamos a donde están los fundadores. Si
          están viendo un video, la cámara se vuelve la pantalla.
        </p>
        <p className="mt-3">
          La UI es el set — La interfaz está visible. Ves el documental
          escribiéndose en tiempo real.
        </p>
        <p className="mt-3">
          Edición internet-native — Cortes rápidos, transiciones llamativas,
          una personalidad construida a través del ritmo. Storytelling, no un
          product demo.
        </p>
        <p className="mt-3">
          Voz en off + subtítulos — Un hilo narrador que lleva los mensajes
          centrales del film.
        </p>
        <p className="mt-3">
          Lenguaje documental, alma digital — Gente real, verdades reales,
          contadas en un registro visual que le habla a audiencias online.
        </p>
      </>
    ),
    en: (
      <>
        <p className="font-bold">Art Direction</p>
        <p className="mt-4">
          Social-first format — Designed for the platforms where people
          actually consume content, not adapted from broadcast.
        </p>
        <p className="mt-3">
          The camera is a screen — We go where founders are. If they&rsquo;re
          watching a video, the camera becomes the screen.
        </p>
        <p className="mt-3">
          The UI is the set — The interface is visible. You watch the
          documentary being written in real time.
        </p>
        <p className="mt-3">
          Internet-native editing — Quick cuts, catchy transitions, a
          personality built through rhythm. Storytelling, not a product demo.
        </p>
        <p className="mt-3">
          Voice-over + subtitles — A narrator thread that carries the
          film&rsquo;s core messages.
        </p>
        <p className="mt-3">
          Documentary language, digital soul — Real people, real truths, told
          in a visual register that speaks to online audiences.
        </p>
      </>
    ),
  };

  const Headline = ({
    text,
    center = false,
    italic = false,
  }: {
    text: string;
    center?: boolean;
    italic?: boolean;
  }) => (
    <h2
      className={`font-bold tracking-[-0.04em] leading-[1.1] whitespace-pre-line ${
        center ? "text-center" : ""
      } ${italic ? "italic" : ""}`}
      style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
    >
      {text}
    </h2>
  );

  return (
    <div className="mt-10 text-black space-y-10 text-[13px] leading-[1.2] tracking-[-0.04em] font-bold">
      {/* 1 — hero with left copy + two overlays */}
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4 space-y-4">
          <p className="font-bold">[ ART DIRECTION &amp; BRAND STRATEGY ]</p>
          {lang === "es" ? (
            <>
              <p>
                ¿Cómo te convertís en el ecosistema digital elegido por los
                fundadores de startups en un mundo donde la tecnología
                evoluciona más rápido que los humanos?
              </p>
              <p>
                Creamos un espacio para que la gente aprenda, comparta ideas y
                crezca a partir de la experiencia del otro. Así es como siempre
                escalamos.
              </p>
              <p>
                ¿Con quién lo hacemos? Con el lineup actual de alumni de Google
                for Startups. Solo un fundador puede ayudar a otro fundador.
              </p>
            </>
          ) : (
            <>
              <p>
                How do you become the digital ecosystem of choice for startup
                founders in a world where tech evolves faster than humans?
              </p>
              <p>
                We create a space for people to learn, share ideas and grow
                from each other&rsquo;s experience. That&rsquo;s how we&rsquo;ve
                always scaled up.
              </p>
              <p>
                Who do we do it with? The existing lineup of current Google for
                Startups alumni. Only a founder can help another founder.
              </p>
            </>
          )}
        </div>
        <div className="col-span-12 md:col-span-8 space-y-3">
          <div className={`relative ${r}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.i1} alt="" className="w-full h-auto block" />
            <h2
              className="absolute top-8 left-8 text-white font-bold tracking-[-0.04em] leading-[1.05] whitespace-pre-line"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)" }}
            >
              {lang === "es"
                ? "Los fundadores\nde hoy corren\ncon una idea."
                : "Today\u2019s\nfounders run\nwith an idea."}
            </h2>
            <div className="absolute bottom-6 right-6 text-right text-white text-[13px] leading-[1.2]">
              {lang === "es" ? (
                <>
                  <p>No necesitan un MBA.</p>
                  <p>Solo el 8% de los early adopters*</p>
                  <p>tiene un posgrado</p>
                  <p className="mt-2 opacity-80">*GWI 2024</p>
                </>
              ) : (
                <>
                  <p>They don&rsquo;t need an MBA.</p>
                  <p>Only 8% of early adopter founders*</p>
                  <p>have a postgraduate degree</p>
                  <p className="mt-2 opacity-80">*GWI 2024</p>
                </>
              )}
            </div>
          </div>
          <p>
            {lang === "es" ? (
              <>
                Los fundadores necesitan más que unas pocas herramientas
                individuales.
                <br />
                Necesitan apoyo, inspiración, guía, comunidad, confianza.
              </>
            ) : (
              <>
                Founders need more than a few individual tools.
                <br />
                They need support, inspiration, guidance, community, confidence.
              </>
            )}
          </p>
        </div>
      </div>

      {/* 2 — full width with overlays */}
      <div className={`relative ${r}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.i2} alt="" className="w-full h-auto block" />
        <div className="absolute top-8 left-8 max-w-[55%] text-white">
          <h2
            className="font-bold tracking-[-0.04em] leading-[1.05]"
            style={{ fontSize: "clamp(28px, 3.8vw, 56px)" }}
          >
            {lang === "es" ? (
              <>
                Lo que Google for Startups
                <br />
                puede ofrecer
              </>
            ) : (
              <>
                What Google for Startups
                <br />
                can offer
              </>
            )}
          </h2>
          <div className="mt-6 text-[13px] leading-[1.2] space-y-1">
            {lang === "es" ? (
              <>
                <p>
                  Esto es Google para cada persona que canaliza sus sueños y su
                  impulso, enfrentando nuevos desafíos y resolviéndolos en el
                  camino.
                </p>
                <p>
                  Esto es la confianza para afrontar cada desafío y alcanzar
                  cada milestone. Es celebrar cada victoria — incluso las
                  pequeñas.
                </p>
                <p>
                  Esto es reconocer que esto es un viaje, con metas que se
                  construyen con el tiempo. Que no hay un final para la
                  innovación y la creación.
                </p>
                <p>
                  Esto es hacer crecer tu idea hasta convertirla en un negocio,
                  y más allá.
                </p>
              </>
            ) : (
              <>
                <p>
                  This is Google for every person channeling their dreams and
                  drive, facing new challenges and figuring it out along the
                  way.
                </p>
                <p>
                  This is the confidence to tackle every challenge, and meet
                  every milestone. It&rsquo;s a celebration of every win - even
                  the little ones.
                </p>
                <p>
                  This is the recognition that this is a journey, with goals
                  that build over time. That there is no end point for
                  innovation and creation.
                </p>
                <p>This is growing your idea into a business, and beyond.</p>
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-8 left-8 text-white text-[13px] leading-[1.2]">
          {lang === "es" ? (
            <>
              <p>Google for Startups es un sistema de soporte</p>
              <p>
                que ofrece conexión, consejo, herramientas o incluso un momento
                para respirar.
              </p>
            </>
          ) : (
            <>
              <p>Google for Startups is a support system</p>
              <p>
                offering connection, advice, tools, or even a moment to
                breathe.
              </p>
            </>
          )}
        </div>
      </div>

      {/* 3 + 4 — square block with headline + gif with overlay */}
      <div className="flex gap-6 items-stretch">
        <div
          className={`${r} bg-[#F7F7F7] flex items-center justify-center p-8`}
          style={{ flex: "1 1 0", aspectRatio: "1 / 1" }}
        >
          <Headline
            center
            text={
              lang === "es"
                ? "Google puede ayudarte\na decir:"
                : "Google can help\nyou say:"
            }
          />
        </div>
        <div
          className={`${r} relative`}
          style={{ flex: "1 1 0", aspectRatio: "1 / 1" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i4}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Headline
              text={
                lang === "es"
                  ? "¡uf!\nesto lo tengo.\n¿qué sigue?"
                  : "whew!\nI got this.\nWhat's next?"
              }
              center
              italic
            />
          </div>
        </div>
      </div>

      {/* First Step */}
      <Step
        label={lang === "es" ? "Primer Paso" : "First Step"}
        title={"Community Management\nCoaching"}
      />
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className={`col-span-12 md:col-span-8 ${r}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.i5} alt="" className="w-full h-auto block" />
        </div>
        <div className="col-span-12 md:col-span-4 space-y-6">
          <div className={r}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.i6} alt="" className="w-full h-auto block" />
          </div>
          <div className={r}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.i7} alt="" className="w-full h-auto block" />
          </div>
        </div>
      </div>

      {/* Second Step */}
      <Step
        label={lang === "es" ? "Segundo Paso" : "Second Step"}
        title={lang === "es" ? "Apostar en grande" : "Going Big"}
      />
      <div className="grid grid-cols-12 gap-6 items-start">
        <div
          className={`col-span-12 md:col-span-8 ${r}`}
          style={{ marginLeft: "-25px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.i8} alt="" className="w-full h-auto block" />
        </div>
        <div className="col-span-12 md:col-span-4 space-y-6">
          {lang === "es" ? (
            <div>
              <p className="mt-[1.2em]">Presentamos,</p>
              <p>Google Docs.</p>
              <p className="mt-4">Una serie documental sobre los</p>
              <p>alumni de Google for Startups.</p>
              <p>Hecha en Google Docs.</p>
            </div>
          ) : (
            <div>
              <p className="mt-[1.2em]">Introducing,</p>
              <p>Google Docs.</p>
              <p className="mt-4">A docu-series about the</p>
              <p>Google for Startups alumni.</p>
              <p>Made in Google Docs.</p>
            </div>
          )}
          <p className="text-[#B6B6B6]">
            {lang === "es"
              ? "La demanda por documentales creció 44% entre principios de 2021 y fines de 2023, el aumento más significativo entre todos los géneros sin guion."
              : "Demand for documentaries rose by 44% from early 2021 to the end of 2023, the most significant increase among all unscripted genres."}
          </p>
        </div>
      </div>

      {/* Art direction + gif 9 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-4">{artDirCopy[lang]}</div>
        <div className={`col-span-12 md:col-span-8 ${r}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.i9} alt="" className="w-full h-auto block" />
        </div>
      </div>

      {/* 10, 11, 12 — same height */}
      <div className="flex gap-6 items-stretch w-full">
        <div className={r} style={{ flex: "1.970 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i10}
            alt=""
            className="w-full h-auto block"
          />
        </div>
        <div className={r} style={{ flex: "0.563 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i11}
            alt=""
            className="w-full h-auto block"
          />
        </div>
        <div className={r} style={{ flex: "0.563 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i12}
            alt=""
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* 13, 14 — same height */}
      <div className="flex gap-6 items-stretch w-full">
        <div className={r} style={{ flex: "0.562 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i13}
            alt=""
            className="w-full h-auto block"
          />
        </div>
        <div className={r} style={{ flex: "1.954 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i14}
            alt=""
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* 15, 16 — same height */}
      <div className="flex gap-6 items-stretch w-full">
        <div className={r} style={{ flex: "1.970 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i15}
            alt=""
            className="w-full h-auto block"
          />
        </div>
        <div className={r} style={{ flex: "0.562 1 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.i16}
            alt=""
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* 17 — Adweek, centered and smaller */}
      <div className="flex justify-center">
        <div className={`${r} max-w-[60%]`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.i17} alt="" className="w-full h-auto block" />
        </div>
      </div>

      {/* "And maybe take a big swing?" + 18 */}
      <div className="space-y-6">
        <Headline
          center
          text={
            lang === "es"
              ? "¿Y tal vez animarnos a algo grande?"
              : "And maybe take a big swing?"
          }
        />
        <div className="flex justify-center">
          <div className={`${r} max-w-[55%]`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.i18} alt="" className="w-full h-auto block" />
          </div>
        </div>
      </div>

      {/* Third Step */}
      <Step
        label={lang === "es" ? "Tercer Paso" : "Third Step"}
        title={
          lang === "es"
            ? "Apoyar el crecimiento\na largo plazo"
            : "Supporting\nLong-Term Growth"
        }
      />
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className={`col-span-12 md:col-span-8 ${r}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.i19} alt="" className="w-full h-auto block" />
        </div>
        <div className="col-span-12 md:col-span-4">
          {lang === "es" ? (
            <>
              <p>
                Según{" "}
                <a
                  href="https://weare3sixty.org/entrepreneur-pressure-and-wellbeing-report-2019/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  este estudio
                </a>
                , el 78% de los fundadores se sienten solos. Y los fundadores
                están 5 veces más solos que la persona promedio.
              </p>
              <p className="mt-4">
                Y eso fue en 2019 — antes de la pandemia y la epidemia de
                soledad que vino después.
              </p>
            </>
          ) : (
            <>
              <p>
                According to{" "}
                <a
                  href="https://weare3sixty.org/entrepreneur-pressure-and-wellbeing-report-2019/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  this study
                </a>
                , 78% of founders feel lonely. And founders are 5x more lonely
                than the average person.
              </p>
              <p className="mt-4">
                And that was 2019 — before the pandemic and the loneliness
                epidemic that followed.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Centered headline */}
      <Headline
        center
        text={
          lang === "es"
            ? "¿Por qué no ayudamos a los fundadores\na googlear las respuestas que necesitan?\n\nLa forma humana."
            : "Why don\u2019t we help founders\nGoogle the answers they need?\n\nThe human way."
        }
      />

      {/* 20 full */}
      <div className={r}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.i20} alt="" className="w-full h-auto block" />
      </div>

      <Headline
        text={
          lang === "es"
            ? "Solo necesitamos\nagendar un par de 1:1"
            : "We just need to\nset up a couple of 1:1s"
        }
      />
      <div className={r}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.i21} alt="" className="w-full h-auto block" />
      </div>

      <Headline
        text={
          lang === "es"
            ? "Nuestro podcast se convierte en\nun motor de contenido para redes"
            : "Our podcast becomes a\ncontent engine for social"
        }
      />
      <div className={r}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.i22} alt="" className="w-full h-auto block" />
      </div>

      {/* 23 with left copy vertically centered */}
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-4">
          <Headline
            text={
              lang === "es"
                ? "Ah, una última cosa.\n\n¿Y si Gemini detectara\nautomáticamente cuando lo necesitás?"
                : "Oh, one last thing.\n\nWhat if Gemini detected\nautomatically when you\u2019re in need?"
            }
          />
        </div>
        <div className={`col-span-12 md:col-span-8 ${r}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.i23} alt="" className="w-full h-auto block" />
        </div>
      </div>
    </div>
  );
}

function FifaLayout({ item, lang }: { item: WorkItem; lang: Lang }) {
  const wp  = (f: string) => workPath(item.folder, f);
  const wpE = (f: string) =>
    `${CONTENT}/8_Work /${encodeURIComponent(item.folder)}/Extras/${encodeURIComponent(f)}`;

  // ─── Assets — numbered sequence (main folder) ───────────────────────────
  const i01   = wp("01_FIFA_Design_System_Overview.gif");
  const hero  = wp("3f5145273a52478490fdef097f7056c1.jpg");
  const vRec  = wp("2_Video_Recaps.gif");
  // hyDs removed — file does not exist
  const dove  = wp("3_Dove.gif");
  const boa   = wp("4_Bank of America.gif");
  const yPl   = wp("5_Young PlayerFWC26_Aramco_YoungPlayerAward_Cubarsi_IG_FB_TikTok_4x5.png");
  const abi1  = wp("6_ABI_MOTM_Messi.gif");
  const mich  = wp("7_FWC26xMichelobUltra_SPOTM_4x5_Compilation_Branded.gif");
  const abi2  = wp("8_ABI-vote reminders.png");
  const cotm  = wp("9_COTM.mp4"); // mp4 (84 MB) instead of gif (200 MB)
  const cot2  = wp("10_COTM_2.gif");
  const aram  = wp("11_Aramco_Recap.png");
  const sfor  = wp("12_salesforce.png");
  const dAct  = wp("13_Digital Activations.png");
  const cola  = wp("14_Coca-Cola_Recap.png");
  const col2  = wp("15_Coca-Cola_stacks.gif");
  const edit  = wp("16_Recap_Editorial.gif");
  const mcd1  = wp("17_McDonald's - Compilation - Knockout Stage.gif");
  const mcd2  = wp("18.gif");
  const abn   = wp("19_Airbnb.gif");
  const h20   = wp("20_Hyundai.png");
  const h21   = wp("21.png");
  const h22   = wp("22_Hyundai.png");
  const h23   = wp("23_Hyundai.png");
  const h24   = wp("24_Hyundai.png");
  const h25   = wp("25_Hyundai.png");
  const h26   = wp("26__Hyundai.gif");
  const resu  = wp("27_Results.gif");

  // ─── Assets — Extras subfolder ──────────────────────────────────────────
  const partners      = wpE("Partners.png");
  const hyWinners     = wpE("Hyundai.png");
  const hyContestGif  = wpE("Hyundai.gif");
  const fifa4x5       = `${CONTENT}/8_Work /${encodeURIComponent(item.folder)}/Extras/${encodeURIComponent("NEW_STILL ASSETS")}/${encodeURIComponent("Fifa_4x5_01_Variant A.png")}`;

  const es = lang === "es";

  // ─── Copy ────────────────────────────────────────────────────────────────

  const intro = {
    es: (
      <>
        <p className="font-bold">[ SOCIAL &amp; DIGITAL ]</p>
        <p className="font-bold mt-4">
          ¿Cómo se gestionan campañas globales para el torneo más grande de
          la historia?
        </p>
        <p className="mt-4">
          Eso es lo que me propuse responder con mi equipo y nuestros socios
          en FIFA.
        </p>
        <p className="mt-4">
          Durante más de un año, planeamos y ejecutamos activaciones digitales
          para 20+ socios comerciales de la Copa Mundial de la FIFA 2026™ en
          cada canal, cada fecha, cada zona horaria.
        </p>
        <p className="mt-4">
          Lideré parte del equipo creativo global y actué como conector entre
          FIFA y todos los stakeholders, asegurándome de que cada marca
          encontrara su lugar real dentro del torneo.
        </p>
        <p className="mt-4">
          Como podrán imaginar, meter todo ese pensamiento y tiempo en una
          página es imposible. Esto es lo que voy a hacer: mostrarles cómo
          pensamos y algunos highlights de lo que creamos. Si quieren la
          historia completa, tomamos un café :)
        </p>
        <p className="mt-4">
          <span className="block">[ +2000 piezas entregadas ]</span>
          <span className="block">[ +5.2 mil millones de impresiones ]</span>
          <span className="block">[ +$400M en valor generado ]</span>
        </p>
      </>
    ),
    en: (
      <>
        <p className="font-bold">[ SOCIAL &amp; DIGITAL ]</p>
        <p className="font-bold mt-4">
          How do you manage global campaigns for the biggest tournament in
          history?
        </p>
        <p className="mt-4">
          That&rsquo;s what I set out to answer with my team and our partners
          at FIFA.
        </p>
        <p className="mt-4">
          For over a year, we planned and executed digital activations for
          20+ Commercial Partners of FIFA World Cup 2026™ across every
          channel, every matchday, every time zone.
        </p>
        <p className="mt-4">
          I led part of the global creative team and served as a connector
          between FIFA and all stakeholders, making sure each brand found its
          real place inside the tournament.
        </p>
        <p className="mt-4">
          As you can imagine, fitting all of that thinking and time into one
          page is impossible. So here&rsquo;s what I&rsquo;ll do: show you
          how we thought, and a few highlights of what we made. If you want
          the full story, let&rsquo;s grab a coffee :)
        </p>
        <p className="mt-4">
          <span className="block">[ +2000 assets delivered ]</span>
          <span className="block">[ +5.2 billion impressions ]</span>
          <span className="block">[ +$400M in partner value generated ]</span>
        </p>
      </>
    ),
  };

  const caption1 = {
    es: (
      <>
        <p>
          Construimos un framework escalable — un proceso, multiplicado por
          20+ marcas, corriendo simultáneamente en un equipo global repartido
          por América (el continente) y Europa.
        </p>
        <p className="mt-3">
          Antes del torneo, nos dividimos y conquistamos. Durante el torneo,
          nos convertimos en un solo equipo global con 18 horas de cobertura
          diaria, pasando el trabajo de LATAM a EMEA y de vuelta a los
          Estados Unidos.
        </p>
      </>
    ),
    en: (
      <>
        <p>
          We built a scalable framework — one process, multiplied by 20+
          brands, running simultaneously across a global team spread across
          America (the continent) and Europe.
        </p>
        <p className="mt-3">
          Before the tournament, we divided and conquered. During the
          tournament, we became one global team with 18 hours of daily
          coverage, handing off work from LATAM to EMEA to the US and back.
        </p>
      </>
    ),
  };

  const startedBody = {
    es: (
      <>
        <p>
          Parte de nuestra tarea era entender la escala y las capas detrás de
          cada socio — sus intereses, sus canales preferidos, su narrativa
          para la Copa Mundial de la FIFA™ — para asegurarnos de que cada
          marca estuviera alineada en tono sin que todas dijeran lo mismo.
        </p>
        <p className="mt-4">
          Todos tenían prioridades distintas, todos estaban patrocinando
          partes diferentes del ecosistema de la FIFA.
        </p>
        <p className="mt-4 font-bold">
          Teníamos que encontrar nuestro camino. Cada. Vez.
        </p>
      </>
    ),
    en: (
      <>
        <p>
          Part of our task was understanding the scale and the layers behind
          each partner — their interests, their preferred channels, their FIFA
          World Cup™ narrative — to make sure every brand was aligned in tone
          without every brand saying the same thing.
        </p>
        <p className="mt-4">
          Everyone had different priorities, everyone was sponsoring different
          parts of the FIFA ecosystem.
        </p>
        <p className="mt-4 font-bold">
          We had to find our way in. Every single time.
        </p>
      </>
    ),
  };

  const videoLabel = es ? "VIDEO Y COBERTURA" : "VIDEO & MATCH FOOTAGE";
  const videoDesc = es
    ? "Muchos socios. Un solo pool de footage. Cada marca tuvo su momento único — todos del mismo highlight de 2 minutos."
    : "Many partners. One pool of footage. Each brand owned a unique moment — all from the same 2-minute highlight.";

  const videoBrands: { name: string; href: string }[] = [
    { name: "Aramco — Daily Recap", href: "" },
    { name: "Qatar Airways — Let It Fly", href: "" },
    { name: "Kia — Inspiration Connects Us All", href: "" },
    { name: "Visa — Tap In Goals", href: "" },
    { name: "Verizon — Game Changers", href: "" },
    { name: "Rexona — Built for the Moment", href: "" },
    { name: "Dove Men+Care — What Care Looks Like", href: "" },
    { name: "Hisense — Real Game Saving Moment", href: "" },
    { name: "Bank of America — Making History", href: "" },
  ];

  const hyundaiBody = {
    es: (
      <>
        <p>
          Nos asociamos con FIFA y Hyundai para invitar a chicos de 5 a 12
          años de todo el mundo a dibujar su país.
        </p>
        <p className="mt-4 font-bold">Un prompt. Infinitas respuestas.</p>
        <p className="mt-4">
          Estoy orgulloso de este. Verlo tomar vida fue la primera vez que
          realmente sentí la escala de lo que estábamos construyendo.
        </p>
      </>
    ),
    en: (
      <>
        <p>
          We partnered with FIFA and Hyundai to invite kids aged 5–12 from
          around the world to draw their country.
        </p>
        <p className="mt-4 font-bold">One prompt. Infinite answers.</p>
        <p className="mt-4">
          I&rsquo;m proud of this one. Seeing it come to life was the first
          time I truly felt the scale of what we were building.
        </p>
      </>
    ),
  };

  const hyundaiHeader = (
    <>
      {es ? "Un highlight personal — " : "A personal highlight — "}
      <a
        href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/be-there-with-hyundai"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        Be There with Hyundai
      </a>
    </>
  );

  const caption2 = es ? "Los artistas ganadores 🥹" : "The winning artists 🥹";

  const closingText = {
    es: (
      <>
        <p>
          <strong>Lo hicimos sin un playbook preexistente.</strong> Sin reglas
          preexistentes. En el anterior FIFA World Cup Qatar 2022™, la IA ni
          siquiera existía. El mundo se mueve rápido, pero los humanos nos
          adaptamos y navegamos este mundo con creatividad.
        </p>
        <p className="mt-4">
          Lo fuimos descubriendo sobre la marcha. Teníamos planificación y
          orientación, pero no podés tener un desglose paso a paso para algo
          que nunca se hizo a esta escala. Simplemente tenés que ir.
        </p>
        <p className="mt-4">
          Y en algún punto del proyecto más ambicioso de mi carrera, aprendí
          las cosas más simples sobre ser un creativo: una buena idea llega
          lejos, una mejor ejecución te da una audiencia feliz (y un cliente
          feliz), y un proceso bien armado hace que todo sea divertido.
        </p>
        <p className="mt-4">
          No importa qué tan grande o pequeño sea el proyecto, la estrella
          del norte siempre tiene que ser la misma. Nunca tuve miedo de que
          todo el mundo tuviera los ojos puestos en nosotros. Mientras yo
          creyera en el trabajo, sabía que iba a rendir. Y rindió.
        </p>
        <p className="mt-4">
          Logramos 5.2 mil millones de impresiones. Todavía no puedo procesar
          cuánta gente vio esto. La mente humana no está preparada para
          entender eso, y el cuerpo humano no está construido para soportar
          esa presión. Supongo que por eso los humanos inventamos trabajar en
          grupos, para poder escondernos dentro de ellos y construir algo más
          grande que la suma de las partes.
        </p>
        <p className="mt-4">
          Estoy vivo. El torneo terminó. Messi no ganó esta vez. Pero pude
          celebrar muchos momentos gracias a él.
        </p>
      </>
    ),
    en: (
      <>
        <p>
          <strong>We did this with no pre-existing playbook.</strong> No
          pre-existing rules. In the previous FIFA World Cup Qatar 2022™, AI
          wasn&rsquo;t even a thing. The world moves fast, but us humans
          adapt and move through this world with creativity.
        </p>
        <p className="mt-4">
          So we figured it out as we went. We had planning, and we had
          guidance, but you can&rsquo;t have a step-by-step breakdown for
          something that&rsquo;s never been done at this scale before. You
          just have to go.
        </p>
        <p className="mt-4">
          And somewhere in the most ambitious project of my career, I learned
          the most simple things about being a creative: a good idea goes a
          long way, a better execution gets you a happy audience (and client),
          and a well-set-up process makes the whole thing fun.
        </p>
        <p className="mt-4">
          No matter how big or small the project, the north star should always
          be the same. I was never afraid that the whole world had their eyes
          on us. As long as I believed in the work, I knew it was going to
          pay off. And it did.
        </p>
        <p className="mt-4">
          We drove 5.2 billion impressions. I still can&rsquo;t process how
          many people saw this. The human mind is not prepared to understand
          that, and the human body is not built to stand the pressure of that.
          I guess that&rsquo;s why humans invented working as groups, so we
          could hide inside them and build something bigger than the sum of
          all parts.
        </p>
        <p className="mt-4">
          I&rsquo;m alive. The tournament is over. Messi didn&rsquo;t win
          this time. But I got to celebrate a lot of moments thanks to him.
        </p>
      </>
    ),
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  const Img = ({ src, className = "w-full h-auto" }: { src: string; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={className} />
  );

  const SmallLabel = ({ text }: { text: string }) => (
    <p className="font-bold text-[10px] tracking-[0.1em] text-black/40 uppercase">{text}</p>
  );

  return (
    <div className="mt-10 space-y-20 text-[13.8px] tracking-[-0.04em] leading-[1.55] text-black text-justify">

      {/* ── 1 · Intro + Design System (01) ───────────────────────────── */}
      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4">
          {intro[lang]}
        </div>
        <div className="col-span-12 md:col-span-8 space-y-4">
          <Img src={i01} />
          <div className="font-bold">{caption1[lang]}</div>
        </div>
      </section>

      {/* ── 2 · IT ALL STARTED WITH THEM + Partners ──────────────────── */}
      <section className="space-y-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4 space-y-4">
            <h2
              className="font-bold tracking-[-0.04em] leading-[1.05] whitespace-pre-line"
              style={{ fontSize: "clamp(24px, 2.6vw, 40px)" }}
            >
              {es ? "TODO EMPEZÓ\nCON ELLOS" : "IT ALL STARTED\nWITH THEM"}
            </h2>
            {startedBody[lang]}
          </div>
          <div className="col-span-12 md:col-span-8">
            <Img src={partners} />
          </div>
        </div>

        {/* ── Video & Match Footage ── */}
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4 space-y-3">
            <SmallLabel text={videoLabel} />
            <p>{videoDesc}</p>
            <ul className="mt-2 space-y-1">
              {videoBrands.map((b) => (
                <li key={b.name} className="text-black/40">
                  {b.href ? (
                    <a href={b.href} target="_blank" rel="noreferrer" className="underline hover:text-black/70 transition-colors">{b.name}</a>
                  ) : b.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Img src={vRec} />
          </div>
        </div>
      </section>

      {/* ── 4 · Dove (~68% left-aligned) ─────────────────────────────── */}
      <section>
        <div className="w-[68%]"><Img src={dove} /></div>
      </section>

      {/* ── 5 · Bank of America (full width) ─────────────────────────── */}
      <section>
        <Img src={boa} />
      </section>

      {/* ── 6+7 · Young Player + ABI MOTM side by side (right side) ──── */}
      <section className="flex justify-end gap-4">
        <div className="w-[24%]"><Img src={yPl} /></div>
        <div className="w-[24%]"><Img src={abi1} /></div>
      </section>

      {/* ── 8+9 · Michelob Ultra (~31%) + ABI vote (~68%) side by side ── */}
      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4"><Img src={mich} /></div>
        <div className="col-span-12 md:col-span-8"><Img src={abi2} /></div>
      </section>

      {/* ── 10 · COTM video (~16% centered) ─────────────────────────── */}
      <section className="flex justify-center">
        <div className="w-[16%] min-w-[120px]">
          <video src={cotm} autoPlay loop muted playsInline className="w-full h-auto block" />
        </div>
      </section>

      {/* ── 11 · COTM_2 (~64% centered) ──────────────────────────────── */}
      <section className="flex justify-center">
        <div className="w-[64%]"><Img src={cot2} /></div>
      </section>

      {/* ── 12 · Aramco Recap (~70% right-aligned) ───────────────────── */}
      <section className="flex justify-end">
        <div className="w-[70%]"><Img src={aram} /></div>
      </section>

      {/* ── 13+14 · Salesforce + Digital Activations ─────────────────── */}
      <section className="space-y-4">
        <Img src={sfor} />
        <Img src={dAct} />
      </section>

      {/* ── 15 · Coca-Cola Recap (~86% centered) ─────────────────────── */}
      <section>
        <div className="w-[86%] mx-auto"><Img src={cola} /></div>
      </section>

      {/* ── 16 · Coca-Cola stacks (~31% centered) ────────────────────── */}
      <section className="flex justify-center">
        <div className="w-[31%] min-w-[200px]"><Img src={col2} /></div>
      </section>

      {/* ── 17 · Recap Editorial (~68% right-aligned) ────────────────── */}
      <section className="flex justify-end">
        <div className="w-[68%]"><Img src={edit} /></div>
      </section>

      {/* ── 18+19 · McDonald's staggered side by side ────────────────── */}
      <section className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-5"><Img src={mcd1} /></div>
        <div className="col-span-1" />
        <div className="col-span-4"><Img src={mcd2} /></div>
      </section>

      {/* ── 20 · Airbnb (full width) ─────────────────────────────────── */}
      <section>
        <Img src={abn} />
      </section>

      {/* ── 20–26 · Hyundai — Be There contest ───────────────────────── */}
      <section className="space-y-8">
        <p className="font-bold">{hyundaiHeader}</p>
        <Img src={h20} />
        <div className="grid grid-cols-3 gap-4">
          <Img src={h22} />
          <Img src={h23} />
          <Img src={h21} />
        </div>
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-7 grid grid-cols-[1.75fr_1fr] gap-4">
            <Img src={hyContestGif} />
            <Img src={fifa4x5} />
          </div>
          <div className="col-span-12 md:col-span-5">
            {hyundaiBody[lang]}
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div style={{ flex: "2 1 0" }}>
            <Img src={h24} />
          </div>
          <div className="flex flex-col gap-4" style={{ flex: "1 1 0" }}>
            <Img src={h25} />
            <Img src={h26} />
          </div>
        </div>
      </section>

      {/* ── Winning artists ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <p className="font-bold">{caption2}</p>
        <Img src={hyWinners} />
      </section>

      {/* ── 27 · Results ─────────────────────────────────────────────── */}
      <section className="space-y-10 pb-20">
        <h2
          className="font-bold tracking-[-0.04em] leading-[1.05]"
          style={{ fontSize: "clamp(22px, 2.4vw, 38px)" }}
        >
          {es ? "+ MUCHO MÁS" : "+ SO MUCH MORE"}
        </h2>
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-8">
            <Img src={resu} />
          </div>
          <div className="col-span-12 md:col-span-4">
            {closingText[lang]}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 border-t border-black/10 pt-8">
          <div>
            <SmallLabel text={es ? "PIEZAS ENTREGADAS" : "ASSETS DELIVERED"} />
            <p className="font-bold mt-1 tracking-[-0.04em]" style={{ fontSize: "clamp(26px, 3vw, 46px)", lineHeight: 1 }}>+2000</p>
          </div>
          <div>
            <SmallLabel text={es ? "IMPRESIONES" : "IMPRESSIONS"} />
            <p className="font-bold mt-1 tracking-[-0.04em]" style={{ fontSize: "clamp(26px, 3vw, 46px)", lineHeight: 1 }}>+5.2B</p>
          </div>
          <div>
            <SmallLabel text={es ? "EN VALOR GENERADO" : "IN PARTNER VALUE GENERATED"} />
            <p className="font-bold mt-1 tracking-[-0.04em]" style={{ fontSize: "clamp(26px, 3vw, 46px)", lineHeight: 1 }}>+$400M</p>
          </div>
        </div>
      </section>

    </div>
  );
}

function AudiLayout({ item, lang }: { item: WorkItem; lang: Lang }) {
  const wp = (f: string) => workPath(item.folder, f);
  const p1 = wp("1_audi.gif");
  const p2 = wp("2_audi.png");
  const p3 = wp("3_audi.png");
  const p4 = wp("4_audi.png");
  const p5 = wp("5_audi.png");
  const p6 = wp("6_audi.png");
  const p7 = wp("7_audi.png");
  const p8 = wp("8_audi.gif");
  const p9 = wp("9_audi.gif");
  const p10 = wp("10_audi.gif");
  const p11 = wp("11_audi.png");
  const p12 = wp("12_audi.gif");
  const p13 = wp("13_audi.png");
  const p14 = wp("14_audi.gif");
  const p15 = wp("15_audi.gif");
  const p16 = wp("16_audi.png");
  const p17 = wp("17_audi.png");
  const p18 = wp("18_audi.png");
  const p19 = wp("19_audi.png");
  const p20 = wp("20_audi.png");
  const p21 = wp("21_audi.png");
  const p22 = wp("22_audi.png");
  const p23 = wp("23_audi.png");
  const p24 = wp("24_audi.png");
  const p25 = wp("25_audi.png");
  const p26 = wp("26_audi.png");
  const p27 = wp("27_audi.png");
  const p28 = wp("28_audi.png");

  const CANVAS_W = 1727.573;
  const CANVAS_TOP = 398.48;
  const CANVAS_BOTTOM = 6937.8;
  const CANVAS_H = CANVAS_BOTTOM - CANVAS_TOP;

  const pos = (x: number, y: number, w: number, h?: number): React.CSSProperties => ({
    position: "absolute",
    left: `${(x / CANVAS_W) * 100}%`,
    top: `${((y - CANVAS_TOP) / CANVAS_H) * 100}%`,
    width: `${(w / CANVAS_W) * 100}%`,
    ...(h !== undefined ? { height: `${(h / CANVAS_H) * 100}%` } : {}),
  });

  const fs = (px: number) => `calc(100cqw * ${px} / ${CANVAS_W})`;
  const smallText: React.CSSProperties = {
    fontSize: fs(13.796),
    lineHeight: 1.111,
    letterSpacing: "-0.04em",
  };
  const bigText: React.CSSProperties = {
    fontSize: fs(41.774),
    lineHeight: 1.111,
    letterSpacing: "-0.04em",
  };

  const intro = lang === "es"
    ? (
      <>
        <p className="font-bold">[ PAID MEDIA ]</p>
        <p>&nbsp;</p>
        <p className="font-bold">¿Cómo se comunica lujo y confort premium a través del diseño artesanal en una campaña de paid media?</p>
        <p>&nbsp;</p>
        <p>Diseñamos un sistema visual que toma imágenes de marca y las recubre con efectos que se sienten orgánicamente integrados, conectando con una audiencia que busca un auto acorde a su deseo de lujo silencioso y personal.</p>
        <p>&nbsp;</p>
        <p>El buen diseño no te distrae de los beneficios que te da. Los potencia y te dirige hacia lo que realmente importa.</p>
      </>
    )
    : (
      <>
        <p className="font-bold">[ PAID MEDIA ]</p>
        <p>&nbsp;</p>
        <p className="font-bold">How do you communicate luxury and premium comfort through craftsmanship in a paid media campaign?</p>
        <p>&nbsp;</p>
        <p>We crafted a design system that supports this idea by taking brand imagery and overlaying effects that feel naturally integrated — resonating with an audience looking for a car that fits their desire for quiet, personal luxury.</p>
        <p>&nbsp;</p>
        <p>Good design does not distract you from the benefits it provides. It enhances them and draws you into what truly matters.</p>
      </>
    );

  const lightColor = lang === "es" ? (
    <>
      <p>La luz y el color filtran las cualidades únicas del Audi Q5 para visualizar esa sensación tan especial y eufórica de manejar este modelo.</p>
      <p>&nbsp;</p>
      <p>Los entornos alrededor del vehículo se deforman apenas lo justo en color y textura para mostrar que algo extraordinario está sucediendo. Ese movimiento capta tu atención hacia los materiales y tecnologías dentro y fuera del auto, y realza el poder del Audi Q5 mientras avanza, redefiniendo los paisajes a su paso.</p>
      <p>&nbsp;</p>
      <p>Con esta dirección, un movimiento sin esfuerzo con raíces en lo natural vive en la estela del sujeto en acción.</p>
    </>
  ) : (
    <>
      <p>Light and color will filter over the Audi Q5&apos;s unique features to visualize this incredibly special and euphoric feeling of driving this specific model.</p>
      <p>&nbsp;</p>
      <p>Environments that surround the vehicle will be morphed by color and texture only just enough to show you something extraordinary is happening. This movement will grab your attention to focus on materials and technologies in and out of the car and will emphasize the power an Audi Q5 holds as it drives, redefining its landscapes as it passes through.</p>
      <p>&nbsp;</p>
      <p>With this direction, effortless motion that&apos;s rooted in nature will live within the wake of the subject in action.</p>
    </>
  );

  const tLabel = {
    moodboard: "Moodboard",
    seeking: lang === "es"
      ? "Buscando lo inesperado a través de toques surreales en escenarios del mundo real."
      : "Seeking the unexpected through surreal touches to real-world scenarios.",
    outside: lang === "es" ? "Desde afuera" : "From the outside",
    ux: lang === "es" ? "Hacia la experiencia" : "To the user experience",
    interiors: lang === "es" ? "Hacia los interiores" : "To the quality interiors",
    localization: lang === "es" ? "Localización" : "Localization",
    closing: lang === "es" ? "El buen diseño es progreso que se siente." : "Good design is progress you can feel.",
  };

  const Img = ({ src, style, cover = true }: { src: string; style: React.CSSProperties; cover?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      style={style}
      className={`${cover ? "object-cover" : "object-contain"} select-none`}
    />
  );

  return (
    <div className="mt-10 text-black">
      <div
        className="relative w-full"
        style={{
          aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
          containerType: "inline-size",
        }}
      >
        {/* INTRO COPY BLOCK */}
        <div style={{ ...pos(51.17, 398.48, 385.154), ...smallText }}>
          {intro}
        </div>

        {/* HERO LOOP */}
        <Img src={p1} style={pos(580.74, 398.48, 1095.257, 613.344)} />

        {/* PHOTO 2 — wide moody with quote overlay */}
        <Img src={p2} style={pos(51.37, 1097.52, 1624.629, 473.412)} />

        {/* "Great design" quote — white, overlaid on photo 2 */}
        <div
          style={{
            ...pos(80.2, 1138.54, 500.345),
            ...bigText,
            color: "white",
            fontWeight: 700,
            whiteSpace: "pre-wrap",
          }}
        >
          {"\u201CGreat design, when done well, should be invisible.\u201D\n-  Jared Spool"}
        </div>

        {/* "Seeking the unexpected" white label — bottom-left of photo 2 */}
        <div
          style={{
            ...pos(80.2, 1517.19, 276.137),
            ...smallText,
            color: "white",
            fontWeight: 700,
          }}
        >
          {tLabel.seeking}
        </div>

        {/* "Moodboard" label — above photo 3 */}
        <div
          style={{
            ...pos(1279.7, 1132.27, 84.483),
            ...smallText,
            color: "white",
            fontWeight: 700,
          }}
        >
          {tLabel.moodboard}
        </div>

        {/* PHOTO 3 — small screenshot, overlapping top-right of photo 2 */}
        <Img src={p3} style={pos(1280.14, 1157.07, 341.195, 362.799)} />

        {/* PHOTO 4 — rectangle25 textured image */}
        <Img src={p4} style={pos(51.37, 1628.13, 1116.575, 548.245)} />

        {/* Light/color text block — right of photo 4 */}
        <div style={{ ...pos(1187.6, 1628.49, 459.218), ...smallText }}>
          {lightColor}
        </div>

        {/* THREE PANELS: Symbolic / Kinetic / Immersive (photos 5, 6, 7) */}
        <div style={pos(51.37, 2232.03, 528.431, 674.255)}>
          <Img src={p5} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
          <div
            style={{
              position: "absolute",
              top: `${(53.29 / 674.255) * 100}%`,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "white",
              fontWeight: 700,
              ...bigText,
            }}
          >
            Symbolic
          </div>
        </div>
        <div style={pos(600.2, 2232.03, 528.431, 674.255)}>
          <Img src={p6} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
          <div
            style={{
              position: "absolute",
              top: `${(53.29 / 674.255) * 100}%`,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "white",
              fontWeight: 700,
              ...bigText,
            }}
          >
            Kinetic
          </div>
        </div>
        <div style={pos(1147.57, 2232.03, 528.431, 674.255)}>
          <Img src={p7} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
          <div
            style={{
              position: "absolute",
              top: `${(53.29 / 674.255) * 100}%`,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "white",
              fontWeight: 700,
              ...bigText,
            }}
          >
            Immersive
          </div>
        </div>

        {/* Labels below the three panels */}
        <div style={{ ...pos(51.17, 2920.83, 200), ...smallText, fontWeight: 700 }}>
          {tLabel.outside}
        </div>
        <div
          style={{
            ...pos(763.57, 2920.83, 200),
            ...smallText,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {tLabel.ux}
        </div>
        <div
          style={{
            ...pos(1476, 2920.83, 200),
            ...smallText,
            fontWeight: 700,
            textAlign: "right",
          }}
        >
          {tLabel.interiors}
        </div>

        {/* ===== SYMBOLIC SECTION ===== */}
        <div
          style={{
            ...pos(724.5, 3052.75, 278.224),
            ...bigText,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Symbolic
        </div>
        <Img src={p8} style={pos(51.37, 3133.54, 1624.629, 915.208)} />
        {/* Sub-row of Symbolic */}
        <Img src={p9} style={pos(51.37, 4065.74, 402.793, 716.301)} />
        <Img src={p10} style={pos(474.31, 4065.74, 402.793, 402.793)} />
        <Img src={p11} style={pos(897.26, 4065.74, 651.183, 167.831)} />
        <Img src={p12} style={pos(1568.59, 4065.74, 107.412, 402.793)} />

        {/* ===== KINETIC SECTION ===== */}
        <div
          style={{
            ...pos(724.5, 4860.92, 278.224),
            ...bigText,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Kinetic
        </div>
        <Img src={p13} style={pos(51.37, 4933.93, 1073.189, 268.297)} />
        {/* Localization label */}
        <div
          style={{
            ...pos(1293.77, 4933.93, 120),
            ...smallText,
            fontWeight: 700,
          }}
        >
          {tLabel.localization}
        </div>
        <Img src={p14} style={pos(51.37, 5222.57, 574.467, 478.722)} />
        <Img src={p15} style={pos(645.84, 5222.57, 478.723, 478.723)} />
        {/* 5 stacked banners right */}
        <Img src={p16} style={pos(1144.56, 4957, 531.439, 132.86)} />
        <Img src={p17} style={pos(1144.56, 5109.85, 531.439, 132.86)} />
        <Img src={p18} style={pos(1144.56, 5262.71, 531.439, 132.86)} />
        <Img src={p19} style={pos(1144.56, 5415.57, 531.439, 132.86)} />
        <Img src={p20} style={pos(1144.56, 5568.43, 531.439, 132.86)} />

        {/* ===== IMMERSIVE SECTION ===== */}
        <div
          style={{
            ...pos(724.5, 5794.75, 278.224),
            ...bigText,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Immersive
        </div>
        <Img src={p21} style={pos(51.37, 5865.2, 1624.629, 406.157)} />
        {/* Top banners row */}
        <Img src={p22} style={pos(51.37, 6291.7, 802.182, 99.171)} />
        <Img src={p24} style={pos(873.82, 6291.7, 802.182, 99.171)} />
        {/* Screenshot block left */}
        <Img src={p23} style={pos(51.37, 6410.87, 919.359, 526.914)} />
        {/* Right cluster */}
        <Img src={p25} style={pos(990.73, 6410.87, 685.27, 171.317)} />
        <Img src={p26} style={pos(990.73, 6602.27, 205.581, 154.186)} />
        <Img src={p27} style={pos(1216.4, 6602.27, 205.581, 154.186)} />
        <Img src={p28} style={pos(990.73, 6776.54, 326.246, 54.374)} />
      </div>

      {/* Closing line */}
      <p className="font-bold text-center mt-12 mb-20 text-[13px] md:text-[14px] tracking-[-0.04em]">
        {tLabel.closing}
      </p>
    </div>
  );
}
