import {
  Megaphone,
  Search,
  Bell,
  Check,
  Calendar,
  Clock,
  Users,
  Monitor,
  Smartphone,
  Bold,
  Italic,
  List,
  Link2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { MockupFrame, Avatar, StatusPill, Donut, MeterRow } from "./mockup-ui";

import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";

/* Lightweight Salesforce-style app chrome rendered behind the splash. */
function AppShell({ dim = false }: { dim?: boolean }) {
  return (
    <div className={dim ? "select-none" : ""} aria-hidden>
      <div className="flex items-center gap-4 px-4 h-11 bg-white border-b-[3px] border-primary/70">
        <img src={splashIcon} alt="" className="w-6 h-6 rounded-md" />
        <div className="flex items-center gap-3 text-[11px] font-medium text-[#6b6460]">
          <span className="text-primary border-b-2 border-primary pb-2.5 -mb-2.5">Home</span>
          <span className="hidden sm:inline">Opportunities</span>
          <span className="hidden sm:inline">Accounts</span>
          <span className="hidden md:inline">Reports</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-black/[0.04] border border-black/[0.06] text-[#9a9490] text-[10px]">
            <Search className="w-3 h-3" /> Search Salesforce
          </span>
          <Bell className="w-4 h-4 text-[#9a9490]" />
          <Avatar initials="HL" tone="slate" size={24} />
        </div>
      </div>
      {/* faint dashboard content suggested behind the modal */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-black/[0.05] bg-[#faf8f4] p-3">
            <div className="h-2 w-12 rounded bg-black/[0.06] mb-2" />
            <div className="h-5 w-16 rounded bg-black/[0.08]" />
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-7 rounded-lg border border-black/[0.05] bg-white flex items-center gap-3 px-3">
            <div className="h-2 w-24 rounded bg-black/[0.06]" />
            <div className="h-2 w-16 rounded bg-black/[0.05] ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* 1 — the signature experience: an acknowledgment splash at login. */
export function SplashLoginMockup() {
  return (
    <MockupFrame title="Salesforce · Lightning Experience">
      <div className="relative">
        <AppShell dim />
        {/* scrim */}
        <div className="absolute inset-0 bg-[#1a1814]/45 backdrop-blur-[2px]" />
        {/* modal */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_30px_80px_-12px_rgba(26,24,20,0.5)] overflow-hidden border border-black/[0.05]">
            <div className="h-1.5 bg-gradient-to-r from-primary via-[#7b6cf0] to-accent" />
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.10] border border-primary/[0.18] flex items-center justify-center shrink-0">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">New announcement</span>
                    <StatusPill status="live" label="Live" />
                  </div>
                  <div className="text-[16px] font-bold text-[#1a1814] leading-tight mt-0.5">
                    Release 1.3 is live this Friday
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[#6b6460] leading-relaxed mb-3">
                Here's what's shipping in this release — please review before Friday's rollout.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "New Splash Announcements app for org-wide comms",
                  "Account layout no longer requires 150 fields to save",
                  "Faster list views across Sales & Service Cloud",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[12px] text-[#1a1814]">
                    <Check className="w-3.5 h-3.5 text-[#22a06b] mt-0.5 shrink-0" />
                    <span className="leading-snug">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between rounded-xl bg-[#faf8f4] border border-black/[0.05] px-3 py-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <Avatar initials="AF" tone="indigo" size={22} ring />
                    <Avatar initials="JT" tone="coral" size={22} ring />
                    <Avatar initials="MR" tone="green" size={22} ring />
                  </div>
                  <span className="text-[10px] text-[#9a9490]">Sent to <b className="text-[#6b6460]">All Sales</b> · 248 people</span>
                </div>
                <span className="text-[10px] text-[#9a9490]">1 of 1</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 h-10 rounded-xl bg-[#1a1814] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-2 shadow-sm">
                  <Check className="w-4 h-4" /> Acknowledge
                </button>
                <button className="h-10 px-4 rounded-xl border border-black/[0.10] text-[#6b6460] text-[13px] font-medium">
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/* 2 — compose a targeted announcement. */
export function SplashComposeMockup() {
  return (
    <MockupFrame title="Splash Announcements · New announcement">
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr]">
        {/* editor */}
        <div className="p-5 md:border-r border-black/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-primary" />
              <span className="text-[13px] font-bold text-[#1a1814]">New announcement</span>
            </div>
            <StatusPill status="draft" label="Draft" />
          </div>

          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#9a9490] mb-1">Title</label>
          <div className="h-9 rounded-lg border border-primary/40 ring-2 ring-primary/10 bg-white px-3 flex items-center text-[12px] font-medium text-[#1a1814] mb-4">
            Release 1.3 is live this Friday
          </div>

          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#9a9490] mb-1">Message</label>
          <div className="rounded-lg border border-black/[0.10] overflow-hidden mb-4">
            <div className="flex items-center gap-1 px-2 h-8 border-b border-black/[0.07] bg-[#faf8f4] text-[#9a9490]">
              <Bold className="w-3.5 h-3.5" />
              <Italic className="w-3.5 h-3.5" />
              <span className="w-px h-4 bg-black/[0.10] mx-1" />
              <List className="w-3.5 h-3.5" />
              <Link2 className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 text-[12px] text-[#1a1814] leading-relaxed">
              Here's what's shipping this release —
              <span className="text-[#9a9490]"> please review before Friday's rollout.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#9a9490] mb-1">Platform</label>
              <div className="flex gap-1 p-1 rounded-lg bg-[#faf8f4] border border-black/[0.06]">
                <span className="flex-1 inline-flex items-center justify-center gap-1 h-7 rounded-md bg-white shadow-sm text-[11px] font-semibold text-[#1a1814]">
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </span>
                <span className="flex-1 inline-flex items-center justify-center gap-1 h-7 rounded-md text-[11px] font-medium text-[#9a9490]">
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#9a9490] mb-1">Run dates</label>
              <div className="h-[34px] rounded-lg border border-black/[0.10] bg-white px-3 flex items-center gap-2 text-[11px] text-[#1a1814]">
                <Calendar className="w-3.5 h-3.5 text-primary" /> May 12 – May 30
              </div>
            </div>
          </div>
        </div>

        {/* audience + acknowledgment toggle */}
        <div className="p-5 bg-[#faf8f4]">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[12px] font-bold text-[#1a1814]">Audience</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {["Sales – Profile", "Account Execs", "Permission: CPQ", "West Region"].map((a) => (
              <span key={a} className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full bg-white border border-primary/25 text-[10px] font-semibold text-primary">
                {a}
              </span>
            ))}
            <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-dashed border-black/[0.15] text-[10px] font-medium text-[#9a9490]">+ Add</span>
          </div>

          <div className="rounded-xl bg-white border border-black/[0.06] p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-[#1a1814]">Require acknowledgment</div>
                <div className="text-[10px] text-[#9a9490]">Track who has read this</div>
              </div>
              <span className="w-9 h-5 rounded-full bg-primary relative">
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-black/[0.06] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9a9490] mb-2">Reaches</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[26px] font-bold text-[#1a1814] leading-none">248</span>
              <span className="text-[11px] text-[#9a9490]">people</span>
            </div>
          </div>

          <button className="mt-4 w-full h-9 rounded-lg bg-[#1a1814] text-white text-[12px] font-semibold inline-flex items-center justify-center gap-2">
            Schedule announcement <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </MockupFrame>
  );
}

/* 3 — scheduled / upcoming announcements timeline. */
export function SplashScheduleMockup() {
  const rows = [
    { name: "Release 1.3 is live this Friday", aud: "All Sales", dates: "May 12 – May 30", status: "live" as const, ack: "82%" },
    { name: "End-of-month reports due", aud: "Account Execs", dates: "May 28 – May 31", status: "scheduled" as const, ack: "—" },
    { name: "Summer '26 maintenance window", aud: "All users", dates: "Jun 14 – Jun 16", status: "scheduled" as const, ack: "—" },
    { name: "New CPQ approval flow", aud: "Permission: CPQ", dates: "Apr 30 – May 10", status: "ended" as const, ack: "97%" },
  ];
  return (
    <MockupFrame title="Splash Announcements · Schedule">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-bold text-[#1a1814]">Announcement schedule</span>
          </div>
          <span className="inline-flex items-center gap-1 h-7 px-2.5 rounded-lg bg-[#1a1814] text-white text-[10px] font-semibold">+ New</span>
        </div>

        {/* header */}
        <div className="hidden sm:grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr] gap-3 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9a9490]">
          <span>Announcement</span>
          <span>Audience</span>
          <span>Run dates</span>
          <span className="text-right">Ack</span>
        </div>
        <div className="space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.name}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_0.9fr_1fr_0.7fr] items-center gap-2 sm:gap-3 rounded-xl border border-black/[0.05] bg-white hover:border-primary/30 transition-colors px-3 py-2.5"
            >
              <div className="min-w-0 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/[0.08] border border-primary/[0.15] flex items-center justify-center shrink-0">
                  <Megaphone className="w-3.5 h-3.5 text-primary" />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-[#1a1814] truncate">{r.name}</div>
                  <div className="sm:hidden text-[10px] text-[#9a9490]">{r.dates}</div>
                </div>
              </div>
              <div className="hidden sm:block"><StatusPill status={r.status} label={r.status === "live" ? "Live" : r.status === "scheduled" ? "Scheduled" : "Ended"} /></div>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#6b6460]">
                <Clock className="w-3 h-3 text-[#c4beb6]" /> {r.dates}
              </div>
              <div className="text-right text-[11px] font-semibold tabular-nums text-[#1a1814]">{r.ack}</div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

/* 4 — acknowledgment tracking dashboard (turns comms into reporting). */
export function SplashAckMockup() {
  return (
    <MockupFrame title="Splash Announcements · Acknowledgments">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[13px] font-bold text-[#1a1814]">Release 1.3 is live this Friday</div>
            <div className="text-[10px] text-[#9a9490]">Acknowledgment tracking · updated 2 min ago</div>
          </div>
          <StatusPill status="live" label="Live" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 items-center">
          <div className="flex items-center justify-center">
            <Donut value={82} size={108} stroke={11} color="#5555e6">
              <span className="text-[24px] font-bold text-[#1a1814] leading-none">82%</span>
              <span className="text-[9px] text-[#9a9490] mt-0.5">acknowledged</span>
            </Donut>
          </div>
          <div className="space-y-3">
            <MeterRow label="Account Execs" value={94} tone="indigo" />
            <MeterRow label="Sales Ops" value={88} tone="green" />
            <MeterRow label="West Region" value={71} tone="coral" />
            <MeterRow label="CPQ admins" value={60} tone="indigo" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5 mb-4">
          {[
            { v: "203", l: "Acknowledged" },
            { v: "45", l: "Pending" },
            { v: "248", l: "Recipients" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-black/[0.05] bg-[#faf8f4] px-3 py-2.5">
              <div className="text-[18px] font-bold text-[#1a1814] leading-none">{s.v}</div>
              <div className="text-[10px] text-[#9a9490] mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-black/[0.05] p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9a9490]">Recent</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1c7d54]">
              <TrendingUp className="w-3 h-3" /> +18 in last hour
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <Avatar initials="AF" tone="indigo" size={24} ring />
              <Avatar initials="JT" tone="coral" size={24} ring />
              <Avatar initials="MR" tone="green" size={24} ring />
              <Avatar initials="DK" tone="amber" size={24} ring />
              <Avatar initials="SP" tone="slate" size={24} ring />
            </div>
            <span className="text-[11px] text-[#9a9490]">and 198 others acknowledged</span>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
