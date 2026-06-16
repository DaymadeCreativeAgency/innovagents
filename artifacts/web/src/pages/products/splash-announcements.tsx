import { LogIn, Clock, Target, CheckCircle2, Bell, ShieldCheck } from "lucide-react";
import { ProductPage } from "@/components/product-page";
import { APPX } from "@/components/layout-v2";
import {
  SplashLoginMockup,
  SplashComposeMockup,
  SplashScheduleMockup,
  SplashAckMockup,
} from "@/components/mockups/splash-mockup";

import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";

export default function SplashAnnouncements() {
  return (
    <ProductPage
      icon={splashIcon}
      name="Splash Announcements"
      label="In-App Communication That Works"
      headline={<>No more ugly banners or urgent emails</>}
      description="Built to make communication simple and clear — schedule updates, target specific audiences, track acknowledgments, and send real-time alerts. No more guessing who saw what."
      appxUrl={APPX.splashAnnouncements}
      tint="indigo"
      mockups={[
        { label: "At login", caption: "Users see and acknowledge announcements the moment they log in.", node: <SplashLoginMockup /> },
        { label: "Compose", caption: "Create a targeted announcement with rich text, run dates, and audiences.", node: <SplashComposeMockup /> },
        { label: "Schedule", caption: "Plan announcements ahead with clear live, scheduled, and ended states.", node: <SplashScheduleMockup /> },
        { label: "Acknowledgments", caption: "Track who has read what, in real time, down to each audience.", node: <SplashAckMockup /> },
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
