"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FUN_GRAPHIC } from "@/lib/content";

export default function FunGraphic({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const smooth = useSpring(angle, { stiffness: 60, damping: 20, mass: 0.8 });
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - center.x;
      const dy = e.clientY - center.y;
      const deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      angle.set(deg);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [center, angle]);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ width: size, height: size, rotate: smooth }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FUN_GRAPHIC}
        alt=""
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </motion.div>
  );
}
