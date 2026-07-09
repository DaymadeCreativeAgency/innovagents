import { ArrowRight, CheckCircle2, Cloud, Globe, Search, Zap } from "lucide-react";

import edgeConnectIcon from "@assets/EdgeConnect-icon.png";

/* Hand-built Edge Connect flow-designer mockup — replaces the sparse
   ultra-wide product screenshots with a focused, on-brand illustration. */

function FlowNodeIcon({
  icon: Icon,
  tone,
}: {
  icon: React.ElementType;
  tone: "indigo" | "coral" | "deep";
}) {
  const tones = {
    indigo: "bg-primary/[0.09] border-primary/[0.25] text-primary",
    coral: "bg-[#fe907f]/[0.15] border-[#fe907f]/[0.45] text-[#d65a41]",
    deep: "bg-[#413c64]/[0.08] border-[#413c64]/[0.25] text-[#413c64]",
  } as const;
  return (
    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center bg-white shadow-sm shrink-0 ${tones[tone]}`}>
      <Icon className="w-6 h-6" />
    </div>
  );
}

function FlowNodeCaption({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="text-center w-14 md:w-16 shrink-0">
      <div className="text-[12px] font-semibold text-[#1a1814] leading-tight">{label}</div>
      <div className="text-[10px] text-[#9a9490]">{sub}</div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center gap-1 flex-1 min-w-4" aria-hidden>
      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
      <span className="flex-1 border-t-2 border-dashed border-primary/40" />
      <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
    </div>
  );
}

export function EdgeFlowMockup() {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden shadow-sm">
      {/* toolbar */}
      <div className="px-4 py-2.5 border-b border-black/[0.07] flex items-center gap-3 bg-[#faf8f4]">
        <img src={edgeConnectIcon} alt="" className="w-6 h-6 rounded-md" />
        <div className="min-w-0">
          <div className="text-[12px] font-bold text-[#1a1814] truncate">Order Sync — NetSuite ⇄ Salesforce</div>
          <div className="text-[10px] text-[#9a9490]">Version 4 · Last run 2 min ago</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <span className="hidden sm:flex items-center gap-1 h-6 px-2 rounded-full bg-[#22a06b]/[0.12] border border-[#22a06b]/[0.25] text-[#1c7d54] text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22a06b]" /> Active
          </span>
          <span className="flex items-center h-6 px-2.5 rounded-lg bg-primary text-white text-[10px] font-semibold">Deploy</span>
        </div>
      </div>

      {/* canvas */}
      <div
        className="px-5 py-7 md:px-7 md:py-9"
        style={{ backgroundImage: "radial-gradient(rgba(26,24,20,0.07) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-1">
            <FlowNodeIcon icon={Globe} tone="deep" />
            <Connector />
            <FlowNodeIcon icon={Zap} tone="coral" />
            <Connector />
            <FlowNodeIcon icon={Cloud} tone="indigo" />
          </div>
          <div className="flex justify-between gap-1">
            <FlowNodeCaption label="NetSuite" sub="New order" />
            <div className="flex-1 min-w-4" aria-hidden />
            <FlowNodeCaption label="Transform" sub="Map 14 fields" />
            <div className="flex-1 min-w-4" aria-hidden />
            <FlowNodeCaption label="Salesforce" sub="Upsert record" />
          </div>
        </div>
      </div>

      {/* connector library hint + run stats */}
      <div className="px-4 py-2.5 border-t border-black/[0.07] flex items-center justify-between gap-3 bg-[#faf8f4]">
        <div className="hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-white border border-black/[0.08] text-[#9a9490] text-[10px]">
          <Search className="w-3 h-3" /> 200+ connectors…
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#6b6460] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#22a06b]" />
          1,284 runs this week · 99.98% success · avg 1.2s
        </div>
      </div>
    </div>
  );
}
