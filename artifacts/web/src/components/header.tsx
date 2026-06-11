import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import logoSrc from "@assets/InnovAgents-Main-Lockup-white_1781206479352.png";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSolutionsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[#09090f]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "border-b border-transparent bg-[#09090f]/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 h-18 flex items-center justify-between" style={{ height: "72px" }}>
        <Link href="/" className="flex items-center gap-2">
          <img src={logoSrc} alt="InnovAgents" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            ref={solutionsRef}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              Solutions
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              role="menu"
              className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                solutionsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-[#0f0f18]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-2xl p-3 w-72 flex flex-col gap-1">
                <Link
                  href="/products/splash-announcements"
                  role="menuitem"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/6 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">SA</span>
                  </div>
                  <div>
                    <div className="font-display font-medium text-base text-white group-hover:text-primary transition-colors">Splash Announcements</div>
                    <div className="text-xs text-white/40 mt-0.5">Targeted org-wide messaging</div>
                  </div>
                </Link>
                <Link
                  href="/products/enhanced-files"
                  role="menuitem"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/6 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-xs font-bold">EF</span>
                  </div>
                  <div>
                    <div className="font-display font-medium text-base text-white group-hover:text-accent transition-colors">Enhanced Files</div>
                    <div className="text-xs text-white/40 mt-0.5">Advanced file management</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            className="h-9 px-5 text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(85,85,230,0.35)] hover:shadow-[0_0_35px_rgba(85,85,230,0.55)] transition-all duration-300"
          >
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-full left-0 w-full bg-[#0d0d16]/97 backdrop-blur-xl border-b border-white/8 p-5 flex flex-col gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="space-y-1">
            <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 pb-2">Solutions</div>
            <Link href="/products/splash-announcements" className="block px-3 py-2.5 text-base font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/6 transition-colors">
              Splash Announcements
            </Link>
            <Link href="/products/enhanced-files" className="block px-3 py-2.5 text-base font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/6 transition-colors">
              Enhanced Files
            </Link>
          </div>
          <div className="h-px bg-white/8 w-full" />
          <Link href="/about" className="block px-3 py-2.5 text-base font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/6 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="block px-3 py-2.5 text-base font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/6 transition-colors">
            Contact Us
          </Link>
          <Button asChild className="w-full mt-2 bg-primary text-white shadow-[0_0_20px_rgba(85,85,230,0.4)]">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
