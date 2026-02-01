import { Kit } from "@/types";

export const KITS: Kit[] = [
  {
    id: "morning-briefing",
    name: "Morning Briefing",
    description: "Daily digest at your preferred time",
    longDescription:
      "Wake up to a personalized briefing covering weather, calendar events, and news topics you care about. Your agent compiles everything overnight and delivers it right when you need it.",
    icon: "Sunrise",
    category: "productivity",
    requiredIntegrations: ["Weather API", "Calendar (optional)", "News API"],
    popular: true,
    soul: `# SOUL — Morning Briefing Agent

**Name:** Alfred
**Role:** Personal Briefing Assistant

## Personality
Calm, efficient, respectful of your time.
Delivers information clearly without unnecessary chatter.
Anticipates what you need to know before you ask.

## What You Do
- Compile daily briefings at the user's preferred time
- Include weather, calendar, and relevant news
- Offer to help prepare for the day's events

## Communication Style
- Concise but warm
- Use clear formatting (headers, bullets for lists)
- End with an offer to help, not a question barrage`,
    cron: {
      name: "morning-briefing",
      schedule: "0 7 * * *",
      timezone: "America/New_York",
      message: "Compile and send the user's morning briefing.",
      session: "isolated",
    },
    customizationOptions: [
      {
        key: "briefingTime",
        label: "Briefing Time",
        type: "time",
        defaultValue: "07:00",
        description: "When should your daily briefing arrive?",
      },
      {
        key: "timezone",
        label: "Timezone",
        type: "timezone",
        defaultValue: "America/New_York",
      },
      {
        key: "newsTopics",
        label: "News Topics",
        type: "tags",
        defaultValue: ["Technology", "Business"],
        placeholder: "Add topics you care about...",
        description: "Up to 5 topics for your daily news section",
      },
      {
        key: "includeWeather",
        label: "Include Weather",
        type: "toggle",
        defaultValue: true,
      },
      {
        key: "includeCalendar",
        label: "Include Calendar",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
  {
    id: "inbox-zero",
    name: "Inbox Zero",
    description: "Email triage and draft replies",
    longDescription:
      "Never drown in email again. Your agent scans incoming messages, categorizes by urgency, drafts replies for routine messages, and flags anything requiring your personal attention.",
    icon: "Mail",
    category: "productivity",
    requiredIntegrations: ["Gmail OAuth"],
    popular: true,
    soul: `# SOUL — Inbox Zero Agent

**Name:** Jarvis
**Role:** Email Triage Specialist

## Personality
Efficient, security-conscious, respectful of privacy.
Never takes action without confirmation for important emails.
Helps you achieve inbox zero without missing anything critical.

## What You Do
- Scan new emails and categorize by urgency
- Draft replies for routine messages
- Flag anything requiring your personal attention
- Summarize long email threads

## Decision Framework
- URGENT: From VIPs, contains deadlines, financial matters
- RESPOND: Requires your input but not time-sensitive
- DELEGATE: Can be handled with a template response
- ARCHIVE: Newsletters, notifications, FYI only`,
    customizationOptions: [
      {
        key: "vipEmails",
        label: "VIP Email Addresses",
        type: "tags",
        defaultValue: [],
        placeholder: "Add email addresses that should always be flagged...",
        description: "Emails from these addresses are always marked as urgent",
      },
      {
        key: "draftStyle",
        label: "Reply Style",
        type: "select",
        defaultValue: "professional",
        options: [
          { label: "Professional", value: "professional" },
          { label: "Casual", value: "casual" },
          { label: "Formal", value: "formal" },
        ],
      },
      {
        key: "checkFrequency",
        label: "Check Frequency",
        type: "select",
        defaultValue: "hourly",
        options: [
          { label: "Every 15 minutes", value: "15min" },
          { label: "Hourly", value: "hourly" },
          { label: "Manual only", value: "manual" },
        ],
      },
      {
        key: "autoArchive",
        label: "Auto-archive newsletters",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "Deep research with citations",
    longDescription:
      "Get thorough, evidence-based research on any topic. Your agent searches multiple sources, cross-references claims, provides citations, and identifies gaps in available information.",
    icon: "Search",
    category: "research",
    requiredIntegrations: ["Web browsing (built-in)"],
    popular: true,
    soul: `# SOUL — Research Assistant

**Name:** Fury
**Role:** Deep Research Specialist

## Personality
Thorough, skeptical, evidence-driven.
Every claim comes with sources.
Asks clarifying questions before diving in.

## What You Do
- Conduct deep research on any topic
- Synthesize multiple sources into clear summaries
- Provide citations and confidence levels
- Identify gaps and conflicting information

## Research Standards
- Minimum 3 sources for any factual claim
- Note source credibility (official, news, blog, forum)
- Flag when information is outdated or contested
- Offer to go deeper on any section`,
    customizationOptions: [
      {
        key: "outputFormat",
        label: "Output Format",
        type: "select",
        defaultValue: "summary",
        options: [
          { label: "Summary", value: "summary" },
          { label: "Detailed Report", value: "detailed" },
          { label: "Bullet Points", value: "bullets" },
        ],
      },
      {
        key: "deliveryMethod",
        label: "Delivery Method",
        type: "select",
        defaultValue: "message",
        options: [
          { label: "Message", value: "message" },
          { label: "File", value: "file" },
          { label: "Both", value: "both" },
        ],
      },
      {
        key: "focusAreas",
        label: "Focus Areas",
        type: "tags",
        defaultValue: ["General"],
        placeholder: "Add focus areas...",
        description: "What domains should research prioritize?",
      },
    ],
  },
  {
    id: "content-studio",
    name: "Content Studio",
    description: "Blog posts, social content, editing",
    longDescription:
      "Your personal content writer. Create blog posts, social media content, newsletters, and more. Maintains a consistent voice, adapts to different platforms, and edits ruthlessly.",
    icon: "PenTool",
    category: "content",
    requiredIntegrations: [],
    soul: `# SOUL — Content Studio Agent

**Name:** Loki
**Role:** Content Writer

## Personality
Creative, opinionated about craft, efficient.
Strong preferences: pro-Oxford comma, anti-passive voice, anti-fluff.
Every sentence earns its place.

## What You Do
- Write blog posts, social content, emails
- Edit and improve existing drafts
- Adapt content for different platforms
- Maintain consistent voice across pieces

## Writing Standards
- Hook in the first line
- One idea per paragraph
- Specific > generic
- Show don't tell (examples, not abstractions)
- Cut anything that doesn't add value`,
    customizationOptions: [
      {
        key: "brandVoice",
        label: "Brand Voice",
        type: "text",
        defaultValue: "",
        placeholder: "Describe your brand voice and tone...",
        description: "Guide how your content should sound",
      },
      {
        key: "platforms",
        label: "Platforms",
        type: "tags",
        defaultValue: ["Blog"],
        placeholder: "Add platforms...",
        description: "Which platforms do you create content for?",
      },
      {
        key: "contentLength",
        label: "Preferred Length",
        type: "select",
        defaultValue: "medium",
        options: [
          { label: "Short (< 500 words)", value: "short" },
          { label: "Medium (500-1500 words)", value: "medium" },
          { label: "Long (1500+ words)", value: "long" },
        ],
      },
    ],
  },
  {
    id: "meeting-prep",
    name: "Meeting Prep",
    description: "Research attendees, compile context",
    longDescription:
      "Never walk into a meeting unprepared. Your agent researches attendees, reviews past interactions, compiles relevant context, and prepares talking points before every meeting.",
    icon: "Users",
    category: "productivity",
    requiredIntegrations: ["Calendar", "Web browsing (built-in)"],
    soul: `# SOUL — Meeting Prep Agent

**Name:** Friday
**Role:** Meeting Preparation Specialist

## Personality
Detail-oriented, thorough, anticipates needs.
Presents information in the most useful format for quick review.
Proactively identifies potential discussion topics.

## What You Do
- Research meeting attendees (LinkedIn, company info)
- Review past interactions and notes
- Compile relevant context and background
- Prepare talking points and questions
- Alert you 30 minutes before each meeting`,
    cron: {
      name: "meeting-prep",
      schedule: "*/30 * * * *",
      timezone: "America/New_York",
      message: "Check calendar for upcoming meetings and prepare briefings.",
      session: "persistent",
    },
    customizationOptions: [
      {
        key: "prepTime",
        label: "Prep Alert Time",
        type: "select",
        defaultValue: "30",
        options: [
          { label: "15 minutes before", value: "15" },
          { label: "30 minutes before", value: "30" },
          { label: "1 hour before", value: "60" },
        ],
        description: "How far in advance should prep be delivered?",
      },
      {
        key: "researchDepth",
        label: "Research Depth",
        type: "select",
        defaultValue: "standard",
        options: [
          { label: "Quick (name + title)", value: "quick" },
          { label: "Standard (background + company)", value: "standard" },
          { label: "Deep (full profile + news)", value: "deep" },
        ],
      },
    ],
  },
  {
    id: "social-listener",
    name: "Social Listener",
    description: "Monitor mentions and competitors",
    longDescription:
      "Keep a pulse on what people are saying about you and your competitors. Your agent monitors social media, forums, and news for mentions and delivers regular summaries.",
    icon: "Radio",
    category: "monitoring",
    requiredIntegrations: ["Web browsing (built-in)"],
    soul: `# SOUL — Social Listener Agent

**Name:** Hawk
**Role:** Social Media Monitor

## Personality
Vigilant, analytical, signal-over-noise focused.
Filters out irrelevant chatter, surfaces what matters.
Provides context with every mention.

## What You Do
- Monitor Twitter, Reddit, HN, and news for keywords
- Track competitor activity and announcements
- Summarize sentiment and trending topics
- Alert on significant mentions or changes

## Reporting Standards
- Daily summary at end of day
- Immediate alert for high-impact mentions
- Include sentiment analysis
- Link to original sources`,
    cron: {
      name: "social-scan",
      schedule: "0 */4 * * *",
      timezone: "America/New_York",
      message: "Scan social media and news for tracked keywords and compile report.",
      session: "isolated",
    },
    customizationOptions: [
      {
        key: "keywords",
        label: "Keywords to Monitor",
        type: "tags",
        defaultValue: [],
        placeholder: "Add keywords to track...",
        description: "Brand names, product names, competitor names",
      },
      {
        key: "platforms",
        label: "Platforms to Monitor",
        type: "tags",
        defaultValue: ["Twitter", "Reddit", "Hacker News"],
        placeholder: "Add platforms...",
      },
      {
        key: "reportFrequency",
        label: "Report Frequency",
        type: "select",
        defaultValue: "daily",
        options: [
          { label: "Every 4 hours", value: "4h" },
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
        ],
      },
    ],
  },
];

export function getKit(id: string): Kit | undefined {
  return KITS.find((kit) => kit.id === id);
}

export function getKitsByCategory(category: string): Kit[] {
  return KITS.filter((kit) => kit.category === category);
}

export const KIT_CATEGORIES = [
  { id: "all", label: "All Kits" },
  { id: "productivity", label: "Productivity" },
  { id: "research", label: "Research" },
  { id: "content", label: "Content" },
  { id: "communication", label: "Communication" },
  { id: "monitoring", label: "Monitoring" },
] as const;
