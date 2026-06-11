import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: #fff;
      text-shadow: 
          0 10px 30px rgba(255,255,255,0.15), 
          0 2px 4px rgba(255,255,255,0.08);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px rgba(255,255,255,0.1)) 
          drop-shadow(0px 2px 4px rgba(255,255,255,0.06));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, hsl(347, 60%, 20%) 0%, hsl(347, 80%, 8%) 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  heroSubtitle?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  onCtaClick?: () => void;
}

export function CinematicHero({
  brandName = "FACTORIAL HR",
  heroSubtitle = "Smartlic · United States",
  tagline1 = "One platform for",
  tagline2 = "workforce operations.",
  cardHeading = "Smarter HR, fully connected.",
  cardDescription = (
    <>
      Factorial unifies HR in one platform with <strong>built-in AI</strong>, automation, and integrations for
      time, documents, hiring, and analytics.
    </>
  ),
  metricValue = 100,
  metricLabel = "employees managed",
  ctaHeading = "Open the proposal",
  ctaDescription = "Executive narrative, operating model, investment, and decision path.",
  ctaButtonLabel = "Open proposal →",
  onCtaClick,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const ctxRef = useRef<gsap.Context | null>(null);

  const onSiteToday = metricValue > 500 ? 87 : Math.max(metricValue - 13, 0);
  const absencesToday = metricValue > 500 ? 13 : 13;

  const handleCtaClick = () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    ctxRef.current?.revert();
    ctxRef.current = null;
    setTimeout(() => onCtaClick?.(), 50);
  };

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // GSAP scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback");
    }, containerRef);

    ctxRef.current = ctx;

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [metricValue]);

  // Inject styles via useEffect to avoid React managing the <style> node
  const styleRef = useRef<HTMLStyleElement | null>(null);
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = INJECTED_STYLES;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full bg-[hsl(347,80%,5%)]", className)}
      {...props}
    >

      {/* Pinned viewport */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Film grain */}
        <div className="film-grain" />

        {/* Grid overlay */}
        <div className="bg-grid-theme absolute inset-0 z-0" />

        {/* Hero text */}
        <div className="hero-text-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <p className="text-track text-sm md:text-base tracking-[0.3em] uppercase font-bold mb-6 text-[#FF355E]">
            {brandName}
          </p>
          <h1 className="text-track text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[1.1] tracking-tighter">
            <span className="text-silver-matte block">{tagline1}</span>
            <span className="text-days text-silver-matte block mt-2">{tagline2}</span>
          </h1>
          <p className="text-track mt-8 text-lg md:text-xl text-white/50 max-w-md text-center">
            {heroSubtitle}
          </p>
        </div>

        {/* Main card */}
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card absolute z-20 w-[95vw] md:w-[80vw] h-[80vh] rounded-[24px] md:rounded-[40px] flex items-center justify-center overflow-hidden"
        >
          <div className="card-sheen" />

          {/* Card left text */}
          <div className="card-left-text absolute left-4 md:left-12 top-[15%] md:top-1/2 md:-translate-y-1/2 z-30 max-w-[45%] md:max-w-sm">
            <h2 className="text-card-silver-matte text-lg md:text-4xl font-bold leading-tight mb-2 md:mb-4">
              {cardHeading}
            </h2>
            <p className="text-white/60 text-xs md:text-base leading-relaxed hidden md:block">
              {cardDescription}
            </p>
          </div>

          {/* Card right - metrics */}
          <div className="card-right-text absolute right-4 md:right-12 top-[15%] md:top-1/2 md:-translate-y-1/2 z-30 text-right">
            <div className="text-3xl md:text-7xl font-bold text-card-silver-matte">
              <span className="counter-val">0</span>+
            </div>
            <p className="text-white/50 text-xs md:text-base mt-1 md:mt-2">{metricLabel}</p>
          </div>

          {/* iPhone mockup */}
          <div className="mockup-scroll-wrapper absolute z-20" style={{ perspective: "1200px" }}>
            <div ref={mockupRef} className="relative">
              <div className="iphone-bezel relative w-[160px] sm:w-[220px] md:w-[280px] h-[320px] sm:h-[440px] md:h-[560px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden">
                {/* Hardware buttons */}
                <div className="hardware-btn absolute -right-[3px] top-[120px] w-[3px] h-[40px] rounded-r-sm" />
                <div className="hardware-btn absolute -right-[3px] top-[180px] w-[3px] h-[60px] rounded-r-sm" />

                {/* Screen content */}
                <div className="absolute inset-[7px] rounded-[34px] md:rounded-[44px] overflow-hidden bg-gradient-to-b from-[hsl(347,60%,12%)] to-[hsl(347,80%,6%)]">
                  {/* Dynamic island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-30" />

                  {/* Screen glare */}
                  <div className="screen-glare absolute inset-0 z-20 rounded-[34px]" />

                  {/* App content */}
                  <div className="relative z-10 p-5 pt-14 h-full flex flex-col">
                    {/* Header */}
                    <div className="phone-widget mb-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">Factorial HR</p>
                      <p className="text-white text-base font-semibold mt-1">Dashboard</p>
                    </div>

                    {/* Progress ring widget */}
                    <div className="phone-widget widget-depth rounded-2xl p-4 mb-3 flex items-center gap-4">
                      <svg width="64" height="64" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                        <circle
                          className="progress-ring"
                          cx="70" cy="70" r="64"
                          fill="none"
                          stroke="#FF355E"
                          strokeWidth="12"
                        />
                      </svg>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-wider">Attendance</p>
                        <p className="text-white text-xl font-bold">98%</p>
                      </div>
                    </div>

                    {/* Metrics row */}
                    <div className="phone-widget grid grid-cols-2 gap-2 mb-3">
                      <div className="widget-depth rounded-xl p-3">
                        <p className="text-white/40 text-[9px] uppercase tracking-wider">On site</p>
                        <p className="text-white text-lg font-bold">{onSiteToday}</p>
                      </div>
                      <div className="widget-depth rounded-xl p-3">
                        <p className="text-white/40 text-[9px] uppercase tracking-wider">Absences</p>
                        <p className="text-[#FF355E] text-lg font-bold">{absencesToday}</p>
                      </div>
                    </div>

                    {/* Team widget */}
                    <div className="phone-widget widget-depth rounded-xl p-3">
                      <p className="text-white/40 text-[9px] uppercase tracking-wider mb-2">Teams</p>
                      <div className="flex items-center gap-2">
                        {["Field ops", "Admin", "Client sites"].map((team) => (
                          <span key={team} className="text-[9px] text-white/70 bg-white/5 rounded-full px-2 py-1">
                            {team}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="floating-badge floating-ui-badge absolute top-[12%] right-[8%] md:right-[15%] z-30 rounded-2xl px-3 md:px-5 py-2 md:py-3 hidden sm:block">
            <p className="text-white text-xs md:text-sm font-semibold">{metricValue}+ employees</p>
          </div>
          <div className="floating-badge floating-ui-badge absolute bottom-[18%] left-[5%] md:left-[12%] z-30 rounded-2xl px-3 md:px-5 py-2 md:py-3 hidden sm:block">
            <p className="text-white text-xs md:text-sm font-semibold">AI & automation</p>
          </div>
          <div className="floating-badge floating-ui-badge absolute bottom-[10%] right-[10%] md:right-[18%] z-30 rounded-2xl px-3 md:px-5 py-2 md:py-3 hidden sm:block">
            <p className="text-white text-xs md:text-sm font-semibold">Microsoft Partner</p>
          </div>

          {/* CTA section */}
          <div className="cta-wrapper absolute inset-0 z-40 flex flex-col items-center justify-center px-6">
            <h2 className="text-card-silver-matte text-3xl md:text-5xl font-bold text-center mb-4">
              {ctaHeading}
            </h2>
            <p className="text-white/50 text-sm md:text-lg max-w-lg text-center mb-8">
              {ctaDescription}
            </p>
            <div className="flex gap-4">
              <button onClick={handleCtaClick} className="btn-modern-light rounded-2xl px-8 py-4 text-base font-semibold cursor-pointer">
                {ctaButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
