import { Link } from "wouter";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";

const LAST_UPDATED = "August 20, 2026";

export default function PrivacyPolicy() {
  usePageMeta("/privacy-policy");

  return (
    <LayoutV2>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa] pt-32 sm:pt-40 pb-12 sm:pb-16">
        <Cloud className="top-24 left-[5%] opacity-80 hidden sm:block" />
        <Cloud className="top-36 right-[8%] opacity-60 scale-75 hidden sm:block" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="ia-rise text-[clamp(36px,6vw,56px)] leading-[0.95] tracking-[-0.5px] text-[#1a1814] mb-4">
            Privacy Policy
          </h1>
          <p className="ia-rise ia-delay-1 text-[#5d574f]">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-neutral prose-sm sm:prose-base prose-headings:font-display prose-headings:font-medium prose-headings:text-[#1a1814] prose-p:text-[#5d574f] prose-li:text-[#5d574f] prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <h2>Who we are</h2>
          <p>
            InnovAgents (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            builds Salesforce-native apps available on AppExchange. This policy
            explains how we handle personal information when you visit{" "}
            <a href="https://innovagentsai.com">innovagentsai.com</a>, subscribe
            to our newsletter, or contact us.
          </p>
          <ul>
            <li>
              <strong>Legal entity:</strong> InnovAgents LLC
            </li>
            <li>
              <strong>Address:</strong> 1 Riddle Ct, Morgantown, WV 26505
            </li>
            <li>
              <strong>Privacy contact:</strong>{" "}
              <a href="mailto:support@innovagentsai.com">
                support@innovagentsai.com
              </a>
            </li>
          </ul>

          <h2>What we collect</h2>
          <h3>Information you provide</h3>
          <p>When you contact us or subscribe to updates, we may collect:</p>
          <ul>
            <li>Name and email address</li>
            <li>Subject and message content (contact form)</li>
            <li>Any other details you choose to share</li>
          </ul>
          <h3>Information collected automatically</h3>
          <p>
            When you visit our website, we or our service providers may collect:
          </p>
          <ul>
            <li>IP address, browser type, and device information</li>
            <li>Pages visited and referring URL</li>
            <li>Cookie and analytics data (see below)</li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>Respond to inquiries and support requests</li>
            <li>
              Send newsletter updates (with your consent; unsubscribe anytime)
            </li>
            <li>Improve our website, apps, and marketing</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Legal bases (GDPR / UK GDPR)</h2>
          <p>If you are in the EU, EEA, or UK, we process data based on:</p>
          <ul>
            <li>
              <strong>Consent</strong> — when you subscribe to our newsletter or
              submit a form
            </li>
            <li>
              <strong>Legitimate interests</strong> — responding to B2B
              inquiries and improving our services
            </li>
            <li>
              <strong>Legal obligation</strong> — where required by applicable
              law
            </li>
          </ul>

          <h2>How we share information</h2>
          <p>
            We do not sell your personal data. We may share it with service
            providers who help us operate:
          </p>
          <ul>
            <li>
              <strong>Salesforce</strong> — processes contact form submissions
              and manages customer inquiries
            </li>
            <li>
              <strong>Google reCAPTCHA</strong> — protects contact forms from
              spam and abuse
            </li>
            <li>
              <strong>Mailchimp (Intuit)</strong> — manages newsletter
              subscriptions
            </li>
            <li>
              <strong>Vercel</strong> — hosts our website
            </li>
            <li>Analytics or advertising tools, if enabled</li>
          </ul>
          <p>
            These providers process data on our instructions and under
            appropriate agreements.
          </p>

          <h2>How long we keep data</h2>
          <p>
            We retain personal data only as long as needed for the purposes
            above, or as required by law. If you unsubscribe, we may keep your
            email on a suppression list to honor your request.
          </p>

          <h2>Your rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access, correct, or delete your personal data</li>
            <li>Restrict or object to certain processing</li>
            <li>Request a portable copy of your data</li>
            <li>
              Withdraw consent at any time (for newsletter emails, use the
              unsubscribe link)
            </li>
          </ul>
          <p>
            To exercise these rights, email{" "}
            <a href="mailto:support@innovagentsai.com">
              support@innovagentsai.com
            </a>
            . EU/EEA/UK residents may also lodge a complaint with their local
            data protection authority.
          </p>

          <h2>Cookies</h2>
          <p>
            Our site may use cookies and similar technologies for basic
            functionality, analytics, and marketing measurement. You can control
            cookies through your browser settings.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect
            your data. No method of transmission over the internet is 100%
            secure.
          </p>

          <h2>Children</h2>
          <p>
            Our services are intended for business professionals and are not
            directed to children under 16. We do not knowingly collect data from
            children.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top reflects the most recent revision.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href="mailto:support@innovagentsai.com">
              support@innovagentsai.com
            </a>{" "}
            or visit our <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </LayoutV2>
  );
}
