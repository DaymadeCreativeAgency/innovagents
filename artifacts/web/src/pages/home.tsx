import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Target, ShieldCheck, Rocket, CheckCircle2, MessageSquare, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

export default function Home() {
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  useEffect(() => {
    document.title = "InnovAgents | Smarter Salesforce Starts Here";
  }, []);

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof newsletterSchema>) {
    setNewsletterSuccess(true);
    form.reset();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl transform translate-x-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl text-secondary mb-6 leading-[0.9]"
            >
              SMARTER SALESFORCE <span className="text-primary block mt-2">STARTS HERE</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Powerful Salesforce-native apps that fill critical gaps, streamline workflows, and help your team move faster — without the heavy setup or high price.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" asChild className="text-lg px-8 py-6 w-full sm:w-auto">
                <Link href="#featured-products">Explore Our Apps</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 w-full sm:w-auto bg-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl text-secondary">
                Build a Smarter Salesforce with InnovAgents
              </h2>
              <div className="w-20 h-2 bg-accent" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                At InnovAgents, we turn real-world experience into real-world solutions. Our Salesforce-native apps are designed for busy administrators, IT leaders, and operations teams who need simple, powerful tools, not expensive consulting projects or bloated software.
              </p>
              <p className="text-lg font-medium text-foreground">
                Built by Salesforce experts. Designed for everyday users. Ready to install in minutes.
              </p>
              <Button asChild className="mt-4">
                <Link href="#featured-products">Explore Our Apps</Link>
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <prop.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-display font-medium text-secondary mb-2">{prop.title}</h3>
                  <p className="text-sm text-muted-foreground">{prop.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-secondary text-secondary-foreground text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl mb-8">Salesforce Gaps Slowing You Down? We've Got You Covered.</h2>
          <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed mb-6">
            Salesforce is a powerful platform, but it doesn't always cover everything out of the box. When you're stuck building workarounds, managing costly customizations, or settling for less, your team loses valuable time.
          </p>
          <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed">
            Our apps are designed to address common Salesforce frustrations — quickly, efficiently, and without unnecessary overhead. No heavy implementation. No learning curve. Just smarter tools for more innovative Salesforce experiences.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">Our Featured Salesforce AppExchange Solutions</h2>
            <div className="w-20 h-2 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Splash Announcements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-3xl overflow-hidden border border-border shadow-lg flex flex-col"
            >
              <div className="h-48 bg-primary/10 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-primary)_0,transparent_100%)]" />
                <h3 className="text-4xl font-display font-black text-primary relative z-10 text-center">SPLASH ANNOUNCEMENTS</h3>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-muted-foreground mb-8 flex-1">
                  Send dynamic, targeted announcements across your Salesforce Org with scheduling, audience targeting, and acknowledgment tracking — no coding needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button asChild className="flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">View on AppExchange</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/products/splash-announcements">Learn more</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Files */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-3xl overflow-hidden border border-border shadow-lg flex flex-col"
            >
              <div className="h-48 bg-accent/10 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-accent)_0,transparent_100%)]" />
                <h3 className="text-4xl font-display font-black text-accent relative z-10 text-center">ENHANCED FILES</h3>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-muted-foreground mb-8 flex-1">
                  Take control of your file management with fast browsing, bulk downloads, and intuitive file organization built right into your Salesforce records.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button asChild className="flex-1">
                    <a href="#" target="_blank" rel="noopener noreferrer">View on AppExchange</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/products/enhanced-files">Learn more</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Salesforce Teams Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">Why Salesforce Teams Choose InnovAgents</h2>
            <div className="w-20 h-2 bg-accent mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Real World Solutions", desc: "Every app is born from real consulting experience and built to solve real customer needs." },
              { title: "Instant Impact", desc: "Quick installs mean you start working smarter within minutes, not weeks." },
              { title: "User-Friendly Design", desc: "Clean, intuitive interfaces your admins and teams will love using." },
              { title: "Continuous Innovation", desc: "We continually build, improve, and respond to your needs with every update." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-medium text-secondary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-muted border-t border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-card p-10 md:p-14 rounded-3xl shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-3xl md:text-4xl text-secondary mb-4 relative z-10">Be the First to Know</h2>
            <p className="text-muted-foreground mb-8 relative z-10">
              Get updates when new apps go live, beta tests open, and fresh features drop. If you're part of the Salesforce ecosystem, this is how you stay ahead — no noise, just the good stuff.
            </p>
            
            {newsletterSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 text-primary p-4 rounded-lg flex items-center justify-center gap-3 relative z-10"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Thanks for subscribing! We'll be in touch.</span>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="First Name" {...field} className="h-12 bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Email Address" {...field} className="h-12 bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="h-12 px-8">Subscribe</Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black mb-6">READY TO MAKE SALESFORCE WORK SMARTER FOR YOU?</h2>
          <p className="text-xl mb-10 text-primary-foreground/90">
            Whether you're managing a growing Salesforce org or trying to solve specific workflow bottlenecks, InnovAgents delivers simple, powerful, and affordable tools — ready when you are.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 font-bold text-secondary">
              <Link href="#featured-products">Explore All Apps</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
