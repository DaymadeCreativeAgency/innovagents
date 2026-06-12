import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SplashAnnouncements from "@/pages/products/splash-announcements";
import EnhancedFiles from "@/pages/products/enhanced-files";
import ListViewExport from "@/pages/products/list-view-export";
import EdgeConnect from "@/pages/products/edge-connect";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/products/splash-announcements" component={SplashAnnouncements} />
      <Route path="/products/enhanced-files" component={EnhancedFiles} />
      <Route path="/products/list-view-export" component={ListViewExport} />
      <Route path="/products/edge-connect" component={EdgeConnect} />
      <Route component={NotFound} />
    </Switch>
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
