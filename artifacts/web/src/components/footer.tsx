import { Link } from "wouter";
import logoSrc from "@assets/InnovAgents-Main-Lockup-white_1781206479352.png";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <img src={logoSrc} alt="InnovAgents" className="h-10 w-auto" />
          </Link>
          <p className="text-secondary-foreground/70 text-sm max-w-sm">
            Powerful Salesforce-native apps built by veterans. Streamline your workflows without the heavy setup.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-medium text-xl mb-4 text-white">Products</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/products/splash-announcements" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Splash Announcements
              </Link>
            </li>
            <li>
              <Link href="/products/enhanced-files" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Enhanced Files
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display font-medium text-xl mb-4 text-white">Company</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display font-medium text-xl mb-4 text-white">Legal</h4>
          <ul className="space-y-3">
            <li>
              <span className="text-secondary-foreground/80 text-sm">
                Privacy Policy
              </span>
            </li>
            <li>
              <span className="text-secondary-foreground/80 text-sm">
                Terms of Service
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between">
        <p className="text-secondary-foreground/60 text-sm">
          © {new Date().getFullYear()} InnovAgents. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
