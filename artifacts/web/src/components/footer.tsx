import { Link } from "wouter";
import logoSrc from "@assets/InnovAgents-Main-Lockup-white_1781206479352.png";

export function Footer() {
  return (
    <footer className="bg-[#090807] text-white border-t border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1 space-y-5">
          <Link href="/" className="inline-block">
            <img src={logoSrc} alt="InnovAgents" className="h-8 w-auto" />
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
            Powerful Salesforce-native apps built by veterans. Streamline your workflows without the heavy setup.
          </p>
        </div>

        <div>
          <h4 className="font-display font-medium text-[11px] text-white/30 uppercase tracking-widest mb-5">Products</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/products/splash-announcements" className="text-white/50 hover:text-white transition-colors text-sm">
                Splash Announcements
              </Link>
            </li>
            <li>
              <Link href="/products/enhanced-files" className="text-white/50 hover:text-white transition-colors text-sm">
                Enhanced Files
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-medium text-[11px] text-white/30 uppercase tracking-widest mb-5">Company</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-white/50 hover:text-white transition-colors text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white/50 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-medium text-[11px] text-white/30 uppercase tracking-widest mb-5">Legal</h4>
          <ul className="space-y-3">
            <li>
              <span className="text-white/30 text-sm">Privacy Policy</span>
            </li>
            <li>
              <span className="text-white/30 text-sm">Terms of Service</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-5 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} InnovAgents. All rights reserved.
        </p>
        <p className="text-white/20 text-xs">
          Built natively for Salesforce · Available on AppExchange
        </p>
      </div>
    </footer>
  );
}
