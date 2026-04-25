"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import HomeContent, { ModeSelector } from "@/components/HomeContent";

type Mode = "dynamic" | "horizontal" | "vertical";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("dynamic");
  return (
    <PageShell headerSlot={<ModeSelector mode={mode} onChange={setMode} />}>
      <HomeContent mode={mode} />
    </PageShell>
  );
}
