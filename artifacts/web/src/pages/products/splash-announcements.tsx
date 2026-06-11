import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Eye, Code, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function SplashAnnouncements() {
  useEffect(() => {
    document.title = "Splash Announcements | InnovAgents";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-32 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground font-medium text-sm mb-6 border border-primary/30"
            >
              Salesforce-Native App
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-none text-white"
            >
              SPLASH ANNOUNCEMENTS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-secondary-foreground/80 leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              Send dynamic, targeted announcements across your Salesforce Org with scheduling, audience targeting, and acknowledgment tracking — no coding needed.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" asChild className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white font-bold">
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
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">Powerful Messaging, Zero Code</h2>
            <div className="w-20 h-2 bg-primary mx-auto" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get critical information to the right users at the right time without relying on endless emails or complex custom development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Audience Targeting",
                desc: "Target announcements by Profile, Role, or Public Group. Ensure users only see what's relevant to them."
              },
              {
                icon: Calendar,
                title: "Advanced Scheduling",
                desc: "Set start and end dates for your messages. Plan your communications in advance and let the app handle the rest."
              },
              {
                icon: Eye,
                title: "Acknowledgment Tracking",
                desc: "Require users to acknowledge important messages. Track exactly who has seen and accepted your announcements."
              },
              {
                icon: Zap,
                title: "Dynamic Content",
                desc: "Build rich announcements using standard rich text editors. Include links, formatting, and images easily."
              },
              {
                icon: Code,
                title: "No Coding Required",
                desc: "Fully configurable by Admins. Drop the component onto any Lightning page and start communicating immediately."
              },
              {
                icon: CheckCircle2,
                title: "100% Salesforce Native",
                desc: "Your data never leaves Salesforce. Built on native platform architecture for maximum security and performance."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
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
            <div className="order-2 lg:order-1 space-y-6">
              <h2 className="text-3xl md:text-4xl text-secondary mb-4">Cut through the noise.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Email announcements get lost. Chatter posts get buried. When you have a critical system update, a new process rollout, or an urgent company alert, you need to know your team will see it.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Splash Announcements puts your message front and center in the Salesforce UI. By requiring acknowledgment, you close the loop on compliance and training requirements without the hassle.
              </p>
              <ul className="space-y-4 mt-6">
                {[
                  "Eliminate ignored emails",
                  "Improve adoption of new processes",
                  "Ensure compliance with required reading",
                  "Keep remote teams aligned"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 lg:order-2 bg-card border border-border rounded-3xl p-8 shadow-lg">
              {/* Abstract representation of the UI instead of a real screenshot */}
              <div className="bg-background rounded-xl border border-border p-6 shadow-inner">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded-md w-1/3" />
                  <div className="h-4 bg-muted rounded-md w-full" />
                  <div className="h-4 bg-muted rounded-md w-5/6" />
                  <div className="h-4 bg-muted rounded-md w-4/6" />
                  <div className="pt-4 flex justify-end">
                    <div className="h-10 bg-primary/20 rounded-md w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to improve your org's communication?</h2>
          <p className="text-xl mb-10 text-primary-foreground/90">
            Install Splash Announcements today and start sending smarter, targeted messages in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 font-bold text-secondary">
              <a href="#" target="_blank" rel="noopener noreferrer">View on AppExchange</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
