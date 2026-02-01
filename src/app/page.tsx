"use client";

import Link from "next/link";
import { ShimmerButton } from "@/components/ui/magic/shimmer-button";
import { AnimatedGradientText } from "@/components/ui/magic/animated-gradient";
import { BentoGrid, BentoCard } from "@/components/ui/magic/bento-grid";
import { AnimatedSteps } from "@/components/ui/magic/animated-steps";
import { NumberTicker } from "@/components/ui/magic/number-ticker";
import { BorderBeam } from "@/components/ui/magic/border-beam";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/magic/accordion";

/* ─── Data ────────────────────────────────────────────────────── */

const KITS = [
  { name: "Morning Briefing", icon: "\u2600\uFE0F", description: "Wake up to a personalized digest of news, calendar events, weather, and priority emails \u2014 delivered before your first coffee.", tags: ["Email", "Calendar", "News"], featured: true },
  { name: "Inbox Zero", icon: "\u2709\uFE0F", description: "Automatically triages, labels, drafts replies, and archives your email so you can focus on what matters.", tags: ["Email", "Drafts", "Labels"], featured: true },
  { name: "Research Assistant", icon: "\uD83D\uDD2C", description: "Deep-dive any topic with multi-source research, citation tracking, and structured summaries you can actually use.", tags: ["Search", "PDFs", "Summaries"], featured: true },
  { name: "Content Studio", icon: "\u270D\uFE0F", description: "Generate, edit, and schedule blog posts, social threads, and newsletters from a single brief.", tags: ["Writing", "Social", "SEO"] },
  { name: "Meeting Prep", icon: "\uD83D\uDCC5", description: "Before every meeting, get attendee bios, past interactions, relevant docs, and suggested talking points.", tags: ["Calendar", "CRM", "Docs"] },
  { name: "Social Listener", icon: "\uD83D\uDCE1", description: "Monitor brand mentions, competitor moves, and industry trends across social platforms in real-time.", tags: ["Twitter", "Reddit", "Alerts"] },
];

const PRICING = [
  { name: "Starter", price: 19, description: "For individuals getting started with AI agents.", features: ["1 active Kit", "1 messaging channel", "5,000 messages / month", "Community support", "Web chat interface"], cta: "Start Free Trial", highlighted: false },
  { name: "Pro", price: 49, description: "For power users who want the full experience.", features: ["3 active Kits simultaneously", "All messaging channels", "25,000 messages / month", "Priority support", "Custom Kit configurations", "Usage analytics", "API access"], cta: "Start Free Trial", highlighted: true },
  { name: "Team", price: 99, description: "For teams that need collaboration and control.", features: ["Everything in Pro", "Unlimited active Kits", "100,000 messages / month", "Dedicated support", "Team workspaces", "SSO & audit logs", "Custom SLAs"], cta: "Contact Sales", highlighted: false },
];

const FAQS = [
  { q: "What is OpenClaw?", a: "OpenClaw is the leading open-source AI agent framework with 118K+ stars on GitHub. ClawKit gives you hosted, pre-configured OpenClaw instances so you get all the power without any of the setup." },
  { q: "Do I need to know how to code?", a: "Not at all. Kits are pre-built agent configurations you can activate in one click. Just connect your accounts and you\u2019re ready to go." },
  { q: "How does it connect to OpenClaw?", a: "When you sign up, we provision a dedicated OpenClaw instance on our infrastructure. Your Kit configuration (personality, skills, schedules) is applied automatically. You connect via Telegram, WhatsApp, or our web chat \u2014 the instance runs 24/7 on our servers." },
  { q: "Do I need my own AI API key?", a: "Yes. You bring your own API key from Anthropic, OpenAI, or OpenRouter. This means you control your AI costs directly \u2014 no surprise bills from us. We charge for hosting and management only." },
  { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month with no long-term commitment. You can cancel, upgrade, or downgrade at any time from your dashboard." },
  { q: "Is my data secure?", a: "All data is encrypted at rest and in transit. We never train on your data. Connected account credentials are stored using industry-standard vault encryption, and you can revoke access at any time." },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -top-40 mx-auto max-w-4xl opacity-30" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(76,110,245,0.4) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-surface-800 bg-surface-900/60 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="badge-info">New</span>
            <span className="text-surface-300">Powered by OpenClaw &mdash; 118K+ GitHub stars</span>
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            AI agents that actually do things.{" "}
            <AnimatedGradientText className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">No coding required.</AnimatedGradientText>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-surface-400 sm:text-xl">
            ClawKit gives you hosted, pre-configured OpenClaw instances &mdash; pick a Kit, connect your accounts, and let AI agents handle the busywork.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/onboarding">
              <ShimmerButton className="px-8 py-3.5 text-base font-semibold">
                Get Started Free
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </ShimmerButton>
            </Link>
            <Link href="#kits" className="btn-secondary px-6 py-3 text-base">Explore Kits</Link>
          </div>

          {/* Live demo preview */}
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="relative overflow-hidden rounded-xl border border-surface-800 bg-surface-900/80 shadow-2xl shadow-brand-500/5">
              <BorderBeam duration={12} />
              <div className="p-4 sm:p-6">
                <div className="mb-3 flex items-center gap-2 border-b border-surface-800 pb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">A</div>
                  <span className="text-xs font-medium text-surface-300">Alfred &middot; Morning Briefing Agent</span>
                  <span className="ml-auto badge-success text-[10px]">Online</span>
                </div>
                <div className="space-y-3">
                  <div className="max-w-[85%] rounded-xl border border-surface-800 bg-surface-950 px-4 py-3">
                    <p className="text-sm text-surface-200">Good morning! Here&apos;s your briefing for today:</p>
                    <div className="mt-2 space-y-1 text-xs text-surface-400">
                      <p><span className="mr-1.5 text-surface-500">Weather:</span>45&deg;F, partly cloudy</p>
                      <p><span className="mr-1.5 text-surface-500">10:00 AM:</span>Call with investor</p>
                      <p><span className="mr-1.5 text-surface-500">2:00 PM:</span>Team standup</p>
                    </div>
                    <p className="mt-2 text-sm text-surface-300">Want me to research your investor before the call?</p>
                  </div>
                  <div className="ml-auto max-w-[70%] rounded-xl bg-brand-600 px-4 py-3">
                    <p className="text-sm text-white">Yes, pull up their recent investments and portfolio</p>
                  </div>
                  <div className="max-w-[85%] rounded-xl border border-surface-800 bg-surface-950 px-4 py-3">
                    <p className="text-sm text-surface-200">On it. I&apos;ll have a full brief ready in 5 minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="border-y border-surface-800/50 bg-surface-900/30 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6">
          {[
            { icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.856 1.4-8.168L.132 9.21l8.2-1.192z" /></svg>, value: 118000, suffix: "+", label: "GitHub Stars" },
            { icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" /></svg>, value: 6, suffix: " Kits", label: "Ready to Use" },
            { icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, value: 2, suffix: " min", label: "Setup Time" },
            { icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, value: 0, suffix: "", label: "Code Required" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <div className="mr-9 hidden h-8 w-px bg-surface-800 sm:block" />}
              <div className="text-brand-500">{stat.icon}</div>
              <div>
                <p className="text-lg font-bold text-white"><NumberTicker value={stat.value} suffix={stat.suffix} /></p>
                <p className="text-xs text-surface-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="features" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">How it works</p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">Up and running in under 2 minutes</h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-400">No infrastructure to manage, no YAML to write, no Docker containers to babysit. Just results.</p>
          </div>
          <div className="mt-16">
            <AnimatedSteps steps={[
              { number: "01", title: "Pick a Kit", description: "Browse pre-built agent configurations designed for real workflows \u2014 from email triage to deep research.", icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
              { number: "02", title: "Connect Your Accounts", description: "Add your AI API key and link a messaging channel. OAuth into Gmail, Slack, and 50+ services.", icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" /></svg> },
              { number: "03", title: "Your Agent Goes Live", description: "We spin up a dedicated OpenClaw instance, apply your Kit config, and connect everything. Runs 24/7.", icon: <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
            ]} />
          </div>
        </div>
      </section>

      {/* ── Kits ─────────────────────────────────────────────── */}
      <section id="kits" className="relative py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(76,110,245,0.3) 50%, transparent 100%)" }} />
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Kit Library</p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">Pre-built agents for real workflows</h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-400">Each Kit is a battle-tested agent configuration. Activate one in seconds and customize it to fit your workflow.</p>
          </div>
          <div className="mt-16">
            <BentoGrid>
              {KITS.map((kit) => (
                <BentoCard key={kit.name} name={kit.name} description={kit.description} icon={<span className="text-2xl">{kit.icon}</span>} tags={kit.tags} featured={kit.featured} />
              ))}
            </BentoGrid>
          </div>
          <div className="mt-12 text-center">
            <Link href="/kits" className="btn-ghost inline-flex items-center text-brand-400 hover:text-brand-300">
              View all Kits &amp; install
              <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" className="relative py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(76,110,245,0.3) 50%, transparent 100%)" }} />
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Pricing</p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">Simple, transparent pricing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-400">You bring your own AI API key &mdash; we charge for hosting &amp; management only. Start free for 14 days.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {PRICING.map((tier) => (
              <div key={tier.name} className={`card relative flex flex-col ${tier.highlighted ? "border-brand-600 ring-1 ring-brand-600/50" : ""}`}>
                {tier.highlighted && (<><span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-info px-3 py-1 text-xs font-semibold">Most Popular</span><BorderBeam duration={10} colorFrom="#4c6ef5" colorTo="#9775fa" /></>)}
                <div>
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-surface-400">{tier.description}</p>
                  <div className="mt-6 flex items-baseline gap-1"><span className="text-4xl font-extrabold text-white">${tier.price}</span><span className="text-sm text-surface-500">/month</span></div>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm text-surface-300"><svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{f}</li>))}
                </ul>
                <div className="mt-8"><Link href="/onboarding" className={`block w-full py-2.5 text-center ${tier.highlighted ? "btn-primary" : "btn-secondary"}`}>{tier.cta}</Link></div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-surface-600">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(76,110,245,0.3) 50%, transparent 100%)" }} />
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">FAQ</p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-12">
            {FAQS.map((faq, i) => (<AccordionItem key={i} value={`faq-${i}`}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-3xl opacity-20" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(76,110,245,0.5) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to let AI handle the{" "}
            <AnimatedGradientText className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">busywork?</AnimatedGradientText>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-surface-400">Start your 14-day free trial today &mdash; no credit card required.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/onboarding"><ShimmerButton className="px-8 py-3.5 text-base font-semibold">Get Started Free<svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></ShimmerButton></Link>
            <Link href="#kits" className="btn-ghost text-surface-300">Explore Kits</Link>
          </div>
          <p className="mt-8 text-xs text-surface-600">Free 14-day trial &middot; No credit card required &middot; Cancel anytime</p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-surface-800 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600"><span className="text-xs font-bold text-white">CK</span></div>
              <span className="text-sm font-semibold text-white">ClawKit</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-surface-500"><span>Privacy Policy</span><span>Terms of Service</span><span>Contact</span></div>
            <p className="text-xs text-surface-600">&copy; 2026 ClawKit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
