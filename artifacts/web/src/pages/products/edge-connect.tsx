import { Plug, Code2, MousePointerClick, LayoutTemplate, ScrollText, ShieldCheck } from "lucide-react";
import { ProductPage } from "@/components/product-page";
import { EdgeFlowMockup } from "@/components/edge-flow-mockup";
import { APPX } from "@/components/layout-v2";

import edgeConnectIcon from "@assets/EdgeConnect-icon.png";

export default function EdgeConnect() {
  return (
    <ProductPage
      icon={edgeConnectIcon}
      name="Edge Connect"
      label="Low-Code Integration Platform"
      headline={<>Develop integrations as easily as you create flows</>}
      description="Edge Connect enables admins and developers to quickly design, build, test, and deploy integrations in Salesforce using little or no code — all with a drag-and-drop flow designer."
      appxUrl={APPX.edgeConnect}
      tint="indigo"
      heroMockup={<EdgeFlowMockup />}
      features={[
        { icon: Plug, title: "200+ Prebuilt Connectors", desc: "Connect to the systems you already use with a library of over 200 prebuilt connectors." },
        { icon: MousePointerClick, title: "Drag-and-Drop Designer", desc: "Design, build, and test integrations visually — as easy as building a Salesforce flow." },
        { icon: Code2, title: "Custom JavaScript Connectors", desc: "Need something bespoke? Create your own connectors using JavaScript, right inside the platform." },
        { icon: LayoutTemplate, title: "Templates", desc: "Start from proven integration templates instead of a blank canvas and ship faster." },
        { icon: ScrollText, title: "Logs & Monitoring", desc: "Full request logs and error visibility so you always know what ran, when, and why." },
        { icon: ShieldCheck, title: "Built in Salesforce", desc: "No middleware to host or secure. Everything runs natively inside your Salesforce org." },
      ]}
      benefits={[
        "Eliminate expensive middleware platforms",
        "Admins ship integrations without waiting on developers",
        "Test and deploy from sandbox to production safely",
      ]}
      ctaHeadline="Ready to connect everything?"
    />
  );
}
