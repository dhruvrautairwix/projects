"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Mail, Home, Bomb, X, FolderOpen, Award, BookOpen, Settings } from "lucide-react";

// Mmake red border around the obile menu links (Home, About, Projects, Services, Contact)
const mobileNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: () => <span className="text-6xl font-bold">B</span> },
  { href: "/projects", label: "Projects", icon: Globe },
  { href: "/services", label: "Services", icon: Settings },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [localTime, setLocalTime] = useState("");
  const [temperature, setTemperature] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update time to show user's local time
  useEffect(() => {
    if (!isMounted) return;
    
    const formatter = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      // No timeZone specified - uses user's local timezone
    });

    const updateTime = () => setLocalTime(formatter.format(new Date()));
    updateTime();

    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, [isMounted]);

  // Fetch temperature based on user's location
  useEffect(() => {
    if (!isMounted) return;
    
    let intervalId: NodeJS.Timeout | null = null;
    
    const fetchTemperature = async (latitude: number, longitude: number) => {
      try {
        // Using Open-Meteo API (no API key required)
        // Get timezone automatically based on coordinates
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`
        );
        
        if (response.ok) {
          const data = await response.json();
          const temp = data.current?.temperature_2m;
          if (temp !== undefined) {
            setTemperature(Math.round(temp).toString());
          }
        }
      } catch (error) {
        console.error("Failed to fetch temperature:", error);
        // Fallback to empty string if API fails
        setTemperature("");
      }
    };

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchTemperature(latitude, longitude);
          
          // Refresh temperature every 10 minutes
          intervalId = setInterval(() => {
            fetchTemperature(latitude, longitude);
          }, 600000);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to Mississauga if user denies location or it's unavailable
          fetchTemperature(43.5890, -79.6441);
          
          // Set up interval for fallback location too
          intervalId = setInterval(() => {
            fetchTemperature(43.5890, -79.6441);
          }, 600000);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000 // Cache location for 5 minutes
        }
      );
    } else {
      // Fallback to Mississauga if geolocation is not supported
      fetchTemperature(43.5890, -79.6441);
      intervalId = setInterval(() => {
        fetchTemperature(43.5890, -79.6441);
      }, 600000);
    }
    
    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isMounted]);

  // Scroll detection for navbar background - transparent at top, black on scroll (all pages)
  useEffect(() => {
    if (!isMounted) return;
    
    // Reset scroll state when page changes - start transparent
    setIsScrolled(false);
    
    const handleScroll = () => {
      const windowScroll = window.scrollY || document.documentElement.scrollTop || window.pageYOffset;
      
      // Turn black when scrolled, transparent when at top (scroll = 0)
      // Use a threshold of 5px to account for any rounding issues or minor scroll
      const hasScrolled = windowScroll > 5;
      setIsScrolled(hasScrolled);
    };

    // Listen to scroll events on window
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    
    // Initial check - ensure we start transparent at top
    let initTimeout: NodeJS.Timeout | undefined;
    // Force transparent initially
    setIsScrolled(false);
    
    // Small delay to ensure DOM is ready, then check actual scroll position
    initTimeout = setTimeout(() => {
      const windowScroll = window.scrollY || document.documentElement.scrollTop || window.pageYOffset;
      // Only set to true if actually scrolled (use threshold of 5px to be safe)
      setIsScrolled(windowScroll > 5);
    }, 200);
    
    return () => {
      if (initTimeout) clearTimeout(initTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isMounted, pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`hidden lg:block fixed inset-x-0 top-0 z-[9999] px-6 xl:px-12 py-2 transition-colors duration-300 backdrop-blur-[15px] ${
          isScrolled ? "bg-black/80" : "bg-black/40"
        }`}
      >
        <div className="mx-auto max-w-[1800px] flex items-center justify-between gap-6">
          {/* Left - Logo */}
          <div className="flex items-center justify-start flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/Main_Logo.png"
                alt="Blueprint 3D Studios Logo"
                width={50}
                height={50}
                className="object-contain h-10 w-10 xl:h-12 xl:w-12"
                priority
              />
            </Link>
            <div className="flex flex-col items-center justify-start  flex-shrink-0">
            <p className="text-[0.55rem] xl:text-[0.65rem] tracking-[0.25em] text-white/80 uppercase whitespace-nowrap">
              Building dreams, one pixel at a time.
            </p>
          </div>
          </div>

          {/* Right - Time and Location */}
          <div className="flex items-center justify-end gap-2 xl:gap-3 text-[0.55rem] xl:text-[0.65rem] tracking-[0.2em] xl:tracking-[0.25em] text-white/90 uppercase flex-shrink-0 whitespace-nowrap">
            {isMounted && localTime && <span>{localTime}</span>}
            {isMounted && localTime && <span>|</span>}
            <span>MISSISSAUGA</span>
            {isMounted && temperature && (
              <>
                <span>|</span>
                <span>{temperature}°C</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`lg:hidden fixed inset-x-0 top-0 z-[9999] px-4 py-2 sm:px-6 transition-colors duration-300 backdrop-blur-[15px] ${
          isScrolled ? "bg-black/80" : "bg-black/40"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center text-center">
          <div className="flex flex-col items-center gap-2">
            {/* Logo/Brand Name */}
            <Link href="/" className="flex items-center justify-center">
              <h1 className="text-sm sm:text-base font-bold tracking-[0.4em] text-white uppercase">
                BLUEPRINT 3D STUDIO
              </h1>
            </Link>
            
            {/* Time and Location Info */}
            <div className="flex items-center gap-2 text-[0.6rem] sm:text-[0.65rem] tracking-[0.3em] text-white/80 uppercase">
              {isMounted && localTime && <span>{localTime}</span>}
              {isMounted && localTime && <span>|</span>}
              <span>MISSISSAUGA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Navigation - Bottom Left */}
      <div className="hidden lg:flex fixed bottom-0 left-0 z-[9999] items-center gap-5 xl:gap-6 px-4 py-4 backdrop-blur-[8px] bg-black/30">
        <Link href="/" className="group flex flex-col items-center gap-1">
          <Home
            className={`h-5 w-5 xl:h-6 xl:w-6 transition-all ${
              pathname === "/" ? "text-white" : "text-white/70 group-hover:text-white"
            }`} 
            strokeWidth={2.5}
          />
          <span
            className={`text-xs xl:text-sm font-black tracking-[0.15em] uppercase transition-all ${
              pathname === "/" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Home
          </span>
        </Link>

        <Link href="/about" className="group flex flex-col items-center gap-1">
          <span
            className={`flex items-center justify-center h-5 w-5 xl:h-6 xl:w-6 leading-none text-xl xl:text-2xl font-black transition-all ${
              pathname === "/about" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            B
          </span>
          <span
            className={`text-xs xl:text-sm font-black tracking-[0.15em] uppercase transition-all ${
              pathname === "/about" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            About
          </span>
        </Link>

        <Link href="/projects" className="group flex flex-col items-center gap-1">
          <Globe
            className={`h-5 w-5 xl:h-6 xl:w-6 transition-all ${
              pathname === "/projects" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={2.5}
          />
          <span
            className={`text-xs xl:text-sm font-black tracking-[0.15em] uppercase transition-all ${
              pathname === "/projects" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Projects
          </span>
        </Link>

        <Link href="/services" className="group flex flex-col items-center gap-1">
          <Settings
            className={`h-5 w-5 xl:h-6 xl:w-6 transition-all ${
              pathname === "/services" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={2.5}
          />
          <span
            className={`text-xs xl:text-sm font-black tracking-[0.15em] uppercase transition-all ${
              pathname === "/services" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Services
          </span>
        </Link>

        <Link href="/contact" className="group flex flex-col items-center gap-1">
          <Mail
            className={`h-5 w-5 xl:h-6 xl:w-6 transition-all ${
              pathname === "/contact" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={2.5}
          />
          <span
            className={`text-xs xl:text-sm font-black tracking-[0.15em] uppercase transition-all ${
              pathname === "/contact" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Contact
          </span>
        </Link>

        <Link href="/dynamite" className="group flex flex-col items-center gap-1">
          <Bomb
            className={`h-5 w-5 xl:h-6 xl:w-6 transition-all ${
              pathname === "/dynamite" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={2.5}
          />
          <span
            className={`text-xs xl:text-sm font-black tracking-[0.15em] uppercase transition-all ${
              pathname === "/dynamite" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Dynamite
          </span>
        </Link>
      </div>

      {/* Mobile/Tablet Hamburger Menu Button - Full Width Black Bar at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-black py-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mx-auto flex items-center justify-center text-white transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" strokeWidth={3} />
          ) : (
            <div className="flex flex-col gap-[5px]">
              <div className="w-8 h-[2.5px] bg-white rounded-sm"></div>
              <div className="w-8 h-[2.5px] bg-white rounded-sm"></div>
              <div className="w-8 h-[2.5px] bg-white rounded-sm"></div>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu - Half Screen Bottom Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-[9998] bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Half Screen Menu Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-black h-1/2 rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Grid Layout - 2x3 grid for 5 items */}
                <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-px bg-black p-px">
                  {/* Home - Top Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black"
                  >
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Home className="h-12 w-12 text-white" strokeWidth={2.5} />
                      <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
                        Home
                      </span>
                    </Link>
                  </motion.div>

                  {/* About - Top Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="bg-black"
                  >
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-4xl font-black text-white">B</span>
                      <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
                        About
                      </span>
                    </Link>
                  </motion.div>

                  {/* Projects - Bottom Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black"
                  >
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Globe className="h-12 w-12 text-white" strokeWidth={2.5} />
                      <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
                        Projects
                      </span>
                    </Link>
                  </motion.div>

                  {/* Services - Bottom Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="bg-black"
                  >
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Settings className="h-12 w-12 text-white" strokeWidth={2.5} />
                      <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
                        Services
                      </span>
                    </Link>
                  </motion.div>

                  {/* Contact - Bottom Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Mail className="h-12 w-12 text-white" strokeWidth={2.5} />
                      <span className="text-sm font-black tracking-[0.2em] uppercase text-white">
                        Contact
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}