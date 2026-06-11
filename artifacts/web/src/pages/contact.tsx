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

      {/* ── HERO — dark ── */}
      <section className="relative py-28 lg:py-36 overflow-hidden bg-[#0f0e0b]">
        <div className="absolute -top-24 right-0 w-[500px] h-[380px] rounded-full bg-accent/[0.09] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[380px] rounded-full bg-primary/[0.08] blur-[110px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.10] rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-5xl md:text-7xl text-white mb-6 leading-[0.92]"
          >
            Let's talk<br />
            <span
              style={{
                background: "linear-gradient(135deg, #5555e6 0%, #8877f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Salesforce
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/45 max-w-xl mx-auto"
          >
            Have a question about our apps? Need help solving a workflow bottleneck? We're here to help you build a smarter Salesforce.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#faf8f4] to-transparent pointer-events-none" />
      </section>

      {/* ── FORM + INFO — warm cream ── */}
      <section className="py-20 bg-[#faf8f4] border-b border-black/[0.07]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">

            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-7"
            >
              <div>
                <h2 className="text-3xl font-display font-medium text-[#1a1814] mb-2">Get in touch</h2>
                <div className="w-10 h-px bg-black/[0.12] mb-6" />
                <p className="text-[#6b6460] leading-relaxed">
                  We're a team of Salesforce veterans who have lived the same problems you're facing. Whether you need support, want to request a feature, or just want to chat about the ecosystem, drop us a line. A real person will get back to you.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-white border border-black/[0.07] rounded-2xl p-5 shadow-sm hover:border-black/[0.13] transition-colors group">
                  <div className="w-10 h-10 bg-primary/[0.08] border border-primary/[0.14] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/14 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1a1814] mb-1">Email</h3>
                    <p className="text-[#6b6460] text-sm">hello@innovagents.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white border border-black/[0.07] rounded-2xl p-5 shadow-sm hover:border-black/[0.13] transition-colors group">
                  <div className="w-10 h-10 bg-accent/[0.10] border border-accent/[0.18] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/16 transition-colors">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1a1814] mb-1">Headquarters</h3>
                    <p className="text-[#6b6460] text-sm leading-relaxed">
                      San Francisco, CA<br />Built for the global Salesforce community
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white border border-black/[0.08] rounded-3xl p-8 md:p-10 shadow-sm"
            >
              {success ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 bg-primary/[0.09] border border-primary/[0.18] rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-medium text-[#1a1814] mb-3">Message sent!</h3>
                  <p className="text-[#6b6460] mb-8 text-sm leading-relaxed">
                    Thanks for reaching out. A member of our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 text-sm font-medium bg-primary/[0.08] hover:bg-primary/14 text-primary border border-primary/[0.18] rounded-full transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} className="h-11 bg-[#faf8f4] border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl" />
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
                            <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jane@company.com" {...field} className="h-11 bg-[#faf8f4] border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl" />
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
                          <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" {...field} className="h-11 bg-[#faf8f4] border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl" />
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
                          <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us more about your Salesforce org..." className="min-h-[130px] bg-[#faf8f4] border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors resize-none rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors rounded-full shadow-sm">
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
