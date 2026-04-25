"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLang } from "@/lib/i18n";
import { LINKS } from "@/lib/content";

export default function NavBar() {
  const { tr } = useLang();
  const path = usePathname();

  const isActive = (p: string) =>
    p === "/" ? path === "/" : path?.startsWith(p);

  const leftItems: Array<
    | { key: keyof typeof labels; href: string; external?: boolean }
    | { key: "lang"; href?: undefined }
  > = [
    { key: "nav_manifesto" as const, href: "/manifesto" },
    { key: "nav_work_personal" as const, href: "/lo-que-hago" },
    { key: "nav_work" as const, href: "/trabajo" },
    { key: "nav_archive" as const, href: "/archive" },
    { key: "nav_newsletter" as const, href: LINKS.newsletter, external: true },
    { key: "nav_la_mesa" as const, href: LINKS.laMesa, external: true },
  ];

  const rightItems = [
    { key: "nav_contact" as const, href: "/contact" },
    { key: "nav_about" as const, href: "/about" },
  ];

  const labels = {
    nav_manifesto: tr("nav_manifesto"),
    nav_work_personal: tr("nav_work_personal"),
    nav_newsletter: tr("nav_newsletter"),
    nav_archive: tr("nav_archive"),
    nav_work: tr("nav_work"),
    nav_la_mesa: tr("nav_la_mesa"),
    nav_contact: tr("nav_contact"),
    nav_about: tr("nav_about"),
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2 px-3 md:px-6 py-3 md:py-4 text-[9px] md:text-[12px] tracking-wider text-black">
        <ul className="flex flex-wrap items-center gap-x-2.5 md:gap-x-6 gap-y-1">
          {leftItems.map((item) => {
            const label = labels[item.key];
            const active = item.href && !item.external && isActive(item.href);
            if (item.external) {
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target={item.key === "nav_la_mesa" ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="underline-hover"
                  >
                    {label}
                  </a>
                </li>
              );
            }
            return (
              <li key={item.key}>
                <Link
                  href={item.href!}
                  className={clsx(
                    "underline-hover",
                    active && "underline underline-offset-4",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5 md:gap-6">
          <ul className="flex items-center gap-2.5 md:gap-6">
            {rightItems.map((item) => {
              const label = labels[item.key];
              const active = isActive(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "underline-hover",
                      active && "underline underline-offset-4",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
