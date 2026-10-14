export const contact = {
  address: "38A, Chettipalayam Street, Rukmani Colony, Veerakeralam, Coimbatore 641007",
  phone: "+91 98941 11173",
  phoneHref: "tel:+919894111173",
  whatsapp: "https://wa.me/919894111173",
  email: "hello@creatoos.com",
  hours: "Mon-Sat, 9:30 AM - 6:30 PM IST",
  socials: [
    { label: "Instagram", href: "https://instagram.com/creatoos" },
    { label: "LinkedIn", href: "https://in.linkedin.com/company/creatoos" },
    { label: "Facebook", href: "https://facebook.com/creatoosdesigns" },
  ],
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  blurb: string;
  icon: string;
};

export const services: Service[] = [
  { slug: "branding", title: "Branding & Identity", icon: "BRAND", tagline: "Positioning before pixels", blurb: "Positioning, naming, messaging and the visual system that carries it. We start with what you stand for, not with a logo sketch." },
  { slug: "logo-design", title: "Logo Design", icon: "LOGO", tagline: "A mark that works at 40px", blurb: "Marks, typography systems and the full identity kit - designed to work at every size, in print and on a phone screen." },
  { slug: "web-development", title: "Web Development", icon: "WEB", tagline: "Built to be found", blurb: "Landing pages, business websites, CMS builds and e-commerce stores. Fast, search-ready and yours on handover." },
  { slug: "app-development", title: "App Development", icon: "APPS", tagline: "Built to launch, not to demo", blurb: "Hybrid and native mobile apps, MVPs, admin dashboards and integrations. Built to launch, not to sit in a demo." },
  { slug: "digital-marketing", title: "Digital Marketing", icon: "ADS", tagline: "Measured weekly", blurb: "Meta and Google campaigns, creative testing and funnel design. Measured weekly, reported in plain language." },
  { slug: "social-media", title: "Social Media Management", icon: "SOCIAL", tagline: "Sounds like a person", blurb: "Content calendars, production and community management - written to sound like a person, not a brand guideline." },
  { slug: "seo", title: "SEO", icon: "SEO", tagline: "The foundation", blurb: "Technical health, on-page structure, content operations and local search. The foundation everything else sits on." },
  { slug: "ai-search", title: "AI Search (AEO/GEO)", icon: "AEO", tagline: "Get cited by AI", blurb: "Getting your brand cited inside ChatGPT, Gemini, Perplexity and Google AI Overviews. Very few agencies in the state offer this. We do." },
  { slug: "strategy", title: "Strategy & Research", icon: "STRATEGY", tagline: "The work before the work", blurb: "Market study, competitor teardowns, customer insight and go-to-market planning. The work before the work." },
];

export const pillars = [
  { title: "Found", body: "SEO, AI search and performance marketing that put you in front of buyers at the moment they decide." },
  { title: "Understood", body: "Positioning, messaging and identity that make what you do obvious in a single glance." },
  { title: "Chosen", body: "Websites, apps and campaigns built to convert - measured weekly, improved monthly." },
];

export const processSteps = [
  { n: "01", title: "Discovery", body: "A scoping call, your business context, and a fast read on your audience and competitors. AI-assisted research means we arrive already informed." },
  { n: "02", title: "Strategy", body: "Positioning, messaging and channel priorities, signed off before any design work begins." },
  { n: "03", title: "Design & Build", body: "Concepts, revisions, development and content production against a fixed calendar. Two revision rounds at each stage." },
  { n: "04", title: "Launch", body: "Go-live, handover of source files and admin access, and training on anything you'll run yourself." },
  { n: "05", title: "Measure & Iterate", body: "Monthly reporting in plain language, plus what we're changing next month and why." },
];

export const pipeline = [
  { n: "01", title: "Brief", body: "Strategy, scope and success criteria - set by humans, with you." },
  { n: "02", title: "Generate", body: "AI produces at volume: drafts, design directions, ad variants, research." },
  { n: "03", title: "Edit", body: "A human writer, designer or developer cuts, refines and rewrites. Most is discarded." },
  { n: "04", title: "Ship", body: "Only work that passes review reaches you. Nothing is published unread." },
];

export const reasons = [
  { title: "One accountable partner", body: "Brand, build and marketing under one contract. No vendor stitching, no finger-pointing." },
  { title: "Ahead on AI search", body: "We were building AEO and GEO capability before most agencies in the region had heard the terms." },
  { title: "Testing volume", body: "Twenty creative variants where others run two. That's how you find what actually works." },
  { title: "Local, and it matters", body: "Coimbatore-based. We can sit across a table from you anywhere in western Tamil Nadu." },
  { title: "Built for growth stage", body: "Scopes designed around what a growing business can actually execute." },
  { title: "You own everything", body: "Full IP, source files and admin access transfer to you on final payment. Always." },
];

export const industries = [
  "Healthcare & clinics", "Hospitality & hotels", "Education & consultancies", "Retail & boutiques",
  "D2C brands", "Manufacturing & B2B", "Real estate", "Professional services",
];

export const clients = [
  "Dheera Goli Soda", "PayFX", "Sumangali Jewellers", "Aparajita Ayurveda", "Bakers Brand",
  "Movezee Overseas", "We Little", "The Beehives", "Genoll",
];

export const work = [
  { name: "Dheera Goli Soda", kind: "Branding · Packaging", tone: "#dfe8f2" },
  { name: "PayFX", kind: "Website · Social", tone: "#e6e3f1" },
  { name: "Sumangali Jewellers", kind: "Branding · Campaigns", tone: "#f1ebe1" },
  { name: "The Beehives - Nectar Nest", kind: "Identity · Packaging", tone: "#f3eedb" },
];

// Testimonials carried over from the current creatoos.com site.
// Opening lines only - replace with full quotes, names and roles before launch.
export const testimonials = [
  { quote: "Creatoos did an amazing job capturing the essence of Dheera Goli Soda in their branding.", name: "Dheera Goli Soda", role: "Branding" },
  { quote: "Creatoos' work on PayFX has been outstanding.", name: "PayFX", role: "Website & Social Media" },
  { quote: "Their branding has beautifully captured the essence of traditional Ayurveda, incorporating modern aesthetics.", name: "Aparajita Ayurveda", role: "Branding & Social Media" },
  { quote: "Their branding has perfectly captured the essence of the brand, making it instantly recognizable.", name: "Bakers", role: "Branding & Social Media" },
  { quote: "Creatoos has been a fantastic partner in helping Movezee Overseas Consultancy establish a strong online presence.", name: "Movezee Overseas Consultancy", role: "Social Media & Reels" },
];

export const faqs = [
  { q: "Where is Creatoos based?", a: "Creatoos is a creative and technology studio based in Coimbatore, Tamil Nadu. We work with clients across India and handle projects remotely as well as in person." },
  { q: "How does Creatoos use AI?", a: "AI sits in our production process - research, content generation, visual production and creative testing. Every output passes human editorial review before it ships. It lowers turnaround; it does not replace judgement." },
  { q: "How long does a project take?", a: "A logo takes 7 to 12 days. A business website takes 2 to 3 weeks. A full brand identity takes 3 to 4 weeks. An app MVP takes 8 to 14 weeks." },
  { q: "How do I get a quote?", a: "Book a free 30-minute scoping call. We'll understand what you need, tell you what we'd prioritise, and send a written proposal with a firm figure within two working days." },
  { q: "Do you work with businesses outside Coimbatore?", a: "Yes. We work with clients across Tamil Nadu, India and internationally." },
];
