// Single source of truth for project/work entries.
//
// media convention: drop files in public/projects/<slug>/ and add entries like
//   { type: "image", src: "/projects/tracelens/1.png", caption: "Trace graph view" }
//   { type: "video", src: "/projects/harmonaize/demo.mp4", caption: "Live demo at GrizzHacks" }
// The detail page skips the gallery entirely when media is empty.
//
// [TODO: ...] markers are spots only Parthiv can fill — search for "TODO:" before shipping.

export const projectsCatalog = [
  {
    slug: "tracelens",
    title: "TraceLens – Distributed Tracing Platform",
    description: "Follows a request across microservices and shows where the time went.",
    tags: ["Backend", "Systems", "Observability"],
    year: "2026",
    type: "Personal",
    featured: true,
    long: "TraceLens ingests OpenTelemetry spans and rebuilds the full request path across services — so instead of \"it's slow,\" you see where the time went.",
    story: [
      {
        heading: "Why I built it",
        body: "Logs tell you what one service did. Nothing shows you the whole request. I wanted the tool I kept wishing existed.",
      },
      {
        heading: "How it works",
        body: "Dockerized services export OpenTelemetry spans to Jaeger. A NestJS pipeline stitches the request paths back together, and a graph UI makes the bottlenecks obvious.",
      },
      {
        heading: "Proving it on something real",
        body: "It traces a live demo storefront (shop.parthivg.com), so the data comes from real HTTP traffic — not a toy app. [TODO: one concrete debugging win or perf number]",
      },
    ],
    highlights: [
      "OpenTelemetry + Jaeger ingestion, Dockerized services",
      "NestJS pipeline rebuilds cross-service request paths",
      "Live at tracelens.parthivg.com",
    ],
    media: [],
    links: { demo: "https://tracelens.parthivg.com", github: "https://github.com/Parthiv12/grizzly", docs: "" },
  },
  {
    slug: "speechmatch",
    title: "SpeechMatch – Capstone Team Lead",
    description: "Mobile pronunciation coach. My senior capstone — I lead the team.",
    tags: ["AI/ML", "Leadership", "Voice AI"],
    year: "2026",
    type: "Course",
    featured: true,
    long: "A mobile app that scores your pronunciation against a target reading. My senior capstone at Wayne State — I lead the team and build the backend.",
    story: [
      {
        heading: "The interesting part",
        body: "Scoring isn't just speech-to-text. Word-level alignment and edit distance let the app point at the exact word you fumbled, not hand you one vague score.",
      },
      {
        heading: "The pipeline",
        body: "OCR pulls in the text, Azure Speech handles the audio, and the scoring layer compares what you said against what the passage expected.",
      },
    ],
    highlights: [
      "OCR → Azure Speech → word-level scoring, end to end",
      "Per-word feedback via alignment + edit distance",
      "Leading a team of [TODO: N] since Jan 2026",
    ],
    media: [],
    links: { demo: "", github: "https://github.com/Parthiv12/SpeechRecognition---Capstone-Project", docs: "" },
  },
  {
    slug: "aws-s3-fuse-filesystem",
    title: "AWS S3 Encrypted FUSE Filesystem",
    description: "A C++ filesystem that mounts S3 locally and encrypts everything before upload.",
    tags: ["Systems", "Security", "Cloud"],
    year: "2025",
    type: "Course",
    featured: true,
    long: "A FUSE3 filesystem in C++ that makes an S3 bucket look like a local folder. Every file is encrypted before upload — S3 only ever stores ciphertext.",
    story: [
      {
        heading: "The problem",
        body: "POSIX thinks in offsets and partial writes; S3 thinks in whole objects over REST. The filesystem translates between the two without the user noticing.",
      },
      {
        heading: "How",
        body: "FUSE3 intercepts the syscalls. I hooked the file descriptor cache to encrypt with AES right before upload, and added a SHA-256 pipeline so tampered objects fail loudly.",
      },
    ],
    highlights: [
      "FUSE3 syscall interception in C++",
      "AES encryption before anything leaves the machine",
      "SHA-256 integrity checks on every read",
    ],
    media: [],
    links: { demo: "", github: "", docs: "" }, // [TODO: repo link if public]
  },
  {
    slug: "database-intern-365",
    title: "Database Intern @ 365 Retail Markets",
    description: "Made slow SQL fast — up to 45% faster query execution.",
    tags: ["SQL", "Replication", "Tuning"],
    year: "2025",
    type: "Work",
    featured: true,
    long: "Summer 2025 on the database team at 365 Retail Markets, tuning the query paths behind a high-volume retail network.",
    story: [
      {
        heading: "What I did",
        body: "Audited slow queries with execution plan analysis and fixed them — mostly indexing. Best wins: up to 45% faster execution.",
      },
      {
        heading: "Beyond tuning",
        body: "Set up replication between instances for new test environments, dug into plan cache and buffer pool behavior, and wrote triggers to automate data processing.",
      },
    ],
    highlights: [
      "Up to 45% faster query execution",
      "Configured replication between database instances",
    ],
    media: [],
    links: { demo: "", github: "", docs: "" },
  },
  {
    slug: "spotify-background-recommendation-app",
    title: "Spotify Background Recommendation App",
    description: "Long, cohesive background mixes — scored by audio features, not genre.",
    tags: ["AI/ML", "Backend"],
    year: "2024",
    type: "Personal",
    featured: false,
    long: "Spotify kept ruining my focus sessions with jarring genre jumps. This scores tracks on audio features — danceability, acousticness, energy — and builds mixes that stay background.",
    story: [
      {
        heading: "The idea",
        body: "Genre is a bad predictor of disruption; audio features are much better. A scoring metric over Spotify's features groups tracks into seamless runs.",
      },
      {
        heading: "Where it led",
        body: "A working web service — and the start of my interest in recommenders, which grew into VibeMatch, a CNN-based mood matcher.",
      },
    ],
    highlights: [
      "Scoring metric over Spotify audio features",
      "Grew into VibeMatch, a deep-learning mood recommender",
    ],
    media: [],
    links: { demo: "", github: "https://github.com/Parthiv12/VibeMatch", docs: "" }, // [TODO: verify VibeMatch is the right repo, or point at the original app's repo]
  },
  {
    slug: "drivemate",
    title: "DriveMate – AI Driving Assistant",
    description: "An AI co-passenger that keeps drivers alert through conversation.",
    tags: ["AI Utilities", "Systems"],
    year: "2024",
    type: "Personal",
    featured: false,
    long: "An AI co-passenger that keeps drivers alert through real-time conversation. Fetch AI ASI model, React, Python.",
    story: [
      {
        heading: "The constraint",
        body: "A driving assistant that distracts the driver is worse than none. Everything is voice-first, and latency is treated as a safety requirement.",
      },
      {
        heading: "How it works",
        body: "The Fetch AI ASI model drives the conversation; telemetry APIs feed it route and drive context.",
      },
    ],
    highlights: [
      "Voice-first loop on the Fetch AI ASI model",
      "Telemetry-fed drive analytics",
    ],
    media: [],
    links: { demo: "", github: "https://github.com/Parthiv12/DriveMate", docs: "" },
  },
  {
    slug: "rag-research",
    title: "Retrieval-Augmented Generation (RAG) Research",
    description: "DPR, ColBERT, and SELF-RAG benchmarked on MS MARCO.",
    tags: ["AI/ML", "LLMs", "Research"],
    year: "2025",
    type: "Research",
    featured: true,
    long: "A semester-long study of what makes RAG pipelines work — and what just feeds the model noise it hallucinates around.",
    story: [
      {
        heading: "What I studied",
        body: "Built DPR, ColBERT, and SELF-RAG pipelines from the retrieval layer up, varying one piece at a time: chunking, indexing, hybrid vs. pure vector search.",
      },
      {
        heading: "What I found",
        body: "Retrieval quality decides everything, chunking matters more than architecture, and the no-retrieval baseline catches cases where RAG actively hurts. Details in the paper.",
      },
    ],
    highlights: [
      "DPR, ColBERT, SELF-RAG — built from the retrieval layer up",
      "Benchmarked against LLM-only generation on MS MARCO",
    ],
    media: [],
    links: { demo: "", github: "", docs: "/research" },
  },
  {
    slug: "harmonaize",
    title: "HarmonAIze – Heart Rate Music Recommender",
    description: "GrizzHacks winner: playlists that react to your heart rate.",
    tags: ["Full-Stack", "Hackathon"],
    year: "2024",
    type: "Hackathon",
    featured: true,
    long: "36 hours at GrizzHacks: pipe live heart-rate data into a recommender so the music keeps up when you push harder. Won Best Interactive Media.",
    story: [
      {
        heading: "The pivot that saved us",
        body: "Our supervised models had garbage correlations. Mid-hackathon we switched to K-Means clustering over audio features — simpler, and it worked.",
      },
      {
        heading: "The demo moment",
        body: "A React UI hooked into the heart-rate stream, Flask re-selecting tracks as your BPM zone changed. Exertion visibly steering the music is what landed with the judges.",
      },
    ],
    highlights: [
      "Won Best Interactive Media at GrizzHacks",
      "Live heart-rate telemetry driving K-Means clusters",
      "Built in 36 hours: React + Flask + Python",
    ],
    media: [],
    links: { demo: "", github: "https://github.com/Parthiv12/grizzhacks-SRC2", docs: "" },
  },
  {
    slug: "ubuntu-system-administration",
    title: "Ubuntu Server Hardening",
    description: "Locked down a fresh Ubuntu install: UFW, TLS, hardened SSH, OpenVAS.",
    tags: ["Systems", "Security"],
    year: "2024",
    type: "Course",
    featured: false,
    long: "Course project: take a fresh Ubuntu install and make it production-safe. Most of the learning was in what breaks when you lock things down.",
    story: [
      {
        heading: "The approach",
        body: "UFW lockdown, TLS everywhere, hardened OpenSSH, and continuous OpenVAS scans — every change re-verified.",
      },
      {
        heading: "The real lesson",
        body: "Reducing attack surface is easy. Doing it without breaking the services people need is the actual job.",
      },
    ],
    highlights: [
      "UFW + hardened SSH + TLS configuration",
      "Continuous vulnerability audits with OpenVAS",
    ],
    media: [],
    links: { demo: "", github: "", docs: "" },
  },
  {
    slug: "ops-intern-365",
    title: "Operations & Hardware Intern @ 365 Retail Markets",
    description: "Linux imaging and kiosk fleet deployments — my first internship.",
    tags: ["Linux", "Infrastructure"],
    year: "2024",
    type: "Work",
    featured: false,
    long: "My first internship: Linux imaging and physical deployments for a fleet of self-service kiosks. Hardware doesn't care about your abstractions.",
    story: [
      {
        heading: "What I did",
        body: "Streamlined the OS imaging process and documented reliable hardware configs, cutting deployment turnaround. It's also the internship that got me invited back for the database role.",
      },
    ],
    highlights: [
      "Streamlined Linux imaging for kiosk deployments",
      "Invited back the next summer as a Database Intern",
    ],
    media: [],
    links: { demo: "", github: "", docs: "" },
  },
];

export const projectBySlug = Object.fromEntries(
  projectsCatalog.map((project) => [project.slug, project])
);
