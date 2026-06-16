import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PAGE_DESCRIPTIONS } from "@/lib/seo";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  usePageMeta({
    title: "Contact Us",
    description: PAGE_DESCRIPTIONS.contact,
    path: "/contact",
  });

  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit() {
    setSuccess(true);
    form.reset();
  }

  return (
    <LayoutV2>
      {/* ── HERO — sky gradient ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa] pt-40 pb-16">
        <Cloud className="top-24 left-[5%] opacity-80" />
        <Cloud className="top-36 right-[8%] opacity-60 scale-75" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <SectionLabel>Get in Touch</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.65 }}
            className="text-[clamp(44px,7vw,80px)] leading-[0.95] tracking-[-0.5px] text-[#1a1814] mb-6"
          >
            Let's talk<br /><span className="text-primary">Salesforce</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#5d574f] max-w-xl mx-auto"
          >
            Have a question about our apps? Need help solving a workflow bottleneck? We're here to help you build a smarter Salesforce.
          </motion.p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-16 bg-white">
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
                <h2 className="text-3xl font-display font-medium text-[#1a1814] mb-4">Get in touch</h2>
                <p className="text-[#6b6460] leading-relaxed">
                  We're a team of Salesforce veterans who have lived the same problems you're facing. Whether you need support, want to request a feature, or just want to chat about the ecosystem, drop us a line. A real person will get back to you.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-[#faf8f4] border border-black/[0.07] rounded-2xl p-5 hover:border-black/[0.13] transition-colors">
                  <div className="w-10 h-10 bg-white border border-black/[0.07] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1a1814] mb-1">Email</h3>
                    <p className="text-[#6b6460] text-sm">support@innovagentsai.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#faf8f4] border border-black/[0.07] rounded-2xl p-5 hover:border-black/[0.13] transition-colors">
                  <div className="w-10 h-10 bg-white border border-black/[0.07] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1a1814] mb-1">Headquarters</h3>
                    <p className="text-[#6b6460] text-sm leading-relaxed">
                      Morgantown, WV<br />Built for the global Salesforce community
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
              className="bg-[#faf8f4] border border-black/[0.07] rounded-[28px] p-8 md:p-10"
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
                    className="px-6 py-2 text-sm font-semibold border border-black/[0.12] text-[#1a1814] rounded-full hover:bg-black/[0.04] transition-colors"
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
                              <Input placeholder="Jane Doe" {...field} className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl" />
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
                              <Input placeholder="jane@company.com" {...field} className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl" />
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
                            <Input placeholder="How can we help?" {...field} className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl" />
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
                            <Textarea placeholder="Tell us more about your Salesforce org..." className="min-h-[130px] bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors resize-none rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11 text-sm font-semibold bg-[#1a1814] hover:bg-[#33302a] text-white transition-colors rounded-full shadow-sm">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </LayoutV2>
  );
}
