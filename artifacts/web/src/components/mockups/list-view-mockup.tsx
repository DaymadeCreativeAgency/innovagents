import {
  Search,
  Download,
  FileSpreadsheet,
  ChevronDown,
  Filter,
  Check,
} from "lucide-react";
import { MockupFrame } from "./mockup-ui";

import listViewIcon from "@assets/ListViewExport-500x500_1781206837929.png";

const ACCOUNTS = [
  { name: "Meridian Health Systems", phone: "313-202-2854", owner: "Hannah Lewis", industry: "Healthcare" },
  { name: "Brightline Software", phone: "(415) 901-7000", owner: "Marcus Chen", industry: "Software" },
  { name: "Summit Ridge Construction", phone: "(503) 427-4427", owner: "Sarah Rogers", industry: "Construction" },
  { name: "Northstar Energy Partners", phone: "(212) 842-5500", owner: "Marcus Chen", industry: "Energy" },
  { name: "Cascade Freight Solutions", phone: "(503) 421-7800", owner: "Sarah Rogers", industry: "Transportation" },
];

/* 1 — export directly from any list view (the core action). */
export function ListViewExportMockup() {
  return (
    <MockupFrame title="Accounts · Recently Viewed">
      <div className="px-4 py-3 border-b border-black/[0.06] flex items-center gap-2 bg-[#faf8f4]">
        <img src={listViewIcon} alt="" className="w-6 h-6 rounded-md shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-[13px] font-bold text-[#1a1814]">
            Recently Viewed <ChevronDown className="w-3.5 h-3.5 text-[#9a9490]" />
          </div>
          <div className="text-[10px] text-[#9a9490]">5 items · sorted by Account Name</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-white border border-black/[0.08] text-[#9a9490] text-[10px]">
            <Search className="w-3 h-3" /> Search this list
          </span>
          <span className="relative inline-flex items-center gap-1 h-7 px-2.5 rounded-lg bg-primary text-white text-[10px] font-bold shadow-[0_4px_14px_rgba(85,85,230,0.35)]">
            <Download className="w-3 h-3" /> Export List View
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-white" />
          </span>
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-[1.6fr_1fr_0.8fr] gap-3 px-4 py-2 border-b border-black/[0.06] text-[10px] font-semibold uppercase tracking-wider text-[#9a9490] bg-white">
          <span>Account Name</span>
          <span>Phone</span>
          <span>Owner</span>
        </div>
        {ACCOUNTS.map((a, i) => (
          <div
            key={a.name}
            className={`grid grid-cols-[1.6fr_1fr_0.8fr] gap-3 px-4 py-2.5 text-[11px] border-b border-black/[0.04] ${i % 2 ? "bg-[#faf8f4]/50" : "bg-white"}`}
          >
            <span className="text-primary font-semibold truncate">{a.name}</span>
            <span className="text-[#6b6460] tabular-nums">{a.phone}</span>
            <span className="text-[#6b6460]">{a.owner}</span>
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 bg-[#faf8f4] border-t border-black/[0.06] flex items-center gap-2 text-[10px] text-[#9a9490]">
        <Filter className="w-3 h-3" /> All standard & custom objects · field-level security respected
      </div>
    </MockupFrame>
  );
}

/* 2 — the clean CSV that drops out, no report builder required. */
export function ListViewCsvMockup() {
  const rows = [
    ["Account Name", "Phone", "Owner", "Industry"],
    ...ACCOUNTS.slice(0, 4).map((a) => [a.name, a.phone, a.owner, a.industry]),
  ];
  return (
    <MockupFrame title="Export complete">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#22a06b]/[0.12] border border-[#22a06b]/[0.22] flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-[#1c7d54]" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-[#1a1814]">Accounts_RecentlyViewed.csv</div>
            <div className="text-[10px] text-[#9a9490]">Exported in 1 click · 1,284 rows · no report required</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-[#1a1814] text-white text-[11px] font-semibold shrink-0">
            <Download className="w-3.5 h-3.5" /> Download
          </span>
        </div>

        <div className="rounded-xl border border-black/[0.07] overflow-hidden">
          {rows.map((r, ri) => (
            <div
              key={ri}
              className={`grid grid-cols-4 ${ri === 0 ? "bg-[#1c7d54]/[0.08] font-semibold text-[#1a1814]" : "bg-white text-[#6b6460]"} ${ri !== 0 ? "border-t border-black/[0.05]" : ""}`}
            >
              {r.map((c, ci) => (
                <div key={ci} className="px-3 py-2 text-[10px] truncate border-l first:border-l-0 border-black/[0.04] flex items-center gap-1">
                  {ri === 0 && ci === 0 && <FileSpreadsheet className="w-3 h-3 text-[#1c7d54]" />}
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}
