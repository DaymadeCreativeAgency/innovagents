import { Download, ScrollText, Search, Files, Settings2, Lock } from "lucide-react";
import { ProductPage } from "@/components/product-page";
import { APPX } from "@/components/layout-v2";

import enhancedFilesIcon from "@assets/EnhancedFiles-500x500_1781206837929.png";
import shotFeatures from "@assets/appx-ef-features.png";
import shotDownload from "@assets/appx-ef-download.png";
import shotSearch from "@assets/appx-ef-search.png";
import shotCounter from "@assets/appx-ef-counter.png";
import shotStandardVs from "@assets/appx-ef-standard-vs.jpg";

export default function EnhancedFiles() {
  return (
    <ProductPage
      icon={enhancedFilesIcon}
      name="Enhanced Files"
      label="File Management, Upgraded"
      headline={<>Your files related list, supercharged</>}
      description="Enhanced Files takes the standard files related list and supercharges it for maximum efficiency — download multiple files at once, scroll easily, search instantly, and see everything at a glance."
      appxUrl={APPX.enhancedFiles}
      tint="coral"
      heroScreenshot={{
        src: shotFeatures,
        caption: "Enhanced Files on a Lightning record page",
      }}
      screenshots={[
        { src: shotDownload, caption: "Download all files with just one click" },
        { src: shotSearch, caption: "Quick search filter for instant access to any file" },
        { src: shotCounter, caption: "Indicator showing total number of files at a glance" },
        { src: shotStandardVs, caption: "Standard files list vs Enhanced Files" },
      ]}
      features={[
        { icon: Download, title: "Download All in One Click", desc: "No more downloading one file at a time. Grab every file on a record with a single click." },
        { icon: ScrollText, title: "Scrollable Related List", desc: "Quick access to all files with smooth scrolling — no more paging through endless related lists." },
        { icon: Search, title: "Search Filter", desc: "Easy-access search filter to find the exact file you need and improve productivity." },
        { icon: Files, title: "Total File Count Indicator", desc: "Know the number of files on a record at a glance, before you even open the list." },
        { icon: Settings2, title: "Admin Configurations", desc: "Personalize the UI with administrator configurations to match how your team works." },
        { icon: Lock, title: "Secure & Native", desc: "Respects all native Salesforce file permissions and sharing rules. No external servers or API limits." },
      ]}
      benefits={[
        "Download a complete record's files in one click",
        "Find the exact document you need in seconds",
        "See total file counts without opening the list",
        "Respects native Salesforce file permissions and sharing rules",
      ]}
      ctaHeadline="Ready to upgrade your file experience?"
    />
  );
}
