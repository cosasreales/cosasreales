"use client";

import { CONTENT, type WorkItem } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const p = (folder: string, ...parts: string[]) =>
  `${CONTENT}/8_Work /${[folder, ...parts].map(encodeURIComponent).join("/")}`;

export default function IllyLayout({
  item,
  lang,
}: {
  item: WorkItem;
  lang: Lang;
}) {
  const f = item.folder;
  const img = {
    hero: p(f, "1_We produced a new kind of wake up call..png"),
    pauseBanner: p(f, "2_the illy pause.jpg"),
    signature: p(f, "3_signature escapes.png"),
    premium: p(f, "4_Premium Escapes.png"),
    campus: p(f, "5_Campus Connections.png"),
    printables: p(f, "6_Printables.png"),
    photoToolkit: p(f, "7_Photography Toolkit.png"),
    toolkitExtra: p(f, "8_.png"),
    cafeteria1: p(f, "9_Branded Cafeteria Items.png"),
    cafeteria2: p(f, "10_Branded Cafeteria Items.jpeg"),
    coldBrew1: p(f, "13_Cold Brew.png"),
    coldBrew2: p(f, "14_Cold Brew.png"),
    coldBrew3: p(f, "15_Cold Brew.png"),
    ooh1: p(f, "16_OOH.png"),
    ooh2: p(f, "17_OOH.png"),
    ooh3: p(f, "18_OOH.png"),
    moment1: p(f, "19_Moments.png"),
    moment2: p(f, "20_Moments.png"),
    moment3: p(f, "21_Moments.png"),
    moment4: p(f, "22_Moments.png"),
    moment5: p(f, "23_Moments.png"),
    moment6: p(f, "24_Moments.png"),
    truck: p(f, "25_illy truck.png"),
    coffeeStay: p(f, "26_Coffee to Stay.png"),
    coffeeGo: p(f, "27_Coffee to Go.png"),
    uniform1: p(f, "30_illy uniforms.png"),
    uniform2: p(f, "31_illy uniforms.png"),
    uniform3: p(f, "32_illy uniforms.png"),
    uniform4: p(f, "33_illy uniforms.png"),
    uniform5: p(f, "34_illy uniforms.png"),
    uniform6: p(f, "35_illy uniforms.png"),
    runClub: p(f, "36_run club.jpg"),
    filmNight: p(f, "36_illy film night.png"),
    datingShow: p(f, "37_dating show.png"),
    disco: p(f, "38_illydisco.png"),
  };

  const copy = {
    intro: {
      es: (
        <>
          <p className="font-bold">[ BRANDING ]</p>
          <p className="font-bold mt-4">
            ¿Cómo lograr que los estudiantes Gen-Z de USA conozcan tu marca y
            se vuelvan clientes regulares?
          </p>
          <p className="mt-4">
            Para lograrlo, presentamos una idea creativa a través de un Illy
            University Playbook actualizado y activaciones pop-up en las
            universidades más grandes de USA.
          </p>
          <p className="mt-4">
            Esta es la historia de cómo ganamos el pitch y nos convertimos en
            la Design AOR de illy.
          </p>
        </>
      ),
      en: (
        <>
          <p className="font-bold">[ BRANDING ]</p>
          <p className="font-bold mt-4">
            How do you make American Gen-Z students know your brand and turn
            them into regular customers?
          </p>
          <p className="mt-4">
            To achieve this, we pitched a creative idea shown through an
            updated illy University Playbook and Pop-up activations at
            USA&rsquo;s biggest colleges.
          </p>
          <p className="mt-4">
            This is a story on how we won the pitch and became illy&rsquo;s
            design AOR.
          </p>
        </>
      ),
    },
    challenge: {
      es: (
        <>
          <p className="font-bold">Nuestro desafío</p>
          <p className="mt-4">
            ¿Cómo destacamos entre la multitud del campus como una marca
            &ldquo;premium pero accesible&rdquo;?
          </p>
        </>
      ),
      en: (
        <>
          <p className="font-bold">Our Challenge</p>
          <p className="mt-4">
            How do we stand out from the crowd on campus as a
            &ldquo;premium but accessible&rdquo; brand?
          </p>
        </>
      ),
    },
    wakeup: {
      es: "Produjimos un cambio de rol: de pedir atención a provocar intención.",
      en: "We produced a role change: from asking for attention to provoking intention.",
    },
    pauseBody: {
      es: (
        <>
          <p>La vida universitaria va rápido. illy existe para recordarle a los estudiantes que los mejores momentos no se apuran – se saborean.</p>
          <p className="mt-3">Al ofrecer experiencias que se sienten premium pero acogedoras, creamos momentos pequeños pero significativos que elevan tu día en el campus.</p>
        </>
      ),
      en: (
        <>
          <p>College life moves fast. illy exists to remind students that the best moments aren&rsquo;t rushed – they&rsquo;re savored.</p>
          <p className="mt-3">By offering experiences that feel premium yet welcoming, we created small but meaningful moments that elevate your day on campus.</p>
        </>
      ),
    },
    pauseAside: {
      es: (
        <p>
          Queríamos que illy en la universidad sea sinónimo de intención.
          <br />
          Un llamado a bajar el ritmo antes de acelerar.
          <br />
          Un recordatorio de que, incluso en el caos de la vida estudiantil,
          <br />
          siempre hay lugar para disfrutar los mejores diez minutos de tu día.
        </p>
      ),
      en: (
        <p>
          We wanted illy in college to stand for intention.
          <br />
          A call to slow down before speeding.
          <br />
          A reminder that even in the chaos of student life,
          <br />
          there&rsquo;s always room to enjoy the best ten minutes of your day.
        </p>
      ),
    },
    threeElements: {
      es: "Introdujimos tres elementos clave para crearlo.",
      en: "We introduced three core elements to craft it.",
    },
    pillars: [
      {
        title: { es: "SIGNATURE\nSTYLE", en: "SIGNATURE\nSTYLE" },
        caption: {
          es: "Expresados en nuestro toolkit actualizado",
          en: "Expressed in our updated toolkit",
        },
        src: img.signature,
      },
      {
        title: { es: "PREMIUM\nESCAPES", en: "PREMIUM\nESCAPES" },
        caption: {
          es: "Con nuestro illy Truck en el centro",
          en: "With our illy truck at the center",
        },
        src: img.premium,
      },
      {
        title: {
          es: "CAMPUS\nCONNECTIONS",
          en: "CAMPUS\nCONNECTIONS",
        },
        caption: {
          es: "Nacidas a través de nuestras activaciones",
          en: "Born through our activations",
        },
        src: img.campus,
      },
    ],
    toolkitHeading: {
      es: "EL TOOLKIT\nDE CAMPUS ACTUALIZADO",
      en: "THE UPDATED\nCAMPUS TOOLKIT",
    },
    printables: { es: "Impresos", en: "Printables" },
    toolkitRules: {
      es: (
        <>
          Debe ser:
          <br />
          Sleek &amp; Classic
          <br />
          Bold &amp; Alluring
          <br />
          Flexible &amp; Scalable
        </>
      ),
      en: (
        <>
          It should be:
          <br />
          Sleek &amp; Classic
          <br />
          Bold &amp; Alluring
          <br />
          Flexible &amp; Scalable
        </>
      ),
    },
    cafeteria: {
      es: "Items de cafetería con branding",
      en: "Branded Cafeteria Items",
    },
    coldBrew: {
      es: "Estaciones de sampling de Cold Brew",
      en: "Cold Brew Sampling Stations",
    },
    coldBrewCaption: {
      es: (
        <>
          Para los inevitables momentos on-the-go,
          <br />
          creamos setups de sampling hermosos.
        </>
      ),
      en: (
        <>
          For unavoidable on-the-go moments,
          <br />
          we created beautiful sampling setups.
        </>
      ),
    },
    photoToolkit: {
      es: "Toolkit de fotografía renovado",
      en: "Refreshed Photography Toolkit",
    },
    billboards: {
      es: "Billboards en áreas comunes",
      en: "Common Areas Billboards",
    },
    awareness: {
      es: (
        <>
          <p>Más allá del awareness,</p>
          <p>el toolkit visual de illy debe recordarle</p>
          <p>a los estudiantes que hay una manera</p>
          <p>mejor, más intencional,</p>
          <p>de disfrutar su café.</p>
        </>
      ),
      en: (
        <>
          <p>Beyond simple awareness,</p>
          <p>illy&rsquo;s visual toolkit should remind</p>
          <p>students that there&rsquo;s a better,</p>
          <p>more intentional way to</p>
          <p>enjoy their coffee.</p>
        </>
      ),
    },
    tangibles: {
      es: "Creando momentos tangibles de conexión",
      en: "Creating tangible moments of connection",
    },
    coffeeStay: {
      es: "¿Café para tomar acá? Bebidas especiales y mesas tipo tablero de ajedrez.",
      en: "Coffee to stay? Special drinks and chess board tables.",
    },
    coffeeGo: {
      es: "¿Café para llevar? Llevate un crucigrama y nuestro packaging to-go custom para llevarte el respiro.",
      en: "Coffee to go? Take a crossword and our custom to-go packaging to take the break with you.",
    },
    truck: { es: "EL ILLY\nTRUCK", en: "THE ILLY\nTRUCK" },
    truckBody: {
      es: (
        <p>
          El illy Truck no será sólo una parada de café, sino un punto de
          encuentro cultural en el campus. De noches de cine a partidas de
          ajedrez, creamos un escenario para la conexión, la creatividad y la
          comunidad.
        </p>
      ),
      en: (
        <p>
          The illy truck won&rsquo;t be just a coffee stop, but a cultural
          meeting point on campus. From film nights to chess games, we&rsquo;ll
          create a stage for connection, creativity, and community.
        </p>
      ),
    },
    reps: {
      es: "Cada campus tiene sus propios reps certificados de illy —estudiantes que nos ayudan a organizar, mantener la energía alta y a la comunidad enganchada.",
      en: "Each campus will also have its own certified illy reps—who are students themselves and help us organize, keep the energy high and the community engaged.",
    },
    popupHeading: { es: "LOS POP-UPS", en: "THE POP-UPS" },
    popupIntro: {
      es: (
        <>
          <p>illy es café con intención.</p>
          <p className="mt-3">Lo demostramos activando eventos donde los estudiantes pueden pausar, converger y compartir una taza juntos.</p>
        </>
      ),
      en: (
        <>
          <p>illy is coffee with intention.</p>
          <p className="mt-3">We&rsquo;ll prove that by activating events where students can pause, converge, and share a cup together.</p>
        </>
      ),
    },
    runClubs: { es: "Run Clubs", en: "Run Clubs" },
    dating: {
      es: "Dating Shows con influencers",
      en: "Dating Shows x Influencers",
    },
    themed: {
      es: "Noches temáticas en el illy Truck – una disco-ball después de finales, o un club de cine.",
      en: "Themed Nights at the illy Truck, like a disco-ball after finals, or a film club.",
    },
  };

  const t = <K extends { es: string; en: string }>(x: K) => x[lang];

  return (
    <div className="mt-10 space-y-20 text-[13px] leading-[1.35] text-black">
      {/* Section 1 — intro + hero with overlay */}
      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4 space-y-10">
          <div>{copy.intro[lang]}</div>
          <div>{copy.challenge[lang]}</div>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-3">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.hero} alt="" className="w-full h-auto block" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right text-white font-bold text-[13px] leading-[1.35] max-w-[520px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {copy.pauseAside[lang]}
            </div>
          </div>
          <p className="font-bold">{t(copy.wakeup)}</p>
        </div>
      </section>

      {/* Section 3 — THE ILLY PAUSE hero banner with overlay text */}
      <section className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.pauseBanner} alt="" className="w-full h-auto block" />
        <h2
          className="absolute top-6 left-6 md:top-10 md:left-10 text-white font-bold tracking-[-0.04em] leading-[0.95] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          style={{ fontSize: "clamp(28px, 3.3vw, 42px)" }}
        >
          THE ILLY PAUSE
        </h2>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white font-bold text-[13px] leading-[1.35] max-w-[420px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {copy.pauseBody[lang]}
        </div>
      </section>

      {/* Section 4 — Three pillars */}
      <section className="space-y-6">
        <p className="font-bold text-center">{t(copy.threeElements)}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {copy.pillars.map((pillar, i) => (
            <div key={i} className="relative aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pillar.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                <h3
                  className="font-bold tracking-[-0.04em] leading-[0.95] whitespace-pre-line"
                  style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
                >
                  {t(pillar.title)}
                </h3>
                <p className="mt-4 text-[13px] font-bold">
                  {t(pillar.caption)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — UPDATED CAMPUS TOOLKIT */}
      <section className="space-y-6">
        <h2
          className="font-bold tracking-[-0.04em] leading-[0.95] whitespace-pre-line"
          style={{ fontSize: "clamp(28px, 3.3vw, 42px)" }}
        >
          {t(copy.toolkitHeading)}
        </h2>
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.printables} alt="" className="w-full h-auto" />
            <p className="font-bold mt-3">{t(copy.printables)}</p>
          </div>
          <div className="col-span-12 md:col-span-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.toolkitExtra} alt="" className="w-full h-auto" />
          </div>
          <p className="col-span-12 md:col-span-3 font-bold self-start">
            {copy.toolkitRules[lang]}
          </p>
        </div>
      </section>

      {/* Section 6 — Branded Cafeteria Items */}
      <section className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.cafeteria1}
            alt=""
            className="col-span-12 md:col-span-7 w-full h-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.cafeteria2}
            alt=""
            className="col-span-12 md:col-span-5 w-full h-auto"
          />
        </div>
        <p className="font-bold">{t(copy.cafeteria)}</p>
      </section>

      {/* Section 7 — Cold Brew */}
      <section className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.coldBrew1}
            alt=""
            className="col-span-12 md:col-span-4 w-full h-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.coldBrew2}
            alt=""
            className="col-span-12 md:col-span-4 w-full h-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.coldBrew3}
            alt=""
            className="col-span-12 md:col-span-4 w-full h-auto"
          />
        </div>
        <div className="grid grid-cols-12 gap-8">
          <p className="col-span-12 md:col-span-4 font-bold">
            {t(copy.coldBrew)}
          </p>
          <p className="col-span-12 md:col-span-4 md:col-start-9 md:text-right font-bold">
            {copy.coldBrewCaption[lang]}
          </p>
        </div>
      </section>

      {/* Section 8 — Photography Toolkit */}
      <section className="space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.photoToolkit} alt="" className="w-full h-auto" />
        <p className="font-bold">{t(copy.photoToolkit)}</p>
      </section>

      {/* Section 9 — Common Areas Billboards */}
      <section className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.ooh1}
            alt=""
            className="col-span-12 md:col-span-5 w-full h-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.ooh2}
            alt=""
            className="col-span-6 md:col-span-3 w-full h-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.ooh3}
            alt=""
            className="col-span-6 md:col-span-4 w-full h-auto"
          />
        </div>
        <p className="font-bold">{t(copy.billboards)}</p>
      </section>

      {/* Section 10 — Awareness quote */}
      <section>
        <div className="max-w-[420px] font-bold">{copy.awareness[lang]}</div>
      </section>

      {/* Section 11 — Moments / Tangibles grid */}
      <section className="space-y-4">
        <div className="grid grid-cols-6 gap-4 items-stretch">
          {[
            img.moment1,
            img.moment2,
            img.moment3,
            img.moment4,
            img.moment5,
            img.moment6,
          ].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          ))}
        </div>
        <p className="font-bold">{t(copy.tangibles)}</p>
      </section>

      {/* Section 12 — THE ILLY TRUCK */}
      <section className="space-y-6">
        <h2
          className="font-bold tracking-[-0.04em] leading-[0.95] whitespace-pre-line"
          style={{ fontSize: "clamp(28px, 3.3vw, 42px)" }}
        >
          {t(copy.truck)}
        </h2>
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-3 font-bold">
            {copy.truckBody[lang]}
          </div>
          <div className="col-span-12 md:col-span-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.truck} alt="" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Section 13 — Coffee to stay + Coffee to go */}
      <section className="space-y-4">
        <div className="flex gap-4 items-end justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.coffeeStay}
            alt=""
            className="h-[60vh] w-auto max-w-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.coffeeGo}
            alt=""
            className="h-[60vh] w-auto max-w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <p className="font-bold">{t(copy.coffeeStay)}</p>
          <p className="font-bold">{t(copy.coffeeGo)}</p>
        </div>
      </section>

      {/* Section 14 — illy uniforms */}
      <section className="space-y-4">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.uniform1}
            alt=""
            className="col-span-12 md:col-span-4 w-full h-auto"
          />
          <div className="col-span-12 md:col-span-8 grid grid-cols-5 gap-4 items-stretch">
            {[
              img.uniform2,
              img.uniform3,
              img.uniform4,
              img.uniform5,
              img.uniform6,
            ].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        </div>
        <p className="font-bold max-w-[420px]">{t(copy.reps)}</p>
      </section>

      {/* Section 16 — POP-UPS */}
      <section className="space-y-6 pb-20">
        <h2
          className="font-bold tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: "clamp(28px, 3.3vw, 42px)" }}
        >
          {t(copy.popupHeading)}
        </h2>
        <div className="max-w-[420px] font-bold">{copy.popupIntro[lang]}</div>
        <div className="grid grid-cols-4 gap-4 items-start">
          {[
            { src: img.runClub, label: t(copy.runClubs) },
            { src: img.datingShow, label: t(copy.dating) },
            { src: img.filmNight, label: null },
            { src: img.disco, label: t(copy.themed) },
          ].map((it, i) => (
            <div key={i} className="space-y-2">
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {it.label && <p className="font-bold">{it.label}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
