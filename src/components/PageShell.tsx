"use client";

import { ReactNode } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function PageShell({
  children,
  className = "",
  headerSlot,
}: {
  children: ReactNode;
  className?: string;
  headerSlot?: ReactNode;
}) {
  return (
    <div className={`relative min-h-screen w-full text-brand ${className}`}>
      <Header headerSlot={headerSlot} />
      <main className="relative min-h-screen pt-24 pb-20">{children}</main>
      <NavBar />
    </div>
  );
}
