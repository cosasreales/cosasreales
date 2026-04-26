"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

export const t: Dict = {
  nav_manifesto: { es: "MANIFIESTO", en: "MANIFESTO" },
  nav_work_personal: { es: "MIS COSAS", en: "MY THINGS" },
  nav_newsletter: { es: "EL NEWSLETTER", en: "THE NEWSLETTER" },
  nav_archive: { es: "EL ARCHIVO", en: "THE ARCHIVE" },
  nav_work: { es: "LAS DEL TRABAJO", en: "WORK STUFF" },
  nav_la_mesa: { es: "LA MESA", en: "LA MESA" },
  nav_contact: { es: "¿CREAMOS ALGO?", en: "READY TO CREATE?" },
  nav_about: { es: "SOBRE MÍ", en: "ABOUT ME" },
  landing_enter: { es: "ENTRAR", en: "ENTER" },
  landing_pull_oracle: { es: "SACAR ORÁCULO", en: "GET ORACLE" },
  landing_scroll_to_enter: { es: "DESLIZÁ PARA INGRESAR", en: "SCROLL TO ENTER" },
  about_title: { es: "SOBRE MÍ", en: "ABOUT ME" },
  about_exhibitions: { es: "EXHIBICIONES", en: "EXHIBITIONS" },
  about_cv: { es: "CV", en: "CV" },
  contact_title: { es: "¿CREAMOS ALGO?", en: "READY TO CREATE?" },
  contact_location: {
    es: "SAMUEL MARTOS @ BUENOS AIRES, ARGENTINA",
    en: "SAMUEL MARTOS @ BUENOS AIRES, ARGENTINA",
  },
  read_more: { es: "LEER MÁS", en: "READ MORE" },
  back: { es: "VOLVER", en: "GO BACK" },
  password_label: { es: "CONTRASEÑA", en: "PASSWORD" },
  wrong_password: { es: "Contraseña incorrecta", en: "Wrong password" },
  archive_col_year: { es: "AÑO", en: "YEAR" },
  archive_col_name: { es: "NOMBRE", en: "NAME" },
  archive_col_where: { es: "DÓNDE", en: "WHERE" },
  archive_col_what: { es: "QUÉ ES", en: "WHAT IS IT" },
  archive_col_role: { es: "ROL", en: "ROLE" },
  work_col_year: { es: "AÑO", en: "YEAR" },
  work_col_client: { es: "CLIENTE", en: "CLIENT" },
  work_col_agency: { es: "AGENCIA", en: "AGENCY" },
  work_col_description: { es: "DESCRIPCIÓN", en: "DESCRIPTION" },
  work_col_role: { es: "ROL", en: "ROLE" },
  view_dynamic: { es: "DINÁMICO", en: "DYNAMIC" },
  view_horizontal: { es: "HORIZONTAL", en: "HORIZONTAL" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem("cr-lang") as Lang | null)
        : null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("cr-lang", l);
  };

  const tr = (key: keyof typeof t) => t[key]?.[lang] ?? String(key);

  return (
    <LangContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
