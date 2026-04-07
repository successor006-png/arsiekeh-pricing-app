const USD_RATE = 20;

export interface QualifierOption {
  id: string;
  label: string;
  desc: string;
}

export interface Qualifier {
  id: string;
  q: string;
  hint: string;
  opts: QualifierOption[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  badge: string | null;
  desc: string;
  feats: string[];
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  desc: string;
  recurring?: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  billing: "one-time" | "monthly";
  tagline: string;
  roi: string;
  pkgs: Package[];
  addons: Addon[];
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface Bundle {
  id: string;
  name: string;
  tag: string;
  color: string;
  price: number;
  saves: number;
  includes: string;
}

export interface Recommendation {
  cat: string;
  pkg: string;
  label: string;
}

export const QUALIFIER: Qualifier[] = [
  {
    id: "bizType",
    q: "Which best describes your situation?",
    hint: "We use this to surface only what's relevant — no noise.",
    opts: [
      { id: "new", label: "New Business", desc: "Just starting out, building from the ground up" },
      { id: "existing", label: "Existing Business", desc: "Already operating, ready to grow digitally" },
      { id: "school", label: "School or NGO", desc: "Education, nonprofit, or community organisation" },
      { id: "event", label: "Planning an Event", desc: "Wedding, birthday, graduation, gala, ceremony" },
    ],
  },
  {
    id: "urgency",
    q: "What is your most urgent need right now?",
    hint: "Your answer determines which package we highlight as your starting point.",
    opts: [
      { id: "web", label: "Get Online", desc: "Build or upgrade my website" },
      { id: "social", label: "Grow Visibility", desc: "Social media and digital marketing" },
      { id: "ai", label: "Automate & Train", desc: "AI tools and workflow systems" },
      { id: "security", label: "Protect My Business", desc: "Security, backups, and protection" },
      { id: "everything", label: "Full Transformation", desc: "Everything working together at once" },
    ],
  },
];

export function getRecommendation(bizType: string, urgency: string): Recommendation {
  if (bizType === "event") return { cat: "events", pkg: "e2", label: "Perfect for your occasion" };
  if (bizType === "school") return { cat: "ai", pkg: "a2", label: "Built for education & NGOs" };
  if (urgency === "web" && bizType === "new") return { cat: "web", pkg: "w2", label: "Ideal starting point" };
  if (urgency === "web" && bizType === "existing") return { cat: "web", pkg: "w3", label: "Most popular for growing businesses" };
  if (urgency === "social") return { cat: "social", pkg: "s2", label: "Proven growth driver" };
  if (urgency === "ai") return { cat: "ai", pkg: "a2", label: "Best ROI for operations" };
  if (urgency === "security") return { cat: "security", pkg: "sec2", label: "Industry standard protection" };
  if (urgency === "everything") return { cat: "web", pkg: "w3", label: "Start here for full transformation" };
  return { cat: "web", pkg: "w2", label: "Most popular package" };
}

export const CATS: Category[] = [
  {
    id: "web",
    label: "Web Design",
    icon: "◈",
    billing: "one-time",
    tagline: "Professional websites built for the Sierra Leone market",
    roi: "Businesses with a professional website generate 3× more customer enquiries than those without one.",
    pkgs: [
      {
        id: "w1",
        name: "Starter Presence",
        price: 1600,
        badge: null,
        desc: "Sole traders, salons, small shops",
        feats: [
          "3-page website (Home, About, Contact)",
          "Mobile-responsive design",
          "Custom colour theme",
          "Contact form + social media links",
          "Netlify hosting setup",
          "1 revision round",
        ],
      },
      {
        id: "w2",
        name: "Business Launch",
        price: 5000,
        badge: "Most Popular",
        desc: "Restaurants, schools, SMEs, clinics",
        feats: [
          "5–7 page website",
          "Branded design + logo integration",
          "Services & photo gallery section",
          "Basic on-page SEO",
          "Google Business Profile setup",
          "Auto-reply contact form",
          "2 revision rounds",
        ],
      },
      {
        id: "w3",
        name: "AI-Enhanced",
        price: 10000,
        badge: "Recommended",
        desc: "Hotels, busy restaurants, established businesses",
        feats: [
          "Everything in Business Launch",
          "AI chatbot integration (FAQ/WhatsApp)",
          "Lead capture + booking automation",
          "Advanced SEO setup",
          "Google Analytics integration",
          "Performance optimisation",
          "3 revision rounds",
        ],
      },
      {
        id: "w4",
        name: "E-Commerce",
        price: 14000,
        badge: "Premium",
        desc: "Retail, boutiques, merchants ready to sell online",
        feats: [
          "Full online store + product listings",
          "Shopping cart and checkout flow",
          "Orange Money + mobile payment integration",
          "Order management system",
          "Inventory display + product search",
          "SEO-optimised product pages",
          "3 revision rounds",
        ],
      },
    ],
    addons: [
      { id: "wa1", name: "AI Chatbot Integration", price: 2000, desc: "FAQ bot + WhatsApp automation 24/7" },
      { id: "wa2", name: "SEO Setup", price: 1000, desc: "Google Search Console + meta optimisation" },
      { id: "wa3", name: "Google Analytics Dashboard", price: 800, desc: "Traffic + visitor behaviour dashboard" },
      { id: "wa4", name: "Online Booking System", price: 2000, desc: "Calendar-linked appointment booking" },
      { id: "wa5", name: "Domain Name Connection", price: 500, desc: "Custom domain connected to your Netlify site" },
      { id: "wa6", name: "SSL + Security Hardening", price: 600, desc: "HTTPS, security headers, spam protection" },
      { id: "wa7", name: "Copywriting (per page)", price: 400, desc: "Professional headlines, copy, and CTAs" },
      { id: "wa8", name: "Website Redesign", price: 2500, desc: "Full overhaul of an existing website" },
    ],
  },
  {
    id: "events",
    label: "Event Sites",
    icon: "◇",
    billing: "one-time",
    tagline: "Occasion websites for weddings, birthdays, graduations & ceremonies",
    roi: "Event websites shared via WhatsApp reach 3× more guests than paper invitations alone.",
    pkgs: [
      {
        id: "e1",
        name: "The Envelope",
        price: 600,
        badge: null,
        desc: "Simple announcements, small gatherings",
        feats: [
          "Envelope-opening animation on load",
          "Event details + countdown timer",
          "WhatsApp share button",
          "Mobile responsive",
          "Custom colour theme (2 colours)",
        ],
      },
      {
        id: "e2",
        name: "The Invitation",
        price: 900,
        badge: "Most Popular",
        desc: "Birthdays, graduations, naming ceremonies",
        feats: [
          "Up to 5 personal photos",
          "Hero background photo",
          "Event programme section",
          "RSVP form → responses to your WhatsApp",
          "Google Maps embed",
          "Dress code section",
        ],
      },
      {
        id: "e3",
        name: "The Celebration",
        price: 1500,
        badge: null,
        desc: "Weddings, milestone birthdays",
        feats: [
          "Photo gallery up to 15 photos",
          "Background music option",
          "Guest message wall",
          "Guest tracker spreadsheet",
          "Password-protected access",
          "Thank-you page after RSVP",
        ],
      },
      {
        id: "e4",
        name: "The Luxury Affair",
        price: 2500,
        badge: "Premium",
        desc: "Premium weddings, corporate galas",
        feats: [
          "Gallery up to 30 photos",
          "Story / timeline section",
          "Video embed",
          "Digital gift registry link",
          "QR code card for invitations",
          "Premium animated entrance",
          "1 formal revision round",
        ],
      },
    ],
    addons: [
      { id: "ea1", name: "Custom Animated Entrance", price: 300, desc: "Bespoke occasion-themed page animation" },
      { id: "ea2", name: "Advanced Guest Tracker", price: 400, desc: "Live RSVP spreadsheet + plus-one management" },
      { id: "ea3", name: "Background Music", price: 200, desc: "Auto-playing ambient soundtrack" },
      { id: "ea4", name: "QR Code Card Design", price: 300, desc: "Print-ready QR invitation card" },
      { id: "ea5", name: "Multi-Language (English + Krio)", price: 400, desc: "Language toggle for local guests" },
      { id: "ea6", name: "Rush Delivery (48–72 hrs)", price: 400, desc: "Priority build and delivery guarantee" },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    icon: "◉",
    billing: "monthly",
    tagline: "Consistent professional presence that grows your audience every month",
    roi: "Consistent posting increases monthly customer enquiries by 30–40% within 90 days.",
    pkgs: [
      {
        id: "s1",
        name: "Starter Presence",
        price: 1200,
        badge: null,
        desc: "1 platform — Facebook OR Instagram",
        feats: [
          "8 posts per month",
          "Branded graphic design per post",
          "Caption copywriting",
          "Basic hashtag strategy",
          "Monthly performance summary",
        ],
      },
      {
        id: "s2",
        name: "Growth Package",
        price: 2400,
        badge: "Most Popular",
        desc: "Facebook + Instagram",
        feats: [
          "12–16 posts/month across both platforms",
          "Basic community management",
          "Comment & message responses",
          "Hashtag research & rotation",
          "Monthly performance report",
        ],
      },
      {
        id: "s3",
        name: "Full Presence",
        price: 4000,
        badge: "Recommended",
        desc: "Facebook + Instagram + WhatsApp",
        feats: [
          "20+ content pieces/month",
          "Stories / Status 3×/week",
          "Full community management",
          "Monthly strategy call",
          "Content calendar planning",
          "Detailed analytics report",
        ],
      },
    ],
    addons: [
      { id: "sa1", name: "Social Media Audit", price: 1000, recurring: false, desc: "Deep competitor + content engagement analysis" },
      { id: "sa2", name: "Profile Setup (All Platforms)", price: 600, recurring: false, desc: "Full setup: Facebook, Instagram, WhatsApp Business" },
      { id: "sa3", name: "Ad Campaign — Awareness", price: 1000, recurring: false, desc: "1 creative, 2-week monitoring, performance report" },
      { id: "sa4", name: "Ad Campaign — Lead Gen", price: 1600, recurring: false, desc: "A/B test, 4-week run + retargeting setup" },
      { id: "sa5", name: "Ongoing Ad Management", price: 1600, recurring: true, desc: "Monthly campaign management + creative refresh" },
    ],
  },
  {
    id: "ai",
    label: "AI Training",
    icon: "⬡",
    billing: "one-time",
    tagline: "Installing AI capabilities permanently into how your team operates",
    roi: "Automating just 2 hours of daily tasks reclaims 60+ hours/month for revenue-generating work.",
    pkgs: [
      {
        id: "a1",
        name: "AI Starter Session",
        price: 1600,
        badge: null,
        desc: "First-time AI users, teams up to 5",
        feats: [
          "Half-day workshop (3–4 hours)",
          "Intro to ChatGPT + Claude",
          "Live hands-on practice session",
          "Business-specific use cases",
          "PDF quick-reference guide",
        ],
      },
      {
        id: "a2",
        name: "AI Integration Package",
        price: 5000,
        badge: "Most Popular",
        desc: "SMEs ready to transform operations",
        feats: [
          "2-day workshop + follow-up session",
          "3–5 AI tools selected + configured",
          "WhatsApp / email automation",
          "Custom AI prompt library built",
          "Up to 10 people trained",
          "30-day email support",
        ],
      },
      {
        id: "a3",
        name: "AI Workflow Transformation",
        price: 12000,
        badge: "Recommended",
        desc: "Established businesses, full teams",
        feats: [
          "Full operational audit first",
          "Make.com + Manychat automation",
          "AI customer service system",
          "All departments trained",
          "Custom operations manual",
          "3-month check-in included",
        ],
      },
    ],
    addons: [
      { id: "aa1", name: "AI Readiness Audit", price: 1200, desc: "Written readiness report + priority roadmap" },
      { id: "aa2", name: "AI Tools Setup Only", price: 800, desc: "Technical setup without full training" },
      { id: "aa3", name: "Business Automation Build", price: 2000, desc: "One complete Make.com workflow built + tested" },
      { id: "aa4", name: "School AI Programme", price: 6000, desc: "4–6 sessions, certificates, teacher + student tracks" },
      { id: "aa5", name: "Executive Strategy Session", price: 800, desc: "1hr advisory + written AI action plan within 48hrs" },
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: "◈",
    billing: "one-time",
    tagline: "Protecting everything you have built from a single breach",
    roi: "The average cost of a website breach exceeds your entire annual security investment — in one incident.",
    pkgs: [
      {
        id: "sec1",
        name: "Security Essentials",
        price: 1200,
        badge: null,
        desc: "Starter sites and new businesses",
        feats: [
          "SSL certificate (HTTPS)",
          "Basic vulnerability scan",
          "Security headers configuration",
          "Spam protection setup",
          "Written security summary report",
        ],
      },
      {
        id: "sec2",
        name: "Business Security Audit",
        price: 3000,
        badge: "Most Popular",
        desc: "Established businesses, schools",
        feats: [
          "Full website security audit",
          "Malware + vulnerability scanning",
          "Backup system setup",
          "Staff security awareness briefing",
          "Prioritised remediation report",
          "1-month post-audit support",
        ],
      },
      {
        id: "sec3",
        name: "Advanced Security Package",
        price: 8000,
        badge: "Recommended",
        desc: "Hotels, clinics, NGOs, larger teams",
        feats: [
          "Everything in Business Audit",
          "Network security assessment",
          "Social media account security",
          "Staff phishing awareness training",
          "Incident response plan documented",
          "Security policy document",
          "3 months support",
        ],
      },
    ],
    addons: [
      { id: "sea1", name: "Automated Backup System", price: 800, desc: "Daily/weekly off-site backups + one-click restore" },
      { id: "sea2", name: "Email Security Setup", price: 1000, desc: "SPF/DKIM config, anti-spoofing, spam filters" },
      { id: "sea3", name: "Social Media Account Security", price: 800, desc: "Account recovery + 2FA setup + access audit" },
      { id: "sea4", name: "Staff Security Training", price: 1200, desc: "Half-day phishing + security awareness workshop" },
      { id: "sea5", name: "WhatsApp Business Security", price: 600, desc: "2-step verification + device audit + guide" },
    ],
  },
];

export const BUNDLES: Bundle[] = [
  {
    id: "b1",
    name: "Startup Essentials",
    tag: "New Businesses",
    color: "#3B82F6",
    price: 6000,
    saves: 3400,
    includes: "Starter Presence (Web) + AI Starter Session + Security Essentials",
  },
  {
    id: "b2",
    name: "Growth Accelerator",
    tag: "Established Businesses",
    color: "#10B981",
    price: 12000,
    saves: 5200,
    includes: "Business Launch (Web) + Growth Package (Social) + AI Integration Package",
  },
  {
    id: "b3",
    name: "Premium Transformation",
    tag: "Full Service",
    color: "#F59E0B",
    price: 25000,
    saves: 10200,
    includes: "AI-Enhanced (Web) + Full Presence (Social) + AI Workflow Transformation + Advanced Security",
  },
];

export function formatPrice(amount: number, currency: string): string {
  if (currency === "USD") {
    return `$${(amount / USD_RATE).toFixed(0)}`;
  }
  return `NLE ${amount.toLocaleString()}`;
}

export function getDailyRate(monthlyAmount: number, currency: string): string {
  const daily = monthlyAmount / 30;
  if (currency === "USD") {
    return `$${(daily / USD_RATE).toFixed(2)}/day`;
  }
  return `NLE ${Math.round(daily)}/day`;
}
