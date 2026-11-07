/**
 * EventPulse - Comprehensive Mock Events Dataset
 * Contains high-quality, realistic event entries across diverse categories.
 */

const EVENTS_DATA = [
  {
    id: "evt-01",
    title: "Global AI & Machine Learning Summit 2026",
    tagline: "Unleash the next generation of generative AI, robotics, and neural intelligence.",
    category: "technology",
    categoryLabel: "Technology & AI",
    date: "2026-11-20",
    time: "09:00 AM - 05:30 PM EST",
    endDate: "2026-11-20T17:30:00",
    venue: "Moscone Center & Virtual Stream",
    location: "San Francisco, CA",
    price: 149,
    isFree: false,
    featured: true,
    totalSeats: 350,
    bookedSeats: 312,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    description: "The Global AI & Machine Learning Summit is the flagship gathering for researchers, engineers, and industry pioneers. Dive deep into cutting-edge multimodal architectures, agentic autonomous workflows, production LLM fine-tuning, and ethical AI governance. Featuring hands-on workshops, live demos, and visionary keynotes.",
    agenda: [
      { time: "09:00 AM", title: "Opening Keynote: Frontier Models & The Future of Autonomy", speaker: "Dr. Elena Vance" },
      { time: "11:00 AM", title: "Workshop: Building Autonomous Agentic Workflows", speaker: "Marcus Sterling" },
      { time: "01:00 PM", title: "Networking Lunch & AI Startup Showcase", speaker: "All Attendees" },
      { time: "02:30 PM", title: "Panel: Governance, Safety, and Next-Gen Synthetic Data", speaker: "Panel of Industry Leaders" },
      { time: "04:30 PM", title: "Closing Fireside & Networking Reception", speaker: "Elena Vance & Guests" }
    ],
    speakers: [
      {
        name: "Dr. Elena Vance",
        role: "Chief AI Scientist",
        company: "DeepNeural Labs",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Marcus Sterling",
        role: "Head of Agent Engineering",
        company: "Synthetix AI",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Access to all keynotes and technical tracks", "Official Summit Certificate of Participation", "Exclusive Swag Bag & Developer Toolkit", "Gourmet lunch and evening cocktail reception", "1-Year access to video recordings and slides"]
  },
  {
    id: "evt-02",
    title: "International Design Systems & UX Conf",
    tagline: "Crafting scalable design systems, micro-interactions, and accessible interfaces.",
    category: "design",
    categoryLabel: "Design & UX",
    date: "2026-11-28",
    time: "10:00 AM - 04:00 PM GMT",
    endDate: "2026-11-28T16:00:00",
    venue: "Design Museum Auditorium",
    location: "London, UK & Online",
    price: 89,
    isFree: false,
    featured: true,
    totalSeats: 250,
    bookedSeats: 195,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    description: "Join 1,000+ UI/UX designers, design engineers, and creative directors exploring the frontier of responsive design, multi-brand token workflows, design-to-code pipelines, and inclusive accessibility. Discover how top design teams bridge the gap between Figma and production code.",
    agenda: [
      { time: "10:00 AM", title: "Keynote: Design Systems at Hyper-Scale", speaker: "Chloe Moreau" },
      { time: "11:30 AM", title: "Masterclass: Variables, Tokens, and Cross-Platform Consistency", speaker: "Alex Chen" },
      { time: "01:30 PM", title: "Interactive Portfolio Reviews & Mentor Clinics", speaker: "Senior Staff Designers" },
      { time: "03:00 PM", title: "The Next Era of Spatial and Generative UX", speaker: "Chloe Moreau" }
    ],
    speakers: [
      {
        name: "Chloe Moreau",
        role: "VP of Product Design",
        company: "Starlight Interfaces",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Alex Chen",
        role: "Principal Design Technologist",
        company: "Vivid Interactive",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Figma Component Library and Token Templates", "Certificate of UX Mastery", "1-on-1 Portfolio Critique Slot", "Access to Design Systems Slack community"]
  },
  {
    id: "evt-03",
    title: "Neon Horizon Music & Sound Festival 2026",
    tagline: "An electrifying 2-day celebration of electronic, indie, and ambient acoustic music.",
    category: "music",
    categoryLabel: "Music & Arts",
    date: "2026-12-05",
    time: "02:00 PM - 11:30 PM PST",
    endDate: "2026-12-05T23:30:00",
    venue: "Pacific Amphitheater & Bayfront Park",
    location: "San Diego, CA",
    price: 65,
    isFree: false,
    featured: true,
    totalSeats: 800,
    bookedSeats: 742,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    description: "Neon Horizon brings together over 20 groundbreaking electronic, synthwave, and indie audio artists across 3 immersive stages. Equipped with 3D projection mapping, ambient spatial sound zones, artisanal food markets, and interactive light installations.",
    agenda: [
      { time: "02:00 PM", title: "Gates Open & Ambient Acoustics Stage Kickoff", speaker: "Resident Soundscape Artists" },
      { time: "05:00 PM", title: "Indie-Electronic Live Sets & Sunset Sessions", speaker: "The Lunar Echoes" },
      { time: "08:30 PM", title: "Headliner Performance & Laser Light Show", speaker: "Kavinsky Mirage" },
      { time: "10:30 PM", title: "Silent Disco & Afterparty Beats", speaker: "DJ Pulse & Guest" }
    ],
    speakers: [
      {
        name: "Kavinsky Mirage",
        role: "Electronic Music Producer",
        company: "SoundWave Records",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Aria Thorne",
        role: "Multi-instrumentalist & Vocalist",
        company: "Echo Collective",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["All-day access to all 3 musical stages", "Complimentary festival wristband & holographic badge", "Free hydration stations & eco-friendly festival cup", "Access to interactive visual art installations"]
  },
  {
    id: "evt-04",
    title: "Venture Velocity: Tech Startup Pitch & Expo",
    tagline: "Connecting visionary founders with world-class angel investors and venture funds.",
    category: "business",
    categoryLabel: "Business & Startups",
    date: "2026-12-10",
    time: "09:30 AM - 05:00 PM SGT",
    endDate: "2026-12-10T17:00:00",
    venue: "Marina Bay Sands Expo & Convention Centre",
    location: "Singapore",
    price: 0,
    isFree: true,
    featured: false,
    totalSeats: 400,
    bookedSeats: 388,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    description: "Witness 25 seed and series-A startups pitch live to top global venture capital partners for $2M in direct investment and grants. Includes high-octane panel discussions on scaling SaaS, fintech trends, climate tech innovations, and founder mental resilience.",
    agenda: [
      { time: "09:30 AM", title: "Opening Remarks & Global Venture Capital Landscape", speaker: "Samantha Tan" },
      { time: "10:30 AM", title: "Cohort 1 Live Startup Pitches (Fintech & AI)", speaker: "12 Pitching Founders" },
      { time: "01:00 PM", title: "Investor Luncheon & Deal-Making Lounge", speaker: "Accredited Angels & VCs" },
      { time: "02:30 PM", title: "Cohort 2 Live Startup Pitches (Climate & Health)", speaker: "13 Pitching Founders" },
      { time: "04:30 PM", title: "Awarding of $2M Seed Pool & Closing Cheers", speaker: "Investment Committee" }
    ],
    speakers: [
      {
        name: "Samantha Tan",
        role: "General Partner",
        company: "Horizon Ventures Asia",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "David O'Connor",
        role: "Serial Entrepreneur & Angel Investor",
        company: "Nexus Capital",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Free general admission (requires registration)", "Direct access to startup demo booths", "Investor deal-room pass eligibility", "Complimentary networking directory access"]
  },
  {
    id: "evt-05",
    title: "NextGen Web Architecture & Cloud Native Summit",
    tagline: "Master modern micro-frontends, edge computing, serverless, and resilient web scaling.",
    category: "technology",
    categoryLabel: "Technology & AI",
    date: "2026-12-15",
    time: "10:00 AM - 06:00 PM CET",
    endDate: "2026-12-15T18:00:00",
    venue: "Station F & Online Streaming",
    location: "Paris, France",
    price: 49,
    isFree: false,
    featured: false,
    totalSeats: 300,
    bookedSeats: 210,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    description: "An intensive single-day conference focused on modern full-stack web engineering. Learn directly from core maintainers and infrastructure architects about WebAssembly, edge state replication, GraphQL federation, and deploying zero-downtime micro-frontends at scale.",
    agenda: [
      { time: "10:00 AM", title: "The State of Edge Infrastructure & Distributed State", speaker: "Julien Renaud" },
      { time: "11:45 AM", title: "Micro-frontends in Practice: Architecture & Pitfalls", speaker: "Sofia Rossi" },
      { time: "02:00 PM", title: "Building High-Throughput Web APIs with Rust & Go", speaker: "Julien Renaud" },
      { time: "04:30 PM", title: "Panel: Future of Frameworks & Web Standards", speaker: "Web Architects Panel" }
    ],
    speakers: [
      {
        name: "Julien Renaud",
        role: "Principal Architect",
        company: "EdgeWave Systems",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Sofia Rossi",
        role: "Staff Infrastructure Engineer",
        company: "CloudCore",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Digital attendance pass & badge", "Live Q&A with tech leads", "Access to open-source repository templates", "Digital Certificate of Completion"]
  },
  {
    id: "evt-06",
    title: "Apex Esports Championship & Game Dev Expo",
    tagline: "The premier multi-title esports tournament and indie game development showcase.",
    category: "gaming",
    categoryLabel: "Gaming & Esports",
    date: "2026-12-22",
    time: "11:00 AM - 09:00 PM PST",
    endDate: "2026-12-22T21:00:00",
    venue: "Seattle Convention Center",
    location: "Seattle, WA",
    price: 35,
    isFree: false,
    featured: true,
    totalSeats: 600,
    bookedSeats: 580,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    description: "Feel the adrenaline as top global esports teams battle in Valorant, Rocket League, and Tekken 8 for a $250,000 championship purse! Plus, explore the Indie Zone featuring 40+ playable preview builds from independent game creators, Unreal Engine 5 masterclasses, and cosplay showdowns.",
    agenda: [
      { time: "11:00 AM", title: "Doors Open & Indie Game Playtesting Pavilion", speaker: "Indie Developers" },
      { time: "01:00 PM", title: "Quarter-Finals & Semi-Finals Live Matches", speaker: "Tournament Casters" },
      { time: "04:30 PM", title: "Masterclass: Real-Time Shader & Lumen Lighting in UE5", speaker: "Kai Takahashi" },
      { time: "06:30 PM", title: "Cosplay Championship & Grand Finals Showdown", speaker: "Celebrity Hosts" }
    ],
    speakers: [
      {
        name: "Kai Takahashi",
        role: "Senior Unreal Engine Technical Artist",
        company: "Titan Game Studios",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Maya 'Valkyrie' Jensen",
        role: "Esports Caster & Content Creator",
        company: "Apex League",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Spectator arena seating for all finals", "Hands-on access to upcoming indie titles", "Exclusive game beta keys & in-game skins", "Meet & greet with professional esports players"]
  },
  {
    id: "evt-07",
    title: "Creative Typography & Brand Identity Workshop",
    tagline: "An intimate, hands-on workshop to master custom lettering and iconic branding.",
    category: "workshops",
    categoryLabel: "Workshops & Masterclasses",
    date: "2026-11-25",
    time: "01:00 PM - 05:00 PM EST",
    endDate: "2026-11-25T17:00:00",
    venue: "SoHo Creative Studio & Live Stream",
    location: "New York, NY",
    price: 0,
    isFree: true,
    featured: false,
    totalSeats: 80,
    bookedSeats: 74,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
    description: "Unlock the artistry of expressive letterforms, variable font engineering, and holistic visual identities. In this interactive 4-hour workshop, participants will build a bespoke logomark and brand guideline from initial vector sketching to digital typography specs.",
    agenda: [
      { time: "01:00 PM", title: "Foundations of Bespoke Typography & Anatomy", speaker: "Nadia Rossi" },
      { time: "02:00 PM", title: "Live Sketching & Vector Geometry Refinement", speaker: "Hands-on Exercise" },
      { time: "03:30 PM", title: "Pairing Typefaces & Color Theory for Modern Brands", speaker: "Nadia Rossi" },
      { time: "04:30 PM", title: "Critique Session & Participant Showcase", speaker: "All Attendees" }
    ],
    speakers: [
      {
        name: "Nadia Rossi",
        role: "Lettering Artist & Brand Director",
        company: "Studio Serif",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Digital workbook with 50+ type vector grids", "Direct feedback on your personal branding work", "Free commercial license for workshop typeface", "Certificate of Masterclass Completion"]
  },
  {
    id: "evt-08",
    title: "FinTech 3.0: Open Banking & Smart Contracts",
    tagline: "DeFi, programmable payments, digital currencies, and the future of banking APIs.",
    category: "business",
    categoryLabel: "Business & Startups",
    date: "2026-12-02",
    time: "09:00 AM - 04:30 PM HKT",
    endDate: "2026-12-02T16:30:00",
    venue: "Hong Kong Convention & Exhibition Centre",
    location: "Hong Kong",
    price: 120,
    isFree: false,
    featured: false,
    totalSeats: 300,
    bookedSeats: 265,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    description: "Explore the seismic shift in digital banking infrastructure, zero-knowledge financial proofs, ISO 20022 compliance, and autonomous treasury management. Hear from bank CIOs, regulatory heads, and leading fintech innovators.",
    agenda: [
      { time: "09:00 AM", title: "Keynote: The Decentralization of Institutional Liquidity", speaker: "Winston Zhang" },
      { time: "11:00 AM", title: "Open Banking APIs: Security, Latency, and Scalability", speaker: "Clara Mendoza" },
      { time: "01:30 PM", title: "Panel: Cross-Border Settlements in 2027", speaker: "Fintech Leaders" },
      { time: "03:30 PM", title: "Live Demos: Embedded Finance & Identity Verification", speaker: "Winston Zhang" }
    ],
    speakers: [
      {
        name: "Winston Zhang",
        role: "Head of Digital Assets",
        company: "Pan-Asian Capital",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Clara Mendoza",
        role: "Chief Compliance & Technology Officer",
        company: "FinVault Global",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Access to all plenary and technical breakout sessions", "VIP Executive Networking Lunch", "Complete whitepaper and industry forecast report", "Verified Attendance Credential"]
  },
  {
    id: "evt-09",
    title: "Indie Game Developers Hackathon 2026",
    tagline: "48 hours of rapid prototyping, creative gameplay mechanics, and community fun.",
    category: "gaming",
    categoryLabel: "Gaming & Esports",
    date: "2026-11-22",
    time: "10:00 AM Friday - 06:00 PM Sunday",
    endDate: "2026-11-22T18:00:00",
    venue: "CyberHub Incubator & Discord Worldwide",
    location: "Austin, TX & Remote",
    price: 0,
    isFree: true,
    featured: false,
    totalSeats: 500,
    bookedSeats: 460,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    description: "Team up with fellow game designers, 3D modelers, musicians, and coders to create an original game within 48 hours around a secret theme. Over $20,000 in software licenses, publisher mentoring, and hardware prizes are up for grabs!",
    agenda: [
      { time: "10:00 AM", title: "Theme Announcement & Team Formation Pitch", speaker: "Hackathon Mentors" },
      { time: "02:00 PM", title: "Sprint Checkpoint 1: Core Mechanic Playable", speaker: "Mentorship Team" },
      { time: "08:00 PM", title: "Midnight Sound & Art Polish Hour", speaker: "Community Stream" },
      { time: "03:00 PM (Sun)", title: "Submissions Close & Community Showcase Voting", speaker: "All Teams" }
    ],
    speakers: [
      {
        name: "Leo Sterling",
        role: "Lead Game Designer",
        company: "PixelForge Interactive",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Free game engine asset packs and SFX licenses", "Mentorship from published indie game creators", "Digital certificate and winner badges", "Steam & itch.io feature spotlight"]
  },
  {
    id: "evt-10",
    title: "Culinary & Beverage Masterclass: Artisan Pairings",
    tagline: "Experience gastronomy science, sensory tasting techniques, and farm-to-table culinary art.",
    category: "workshops",
    categoryLabel: "Workshops & Masterclasses",
    date: "2026-12-08",
    time: "05:00 PM - 09:00 PM PST",
    endDate: "2026-12-08T21:00:00",
    venue: "Epicurean Culinary Institute",
    location: "Napa Valley, CA",
    price: 95,
    isFree: false,
    featured: false,
    totalSeats: 50,
    bookedSeats: 48,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    description: "An exclusive evening guided by Michelin-starred chefs and master sommeliers. Discover flavor pairing chemistry, sustainable terroir storytelling, and prepare three gourmet small plates in a professional demonstration kitchen.",
    agenda: [
      { time: "05:00 PM", title: "Welcome Reception & Palate Primer Tasting", speaker: "Chef Antoine Laurent" },
      { time: "06:00 PM", title: "Hands-on Cooking: Modern Reduction Techniques", speaker: "Culinary Staff" },
      { time: "07:30 PM", title: "Artisan Wine & Cheese Harmony Tasting", speaker: "Sommelier Giselle Meyer" },
      { time: "08:30 PM", title: "Dessert Pairing & Recipe Keepsake Handout", speaker: "Chef Antoine Laurent" }
    ],
    speakers: [
      {
        name: "Antoine Laurent",
        role: "Executive Head Chef",
        company: "Lumière Bistro",
        avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Curated 4-course gourmet dining experience", "Printed recipe keepsake book and chef apron", "Sommelier wine pairing guide", "Certificate of Gastronomy Art"]
  },
  {
    id: "evt-11",
    title: "Urban Photography & Street Visual Storytelling",
    tagline: "Master lighting, candid composition, and Lightroom color grading on the streets.",
    category: "music",
    categoryLabel: "Music & Arts",
    date: "2026-11-29",
    time: "03:00 PM - 07:30 PM JST",
    endDate: "2026-11-29T19:30:00",
    venue: "Shibuya Crossing Studio Hub",
    location: "Tokyo, Japan",
    price: 45,
    isFree: false,
    featured: false,
    totalSeats: 60,
    bookedSeats: 55,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    description: "Walk the vibrant neon-lit streets of Tokyo with world-renowned street photographers. Learn to spot spontaneous moments, handle dynamic low-light neon shadows, and edit cinematic color grades in Adobe Lightroom.",
    agenda: [
      { time: "03:00 PM", title: "Theory: Composition, Focal Lengths & Anticipation", speaker: "Kenji Sato" },
      { time: "04:30 PM", title: "Golden Hour to Blue Hour Guided Photo Walk", speaker: "Field Instructors" },
      { time: "06:30 PM", title: "Live Lightroom Color Grading & Critique", speaker: "Kenji Sato" }
    ],
    speakers: [
      {
        name: "Kenji Sato",
        role: "Award-winning Street Photographer",
        company: "NeoTokyo Visuals",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Custom Lightroom Preset Pack included", "Small group ratio (1 instructor per 8 students)", "Printed photo keepsake of your best shot", "Street Photography Certificate"]
  },
  {
    id: "evt-12",
    title: "Clean Energy & Climate Innovation Forum",
    tagline: "Accelerating global decarbonization, renewable grids, and battery tech breakthroughs.",
    category: "business",
    categoryLabel: "Business & Startups",
    date: "2026-12-18",
    time: "08:30 AM - 04:00 PM EST",
    endDate: "2026-12-18T16:00:00",
    venue: "Boston Tech & Innovation Center",
    location: "Boston, MA & Virtual",
    price: 0,
    isFree: true,
    featured: false,
    totalSeats: 350,
    bookedSeats: 320,
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
    description: "A collaborative gathering of energy policy architects, cleantech entrepreneurs, and materials scientists. Exploring solid-state batteries, green hydrogen electrolysis, smart grid resilience, and carbon removal credit verification.",
    agenda: [
      { time: "08:30 AM", title: "State of Global Energy Transition 2026", speaker: "Dr. Rachel Green" },
      { time: "10:30 AM", title: "Next-Gen Grid Storage & Solid-State Batteries", speaker: "Cleantech Panel" },
      { time: "01:30 PM", title: "Green Hydrogen Commercialization Case Studies", speaker: "Industrial Partners" },
      { time: "03:00 PM", title: "Climate Tech Investment Roundtables", speaker: "Venture Partners" }
    ],
    speakers: [
      {
        name: "Dr. Rachel Green",
        role: "Director of Energy Systems",
        company: "EcoTerra Innovations",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
      }
    ],
    perks: ["Free admission upon registration", "Full conference report download", "Access to Cleantech Founder directory", "Digital attendance badge"]
  }
];

// Available event categories for filters
const EVENT_CATEGORIES = [
  { id: "all", label: "All Categories", icon: "sparkles" },
  { id: "technology", label: "Tech & AI", icon: "cpu" },
  { id: "design", label: "Design & UX", icon: "palette" },
  { id: "music", label: "Music & Arts", icon: "music" },
  { id: "business", label: "Business & Startups", icon: "trending-up" },
  { id: "gaming", label: "Gaming & Esports", icon: "gamepad" },
  { id: "workshops", label: "Workshops", icon: "book-open" }
];
