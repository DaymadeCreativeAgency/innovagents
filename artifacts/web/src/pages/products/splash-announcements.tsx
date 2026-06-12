import { LogIn, Clock, Target, CheckCircle2, Bell, ShieldCheck } from "lucide-react";
import { ProductPage } from "@/components/product-page";
import { APPX } from "@/components/layout-v2";

import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";
import shotAcknowledge from "@assets/appx-sa-acknowledge.png";
import shotCreate from "@assets/appx-sa-create.png";
import shotSchedule from "@assets/appx-sa-schedule.png";
import shotRelease from "@assets/appx-sa-release.png";

export default function SplashAnnouncements() {
  return (
    <ProductPage
      icon={splashIcon}
      name="Splash Announcements"
      label="In-App Communication That Works"
      headline={<>No more ugly banners or urgent emails</>}
      description="Built to make communication simple and clear — schedule updates, target specific audiences, track acknowledgments, and send real-time alerts. No more guessing who saw what."
      priceChip="$3 / user / month"
      trialNote="Free 7-day trial"
      appxUrl={APPX.splashAnnouncements}
      tint="indigo"
      heroScreenshot={{
        src: shotAcknowledge,
        caption: "Users see and acknowledge announcements right at login",
      }}
      screenshots={[
        { src: shotCreate, caption: "Create a dynamic splash with start/end date, title, and rich-text message" },
        { src: shotSchedule, caption: "Schedule announcements for a date range in the future" },
        { src: shotRelease, caption: "Publish release notes so users see exactly what changed" },
      ]}
      features={[
        { icon: LogIn, title: "Smart Redirect on Login", desc: "New announcements are displayed the moment users log in — front and center, impossible to miss." },
        { icon: Clock, title: "Instant or Scheduled", desc: "Set start and end dates to ensure timely, relevant messaging for releases, rollouts, and maintenance windows." },
        { icon: Target, title: "Target Audiences", desc: "Create and reuse audiences built from queues, public groups, profiles, and permission sets." },
        { icon: CheckCircle2, title: "Acknowledgment Tracking", desc: "Track acknowledgments in real time for reporting and compliance. Know exactly who saw what, and when." },
        { icon: Bell, title: "Announcement Alerts", desc: "Send emergency or urgent messages that demand immediate attention across your org." },
        { icon: ShieldCheck, title: "100% Salesforce Native", desc: "No external services. Respects your org's security model, profiles, and permissions out of the box." },
      ]}
      benefits={[
        "Release day clarity — everyone sees what changed at login",
        "Targeted messages reach the right profiles, teams, and regions",
        "Replace mass emails with visible, auditable communication",
        "Real-time acknowledgment tracking for accountability",
      ]}
      ctaHeadline="Ready to be heard?"
    />
  );
}
