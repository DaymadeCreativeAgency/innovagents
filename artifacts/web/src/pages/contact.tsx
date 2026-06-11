import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | InnovAgents";
  }, []);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit() {
    setSuccess(true);
    form.reset();
  }

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#09090f]">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <motion.div
          className="absolute -top-20 right-0 w-[600px] h-[400px] rounded-full bg-accent/[0.15] blur-[120px] pointer-events-none"
          animate={{ x: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-primary/[0.12] blur-[110px] pointer-events-none"
          animate={{ x: [0, 25, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.14] rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-white/55 text-xs font-medium uppercase tracking-widest">Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-5xl md:text-7xl text-white mb-6 leading-[0.9]"
          >
            LET'S TALK
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(135deg, #5555e6 0%, #fe907f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SALESFORCE
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/45"
          >
            Have a question about our apps? Need help solving a workflow bottleneck? We're here to help you build a smarter Salesforce.
          </motion.p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-24 bg-[#0c0c14]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-medium text-white mb-3">Get in Touch</h2>
                <div className="w-14 h-px bg-gradient-to-r from-primary to-accent mb-6" />
                <p className="text-white/45 leading-relaxed">
                  We're a team of Salesforce veterans who have lived the same problems you're facing. Whether you need support, want to request a feature, or just want to chat about the ecosystem, drop us a line. We promise a real person will get back to you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:border-primary/30 transition-colors group">
                  <div className="w-11 h-11 bg-primary/[0.15] border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">Email</h3>
                    <p className="text-white/45 text-sm">hello@innovagents.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:border-accent/30 transition-colors group">
                  <div className="w-11 h-11 bg-accent/[0.15] border border-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/25 transition-colors">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">Headquarters</h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      San Francisco, CA<br />Built for the global Salesforce community
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/[0.04] border border-white/[0.09] rounded-3xl p-8 md:p-10"
            >
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-20 h-20 bg-primary/[0.15] border border-primary/25 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-medium text-white mb-3">Message Sent!</h3>
                  <p className="text-white/40 mb-8 text-sm leading-relaxed">
                    Thanks for reaching out. A member of our team will get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    className="bg-primary/[0.18] hover:bg-primary/30 text-primary border border-primary/25 transition-colors"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-xs uppercase tracking-widest font-semibold">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jane Doe"
                                {...field}
                                className="h-12 bg-white/[0.06] border-white/[0.12] text-white placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.09] transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/60 text-xs uppercase tracking-widest font-semibold">Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="jane@company.com"
                                {...field}
                                className="h-12 bg-white/[0.06] border-white/[0.12] text-white placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.09] transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-xs uppercase tracking-widest font-semibold">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="How can we help?"
                              {...field}
                              className="h-12 bg-white/[0.06] border-white/[0.12] text-white placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.09] transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/60 text-xs uppercase tracking-widest font-semibold">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your Salesforce org..."
                              className="min-h-[140px] bg-white/[0.06] border-white/[0.12] text-white placeholder:text-white/25 focus:border-primary/50 focus:bg-white/[0.09] transition-colors resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-13 text-base bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(85,85,230,0.4)] hover:shadow-[0_0_50px_rgba(85,85,230,0.6)] transition-all duration-300 rounded-xl"
                      style={{ height: "52px" }}
                    >
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </Layout>
  );
}
