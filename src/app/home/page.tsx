"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import HomeContent, { ModeSelector, type Mode } from "@/components/HomeContent";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("dynamic");
  return (
    <PageShell headerSlot={<ModeSelector mode={mode} onChange={setMode} />}>
      <HomeContent mode={mode} />
    </PageShell>
  );
}
