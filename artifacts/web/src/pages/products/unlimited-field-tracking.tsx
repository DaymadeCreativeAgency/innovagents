import { Activity, Clock, Database, FileClock, Gauge, Search, Settings2, ShieldCheck } from "lucide-react";
import { ProductPage } from "@/components/product-page";
import { PRODUCTS } from "@/lib/products";
import {
  FieldTrackingSetupMockup,
  FieldTrackingTimelineMockup,
} from "@/components/mockups/field-tracking-mockup";

import fieldTrackingIcon from "@assets/UnlimitedFieldTracking-500x500_1781206837930.png";

export default function UnlimitedFieldTracking() {
  return (
    <ProductPage
      icon={fieldTrackingIcon}
      name="Unlimited Field Tracking"
      label="Field History Without the Ceiling"
      headline={<>Track the field changes Salesforce stops remembering</>}
      description="Unlimited Field Tracking gives admins a Salesforce-native way to monitor critical field changes beyond standard history limits, with searchable audit history, flexible configuration, and clear visibility into who changed what."
      product={PRODUCTS.unlimitedFieldTracking}
      tint="indigo"
      mockups={[
        { label: "Timeline", caption: "See every important field change in a clean, searchable history timeline.", node: <FieldTrackingTimelineMockup /> },
        { label: "Configuration", caption: "Choose the objects and fields that matter without being boxed in by native limits.", node: <FieldTrackingSetupMockup /> },
      ]}
      features={[
        { icon: Gauge, title: "Beyond Native Field Limits", desc: "Track more than Salesforce's standard field history cap, so teams do not have to choose which critical fields get audit coverage." },
        { icon: Activity, title: "Complete Change Timeline", desc: "Review old values, new values, users, and timestamps in one readable history view for the records your team cares about." },
        { icon: Search, title: "Searchable Audit History", desc: "Find field changes quickly by object, field, user, or time period instead of digging through scattered related lists." },
        { icon: Settings2, title: "Admin-Friendly Setup", desc: "Configure tracked objects and fields without custom code, middleware, or brittle automation just to preserve history." },
        { icon: FileClock, title: "Long-Term Retention", desc: "Keep a durable history of important business changes for operations, support, and compliance conversations." },
        { icon: ShieldCheck, title: "Salesforce Native Security", desc: "Runs inside Salesforce and respects the access model your org already depends on." },
      ]}
      benefits={[
        "Audit more critical fields without the native 20-field tradeoff",
        "Answer who changed what, when, and from which value",
        "Give admins and operations teams searchable change history",
        "Avoid external tracking tools for sensitive Salesforce data",
      ]}
      ctaHeadline="Ready to stop losing field history?"
    />
  );
}
