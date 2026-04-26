"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import HomeContent, { ModeSelector, type Mode } from "@/components/HomeContent";
import { useLang, Lang } from "@/lib/i18n";
import { LOGO, ORACLE_MARK, ORACLE_IMAGES, ORACLE_FAVORED } from "@/lib/content";

const QUESTIONS_ES = [
  "¿CÓMO QUERÉS RECORDAR?",
  "¿QUÉ HAY FUERA DE LOS BORDES?",
  "¿QUÉ QUEDÓ AFUERA?",
  "¿POR QUÉ?",
  "¿QUÉ ELEGÍS MOSTRAR?",
  "¿HAY FIN?",
  "¿A DÓNDE TE LLEVA EL MAPA?",
  "¿CUÁNTO PESA UN VIAJE?",
  "¿CUÁNDO TERMINÁS UNA OBRA?",
  "¿QUÉ FORMA TIENE TU MAPA?",
  "¿POR QUÉ NECESITASTE RECORTARLO?",
  "¿QUIÉN NO ESTÁ EN TUS FOTOS?",
  "¿CÓMO TE VOLVISTE VOS?",
  "¿QUÉ TE LLEVA AL LÍMITE?",
  "¿CUÁNDO LEÍSTE POR ÚLTIMA VEZ TU DIARIO?",
  "¿DÓNDE ESTÁ TU FAMILIA?",
  "¿LAS COINCIDENCIAS SE SIENTEN COMO BRUJERÍA?",
  "¿QUÉ ES UN DÉJÀ VU?",
  "¿CUÁNTO TIEMPO TE ABURRÍS?",
  "¿POR QUÉ HACÉS LO QUE HACÉS?",
  "¿DE DÓNDE VIENEN LAS IDEAS?",
  "¿QUIÉN ESTÁS SIENDO?",
  "¿CÓMO (NO) VOLVERSE UNO MISMO?",
  "¿QUÉ COLOR TE INSPIRA?",
  "¿CUÁNDO BAILASTE POR ÚLTIMA VEZ?",
  "¿QUÉ TE MUEVE?",
  "¿QUÉ ES EL AMOR?",
  "¿DE DÓNDE VENÍS?",
  "¿DÓNDE ENCONTRÁS BELLEZA?",
  "¿DÓNDE UBICÁS TU DESEO?",
  "¿QUÉ TE IMPACTA?",
  "¿QUÉ TE DA VERGÜENZA?",
  "¿QUÉ ESTÁS ESPERANDO?",
  "¿QUÉ EXTRAÑÁS?",
  "¿CUÁNDO LLORASTE POR ÚLTIMA VEZ?",
  "¿QUÉ TE ATRAE?",
  "¿POR QUÉ NO LO HACÉS?",
  "¿A QUIÉN LE PEDÍS PERDÓN?",
  "¿CUÁNDO JUGASTE POR ÚLTIMA VEZ?",
  "¿CUÁNDO NADASTE POR ÚLTIMA VEZ?",
  "¿QUÉ PUERTA CERRÁS?",
  "¿QUÉ PUERTA ABRÍS?",
  "¿QUÉ ES LA VERDAD?",
  "¿QUÉ SOÑASTE ANOCHE?",
  "¿QUÉ FUTURO VAS A INVENTAR?",
  "¿QUÉ VAS A CREAR?",
  "¿PODÉS DESTRUIR?",
  "¿QUÉ VES EN TU REFLEJO?",
  "¿QUÉ ESCUCHÁS BAJO EL AGUA?",
  "¿QUÉ PASA SI FUNCIONA?",
];

const QUESTIONS_EN = [
  "HOW DO YOU WANT TO REMEMBER?",
  "WHAT LIES BEYOND THE EDGES?",
  "WHAT WAS LEFT OUT?",
  "WHY?",
  "WHAT DO YOU CHOOSE TO SHOW?",
  "IS THERE AN END?",
  "WHERE DOES THE MAP TAKE YOU?",
  "HOW MUCH DOES A JOURNEY WEIGH?",
  "WHEN DO YOU FINISH A WORK?",
  "WHAT SHAPE IS YOUR MAP?",
  "WHY DID YOU NEED TO CROP IT?",
  "WHO IS NOT IN YOUR PHOTOS?",
  "HOW DID YOU BECOME YOURSELF?",
  "WHAT DRAWS YOU TO THE LIMIT?",
  "WHEN DID YOU LAST READ YOUR DIARY?",
  "WHERE IS YOUR FAMILY?",
  "DO COINCIDENCES FEEL LIKE WITCHCRAFT?",
  "WHAT'S A DÉJÀ VU?",
  "HOW LONG DO YOU GET BORED FOR?",
  "WHY DO YOU DO WHAT YOU DO?",
  "WHERE DO IDEAS COME FROM?",
  "WHO ARE YOU BEING?",
  "HOW TO (NOT) BECOME ONESELF?",
  "WHAT COLOR INSPIRES YOU?",
  "WHEN WAS THE LAST TIME YOU DANCED?",
  "WHAT MOVES YOU?",
  "WHAT IS LOVE?",
  "WHERE ARE YOU FROM?",
  "WHERE DO YOU FIND BEAUTY?",
  "WHERE DO YOU PLACE YOUR DESIRE?",
  "WHAT IMPACTS YOU?",
  "WHAT EMBARRASSES YOU?",
  "WHAT ARE YOU WAITING FOR?",
  "WHAT DO YOU MISS?",
  "WHEN DID YOU LAST CRY?",
  "WHAT ATTRACTS YOU?",
  "WHY DON'T YOU DO IT?",
  "WHO DO YOU ASK FOR FORGIVENESS?",
  "WHEN DID YOU LAST PLAY?",
  "WHEN DID YOU LAST SWIM?",
  "WHAT DOOR DO YOU CLOSE?",
  "WHAT DOOR DO YOU OPEN?",
  "WHAT IS TRUTH?",
  "WHAT DID YOU DREAM LAST NIGHT?",
  "WHAT FUTURE WILL YOU INVENT?",
  "WHAT WILL YOU CREATE?",
  "CAN YOU DESTROY?",
  "WHAT DO YOU SEE IN YOUR REFLECTION?",
  "WHAT DO YOU HEAR UNDERWATER?",
  "WHAT HAPPENS IF IT WORKS?",
];

type Stage = "entry" | "oracle";

export default function LandingPage() {
  const { setLang, tr, lang } = useLang();
  const [stage, setStage] = useState<Stage>("entry");
  const [pickedImage, setPickedImage] = useState<string>(ORACLE_IMAGES[0]);
  const [pickedQuestion, setPickedQuestion] = useState<string>("");
  const [mode, setMode] = useState<Mode>("dynamic");
  const [atHome, setAtHome] = useState(false);

  // Scroll-driven oracle -> home transition. progress is 0..1; reversible.
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 160, damping: 28, mass: 0.7 });
  const yTranslate = useTransform(smooth, (v) => `${-v * 100}vh`);
  const questionScale = useTransform(smooth, [0, 1], [1, 1.35]);
  const questionOpacity = useTransform(smooth, [0, 0.4, 1], [1, 0.8, 0.35]);
  const circleOpacity = useTransform(smooth, [0, 0.6], [1, 0]);
  const chromeOpacity = useTransform(smooth, [0.55, 1], [0, 1]);
  const progressRef = useRef(0);

  const pickOracle = (which: Lang) => {
    const img = ORACLE_IMAGES[Math.floor(Math.random() * ORACLE_IMAGES.length)];
    const pool = which === "es" ? QUESTIONS_ES : QUESTIONS_EN;
    const favored = ORACLE_FAVORED[which];
    const useFavored = Math.random() < 0.22;
    const q = useFavored
      ? favored
      : pool[Math.floor(Math.random() * pool.length)];
    setPickedImage(img);
    setPickedQuestion(q);
  };

  const onPickLanguage = (l: Lang) => {
    setLang(l);
    pickOracle(l);
    setStage("oracle");
  };

  const downloadOracle = async () => {
    const W = 1080;
    const H = 1920;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadImg = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    try {
      const img = await loadImg(pickedImage);
      // Object-fit: cover
      const scale = Math.max(W / img.width, H / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

      // Vignette gradients matching the oracle
      const gx = ctx.createLinearGradient(0, 0, W, 0);
      gx.addColorStop(0, "rgba(0,0,0,0.35)");
      gx.addColorStop(0.35, "rgba(0,0,0,0.15)");
      gx.addColorStop(0.65, "rgba(0,0,0,0.15)");
      gx.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = gx;
      ctx.fillRect(0, 0, W, H);
      const gy = ctx.createLinearGradient(0, 0, 0, H);
      gy.addColorStop(0, "rgba(0,0,0,0.15)");
      gy.addColorStop(0.4, "rgba(0,0,0,0)");
      gy.addColorStop(0.6, "rgba(0,0,0,0)");
      gy.addColorStop(1, "rgba(0,0,0,0.25)");
      ctx.fillStyle = gy;
      ctx.fillRect(0, 0, W, H);

      // Soft text shadow
      const applyShadow = () => {
        ctx.shadowColor = "rgba(0,0,0,0.45)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 4;
      };
      const clearShadow = () => {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
      };

      ctx.fillStyle = "#fff";
      ctx.textBaseline = "alphabetic";

      // ORÁCULO label rotated 90°, vertical on left
      ctx.save();
      ctx.translate(80, H / 2);
      ctx.rotate(-Math.PI / 2);
      applyShadow();
      ctx.font = "700 28px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      const labelText = lang === "es" ? "ORÁCULO" : "ORACLE";
      const trackedLabel = labelText.split("").join("\u2009\u2009\u2009");
      ctx.fillText(trackedLabel, 0, 0);
      clearShadow();
      ctx.restore();

      // Question (right-aligned, wrap)
      const fontSize = 96;
      ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "right";
      const maxWidth = W - 160;
      const words = pickedQuestion.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const w of words) {
        const test = line ? line + " " + w : w;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = w;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);

      applyShadow();
      const lineHeight = fontSize * 1.05;
      const totalH = lines.length * lineHeight;
      let y = H / 2 - totalH / 2 + lineHeight * 0.85;
      for (const l of lines) {
        ctx.fillText(l, W - 80, y);
        y += lineHeight;
      }
      clearShadow();

      // Footer brand
      ctx.font = "500 22px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.globalAlpha = 0.85;
      applyShadow();
      ctx.fillText("COSAS REALES", W / 2, H - 80);
      clearShadow();
      ctx.globalAlpha = 1;

      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg", 0.92),
      );
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `oraculo-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Oracle download failed", e);
    }
  };

  useEffect(() => {
    return smooth.on("change", (v) => {
      setAtHome(v > 0.98);
    });
  }, [smooth]);

  useEffect(() => {
    return progress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [progress]);

  useEffect(() => {
    if (stage !== "oracle") return;
    const VH = () => window.innerHeight;
    const onWheel = (e: WheelEvent) => {
      // Once fully at home, let the inner HomeContent own the wheel.
      if (progressRef.current >= 0.999) return;
      const next = Math.max(
        0,
        Math.min(1, progressRef.current + e.deltaY / VH()),
      );
      progress.set(next);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
        progress.set(1);
      } else if (e.key === "ArrowDown") {
        progress.set(0);
      }
    };
    let touchStartY: number | null = null;
    let touchStartP = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartP = progressRef.current;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY === null) return;
      const dy = touchStartY - e.touches[0].clientY;
      const next = Math.max(0, Math.min(1, touchStartP + dy / VH()));
      progress.set(next);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white text-brand">
      <AnimatePresence mode="wait">
        {stage === "entry" && (
          <motion.div
            key="entry"
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[620px] max-w-[78vw]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="Cosas Reales" className="w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-end gap-12 text-[11px] tracking-[0.2em] text-black/70"
            >
              <button
                onClick={() => onPickLanguage("es")}
                className="flex flex-col items-center gap-1.5 hover:text-black"
              >
                <span className="text-[8px] tracking-[0.3em] text-black/40">
                  SACAR ORÁCULO
                </span>
                <span className="underline underline-offset-[6px]">ESPAÑOL</span>
              </button>
              <button
                onClick={() => onPickLanguage("en")}
                className="flex flex-col items-center gap-1.5 hover:text-black"
              >
                <span className="text-[8px] tracking-[0.3em] text-black/40">
                  GET ORACLE
                </span>
                <span className="underline underline-offset-[6px]">ENGLISH</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "oracle" && (
        <>
          {/* Scrolling stack: oracle on top (100vh), home below (100vh). */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[200vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ y: yTranslate }}
          >
            {/* Oracle pane */}
            <div className="relative h-screen w-full">
              <motion.div
                key={pickedImage}
                className="absolute inset-0"
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundImage: `url("${pickedImage}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Contrast guard: dark vignette + gradient so white text always
                  reads over any oracle photo, including very light ones. */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.35) 100%), linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.25, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ opacity: circleOpacity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96vmin] h-[96vmin] max-w-[1200px] max-h-[1200px] pointer-events-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ORACLE_MARK}
                  alt="Cosas Reales"
                  className="absolute inset-0 w-full h-full object-contain select-none"
                  draggable={false}
                  style={{
                    filter:
                      "drop-shadow(0 4px 16px rgba(0,0,0,0.14)) drop-shadow(0 22px 60px rgba(0,0,0,0.09))",
                  }}
                />
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="oracle-shadow absolute left-8 md:left-14 top-1/2 -translate-y-1/2 text-white text-[13px] md:text-[14px] tracking-[0.25em] font-bold"
              >
                {lang === "es" ? "ORÁCULO" : "ORACLE"}
              </motion.span>

              <motion.button
                onClick={downloadOracle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                style={{ opacity: circleOpacity }}
                aria-label={tr("landing_save_oracle")}
                className="oracle-shadow absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white text-[10px] md:text-[11px] tracking-[0.25em] flex items-center gap-1.5 cursor-pointer"
              >
                <span>{tr("landing_save_oracle")}</span>
                <span aria-hidden>↓</span>
              </motion.button>

              <motion.h1
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.9 }}
                style={{ scale: questionScale, opacity: questionOpacity }}
                className="oracle-shadow absolute right-8 md:right-14 top-1/2 -translate-y-1/2 text-right text-white font-semibold leading-[1.02] text-[6vw] md:text-[3.2vw] max-w-[48vw] origin-right"
              >
                {pickedQuestion}
              </motion.h1>

              <motion.button
                onClick={() => progress.set(1)}
                style={{ opacity: circleOpacity }}
                className="oracle-shadow absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white text-[10px] tracking-[0.3em] cursor-pointer whitespace-nowrap"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[12px] leading-none"
                >
                  ↓
                </motion.span>
                <span>{tr("landing_scroll_to_enter")}</span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[12px] leading-none"
                >
                  ↓
                </motion.span>
              </motion.button>
            </div>

            {/* Home pane */}
            <div className="relative h-screen w-full bg-white pt-24 pb-20">
              <HomeContent mode={mode} interactive={atHome} />
            </div>
          </motion.div>

          {/* Chrome (header + navbar) fades in as home rises. */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-40"
            style={{ opacity: chromeOpacity }}
          >
            <div className="pointer-events-auto">
              <Header headerSlot={<ModeSelector mode={mode} onChange={setMode} />} />
              <NavBar />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
