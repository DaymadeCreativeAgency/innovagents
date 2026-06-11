import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Zap, Target, ShieldCheck, Rocket, Code, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  useEffect(() => {
    document.title = "About Us | InnovAgents";
  }, []);

  return (
    <Layout>
      <section className="py-24 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-none"
            >
              WE'VE LIVED THE <span className="text-accent block mt-2">PROBLEMS</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-secondary-foreground/80 leading-relaxed"
            >
              At InnovAgents, we turn real-world consulting experience into powerful, Salesforce-native apps that fill critical gaps without the heavy setup.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-medium text-primary mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We didn't start by building apps in a vacuum. We started as Salesforce consultants, administrators, and architects. For years, we helped companies of all sizes navigate the complexities of the Salesforce ecosystem.
              </p>
              <br/>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Time and time again, we saw the same gaps. The same frustrations. Teams spending weeks building custom workarounds for things that should have been simple. That's why we created InnovAgents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-medium text-primary mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To build smarter tools for more innovative Salesforce experiences. We believe that powerful software shouldn't require a massive learning curve, an army of developers, or an enterprise-sized budget. Our apps are designed to be installed in minutes and deliver value immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">What Makes Us Different</h2>
            <div className="w-20 h-2 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Seamless Salesforce Integration", desc: "Apps that feel like they've been part of Salesforce all along.", icon: Zap },
              { title: "Affordable and Powerful", desc: "Premium quality apps without the enterprise price tag.", icon: Target },
              { title: "Created by Salesforce Veterans", desc: "We've lived the problems, and we're building the solutions.", icon: ShieldCheck },
              { title: "Fast Setup, Real Results", desc: "Start seeing value right away — no developers required.", icon: Rocket },
            ].map((prop, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm flex items-start gap-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <prop.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-medium text-secondary mb-2">{prop.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{prop.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-secondary mb-6">Ready to see what we've built?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Explore our suite of Salesforce-native solutions and see how we can help your team move faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/">Explore All Apps</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
