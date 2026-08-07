import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import SplashAnnouncements from "@/pages/products/splash-announcements";
import EnhancedFiles from "@/pages/products/enhanced-files";
import ListViewExport from "@/pages/products/list-view-export";
import EdgeConnect from "@/pages/products/edge-connect";
import UnlimitedFieldTracking from "@/pages/products/unlimited-field-tracking";
import BlogIndex from "@/pages/blog";
import BlogPost from "@/pages/blog/post";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  const first = useRef(true);
  useEffect(() => {
    // Skip the initial mount so a deep link (or a restored scroll position on
    // a prerendered page) isn't yanked back to the top during hydration.
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/products/splash-announcements" component={SplashAnnouncements} />
        <Route path="/products/enhanced-files" component={EnhancedFiles} />
        <Route path="/products/list-view-export" component={ListViewExport} />
        <Route path="/products/edge-connect" component={EdgeConnect} />
        <Route path="/products/unlimited-field-tracking" component={UnlimitedFieldTracking} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

/**
 * `ssrPath` is set only by the build-time prerenderer (`scripts/prerender.mjs`)
 * so wouter resolves the right route without a browser location. In the
 * browser it stays undefined and wouter reads `window.location` as usual.
 */
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
