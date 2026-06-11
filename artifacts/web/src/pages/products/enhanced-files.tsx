import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FolderOpen, Download, Search, LayoutGrid, Zap, Lock, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function EnhancedFiles() {
  useEffect(() => {
    document.title = "Enhanced Files | InnovAgents";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-32 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6 border border-accent/30"
            >
              Salesforce-Native App
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-none text-white"
            >
              ENHANCED FILES
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-secondary-foreground/80 leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              Take control of your file management with fast browsing, bulk downloads, and intuitive file organization built right into your Salesforce records.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" asChild className="text-lg px-8 py-6 bg-accent text-secondary hover:bg-accent/90 font-bold">
                <a href="#" target="_blank" rel="noopener noreferrer">View on AppExchange</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">Fix Salesforce File Frustrations</h2>
            <div className="w-20 h-2 bg-accent mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop clicking endlessly just to find one document. Enhanced Files upgrades the native Salesforce file experience with tools that actually make sense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: LayoutGrid,
                title: "Intuitive Organization",
                desc: "Browse files with a clean, folder-like structure directly on the record page. No more endless scrolling through related lists."
              },
              {
                icon: Download,
                title: "Bulk Operations",
                desc: "Select multiple files and download them all at once as a single ZIP file. Save your users hours of tedious clicking."
              },
              {
                icon: Search,
                title: "Instant Search",
                desc: "Find what you need instantly with fast, record-specific file searching. Filter by name, type, and date."
              },
              {
                icon: FolderOpen,
                title: "Smart Previews",
                desc: "Preview documents, images, and PDFs quickly without having to download them or navigate away from the record."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized for speed. Built specifically for Lightning Experience to ensure zero lag even on records with hundreds of files."
              },
              {
                icon: Lock,
                title: "Secure & Native",
                desc: "Respects all native Salesforce file permissions and sharing rules out of the box. No external servers or API limits."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-medium text-secondary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / How it works */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              {/* Abstract representation of the UI */}
              <div className="bg-background rounded-xl border border-border shadow-inner overflow-hidden">
                <div className="bg-muted p-4 border-b border-border flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-16 h-8 bg-background rounded border border-border" />
                    <div className="w-24 h-8 bg-background rounded border border-border" />
                  </div>
                  <div className="w-32 h-8 bg-background rounded border border-border flex items-center px-2 gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <div className="w-16 h-2 bg-muted rounded" />
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted border border-transparent hover:border-border transition-colors">
                      <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted-foreground/20 rounded w-1/3 mb-2" />
                        <div className="h-3 bg-muted-foreground/10 rounded w-1/4" />
                      </div>
                      <div className="w-8 h-8 rounded bg-background border border-border" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl text-secondary mb-4">Stop wasting time on file management.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If your team relies heavily on documents—contracts, specs, invoices, images—the standard Salesforce file component quickly becomes a bottleneck. It's hard to search, impossible to bulk download, and lacks intuitive organization.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Enhanced Files replaces that frustration with a modern, consumer-grade file browsing experience right on the Lightning record page. Your team can finally treat Salesforce files like a real file system.
              </p>
              <ul className="space-y-4 mt-6">
                {[
                  "Download a complete record's files in one click",
                  "Find the exact document you need in seconds",
                  "Preview files without endless tab switching",
                  "Keep your org's data secure and native"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-secondary text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to upgrade your file experience?</h2>
          <p className="text-xl mb-10 text-secondary/80">
            Install Enhanced Files today and give your team the file management tools they deserve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default" asChild className="text-lg px-8 py-6 font-bold bg-secondary text-white hover:bg-secondary/90">
              <a href="#" target="_blank" rel="noopener noreferrer">View on AppExchange</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent text-secondary border-secondary hover:bg-secondary hover:text-accent">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
