"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./HorizontalScroll.module.css";
import Navigation from "./Navigation";
import MenuOverlay from "./MenuOverlay";

const sections = [
  { 
    id: 1, 
    title: "Automated Expense Management", 
    number: "1",
    bgColor: "linear-gradient(135deg, rgba(147, 112, 219, 0.8), rgba(123, 104, 238, 0.6))",
    video: "/videos/1.mp4"
  },
  { 
    id: 2, 
    title: "Seamless Payment Experience", 
    number: "2",
    bgColor: "linear-gradient(135deg, rgba(96, 200, 106, 0.8), rgba(147, 112, 219, 0.6))",
    video: "/videos/black.mp4"
  },
  { 
    id: 3, 
    title: "AI-Enhanced Cost-Efficient Shopping", 
    number: "3", 
    bgColor: "linear-gradient(135deg, rgba(82, 42, 157, 0.8), rgba(138, 43, 226, 0.6))", 
    video: "/videos/cheetah.mp4"
  },
  { 
    id: 4, 
    title: "Health and Lifestyle", 
    number: "4", 
    bgColor: "linear-gradient(135deg, rgba(109, 20, 94, 0.8), rgba(153, 50, 204, 0.6))", 
    video: "/videos/spiral.mp4"
  },
  { 
    id: 5, 
    title: "Family Financial Management", 
    number: "5", 
    bgColor: "linear-gradient(135deg, rgba(125, 155, 187, 0.8), rgba(128, 0, 128, 0.6))", 
    video: "/videos/blue.mp4"
  },
  { 
    id: 6, 
    title: "Localized Cost-of-Living Calculators", 
    number: "6", 
    bgColor: "linear-gradient(135deg, rgba(24, 210, 213, 0.8), rgba(147, 112, 219, 0.6))", 
    video: "/videos/tunnel.mp4"
  },
  { 
    id: 7, 
    title: "Seamless Integration with IoT Devices", 
    number: "7", 
    bgColor: "linear-gradient(135deg, rgba(179, 207, 108, 0.8), rgba(52, 31, 123, 0.6))", 
    video: "/videos/rainbow.mp4"
  },
  { 
    id: 8, 
    title: "Debt Management and Loan Options", 
    number: "8", 
    bgColor: "linear-gradient(135deg, rgba(203, 216, 176, 0.8), rgba(153, 50, 204, 0.6))", 
    video: "/videos/people.mp4" 
  },
  { 
    id: 9, 
    title: "Fully Personalized Financial Strategies", 
    number: "9", 
    bgColor: "linear-gradient(135deg, rgba(143, 188, 106, 0.8), rgba(128, 0, 128, 0.6))", 
    video: "/videos/drone.mp4"
  },
  { 
    id: 10, 
    title: "Real-time Investment Updates", 
    number: "10", 
    bgColor: "linear-gradient(135deg, rgba(210, 136, 57, 0.8), rgba(147, 112, 219, 0.6))", 
    video: "/videos/1.mp4"
  },
];

const Section = ({ number, title, bgColor, video }: { 
  number: string; 
  title: string;
  bgColor: string;
  video: string;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={styles.section} style={{ background: bgColor }}>
        <div className={styles.sectionContent}>
          <div className={styles.left}>
            <span className={styles.sectionNumber}>{number}</span>
          </div>
          <div className={styles.center}>
            <div className={styles.visualWrapper}>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }} />
              <video className={styles.sectionVideo} src={video} autoPlay loop muted playsInline />
              <div className={styles.floatingDots}></div>
              
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.sectionTitle}>{title}</h2>
          </div>
        </div>
    </motion.div>
  );
};

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = Date.now();
    const scrollThreshold = 200;
    let isManualScrolling = false;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold || isManualScrolling) return;
      lastScrollTime = now;
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      if (nextSection !== currentSection) {
        isManualScrolling = true;
        setIsScrolling(true);
        setCurrentSection(nextSection);
        container.scrollTo({ left: nextSection * window.innerWidth, behavior: "smooth" });
        if (scrollTimeout.current !== null) {
          window.clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = window.setTimeout(() => {
          setIsScrolling(false);
          isManualScrolling = false;
          scrollTimeout.current = null;
        }, 1000);
      }
    };

    const preventDefaultScroll = (e: WheelEvent) => {
    if (isMenuOpen) return; 
    if (e.target instanceof Node && container.contains(e.target)) {
      e.preventDefault();
    }
  };

    if (!isMenuOpen) {
      container.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("wheel", preventDefaultScroll, { passive: false });
    }

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("wheel", preventDefaultScroll);
      if (scrollTimeout.current !== null) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentSection, isScrolling, isMenuOpen]);

  useEffect(() => {
  const body = document.body;
  const html = document.documentElement;

  if (isMenuOpen) {
    body.style.overflow = "hidden"; 
    html.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
    html.style.overflow = "";
  }

  return () => {
    body.style.overflow = "";
    html.style.overflow = "";
  };
}, [isMenuOpen]);


  const handleNavigate = (index: number) => {
    if (isScrolling) return;
    const container = containerRef.current;
    if (container) {
      setIsScrolling(true);
      setCurrentSection(index);
      container.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
      if (scrollTimeout.current !== null) {
        window.clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
        scrollTimeout.current = null;
      }, 800);
    }
  };
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const container = containerRef.current;
    if (container) {
      container.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
      container.style.overflowX = isMenuOpen ? 'auto' : 'hidden';
      container.style.flexDirection = isMenuOpen ? 'row' : 'column';
      container.scrollTo(0, 0);
    }
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.transformMenu}>
        <button onClick={toggleMenu} className={styles.menuButton}>Menu</button>
      </div>
      <div ref={containerRef} className={`${styles.scrollContainer} ${isMenuOpen ? styles.menuOpen : ''}`}>
        {sections.map((section) => (
          <Section key={section.id} number={section.number} title={section.title} bgColor={section.bgColor} video={section.video} />
        ))}
      </div>
      {!isMenuOpen && (
        <Navigation currentSection={currentSection} totalSections={sections.length} onNavigate={handleNavigate} />
      )}

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        sections={sections}
        onNavigate={(index) => {
          toggleMenu();
          handleNavigate(index);
        }}
      />
    </div>
  );
}
