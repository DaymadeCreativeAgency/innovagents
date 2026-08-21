import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Mail, MapPin, Send, CalendarDays } from "lucide-react";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";
import {
  SALESFORCE_CAPTCHA_SETTINGS,
  SALESFORCE_ORG_ID,
  SALESFORCE_PRODUCT_INTEREST_FIELD,
  SALESFORCE_RECAPTCHA_SITE_KEY,
  SALESFORCE_RETURN_URL,
  SALESFORCE_WEB_TO_LEAD_URL,
  salesforceDescription,
  salesforceProductValue,
} from "@/lib/contact";
import { PRODUCT_INTEREST_OPTIONS } from "@/lib/products";
import { track } from "@/lib/track";
import { CalendlyEmbed, DemoButton } from "@/components/calendly";
import { SalesforceRecaptcha } from "@/components/salesforce-recaptcha";
import { Link } from "wouter";

const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(40, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(80, "Last name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(80, "Email is too long"),
  company: z
    .string()
    .min(1, "Company is required")
    .max(40, "Company name is too long"),
  productInterest: z.string().min(1, "Please choose a product interest"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(255, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(30000, "Message is too long"),
});

export default function Contact() {
  usePageMeta("/contact");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [debugEmail, setDebugEmail] = useState<string | null>(null);
  const captchaSettingsRef = useRef<HTMLInputElement>(null);
  const productInterestRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      productInterest: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // ?sfdebug=you@example.com makes Salesforce return its Web-to-Lead debug
    // page (and email the same report) instead of silently dropping the lead.
    const debugParam = params.get("sfdebug");
    if (debugParam && debugParam.includes("@")) setDebugEmail(debugParam);
    if (params.get("submitted") === "true") {
      setSuccess(true);
      window.history.replaceState({}, "", "/contact");
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const response = document.getElementById(
        "g-recaptcha-response",
      ) as HTMLTextAreaElement | null;
      if (response?.value.trim() || !captchaSettingsRef.current) return;

      const settings = JSON.parse(captchaSettingsRef.current.value) as Record<
        string,
        string
      >;
      settings.ts = JSON.stringify(Date.now());
      captchaSettingsRef.current.value = JSON.stringify(settings);
    }, 500);

    return () => window.clearInterval(timer);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nativeForm = event.currentTarget;
    setError(null);
    const valid = await form.trigger(undefined, { shouldFocus: true });
    if (!valid) return;

    if (!captchaToken) {
      setError("Please complete the reCAPTCHA before sending your message.");
      return;
    }

    const values = form.getValues();
    if (productInterestRef.current) {
      productInterestRef.current.value = salesforceProductValue(
        values.productInterest,
      );
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = salesforceDescription(
        values.subject,
        values.message,
      );
    }

    setSubmitting(true);
    track("get_started_contact_submit", {
      productInterest: values.productInterest,
    });
    nativeForm.submit();
  }

  return (
    <LayoutV2>
      {/* ── HERO — sky gradient ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa] pt-32 sm:pt-40 pb-12 sm:pb-16">
        <Cloud className="top-24 left-[5%] opacity-80 hidden sm:block" />
        <Cloud className="top-36 right-[8%] opacity-60 scale-75 hidden sm:block" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="ia-rise text-[clamp(44px,7vw,80px)] leading-[0.95] tracking-[-0.5px] text-[#1a1814] mb-6">
            Let's talk
            <br />
            <span className="text-primary">Salesforce</span>
          </h1>
          <p className="ia-rise ia-delay-1 text-base md:text-lg text-[#5d574f] max-w-xl mx-auto">
            Have a question about our apps? Need help solving a workflow
            bottleneck? We're here to help you build a smarter Salesforce.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto items-start">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-7"
            >
              <div>
                <h2 className="text-3xl font-display font-medium text-[#1a1814] mb-4">
                  Get in touch
                </h2>
                <p className="text-[#6b6460] leading-relaxed">
                  We're a team of Salesforce veterans who have lived the same
                  problems you're facing. Whether you need support, want to
                  request a feature, or just want to chat about the ecosystem,
                  drop us a line. A real person will get back to you.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-[#faf8f4] border border-black/[0.07] rounded-2xl p-5 hover:border-black/[0.13] transition-colors">
                  <div className="w-10 h-10 bg-white border border-black/[0.07] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1a1814] mb-1">
                      Email
                    </h3>
                    <p className="text-[#6b6460] text-sm">
                      support@innovagentsai.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#faf8f4] border border-black/[0.07] rounded-2xl p-5 hover:border-black/[0.13] transition-colors">
                  <div className="w-10 h-10 bg-white border border-black/[0.07] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#1a1814] mb-1">
                      Headquarters
                    </h3>
                    <p className="text-[#6b6460] text-sm leading-relaxed">
                      Morgantown, WV
                      <br />
                      Built for the global Salesforce community
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
              className="bg-[#faf8f4] border border-black/[0.07] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 md:p-10"
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
                  <h3 className="text-2xl font-display font-medium text-[#1a1814] mb-3">
                    Message sent!
                  </h3>
                  <p className="text-[#6b6460] mb-8 text-sm leading-relaxed">
                    Thanks for reaching out. A member of our team will get back
                    to you shortly.
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
                  <form
                    action={SALESFORCE_WEB_TO_LEAD_URL}
                    method="POST"
                    acceptCharset="UTF-8"
                    onSubmit={onSubmit}
                    className="space-y-5"
                  >
                    <input
                      ref={captchaSettingsRef}
                      type="hidden"
                      name="captcha_settings"
                      defaultValue={SALESFORCE_CAPTCHA_SETTINGS}
                    />
                    <input type="hidden" name="oid" value={SALESFORCE_ORG_ID} />
                    {debugEmail && (
                      <>
                        <input type="hidden" name="debug" value="1" />
                        <input
                          type="hidden"
                          name="debugEmail"
                          value={debugEmail}
                        />
                      </>
                    )}
                    <input
                      type="hidden"
                      name="retURL"
                      value={SALESFORCE_RETURN_URL}
                    />
                    <input
                      type="hidden"
                      name="lead_source"
                      value="Contact us"
                    />
                    <input
                      ref={productInterestRef}
                      type="hidden"
                      name={SALESFORCE_PRODUCT_INTEREST_FIELD}
                    />
                    <textarea
                      ref={descriptionRef}
                      name="description"
                      hidden
                      readOnly
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                name="first_name"
                                autoComplete="given-name"
                                placeholder="Jane"
                                className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                name="last_name"
                                autoComplete="family-name"
                                placeholder="Doe"
                                className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="jane@company.com"
                                className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                              Company
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                name="company"
                                autoComplete="organization"
                                placeholder="Acme Inc."
                                className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="productInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                            Product Interest
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11 bg-white border-black/[0.10] text-[#1a1814] focus:border-primary/40 transition-colors rounded-xl data-[placeholder]:text-[#9a9490]">
                                <SelectValue placeholder="Select a product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PRODUCT_INTEREST_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="How can we help?"
                              {...field}
                              className="h-11 bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors rounded-xl"
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
                          <FormLabel className="text-[#6b6460] text-[11px] uppercase tracking-widest font-semibold">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your Salesforce org..."
                              className="min-h-[130px] bg-white border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] focus:border-primary/40 transition-colors resize-none rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center sm:justify-start">
                      <SalesforceRecaptcha
                        siteKey={SALESFORCE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => {
                          setCaptchaToken(token);
                          if (token) setError(null);
                        }}
                        onError={() => {
                          setCaptchaToken("");
                          setError(
                            "reCAPTCHA could not be loaded. Please refresh the page or email support@innovagentsai.com.",
                          );
                        }}
                      />
                    </div>
                    {error && (
                      <p
                        role="alert"
                        className="text-[13px] text-[#d65a41] px-1"
                      >
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-11 text-sm font-semibold bg-[#1a1814] hover:bg-[#33302a] text-white transition-colors rounded-full shadow-sm disabled:opacity-70"
                    >
                      <Send className="w-4 h-4 mr-2" />{" "}
                      {submitting ? "Sending…" : "Send Message"}
                    </Button>
                    <p className="text-[12px] text-[#9a9490] text-center leading-relaxed">
                      By submitting, you agree to our{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE A DEMO — Calendly ── */}
      <section className="py-16 sm:py-20 bg-[#f5f1ea]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel>Book a Demo</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1a1814] mb-4">
              Want help finding the right Salesforce app?
            </h2>
            <p className="text-[#6b6460] leading-relaxed mb-7">
              Schedule a quick demo with our team. We'll walk through your
              workflow, answer questions, and help you decide whether a free
              trial or direct install is the best next step.
            </p>
            <div className="flex justify-center">
              <DemoButton event="get_started_demo_click" />
            </div>
          </div>

          <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-black/[0.07] p-2 sm:p-3 shadow-sm">
            <div className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-[#6b6460]">
              <CalendarDays className="w-4 h-4 text-primary" /> Pick a time that
              works for you
            </div>
            <CalendlyEmbed bookedEvent="get_started_demo_booked" />
          </div>
        </div>
      </section>
    </LayoutV2>
  );
}
