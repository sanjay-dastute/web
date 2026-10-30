// Digital marketing offer, from "Creatoos_Digital_Marketing_Proposal_2026.pdf".
// Prices are starting prices per project per month; update here and every page follows.

/** Results from live client accounts (proposal p.2). */
export const proofStats = [
  { value: "1.1M+", label: "Views generated", note: "Meta ads + organic reels" },
  { value: "1000+", label: "Leads and enquiries", note: "Meta + Google Ads" },
  { value: "INR 50", label: "Best cost per lead", note: "Education client, Meta lead ads" },
  { value: "10.0%", label: "Google Ads CTR", note: "Hospitality client, INR 2.95 per click" },
  { value: "56x", label: "Follower growth", note: "Retail client: 50 to 2,849" },
  { value: "< INR 10", label: "Per WhatsApp chat", note: "Retail client campaigns" },
];

/** Sectors with live client accounts (proposal p.2). */
export const clientSectors = [
  { title: "Education", body: "Study-abroad consultancies, education finance" },
  { title: "Hospitality", body: "Resorts, hotels, serviced apartments" },
  { title: "Retail & Jewellery", body: "Jewellery showrooms, home decor, fashion" },
  { title: "FinTech & Healthcare", body: "Payments, disability support, Ayurveda clinics" },
];

/** Partnership objectives (proposal p.3). */
export const objectives = [
  { n: "01", title: "Visibility", body: "Be found on Google, Instagram, Facebook and YouTube by people already searching for what you offer." },
  { n: "02", title: "Engagement", body: "Build an audience that watches, follows and trusts your brand through consistent, quality content." },
  { n: "03", title: "Leads & sales", body: "Turn attention into calls, WhatsApp chats, form leads, store visits and bookings." },
  { n: "04", title: "Measurable ROI", body: "Track every rupee of ad spend against leads and cost per lead, reported monthly." },
];

export const funnel = [
  { stage: "Awareness", tools: "Reels, ads, SEO" },
  { stage: "Interest", tools: "Content, retargeting" },
  { stage: "Enquiry", tools: "Lead forms, WhatsApp, calls" },
  { stage: "Customer", tools: "Follow-up, reviews, repeat" },
];

export const idealFor =
  "Schools & consultancies, hotels & stays, jewellery & retail stores, clinics, real estate, D2C brands and local service businesses.";

/** The 16 digital marketing services (proposal p.4). */
export const dmServices = [
  { code: "SM", title: "Social Media Management", body: "Instagram, Facebook, LinkedIn, YouTube" },
  { code: "CR", title: "Creative & Content Design", body: "Posts, carousels, festive and offer creatives" },
  { code: "VD", title: "Reels & Video Production", body: "Shoot, script, edit, motion graphics" },
  { code: "MA", title: "Meta Ads", body: "Facebook & Instagram lead, sales and WhatsApp ads" },
  { code: "GA", title: "Google Ads", body: "Search, Display, YouTube and Performance Max" },
  { code: "SE", title: "SEO", body: "On-page, technical, local and off-page SEO" },
  { code: "AI", title: "AEO & GEO", body: "Visibility in AI answers: ChatGPT, Gemini, Google AI" },
  { code: "GB", title: "Google Business Profile", body: "Local listing, posts, reviews, map ranking" },
  { code: "WA", title: "WhatsApp Marketing", body: "Click-to-WhatsApp ads, broadcasts, catalogue" },
  { code: "EM", title: "Email & SMS Marketing", body: "Newsletters, offers and follow-up sequences" },
  { code: "LP", title: "Website & Landing Pages", body: "Lead-focused pages, speed, tracking set-up" },
  { code: "IN", title: "Influencer Marketing", body: "Local creators, collaborations, UGC" },
  { code: "OR", title: "Online Reputation", body: "Review management and response" },
  { code: "BR", title: "Branding Support", body: "Logo refresh, brand kit, print & billboards" },
  { code: "AN", title: "Analytics & Reporting", body: "Pixel, GA4, conversion tracking, monthly reports" },
  { code: "ST", title: "Strategy & Consulting", body: "Market research, competitor study, planning" },
];

/** Scope of work, three groups of three (proposal pp.5-7). */
export const scopeOfWork = [
  {
    group: "Content, social media & creative",
    columns: [
      { code: "SM", title: "Social Media Management", items: ["Monthly content calendar, approved before posting", "Posting and scheduling on all agreed platforms", "Captions, hashtags and Tamil/English copy", "Profile optimisation: bio, highlights, links", "Comment and DM monitoring with your team", "Festival, offer and topical posts"] },
      { code: "CR", title: "Creative & Content Design", items: ["Static posts, carousels and stories", "Ad creatives in multiple sizes for testing", "Offer banners, posters and flyers", "Brand-consistent templates", "Creative refresh when ads fatigue", "Source files shared on request"] },
      { code: "VD", title: "Reels & Video Production", items: ["Reel concepts and scripts", "On-location shoot (Coimbatore; outstation extra)", "Editing, subtitles, music, motion graphics", "Testimonial and founder-led videos", "Product demos and walkthroughs", "YouTube Shorts adaptation"] },
    ],
  },
  {
    group: "Paid advertising & lead generation",
    columns: [
      { code: "MA", title: "Meta Ads (Facebook & Instagram)", items: ["Ad account and Business Manager set-up", "Pixel / Conversions API installation", "Audience research and targeting", "Lead form, WhatsApp, traffic and sales campaigns", "A/B testing of creatives and audiences", "Daily monitoring and budget optimisation", "Retargeting of visitors and engagers"] },
      { code: "GA", title: "Google Ads", items: ["Keyword research and campaign structure", "Search ads with call and location assets", "Display, YouTube and Performance Max", "Conversion tracking via GA4 / Tag Manager", "Negative keyword and bid management", "Landing page recommendations"] },
      { code: "WA", title: "WhatsApp, Email & SMS", items: ["Click-to-WhatsApp ad campaigns", "WhatsApp Business profile and catalogue set-up", "Broadcast message templates", "Email newsletters and offer campaigns", "Lead follow-up sequences", "Lead sheet / CRM hand-off to your sales team"] },
    ],
  },
  {
    group: "Search, website, reputation & reporting",
    columns: [
      { code: "SE", title: "SEO, AEO & GEO", items: ["Website SEO audit and keyword plan", "On-page optimisation of key pages", "SEO blog articles each month", "Local SEO and citations", "Backlinks and off-page activity", "FAQ and schema for AI-search visibility"] },
      { code: "GB", title: "Google Business Profile & Reputation", items: ["Profile set-up and verification support", "Weekly posts, photos and offers", "Review requests and response drafting", "Q&A and listing accuracy checks", "Map-ranking improvement for local searches"] },
      { code: "AN", title: "Analytics, Reporting & Strategy", items: ["Monthly performance report with charts", "Leads, cost per lead, reach and ROI tracking", "Monthly review call with recommendations", "Competitor and market tracking", "Quarterly strategy refresh", "Dedicated account manager"] },
    ],
  },
];

/** 30-day launch plan (proposal p.8). */
export const launchPlan = [
  { when: "Week 1", title: "Discover & set up", body: "Brand study, competitor research, account access, pixel and tracking set-up." },
  { when: "Week 2", title: "Plan & create", body: "Strategy, content calendar, first batch of creatives and reels for approval." },
  { when: "Weeks 3-4", title: "Launch & test", body: "Content goes live; ads launch with small test budgets on 2-3 creatives." },
  { when: "Month 2", title: "Optimise & scale", body: "Shift budget to winning ads, refine audiences, add retargeting." },
  { when: "Monthly", title: "Report & improve", body: "Performance report, review call and next month's plan." },
];

export const launchPromises = [
  { title: "One point of contact", body: "A dedicated account manager coordinates design, video, ads and SEO for you." },
  { title: "Approval before posting", body: "Every calendar, creative and ad is shared with you for approval first." },
  { title: "Full transparency", body: "Ad accounts stay in your name. You can see every rupee of spend at any time." },
];

export const launchNote = "Go live within 2 weeks of kick-off, with a report every month. Once access and brand assets are shared, your first content and campaigns launch in Week 2-3.";

/** Plans (proposal p.9). */
export const plans = [
  { name: "Starter", price: "INR 25,000", unit: "per project / month - starting price", popular: false },
  { name: "Growth", price: "INR 40,000", unit: "per project / month - starting price", popular: true },
  { name: "Premium", price: "Custom", unit: "quoted on scope", popular: false },
];

/** Comparison rows: [feature, Starter, Growth, Premium]. true = included, null = not included. */
export const planRows: [string, string | boolean | null, string | boolean | null, string | boolean | null][] = [
  ["Social media management", "2 platforms", "3-4 platforms", "All platforms"],
  ["Creative posts & stories / month", "12", "20", "30+"],
  ["Reels / videos / month", "4", "8", "12+"],
  ["Meta Ads management", true, true, true],
  ["Google Ads management", null, true, true],
  ["WhatsApp marketing set-up", true, true, true],
  ["Google Business Profile", true, true, true],
  ["SEO / AEO / GEO", "Basic on-page", "On-page + 2 blogs", "Full SEO + 4 blogs"],
  ["Email / SMS campaigns", null, true, true],
  ["Landing page", null, "1 page", "As required"],
  ["Influencer coordination", null, null, true],
  ["Reporting", "Monthly report", "Report + review call", "Report + fortnightly call"],
];

export const planNote =
  "Fees cover Creatoos' services only. Paid promotion (ad spend) on Meta, Google and other platforms is paid by the client directly and is not included. Taxes as applicable. Final price depends on the scope agreed for your project.";

/** Ad budget (proposal p.10). */
export const adBudget = {
  fee: { label: "Creatoos service fee", value: "From INR 25,000", body: "Strategy, content, design, video, ad management, SEO and reporting. Paid to Creatoos." },
  spend: { label: "Paid promotion (ad spend)", value: "Set by you", body: "Paid directly to Meta / Google from your card or account. 100% goes into ads." },
  how: [
    "Ad accounts are created or kept in your business name",
    "You add your own card or prepaid balance to Meta / Google",
    "Platforms bill you directly and issue GST invoices to you",
    "We plan, run and optimise the budget, and never mark it up",
    "You approve the monthly ad budget before campaigns go live",
  ],
  recommended: [
    { goal: "Brand awareness & reach", budget: "INR 5,000 - 10,000" },
    { goal: "Lead generation (forms, WhatsApp)", budget: "INR 10,000 - 25,000" },
    { goal: "Google Search (calls, bookings)", budget: "INR 10,000 - 30,000" },
    { goal: "Full-funnel (Meta + Google)", budget: "INR 25,000+" },
  ],
  reference: "INR 10,896 of Meta ad spend brought one of our education clients 217 leads (INR 50 each). Results vary by industry, offer and location.",
};

/** Scope clarity (proposal p.11). */
export const scopeClarity = [
  { title: "Included in the fee", items: ["Strategy and monthly content calendar", "Creative design and copywriting", "Reels editing and agreed shoots", "Ad campaign set-up, management and optimisation", "Tracking set-up (Pixel, GA4, conversions)", "SEO, Google Business Profile and listings", "Monthly report and review call"] },
  { title: "Not included (billed separately)", items: ["Paid promotion / ad spend on any platform", "Influencer and celebrity fees", "Paid stock images, music or premium tools", "Outstation shoots, travel and models", "Printing of flyers, banners and billboards", "Website development (separate quote)", "Paid PR or media placements"] },
  { title: "Support we need from you", items: ["Admin access to social pages and ad accounts", "Logo, brand guidelines and product details", "Timely approvals (within 48 hours)", "Availability for shoots and testimonials", "Current offers, prices and updates", "Quick follow-up on leads we generate", "A single point of contact on your side"] },
];

/** Terms & conditions (proposal p.12). */
export const terms = [
  { title: "Engagement", body: "Project basis, with a minimum commitment of 3 months so campaigns have time to learn and improve." },
  { title: "Payment", body: "50% advance to start the project; balance before the start of the next cycle. Taxes as applicable." },
  { title: "Ad spend", body: "Paid by the client directly to the advertising platforms. Not part of the Creatoos fee." },
  { title: "Revisions", body: "Up to 2 rounds of revisions per creative. Further changes are treated as new work." },
  { title: "Ownership", body: "Final creatives and ad accounts belong to the client once payments are cleared." },
  { title: "Results", body: "We commit to best practice and full transparency; leads and sales depend on market, offer and budget, so no fixed outcome is guaranteed." },
  { title: "Notice", body: "Either party may end the engagement with 30 days' written notice after the minimum period." },
  { title: "Validity", body: "Quoted proposals are valid for 30 days from the date of issue." },
];

/** Next steps (proposal p.13). */
export const nextSteps = [
  { n: "1", title: "Confirm your package & scope" },
  { n: "2", title: "Share access & brand assets" },
  { n: "3", title: "Kick-off call: live within 2 weeks" },
];

export const pricingFaqs = [
  { q: "How much does digital marketing cost with Creatoos?", a: "Plans start at INR 25,000 per month (Starter) and INR 40,000 per month (Growth). Premium is quoted on scope. Fees cover our services only; ad spend is paid by you directly to Meta or Google." },
  { q: "Is ad spend included in the plan price?", a: "No. Ad spend is paid directly by you to the platforms from your own card or account, and they invoice you with GST. We never mark it up. Most clients start with INR 5,000 to 25,000 a month depending on the goal." },
  { q: "What is the minimum commitment?", a: "Three months, so campaigns have time to learn and improve. After that, either side can end the engagement with 30 days' written notice." },
  { q: "How do payments work?", a: "50% advance to start the project, and the balance before the start of the next cycle. Taxes as applicable." },
  { q: "How soon do campaigns go live?", a: "Within 2 weeks of kick-off. Once access and brand assets are shared, your first content and campaigns launch in Week 2-3." },
  { q: "Do you guarantee results?", a: "No. We commit to best practice and full transparency, but leads and sales depend on market, offer and budget, so no fixed outcome is guaranteed." },
];
