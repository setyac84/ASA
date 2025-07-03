"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./MenuOverlay.module.css";

type Section = {
  id: number;
  title: string;
  video: string;
};

export default function MenuOverlay({
  isOpen,
  onClose,
  sections,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  onNavigate: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // Stop vertical scroll
        el.scrollLeft += e.deltaY; // Translate vertical scroll to horizontal
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className={styles.closeBtn} onClick={onClose}>×</button>
      <div ref={scrollRef} className={styles.horizontalScroll}>
        {sections.map((section, i) => (
          <div
            key={section.id}
            className={styles.card}
            onClick={() => onNavigate(i)}
          >
            <video src={section.video} muted loop autoPlay playsInline />
            <h3>{section.title}</h3>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
