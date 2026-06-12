import { FileSpreadsheet, Boxes, Hash, Database, ShieldCheck, MousePointerClick } from "lucide-react";
import { ProductPage } from "@/components/product-page";
import { APPX } from "@/components/layout-v2";

import listViewIcon from "@assets/ListViewExport-500x500_1781206837929.png";
import shotExport from "@assets/appx-lve-export.png";
import shotNoReports from "@assets/appx-lve-no-reports.png";
import shotFeatures from "@assets/appx-lve-features.png";

export default function ListViewExport() {
  return (
    <ProductPage
      icon={listViewIcon}
      name="List View Export"
      label="Any List View to CSV"
      headline={<>Export list views in one click. No reports required.</>}
      description="List View Export lets Salesforce admins export any list view directly to a CSV without rebuilding filters in reports. Save time, reduce errors, and get clean data exactly as it appears in Salesforce."
      priceChip="$20 / user / month"
      trialNote="Free 7-day trial"
      appxUrl={APPX.listViewExport}
      tint="indigo"
      heroScreenshot={{
        src: shotExport,
        caption: '"Export List View" right from any Salesforce list view',
      }}
      screenshots={[
        { src: shotNoReports, caption: "No more copying list views into reports just to export a CSV" },
        { src: shotFeatures, caption: "List View Export feature overview" },
      ]}
      features={[
        { icon: FileSpreadsheet, title: "Export Directly from List Views", desc: "Download a CSV from any Salesforce list view without creating or maintaining reports." },
        { icon: Boxes, title: "Standard & Custom Objects", desc: "Use List View Export across all standard and custom objects with no additional setup." },
        { icon: Hash, title: "Record Count Preview", desc: "See how many records will be included before exporting, so there are no surprises." },
        { icon: Database, title: "Large Data Volumes", desc: "Built to support large exports without artificial limits or performance concerns." },
        { icon: ShieldCheck, title: "Respects Salesforce Security", desc: "Automatically follows list view visibility and field-level security for compliant data access." },
        { icon: MousePointerClick, title: "One-Click Simplicity", desc: "No training required. If your team can open a list view, they can export it." },
      ]}
      benefits={[
        "Stop rebuilding report filters just to get a CSV",
        "Clean data exactly as it appears in Salesforce",
        "Works on every standard and custom object",
        "Field-level security enforced automatically",
      ]}
      ctaHeadline="Ready to skip the reports?"
    />
  );
}
