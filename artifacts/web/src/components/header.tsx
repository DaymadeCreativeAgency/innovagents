import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
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
          ? "border-b border-white/[0.07] bg-[#100f0d]/95 backdrop-blur-xl"
          : "border-b border-transparent bg-[#100f0d]/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src={logoSrc} alt="InnovAgents" className="h-7 w-auto group-hover:opacity-85 transition-opacity" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <div
            className="relative"
            ref={solutionsRef}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-white/55 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-150"
              aria-haspopup="menu"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              Solutions
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              role="menu"
              className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                solutionsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-[#161411]/98 backdrop-blur-xl border border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.45)] rounded-2xl p-2 w-68 flex flex-col gap-0.5">
                <Link
                  href="/products/splash-announcements"
                  role="menuitem"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-[10px] font-bold">SA</span>
                  </div>
                  <div>
                    <div className="font-display font-medium text-sm text-white/85 group-hover:text-white transition-colors">Splash Announcements</div>
                    <div className="text-[11px] text-white/35 mt-0.5">Targeted org-wide messaging</div>
                  </div>
                </Link>
                <Link
                  href="/products/enhanced-files"
                  role="menuitem"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-[10px] font-bold">EF</span>
                  </div>
                  <div>
                    <div className="font-display font-medium text-sm text-white/85 group-hover:text-white transition-colors">Enhanced Files</div>
                    <div className="text-[11px] text-white/35 mt-0.5">Advanced file management</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about" className="px-3.5 py-2 text-sm font-medium text-white/55 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-150">
            About Us
          </Link>
          <Link href="/contact" className="px-3.5 py-2 text-sm font-medium text-white/55 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-150">
            Contact Us
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
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
          className="md:hidden absolute top-full left-0 w-full bg-[#161411]/98 backdrop-blur-xl border-b border-white/[0.07] p-5 flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        >
          <div className="space-y-0.5">
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest px-3 pb-2">Solutions</div>
            <Link href="/products/splash-announcements" className="block px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors">
              Splash Announcements
            </Link>
            <Link href="/products/enhanced-files" className="block px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors">
              Enhanced Files
            </Link>
          </div>
          <div className="h-px bg-white/[0.07] w-full" />
          <Link href="/about" className="block px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="block px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors">
            Contact Us
          </Link>
          <Link href="/contact" className="mt-1 w-full text-center px-5 py-2.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
