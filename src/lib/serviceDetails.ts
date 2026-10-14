// Service page copy from "Creatoos web content.docx". Accent words wrapped in *asterisks*.

type Group = { title: string; body: string };
export type ServiceDetail = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  includedTitle: string;
  included: Group[];
  extras?: { title: string; items: string[] };
  aiTitle: string;
  aiIntro?: string;
  ai: Group[];
  human: string;
  timeline?: { label: string; time: string }[];
  faqs: { q: string; a: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  branding: {
    metaTitle: "Branding Agency in Coimbatore | Brand Strategy & Identity - Creatoos",
    metaDescription: "Brand positioning, naming, messaging and identity systems for growing businesses. AI-accelerated research, human-led strategy. Free consultation.",
    h1: "Branding that starts with a *decision,* not a design",
    sub: "Every business gets one chance to be understood quickly. We build the language and the look that makes that happen - beginning with positioning, not with a logo sketch.",
    includedTitle: "What a branding engagement covers",
    included: [
      { title: "Brand strategy", body: "Positioning and value proposition · Audience and category research · Competitive landscape · Brand architecture" },
      { title: "Verbal identity", body: "Naming and tagline development · Messaging framework · Tone of voice guide · Key message hierarchy" },
      { title: "Visual identity", body: "Logo design and mark systems · Typography and colour systems · Photography and illustration direction · Brand guidelines document" },
      { title: "Applied brand", body: "Stationery and collateral · Packaging and labels · Signage and print · Social and campaign templates" },
    ],
    aiTitle: "Where AI speeds this up",
    ai: [
      { title: "Research in days, not weeks", body: "AI-assisted category analysis, competitor messaging teardowns and review mining across hundreds of customer comments - surfacing the exact language your market already uses." },
      { title: "More directions, seriously explored", body: "Our pipeline lets us explore far wider before narrowing, so the three routes you see are the survivors of a real selection process." },
      { title: "Naming at scale", body: "We generate and screen large name sets against domain availability, trademark risk indicators and pronunciation before a single option reaches you." },
      { title: "Applied brand, instantly", body: "Once the system is set, templates and collateral roll out in a fraction of the usual time." },
    ],
    human: "The positioning decision, the final mark, the tone judgement, and every word of the guidelines. AI widens the field. We choose.",
    timeline: [
      { label: "Week 1 - Discovery", time: "Stakeholder conversations, AI-assisted market scan" },
      { label: "Week 1-2 - Strategy", time: "Positioning, messaging, tone of voice" },
      { label: "Week 2-3 - Identity", time: "Logo routes, type and colour in context" },
      { label: "Week 3-4 - System", time: "Guidelines, template kit, file handover" },
    ],
    faqs: [
      { q: "How long does branding take?", a: "A logo and core kit takes 7 to 12 days. A full identity system with guidelines takes 3 to 4 weeks. Brand strategy with naming takes 4 to 6 weeks." },
      { q: "What's the difference between a logo and a brand identity?", a: "A logo is one mark. A brand identity is the complete system - logo, typography, colour, imagery, tone of voice and the rules for applying them consistently." },
      { q: "Do you do brand naming?", a: "Yes. We generate and screen name candidates against domain availability, trademark risk indicators and pronunciation, then present a shortlist with rationale." },
      { q: "Do I own the logo files?", a: "Yes. Full intellectual property, source files and every export format transfer to you on final payment." },
      { q: "Does AI design our logo?", a: "No. AI helps us explore a wider field of directions and accelerates research, but every mark we present is designed and refined by a human designer." },
    ],
  },

  "logo-design": {
    metaTitle: "Logo Design in Coimbatore | Professional Logo & Identity - Creatoos",
    metaDescription: "Professional logo design with multiple concepts, full file handover and a complete identity kit. Serving Coimbatore, Tiruppur, Erode and all of Tamil Nadu.",
    h1: "A logo that still works at *40 pixels*",
    sub: "Most logos are designed on a large screen and fall apart on a phone, on a signboard, or in a single colour. We design for the places yours will actually live.",
    includedTitle: "Every logo package includes",
    included: [
      { title: "Concepts", body: "Multiple distinct concepts, not colour variations of the same idea · Two rounds of refinement" },
      { title: "Versions", body: "Primary, secondary and icon-only versions · Horizontal and stacked layouts · Full colour, single colour and reversed variants" },
      { title: "Files", body: "Vector source files (AI, EPS, SVG) · Web formats (PNG, JPG, SVG)" },
      { title: "Rules", body: "Clear-space and minimum-size rules · Colour codes in HEX, RGB, CMYK and Pantone" },
    ],
    aiTitle: "How AI makes this better, not cheaper-looking",
    ai: [
      { title: "Wider exploration before narrowing", body: "AI-assisted ideation surveys symbol categories, construction approaches and competitor whitespace, so we reach strong directions faster." },
      { title: "Context previews in minutes", body: "See the mark on a signboard, a business card, an app icon, a delivery box and an Instagram profile before you approve anything." },
      { title: "Variant generation", body: "Once the mark is locked, all layouts, colourways and file formats are produced systematically." },
    ],
    human: "The mark itself is drawn by a designer. Every curve, every proportion, every optical adjustment. We do not sell AI-generated logos.",
    timeline: [
      { label: "Logo design (3 concepts, 2 revisions)", time: "7 to 12 days" },
      { label: "Logo with core brand kit", time: "10 to 14 days" },
      { label: "Full identity system", time: "3 to 4 weeks" },
    ],
    faqs: [
      { q: "How many logo concepts do I get?", a: "Three genuinely distinct concepts, each with a short rationale. Two rounds of refinement are included on your chosen direction." },
      { q: "What file formats do you deliver?", a: "Vector source files (AI, EPS, SVG) plus web-ready PNG and JPG in every layout and colourway." },
      { q: "Can you redesign an existing logo?", a: "Yes. We start by assessing what equity is worth keeping - recognition you've built is an asset." },
      { q: "How long does logo design take?", a: "A logo with two revision rounds takes 7 to 12 days. Adding a core brand kit extends it to around two weeks." },
    ],
  },

  "web-development": {
    metaTitle: "Web Development Company in Coimbatore | Websites & E-commerce - Creatoos",
    metaDescription: "Fast, search-ready websites and e-commerce stores. Built for speed and structure, with full handover of code and admin access.",
    h1: "Websites built to be *found,* not just admired",
    sub: "A beautiful site nobody finds is an expensive brochure. We build for speed, structure and search from the first line - then hand you the keys.",
    includedTitle: "From validation to platform",
    included: [
      { title: "Landing pages", body: "Single-page sites to validate an idea, support a campaign or capture leads. Live in under a week." },
      { title: "Business websites", body: "Five to eight pages covering who you are, what you offer and how to reach you. Fast, mobile-first and search-ready." },
      { title: "CMS websites", body: "Content-managed builds with blogs and structured content, so your team can publish without calling a developer." },
      { title: "E-commerce stores", body: "Shopify and WooCommerce builds with catalogue setup, payments, shipping logic and conversion optimisation." },
      { title: "Custom web applications", body: "Portals, dashboards, booking systems and SaaS front-ends built to a specification." },
      { title: "Website redesigns", body: "Rebuilding an existing site without losing the search equity you've already earned." },
    ],
    extras: {
      title: "What's always included",
      items: ["Mobile-first responsive build", "Core Web Vitals optimisation", "On-page SEO and schema markup", "SSL, security hardening and backups", "Google Analytics and Search Console", "Contact forms and WhatsApp integration", "Admin training session", "Full handover of code and credentials"],
    },
    aiTitle: "Where AI shortens the build",
    ai: [
      { title: "Content ready when design is", body: "We draft every page - headings, body, meta descriptions, alt text - alongside the design, then edit it properly. Launch dates stop slipping." },
      { title: "Layout exploration", body: "Multiple structural approaches for key pages, reviewed before committing." },
      { title: "Faster, cleaner code", body: "AI handles boilerplate and scaffolding, leaving developers on logic and performance." },
      { title: "Built-in QA", body: "Automated accessibility, broken link, image weight, Core Web Vitals and mobile checks run through the whole build." },
      { title: "Search structure from day one", body: "Schema, heading hierarchy, internal linking and answer-formatted content - which also makes the site retrievable by AI answer engines." },
    ],
    human: "Every page of copy is edited. Every template is tested on real devices. Nothing ships on trust.",
    timeline: [
      { label: "Landing page", time: "5 to 8 days" },
      { label: "Business website, 5-8 pages", time: "2 to 3 weeks" },
      { label: "CMS website with blog", time: "3 to 5 weeks" },
      { label: "E-commerce store", time: "4 to 8 weeks" },
      { label: "Custom web application", time: "8 to 16 weeks" },
    ],
    faqs: [
      { q: "How long does it take to build a website?", a: "A landing page takes 5 to 8 days. A business website takes 2 to 3 weeks. A CMS build takes 3 to 5 weeks. An e-commerce store takes 4 to 8 weeks." },
      { q: "Do I own the website and code?", a: "Yes. All code, design files, hosting access and admin credentials transfer to you on final payment. You are never locked in." },
      { q: "Will my website rank on Google?", a: "We build the foundation: technical health, page speed, schema, heading structure and keyword-mapped content. Ranking also depends on ongoing content and off-page work, which our SEO retainer covers." },
      { q: "Do you offer website maintenance?", a: "Yes, as an annual maintenance contract covering updates, security patches, backups and a monthly allowance of content changes." },
      { q: "Can you redesign my existing website?", a: "Yes. We audit what's currently working and carry that equity into the new build rather than starting from zero." },
    ],
  },

  "app-development": {
    metaTitle: "Mobile App Development in Coimbatore | iOS & Android Apps - Creatoos",
    metaDescription: "Hybrid and native mobile app development. Built to launch, tested on real devices, full source code handover.",
    h1: "Apps built to *launch,* not to demo",
    sub: "Most app projects die between the prototype and the app store. We scope tightly, build in visible increments, and get you to a real release.",
    includedTitle: "Mobile and product development",
    included: [
      { title: "MVP applications", body: "The smallest version that proves the idea, built to be extended rather than rewritten." },
      { title: "Hybrid apps", body: "One codebase, both platforms. The right choice for most businesses." },
      { title: "Native applications", body: "Where performance, device features or platform conventions demand it." },
      { title: "Admin dashboards", body: "The back office that makes the app manageable." },
      { title: "Integrations", body: "Payments, WhatsApp Business API, maps, logistics, CRM and ERP systems." },
      { title: "App store submission", body: "Listing copy, screenshots, review handling and release management." },
    ],
    aiTitle: "Where AI accelerates development",
    ai: [
      { title: "Specification before code", body: "AI-assisted requirement analysis pressure-tests your brief - surfacing edge cases, missing states and dependencies while changes are cheap." },
      { title: "Faster scaffolding", body: "Boilerplate, data models, API layers and repetitive UI are AI-assisted, freeing developers for architecture." },
      { title: "Test coverage that exists", body: "Test cases generated across user flows and edge conditions, then reviewed and extended by our QA." },
      { title: "Store listing assets", body: "Screenshots, descriptions and keyword sets produced in a fraction of the usual time." },
    ],
    human: "Architecture decisions, security review, performance tuning and every line that touches payments or user data.",
    timeline: [
      { label: "Mobile app MVP (hybrid, iOS + Android)", time: "8 to 14 weeks" },
      { label: "Native mobile application", time: "14 to 24 weeks" },
      { label: "Admin dashboard / web portal", time: "6 to 10 weeks" },
    ],
    faqs: [
      { q: "Should I build hybrid or native?", a: "Hybrid suits most businesses - one codebase, both platforms, lower cost and faster to market. Native makes sense for heavy device features or high graphics performance." },
      { q: "How long does it take to build an app?", a: "A hybrid MVP takes 8 to 14 weeks. Native applications take 14 to 24 weeks." },
      { q: "Do you handle App Store and Play Store submission?", a: "Yes. Listing assets, store optimisation, submission and the review process, including resubmissions." },
      { q: "Do I get the source code?", a: "Yes. Full source code, repositories and deployment credentials transfer to you on final payment." },
      { q: "Do you provide support after launch?", a: "Yes, under a monthly support agreement covering bug fixes, OS compatibility updates and minor enhancements." },
    ],
  },

  "digital-marketing": {
    metaTitle: "Digital Marketing Agency in Coimbatore | Meta & Google Ads - Creatoos",
    metaDescription: "Performance marketing with weekly creative testing. Meta and Google campaigns, landing pages and funnel design, reported in plain language.",
    h1: "Campaigns measured weekly, reported in *plain* language",
    sub: "Most agencies show you a dashboard. We show you what we changed, what it did, and what we're changing next.",
    includedTitle: "Performance marketing, end to end",
    included: [
      { title: "Paid campaigns", body: "Meta and Google Search, Display, Shopping and YouTube. Account structure, audiences and budget pacing." },
      { title: "Creative production", body: "Static, carousel, video and reel formats at the volume testing requires." },
      { title: "Landing pages", body: "Purpose-built pages, because sending paid traffic to a homepage wastes most of it." },
      { title: "Funnel design", body: "The path from first impression to enquiry to customer, mapped and instrumented." },
      { title: "Conversion optimisation", body: "A/B testing on pages, offers and forms." },
      { title: "Reporting", body: "Monthly, written, in plain English. What worked, what didn't, what changes next." },
    ],
    aiTitle: "The testing advantage",
    aiIntro: "A traditional agency produces two or three ad creatives a month. With two, you can't tell whether the message or the targeting is wrong. Our pipeline produces twenty variants a week - we launch, measure, kill the losers and scale the winners.",
    ai: [
      { title: "Audience research", body: "Review mining and social listening to find the language your customers already use." },
      { title: "Copy variants", body: "Headlines and body matched to each audience segment rather than one message for everyone." },
      { title: "Landing page variants", body: "Multiple versions built and tested in parallel." },
      { title: "Budget anomaly detection", body: "Automated alerts when spend or performance moves unexpectedly - caught in hours, not at month end." },
    ],
    human: "Strategy, budget allocation, brand safety, and the decision about what a result actually means.",
    faqs: [
      { q: "Do you charge a percentage of ad spend?", a: "No. We charge a flat monthly retainer. A percentage model rewards an agency for spending more of your money." },
      { q: "How soon will I see results?", a: "Data immediately, meaningful optimisation within 3 to 4 weeks, reliable patterns by month two or three." },
      { q: "Is ad spend included in the retainer?", a: "No. Ad spend is paid directly by you to Meta or Google. The money stays under your control." },
      { q: "What's the minimum engagement?", a: "Three months. Paid campaigns need that long to accumulate enough data to optimise properly." },
      { q: "Do you work with businesses that have never run ads?", a: "Yes. We start with account structure and tracking, then move to testing once measurement is right." },
    ],
  },

  "social-media": {
    metaTitle: "Social Media Management in Coimbatore | Content & Community - Creatoos",
    metaDescription: "Content calendars, production and community management. 12 to 20 posts monthly across your key platforms, written to sound like a person.",
    h1: "Content that sounds like a *person,* not a brand guideline",
    sub: "Anyone can fill a calendar. The difference is whether your audience stops scrolling - and that comes down to whether it sounds like someone they'd actually listen to.",
    includedTitle: "Every month you get",
    included: [
      { title: "Planned calendar", body: "Content calendar planned and approved in advance, with festival and local moments covered ahead of time." },
      { title: "12 to 20 posts", body: "Static, carousel and reel or short-video formats across two or three platforms." },
      { title: "Community management", body: "Comments, DMs and response templates, with escalation to you on anything that needs a business decision." },
      { title: "Monthly report", body: "Performance, and what changes next." },
    ],
    extras: { title: "Platforms", items: ["Instagram", "Facebook", "LinkedIn", "YouTube Shorts", "WhatsApp Channels", "X"] },
    aiTitle: "Volume without the sameness",
    aiIntro: "The honest problem with AI social content is that it all sounds the same. Here's how we avoid that.",
    ai: [
      { title: "Voice first", body: "We build a documented brand voice from your own words - the phrases you use, the ones you'd never use. That document drives everything." },
      { title: "Generate wide, cut hard", body: "For every post that ships, several were considered and rejected." },
      { title: "Visual production at pace", body: "Product, lifestyle and festival creatives without a photoshoot for every campaign." },
      { title: "Trend response in hours", body: "When something relevant breaks, we can produce and ship the same day." },
    ],
    human: "Every post is read by a human before it goes out. That's the whole point.",
    faqs: [
      { q: "How many posts do I get per month?", a: "Between 12 and 20 across two or three platforms, including static posts, carousels and reels." },
      { q: "Do you handle comments and messages?", a: "Yes, within agreed hours using approved templates, escalating anything that needs a business decision." },
      { q: "Can you work with our existing brand guidelines?", a: "Yes. If you don't have any, we build a brand voice document during onboarding." },
      { q: "Do you produce video content?", a: "Yes. Reels and short-form video are included in the standard retainer." },
      { q: "What's the minimum engagement?", a: "Three months. Social media compounds slowly." },
    ],
  },

  seo: {
    metaTitle: "SEO Services in Coimbatore | Technical, Local & Content SEO - Creatoos",
    metaDescription: "SEO built on technical health, content operations and local search - including AI answer-engine visibility tracking.",
    h1: "SEO that *survives* the next algorithm update",
    sub: "We don't chase tactics. We fix the foundation, publish content people actually want, and build the signals that hold up over time.",
    includedTitle: "Four pillars",
    included: [
      { title: "Technical SEO", body: "Site health audit · Core Web Vitals · Crawlability and indexation · Schema markup · Mobile usability · Redirects and canonicals" },
      { title: "On-page SEO", body: "Keyword research and mapping · Titles and meta · Heading structure · Internal linking · Content gaps · Image alt text" },
      { title: "Content operations", body: "Editorial calendar · Blog and resource articles · Service and location pages · Refreshing declining pages" },
      { title: "Off-page and local", body: "Citations · Google Business Profile · Local landing pages · Review strategy · Digital PR and links" },
    ],
    aiTitle: "Where AI does the heavy lifting",
    ai: [
      { title: "Research at scale", body: "Thousands of keywords clustered by intent and mapped against competitor coverage - in hours rather than weeks." },
      { title: "Content briefs, not content dumps", body: "AI assembles the research behind every piece. A human writer writes it." },
      { title: "Continuous technical auditing", body: "Issues caught within days rather than in a quarterly audit." },
      { title: "Internal linking and competitor monitoring", body: "Opportunities across the whole site, and competitor moves tracked automatically." },
    ],
    human: "We do not publish unedited generated content. Every piece is written and edited by people.",
    faqs: [
      { q: "How long does SEO take to work?", a: "Technical fixes can show effect within weeks. Content and authority typically move between months three and six." },
      { q: "Do you guarantee rankings?", a: "No, and neither should anyone else. We commit to the work, report transparently, and show movement against a tracked keyword set." },
      { q: "What's included in a monthly SEO retainer?", a: "Technical maintenance, 4 to 8 content pieces, on-page and off-page work, AI answer-engine tracking and a monthly report." },
      { q: "Do you do local SEO for Coimbatore businesses?", a: "Yes. Google Business Profile, local citations, location pages and review strategy." },
      { q: "Is AEO included in your SEO service?", a: "Yes. AI search optimisation runs inside the SEO retainer because the two share a foundation." },
    ],
  },

  "ai-search": {
    metaTitle: "AEO & GEO Services | Get Cited in ChatGPT, Gemini & Perplexity - Creatoos",
    metaDescription: "AI search optimisation for brands. Get found inside ChatGPT, Gemini, Perplexity and Google AI Overviews, with tracked prompt-set reporting.",
    h1: "Your customers are asking *AI.* Does it mention you?",
    sub: "Discovery is moving from search results to AI-generated answers. A brand absent from those answers is invisible at exactly the moment someone is deciding.",
    includedTitle: "The AEO and GEO programme",
    included: [
      { title: "01 Baseline audit", body: "A tracked set of realistic customer prompts run across ChatGPT, Gemini, Perplexity and Google AI Overviews - where you appear, where competitors appear." },
      { title: "02 Entity and schema foundation", body: "Structured data, knowledge-panel alignment and consistent entity signals so models can identify who you are." },
      { title: "03 Answer-shaped content", body: "FAQ blocks, definitions, comparisons and structured explanations written the way retrieval systems parse information." },
      { title: "04 Citation building", body: "Placement on the directories, review platforms and publications these models actually draw from." },
      { title: "05 Monthly visibility reporting", body: "The same prompt set re-run every month, so you see whether citations are moving." },
    ],
    aiTitle: "Using AI to optimise for AI",
    aiIntro: "A buyer used to scan ten blue links. Now they ask an AI and get one answer naming two or three options. If you're not among them, there's no second page to be on - and these systems favour sources they already recognise.",
    ai: [
      { title: "Prompt testing at scale", body: "Running prompt sets across hundreds of queries and models." },
      { title: "Citation pattern analysis", body: "Reverse-engineering which sources get cited, and why." },
    ],
    human: "Deciding what to build, what content will earn citation, and how to read a shift in the data - that's judgement, and it's where the value sits.",
    faqs: [
      { q: "What is AEO?", a: "Answer Engine Optimisation - making a brand visible and citable inside AI-generated answers from systems like ChatGPT, Gemini and Perplexity." },
      { q: "What is GEO?", a: "Generative Engine Optimisation. The terms are largely interchangeable; both mean being present in the answer, not just the results page." },
      { q: "How is AEO different from SEO?", a: "SEO optimises for ranking positions. AEO optimises for being cited inside a synthesised answer, relying more on entity clarity, structured data and third-party citation." },
      { q: "Can you guarantee my brand appears in ChatGPT?", a: "No. These systems are non-deterministic. We build the signals that make citation likely and show measured movement month over month." },
      { q: "Is it too early to invest in AEO?", a: "The opposite. Brands establishing citation patterns now benefit disproportionately later." },
    ],
  },

  strategy: {
    metaTitle: "Brand & Market Strategy Consulting | Research-Led - Creatoos Coimbatore",
    metaDescription: "Market research, competitor teardowns, customer insight and go-to-market planning. AI-accelerated research, human-led strategy.",
    h1: "The work *before* the work",
    sub: "Most wasted marketing spend traces back to a decision made without evidence. Research is cheaper than the campaign it saves you from running.",
    includedTitle: "Four research engagements",
    included: [
      { title: "Market and category study", body: "Size, structure, pricing norms, segment behaviour and where a new entrant can credibly stand." },
      { title: "Competitor teardown", body: "Positioning, messaging, pricing, channel presence, ad library analysis - and the gaps nobody is claiming." },
      { title: "Customer insight", body: "Review mining, interview synthesis and personas grounded in the language your customers actually use." },
      { title: "Go-to-market plan", body: "Channel priorities, budget shape, content themes and a first-90-days calendar." },
    ],
    aiTitle: "Research that used to be out of reach",
    aiIntro: "Proper market research used to require a team and a budget most growing businesses don't have. Now it doesn't.",
    ai: [
      { title: "Review mining", body: "Thousands of category reviews analysed for recurring language, unmet needs and frustrations." },
      { title: "Competitor mapping", body: "Every competitor's active advertising, messaging and positioning mapped in days." },
      { title: "Synthesis", body: "Interview transcripts, support tickets and sales notes turned into patterns rather than anecdotes." },
    ],
    human: "AI finds the patterns. Deciding what they mean, what to do about them, and what to ignore - that is the work.",
    timeline: [
      { label: "Competitor teardown", time: "1 to 2 weeks" },
      { label: "Market and category study", time: "3 to 5 weeks" },
      { label: "Brand strategy and positioning", time: "4 to 6 weeks" },
      { label: "Go-to-market plan", time: "2 to 3 weeks" },
    ],
    faqs: [
      { q: "What do I actually receive?", a: "A written report with findings and recommendations, a presentation session, and the underlying data." },
      { q: "Do I need research if I already know my market?", a: "Often you know your customers well and your category less well. Competitors shift position while everyone assumes the landscape is static." },
      { q: "Can research be combined with a branding project?", a: "Yes, and it usually should be. Research runs as the discovery phase." },
    ],
  },
};
