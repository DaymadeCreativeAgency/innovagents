import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
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

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
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
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
