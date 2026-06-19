import {
  Activity,
  CheckCircle2,
  Clock,
  Database,
  FileClock,
  Gauge,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { MockupFrame, StatusPill } from "./mockup-ui";

import fieldTrackingIcon from "@assets/UnlimitedFieldTracking-500x500_1781206837930.png";

const FIELD_ROWS = [
  { field: "Stage", from: "Proposal", to: "Negotiation", user: "A. Flores", time: "2 min ago" },
  { field: "Amount", from: "$48,000", to: "$52,500", user: "M. Reed", time: "18 min ago" },
  { field: "Close Date", from: "Jun 30", to: "Jul 15", user: "C. Young", time: "1 hr ago" },
  { field: "Owner", from: "Sales Ops", to: "K. Patel", user: "System", time: "Today" },
];

const OBJECTS = [
  { name: "Opportunity", fields: 86, tone: "bg-primary/[0.10] text-primary border-primary/[0.18]" },
  { name: "Account", fields: 74, tone: "bg-accent/[0.15] text-[#c2503a] border-accent/[0.24]" },
  { name: "Case", fields: 62, tone: "bg-[#22a06b]/[0.12] text-[#1c7d54] border-[#22a06b]/[0.22]" },
];

export function FieldTrackingTimelineMockup() {
  return (
    <MockupFrame title="Acme Opportunity - Field History">
      <div className="px-4 py-3 border-b border-black/[0.06] flex items-center gap-2 bg-[#faf8f4]">
        <img src={fieldTrackingIcon} alt="" className="w-6 h-6 rounded-md shrink-0" />
        <div className="min-w-0">
          <div className="text-[13px] font-bold text-[#1a1814] truncate">Unlimited Field Tracking</div>
          <div className="text-[10px] text-[#9a9490]">Opportunity - 248 tracked changes</div>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-white border border-black/[0.08] text-[#9a9490] text-[10px]">
          <Search className="w-3 h-3" /> Search history
        </div>
      </div>

      <div className="p-4 space-y-2">
        {FIELD_ROWS.map((row) => (
          <div key={`${row.field}-${row.time}`} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl bg-white border border-black/[0.06] p-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] font-bold text-[#1a1814]">{row.field}</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#9a9490]">
                  <Clock className="w-3 h-3" /> {row.time}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2 py-1 rounded-md bg-[#faf8f4] border border-black/[0.06] text-[#6b6460]">{row.from}</span>
                <span className="text-primary font-bold">to</span>
                <span className="px-2 py-1 rounded-md bg-primary/[0.08] border border-primary/[0.18] text-primary font-semibold">{row.to}</span>
              </div>
            </div>
            <div className="flex items-start gap-1.5 text-[10px] text-[#6b6460] whitespace-nowrap">
              <UserCheck className="w-3 h-3 text-primary mt-0.5" />
              {row.user}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 bg-[#faf8f4] border-t border-black/[0.06] flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-[#6b6460] font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Field-level security respected
        </span>
        <StatusPill status="live" label="Tracking active" />
      </div>
    </MockupFrame>
  );
}

export function FieldTrackingSetupMockup() {
  return (
    <MockupFrame title="Tracking Configuration">
      <div className="grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr] divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
        <div className="p-4 bg-[#faf8f4]/60">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-[12px] font-bold text-[#1a1814]">Objects</span>
          </div>
          <div className="space-y-2">
            {OBJECTS.map((object) => (
              <div key={object.name} className="rounded-xl bg-white border border-black/[0.06] p-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[12px] font-bold text-[#1a1814]">{object.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${object.tone}`}>
                    {object.fields} fields
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(92, object.fields)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileClock className="w-4 h-4 text-accent" />
            <span className="text-[12px] font-bold text-[#1a1814]">Field retention</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Tracked fields", value: "222", icon: Activity },
              { label: "Native limit", value: "20", icon: Gauge },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl border border-black/[0.06] bg-white p-3">
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <div className="text-xl font-display font-black text-[#1a1814] leading-none">{item.value}</div>
                  <div className="text-[10px] text-[#9a9490] mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>
          <div className="rounded-xl bg-primary/[0.07] border border-primary/[0.16] p-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-[12px] font-bold text-[#1a1814]">Track beyond native limits</div>
                <p className="text-[11px] text-[#6b6460] leading-relaxed mt-1">
                  Configure the fields your team actually audits without choosing only the top 20.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
