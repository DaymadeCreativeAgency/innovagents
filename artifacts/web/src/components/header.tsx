import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [location] = useLocation();
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setSolutionsOpen(false);
  }, [location]);

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
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-black text-3xl tracking-wide text-primary">INNOVAGENTS</span>
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
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              role="menu"
              className={`absolute left-0 top-full pt-4 transition-all ${
                solutionsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-card border border-border shadow-lg rounded-xl p-4 w-64 flex flex-col gap-2">
                <Link href="/products/splash-announcements" role="menuitem" className="p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="font-display font-medium text-lg text-primary">Splash Announcements</div>
                  <div className="text-xs text-muted-foreground mt-1">Targeted org-wide messages</div>
                </Link>
                <Link href="/products/enhanced-files" role="menuitem" className="p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="font-display font-medium text-lg text-primary">Enhanced Files</div>
                  <div className="text-xs text-muted-foreground mt-1">Advanced file management</div>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" className="font-bold">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div id="mobile-nav" className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl">
          <div className="space-y-4">
            <div className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Solutions</div>
            <Link href="/products/splash-announcements" className="block text-lg font-medium text-foreground">
              Splash Announcements
            </Link>
            <Link href="/products/enhanced-files" className="block text-lg font-medium text-foreground">
              Enhanced Files
            </Link>
          </div>
          <div className="h-px bg-border w-full" />
          <Link href="/about" className="block text-lg font-medium text-foreground">
            About Us
          </Link>
          <Link href="/contact" className="block text-lg font-medium text-foreground">
            Contact Us
          </Link>
          <Button asChild className="w-full mt-4">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
