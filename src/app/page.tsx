"use client";

import Link from "next/link";
import { useState } from "react";

const KITS = [
  {
    name: "Morning Briefing",
    icon: "\u2600\uFE0F",
    description:
      "Wake up to a personalized digest of news, calendar events, weather, and priority emails — delivered before your first coffee.",
    tags: ["Email", "Calendar", "News"],
  },
  {
    name: "Inbox Zero",
    icon: "\u2709\uFE0F",
    description:
      "Automatically triages, labels, drafts replies, and archives your email so you can focus on what matters.",
    tags: ["Email", "Drafts", "Labels"],
  },
  {
    name: "Research Assistant",
    icon: "\uD83D\uDD2C",
    description:
      "Deep-dive any topic with multi-source research, citation tracking, and structured summaries you can actually use.",
    tags: ["Search", "PDFs", "Summaries"],
  },
  {
    name: "Content Studio",
    icon: "\u270D\uFE0F",
    description:
      "Generate, edit, and schedule blog posts, social threads, and newsletters from a single brief.",
    tags: ["Writing", "Social", "SEO"],
  },
  {
    name: "Meeting Prep",
    icon: "\uD83D\uDCC5",
    description:
      "Before every meeting, get attendee bios, past interactions, relevant docs, and suggested talking points.",
    tags: ["Calendar", "CRM", "Docs"],
  },
  {
    name: "Social Listener",
    icon: "\uD83D\uDCE1",
    description:
      "Monitor brand mentions, competitor moves, and industry trends across social platforms in real-time.",
    tags: ["Twitter", "Reddit", "Alerts"],
  },
];

const PRICING = [
  {
    name: "Starter",
    price: 19,
    description: "For individuals getting started with AI agents.",
    features: [
      "2 active Kits",
      "1,000 agent runs / month",
      "5 connected accounts",
      "Community support",
      "7-day run history",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 49,
    description: "For power users who want the full experience.",
    features: [
      "Unlimited active Kits",
      "10,000 agent runs / month",
      "25 connected accounts",
      "Priority support",
      "90-day run history",
      "Custom Kit builder",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: 99,
    description: "For teams that need collaboration and control.",
    features: [
      "Everything in Pro",
      "50,000 agent runs / month",
      "Unlimited connected accounts",
      "Dedicated support",
      "Unlimited run history",
      "Team workspaces",
      "SSO & audit logs",
      "Custom SLAs",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const FAQS = [
  {
    q: "What is OpenClaw?",
    a: "OpenClaw is the leading open-source AI agent framework with 118K+ stars on GitHub. ClawKit gives you hosted, pre-configured OpenClaw instances so you get all the power without any of the setup.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not at all. Kits are pre-built agent configurations you can activate in one click. Just connect your accounts and you\u2019re ready to go. If you do know how to code, the Pro plan includes API access and a custom Kit builder.",
  },
  {
    q: "How are agent runs counted?",
    a: "An agent run is a single end-to-end execution of a Kit. For example, one Morning Briefing delivery counts as one run. Multi-step tasks within a single execution still count as one run.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are month-to-month with no long-term commitment. You can cancel, upgrade, or downgrade at any time from your dashboard.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All data is encrypted at rest and in transit. We never train on your data. Connected account credentials are stored using industry-standard vault encryption, and you can revoke access at any time.",
  },
  {
    q: "What integrations are supported?",
    a: "ClawKit supports 50+ integrations out of the box including Gmail, Outlook, Google Calendar, Slack, Notion, Linear, GitHub, Twitter, Reddit, and many more. New integrations are added every week.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-surface-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-surface-200 transition-colors hover:text-white"
      >
        {q}
        <svg
          className={`ml-4 h-5 w-5 flex-shrink-0 text-surface-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-surface-400">{a}</p>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -top-40 mx-auto max-w-4xl opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(76,110,245,0.4) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-surface-800 bg-surface-900/60 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="badge-info">New</span>
            <span className="text-surface-300">
              Powered by OpenClaw &mdash; 118K+ GitHub stars
            </span>
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            AI agents that actually do things.{" "}
            <span className="gradient-text">No coding required.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-surface-400 sm:text-xl">
            ClawKit gives you hosted, pre-configured OpenClaw instances
            &mdash; pick a Kit, connect your accounts, and let AI agents
            handle the busywork.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-primary px-6 py-3 text-base">
              Get Started Free
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="#kits" className="btn-secondary px-6 py-3 text-base">
              Explore Kits
            </Link>
          </div>

          {/* Social proof row */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-surface-500">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-brand-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.856 1.4-8.168L.132 9.21l8.2-1.192z" />
              </svg>
              118K+ GitHub Stars
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-brand-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              12K+ Active Users
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-brand-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              2M+ Agent Runs
            </span>
          </div>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section id="features" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
              How it works
            </p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">
              Up and running in under 2 minutes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-400">
              No infrastructure to manage, no YAML to write, no Docker
              containers to babysit. Just results.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick a Kit",
                description:
                  "Browse pre-built agent configurations designed for real workflows \u2014 from email triage to deep research.",
                icon: (
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Connect Your Accounts",
                description:
                  "OAuth into Gmail, Slack, Notion, Calendar, and 50+ other services with one click. We handle the plumbing.",
                icon: (
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757"
                    />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Start Using",
                description:
                  "Your agents run on our infrastructure \u2014 scheduled, triggered, or on-demand. Sit back and watch them work.",
                icon: (
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="card relative text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600/10 text-brand-400">
                  {item.icon}
                </div>
                <span className="absolute top-4 right-4 text-xs font-bold text-surface-700">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-surface-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── KITS SHOWCASE ───────────── */}
      <section id="kits" className="relative py-24 lg:py-32">
        {/* Subtle divider gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(76,110,245,0.3) 50%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
              Kit Library
            </p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">
              Pre-built agents for real workflows
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-400">
              Each Kit is a battle-tested agent configuration. Activate one in
              seconds and customize it to fit your workflow.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KITS.map((kit) => (
              <div
                key={kit.name}
                className="card group transition-colors hover:border-surface-700"
              >
                <div className="mb-4 text-3xl">{kit.icon}</div>
                <h3 className="text-base font-semibold text-white">
                  {kit.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-surface-400">
                  {kit.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {kit.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-800 px-2 py-0.5 text-xs text-surface-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/kits" className="btn-ghost text-brand-400 hover:text-brand-300">
              View all Kits
              <svg
                className="ml-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── PRICING ───────────── */}
      <section id="pricing" className="relative py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(76,110,245,0.3) 50%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
              Pricing
            </p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-surface-400">
              Start free for 14 days. No credit card required. Upgrade when
              you&apos;re ready.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`card relative flex flex-col ${
                  tier.highlighted
                    ? "border-brand-600 ring-1 ring-brand-600/50"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-info px-3 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-surface-400">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-surface-500">/month</span>
                  </div>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-surface-300"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-8 w-full py-2.5 text-center ${
                    tier.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="relative py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(76,110,245,0.3) 50%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
              FAQ
            </p>
            <h2 className="section-heading mt-3 text-3xl lg:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-12">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA FOOTER ───────────── */}
      <section className="relative py-24 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mx-auto max-w-3xl opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(76,110,245,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to let AI handle the{" "}
            <span className="gradient-text">busywork?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-surface-400">
            Join 12,000+ professionals who reclaimed their time with ClawKit.
            Start your 14-day free trial today &mdash; no credit card required.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-primary px-8 py-3 text-base">
              Get Started Free
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="#kits" className="btn-ghost text-surface-300">
              Explore Kits
            </Link>
          </div>

          <p className="mt-8 text-xs text-surface-600">
            Free 14-day trial &middot; No credit card required &middot; Cancel
            anytime
          </p>
        </div>
      </section>
    </div>
  );
}
