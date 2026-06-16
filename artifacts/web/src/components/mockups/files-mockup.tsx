import {
  Search,
  Download,
  Upload,
  FileText,
  FileSpreadsheet,
  FileArchive,
  Image as ImageIcon,
  Check,
  X,
} from "lucide-react";
import { MockupFrame } from "./mockup-ui";

import enhancedFilesIcon from "@assets/EnhancedFiles-500x500_1781206837929.png";

const FILES = [
  { name: "Master_Service_Agreement_v4", meta: "Apr 2, 2026 · 11.7 MB", ext: "PDF", icon: FileText, tone: "text-[#d65a41] bg-accent/[0.14] border-accent/[0.22]" },
  { name: "Q4_Renewal_Quote_Final", meta: "Apr 2, 2026 · 9.4 MB", ext: "XLSX", icon: FileSpreadsheet, tone: "text-[#1c7d54] bg-[#22a06b]/[0.12] border-[#22a06b]/[0.20]" },
  { name: "Implementation_Specs_SOW", meta: "Apr 1, 2026 · 6.0 MB", ext: "DOCX", icon: FileText, tone: "text-primary bg-primary/[0.10] border-primary/[0.18]" },
  { name: "Brand_Logo_Assets", meta: "Mar 28, 2026 · 13.1 MB", ext: "ZIP", icon: FileArchive, tone: "text-[#b5740a] bg-[#f5a623]/[0.14] border-[#f5a623]/[0.25]" },
  { name: "Site_Survey_Photos", meta: "Mar 27, 2026 · 24.8 MB", ext: "PNG", icon: ImageIcon, tone: "text-[#413c64] bg-[#413c64]/[0.10] border-[#413c64]/[0.18]" },
];

/* 1 — the supercharged Files related list. */
export function FilesListMockup() {
  return (
    <MockupFrame title="Acme Corp — Account · Files">
      <div className="px-4 py-3 border-b border-black/[0.06] flex items-center gap-2 bg-[#faf8f4]">
        <img src={enhancedFilesIcon} alt="" className="w-6 h-6 rounded-md shrink-0" />
        <span className="text-[13px] font-bold text-[#1a1814]">Files</span>
        <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-accent/[0.18] text-[#c2503a] text-[10px] font-bold">10</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-white border border-black/[0.08] text-[#9a9490] text-[10px]">
            <Search className="w-3 h-3" /> Search files
          </span>
          <span className="inline-flex items-center gap-1 h-7 px-2.5 rounded-lg bg-accent text-[#5a1d11] text-[10px] font-bold">
            <Download className="w-3 h-3" /> Download all
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 h-7 px-2.5 rounded-lg border border-black/[0.10] bg-white text-[#6b6460] text-[10px] font-semibold">
            <Upload className="w-3 h-3" /> Upload
          </span>
        </div>
      </div>
      <div className="p-3 space-y-1.5 max-h-[300px] overflow-hidden">
        {FILES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-black/[0.05] hover:border-accent/40 transition-colors">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${f.tone}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-[#1a1814] truncate">{f.name}</div>
                <div className="text-[10px] text-[#9a9490] mt-0.5">{f.meta} · {f.ext}</div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-[#faf8f4] border border-black/[0.08] flex items-center justify-center shrink-0">
                <Download className="w-3.5 h-3.5 text-[#6b6460]" />
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-center gap-1 pt-1.5 border-t border-black/[0.05] text-[11px] font-semibold text-accent">
          View all 10 files
        </div>
      </div>
    </MockupFrame>
  );
}

/* 2 — standard Salesforce list vs Enhanced Files, side by side. */
export function FilesCompareMockup() {
  return (
    <MockupFrame title="Standard Files vs Enhanced Files">
      <div className="grid grid-cols-2 divide-x divide-black/[0.06]">
        {/* standard */}
        <div className="p-4 bg-[#faf8f4]/60">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[11px] font-bold text-[#9a9490] uppercase tracking-wider">Standard</span>
          </div>
          <div className="space-y-2 opacity-90">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-lg border border-black/[0.06] bg-white p-2.5">
                <div className="h-2.5 w-28 rounded bg-black/[0.10] mb-2" />
                <div className="h-2 w-20 rounded bg-black/[0.06]" />
              </div>
            ))}
          </div>
          <ul className="mt-3 space-y-1.5">
            {["One download at a time", "No search or count", "Paged, cramped list"].map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-[10px] text-[#9a9490]">
                <X className="w-3 h-3 text-[#c2503a] shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* enhanced */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <img src={enhancedFilesIcon} alt="" className="w-4 h-4 rounded" />
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">Enhanced</span>
          </div>
          <div className="space-y-2">
            {[
              { n: "MSA_v4.pdf", icon: FileText, tone: "text-[#d65a41] bg-accent/[0.14]" },
              { n: "Quote_Final.xlsx", icon: FileSpreadsheet, tone: "text-[#1c7d54] bg-[#22a06b]/[0.12]" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.n} className="flex items-center gap-2 rounded-lg border border-black/[0.05] bg-white p-2">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center ${f.tone}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-semibold text-[#1a1814] truncate">{f.n}</span>
                  <Download className="w-3.5 h-3.5 text-[#9a9490] ml-auto" />
                </div>
              );
            })}
          </div>
          <ul className="mt-3 space-y-1.5">
            {["Download all in one click", "Instant search + file count", "Smooth scrollable list"].map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-[10px] text-[#1a1814] font-medium">
                <Check className="w-3 h-3 text-[#22a06b] shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockupFrame>
  );
}
