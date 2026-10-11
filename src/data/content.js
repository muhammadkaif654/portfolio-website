/* =====================================================================
 *  PORTFOLIO CONTENT — edit this file only to update the website.
 *  ---------------------------------------------------------------------
 *  • Every section on the site reads from here.
 *  • Icons are referenced by name — see src/components/Icon.jsx for the
 *    full list (e.g. 'brain', 'robot', 'server', 'github', 'linkedin').
 *  • Images go in /public/images and are referenced as '/images/xyz.png'.
 *  • Anything marked  // TODO  is placeholder content waiting for you.
 *  • Set `enabled: false` on a section to hide it completely.
 * ===================================================================== */

export const profile = {
  name: 'Muhammad Kaif',
  firstName: 'Muhammad',
  logo: 'MuhammadKaif',
  // Rotating titles in the hero (typed / scrambled one after another)
  roles: ['AI & Robotics Engineer', 'AI Agent Builder', 'Full Stack Developer', 'Automation Architect'],
  tagline: 'I architect scalable backend systems, AI agents, and intelligent automation solutions.',
  bio: "Hi, I'm Muhammad Kaif — an AI Engineer and Full Stack Developer studying at FAST NUCES in Islamabad. I build intelligent AI-based systems and craft autonomous agents to transform complex technical bottlenecks into streamlined, automated solutions.",
  location: 'Islamabad, Pakistan',
  coords: { lat: 33.6844, lon: 73.0479 }, // used by the 3D globe in the contact section
  timezone: 'Asia/Karachi',
  university: 'FAST NUCES',
  email: 'i240071@isb.nu.edu.pk',
  phone: '+92 337 9872895',
  phoneHref: 'tel:+923379872895',
  resumeUrl: '/resume.pdf', // TODO: drop your resume at /public/resume.pdf
  photo: '/images/profile.jpeg', // real photo — front of the 3D ID badge
  illustration: '/images/illustration.png', // illustration — back of the 3D ID badge
  available: true,
  availabilityText: 'Available for opportunities',
}

export const socials = [
  { label: 'GitHub', url: 'https://github.com/muhammadkaif654', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammad-kaif-3a2786324', icon: 'linkedin' },
  { label: 'Email', url: 'mailto:i240071@isb.nu.edu.pk', icon: 'mail' },
]

export const coreStacks = [
  { label: 'AI Based Systems', icon: 'brain' },
  { label: 'AI Agents', icon: 'robot' },
  { label: 'Full Stack', icon: 'server' },
]

// "Currently" card in the About section — TODO: keep this fresh
export const currently = [
  { label: 'Building', value: 'Agentic AI & n8n automation workflows', icon: 'bolt' },
  { label: 'Exploring', value: 'Three.js, WebGL & 3D on the web', icon: 'cube' },
  { label: 'Studying', value: 'BS Artificial Intelligence @ FAST NUCES', icon: 'graduation' },
]

// Animated counters.
//  value: a fixed number  |  from: 'projects' / 'skills' counts this file  |  live: 'repos' pulls your live GitHub repo count
export const stats = [
  { from: 'projects', label: 'Featured projects' },
  { value: 16, label: 'Public repositories', live: 'repos' },
  { from: 'skills', label: 'Skills & tools' },
  { value: 2028, label: 'Graduating class', plain: true },
]

// Infinite marquee strip under the hero
export const marquee = [
  'Python', 'C++', 'LLMs', 'AI Agents', 'n8n', 'LangChain', 'CrewAI', 'ROS 2', 'OpenCV', 'React',
  'Node.js', 'Three.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Linux', 'RAG', 'Computer Vision',
]

/* ----------------------------- SKILLS -------------------------------- */
// level: 'core' = hands-on project experience, 'familiar' = familiar / learning
export const skillCategories = [
  {
    id: 'ai',
    title: 'AI & Robotics',
    icon: 'brain',
    skills: [
      { name: 'LLMs & AI Agents', short: 'LLMs', level: 'core' },
      { name: 'Computer Vision (OpenCV)', short: 'OpenCV', level: 'core' },
      { name: 'ROS 2 & Gazebo Simulation', short: 'ROS 2', level: 'core' },
      { name: 'Machine Learning & Scikit-Learn', short: 'Scikit-Learn', level: 'core' },
    ],
  },
  {
    id: 'lang',
    title: 'Programming Languages',
    icon: 'code',
    skills: [
      { name: 'Python', level: 'core' },
      { name: 'C++', level: 'core' },
      { name: 'JavaScript / TypeScript', short: 'TypeScript', level: 'core' },
      { name: 'HTML & CSS', short: 'HTML/CSS', level: 'core' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    icon: 'tools',
    skills: [
      { name: 'Git & GitHub', short: 'Git', level: 'core' },
      { name: 'Docker & Containers', short: 'Docker', level: 'familiar' },
      { name: 'Linux & Bash Scripting', short: 'Linux', level: 'core' },
      { name: 'VS Code & Postman', short: 'Postman', level: 'core' },
    ],
  },
  {
    id: 'web',
    title: 'Full Stack',
    icon: 'server',
    skills: [
      { name: 'React & Next.js', short: 'React', level: 'core' },
      { name: 'Node.js & Express.js', short: 'Node.js', level: 'core' },
      { name: 'REST APIs & GraphQL', short: 'GraphQL', level: 'familiar' },
      { name: 'Three.js & React Three Fiber', short: 'Three.js', level: 'familiar' },
    ],
  },
  {
    id: 'db',
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'SQL (PostgreSQL / MySQL)', short: 'PostgreSQL', level: 'core' },
      { name: 'MongoDB', level: 'core' },
      { name: 'Vector Databases (Pinecone / Milvus)', short: 'Pinecone', level: 'familiar' },
      { name: 'Aiven Cloud Services', short: 'Aiven', level: 'familiar' },
    ],
  },
  {
    id: 'auto',
    title: 'AI Automation',
    icon: 'workflow',
    skills: [
      { name: 'n8n Workflow Automation', short: 'n8n', level: 'core' },
      { name: 'CrewAI & LangChain Agents', short: 'LangChain', level: 'core' },
      { name: 'Autonomous RAG Pipelines', short: 'RAG', level: 'familiar' },
      { name: 'API Integrations & Webhooks', short: 'Webhooks', level: 'core' },
    ],
  },
  {
    id: 'cs',
    title: 'Computer Science Concepts',
    icon: 'chip',
    skills: [
      { name: 'Database Management Systems (DBMS)', short: 'DBMS', level: 'core' },
      { name: 'Object-Oriented Programming (OOP)', short: 'OOP', level: 'core' },
      { name: 'Operating Systems (Linux/Ubuntu)', short: 'OS', level: 'core' },
      { name: 'Software Engineering & Architecture', short: 'Architecture', level: 'core' },
    ],
  },
]

export const softSkills = [
  { emoji: '👑', title: 'Leadership', text: 'Steering technical groups to build innovative automation pipelines and autonomous systems.' },
  { emoji: '🗣️', title: 'Bilingual', text: 'Fluent in English and native in Urdu, enabling clear communication across diverse tech teams.' },
  { emoji: '🤝', title: 'Team Collaboration', text: 'Translating complex technical challenges into shared goals and high-impact applications.' },
  { emoji: '💡', title: 'Problem Solving', text: 'Optimizing complex algorithms and architecting resource-efficient database workflows.' },
  { emoji: '⏰', title: 'Time Management', text: 'Prioritizing critical tasks, managing project milestones, and delivering scalable solutions on time.' },
  { emoji: '🔄', title: 'Adaptability', text: 'Thriving in fast-paced environments and rapidly learning new tools, SDKs, and framework updates.' },
  { emoji: '💬', title: 'Communication', text: 'Articulating complex AI/Robotics concepts clearly to both technical and non-technical stakeholders.' },
  { emoji: '📊', title: 'Presentation', text: 'Demonstrating project architectures, agent workflows, and technical details with clarity and impact.' },
]

export const process = {
  title: "Here's how I turn ideas into real-world applications",
  intro: 'I follow a structured, creative, and highly technical approach to turn ideas into robust, intelligent applications integrated with AI or custom agents.',
  steps: [
    { title: 'Research & Strategy', text: 'I analyze the core goals, user needs, and domain-specific challenges to define the AI architecture, selecting the right LLMs, agents, or RAG models.' },
    { title: 'AI & System Design', text: 'Orchestrating agent workflows (like in n8n), designing prompt templates, mapping memory layers, and structuring vector/relational databases.' },
    { title: 'Development & Integration', text: 'Building responsive interfaces and scalable backends while integrating custom AI agents (CrewAI/LangChain) and automation loops.' },
    { title: 'Deployment & Live Loops', text: 'Rigorous edge-case testing, optimizing token usage, deploying autonomous loops on cloud platforms, and ensuring persistent, secure operations.', badge: 'Ready to ship!' },
  ],
}

/* ---------------------------- PROJECTS ------------------------------- */
// category must match one of `projectFilters` ids below.
// image: optional cover image ('/images/projects/clara.png'). Without one a generated 3D-style cover is shown.
// details: shown in the case-study modal when a card is clicked — TODO: add problem / approach / results.
export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'cv', label: 'Vision & Robotics' },
  { id: 'web', label: 'Web & 3D' },
  { id: 'systems', label: 'Systems & DSA' },
]

export const projects = [
  {
    id: 'clara',
    title: 'Clara — AI Voice Receptionist',
    flag: '🎙️ AI Voice & Automation',
    category: 'ai',
    year: '2026',
    summary: 'Inbound AI voice agent that answers clinic calls, checks live availability and books appointments through natural conversation.',
    description: 'Developed an inbound AI voice agent that answers clinic calls, checks real-time appointment availability against Google Calendar, and schedules bookings via natural conversation. Built with Vapi.ai for voice orchestration and self-hosted n8n workflows for backend calendar logic.',
    tech: ['Vapi.ai', 'n8n', 'Google Calendar'],
    links: { github: 'https://github.com/muhammadkaif654/vapi-n8n-dental-assistant' },
    image: null,
    highlights: [], // TODO e.g. ['Handles 100% of after-hours calls', 'Avg booking in 45s']
  },
  {
    id: 'agents-hub',
    title: 'Production AI Automation Agents Hub',
    flag: '🤖 AI Agents & Pipelines',
    category: 'ai',
    year: '2026',
    summary: 'A curated hub of autonomous AI agent pipelines including a deep web-scraping lead-generation builder.',
    description: 'Architected a curated repository of high-performance, autonomous AI agent pipelines. Designed a deep web-scraping lead generation builder utilizing Tavily, Groq (Llama 3.3), Firecrawl, and Google Sheets for rapid production deployment.',
    tech: ['Groq (Llama 3.3)', 'Firecrawl', 'Tavily', 'Google Sheets'],
    links: { github: 'https://github.com/muhammadkaif654/ai-automation-agents' },
    image: null,
    highlights: [],
  },
  {
    id: 'solematch',
    title: 'SoleMatch — Visual Sneaker Search',
    flag: '🔎 AI & Retrieval',
    category: 'ai',
    year: '2026',
    summary: 'Upload a photo, get the sneaker. CLIP vs fine-tuned ResNet50 triplet embeddings over FAISS — 95.0% Recall@1.',
    description: 'Sneaker visual search engine — upload a photo, get the model. Compares CLIP against fine-tuned ResNet50 triplet embeddings over FAISS, measured on 645 held-out queries (95.0% Recall@1). React + Three.js frontend on a FastAPI retrieval service.',
    tech: ['PyTorch', 'CLIP', 'FAISS', 'FastAPI', 'Three.js'],
    links: { github: 'https://github.com/muhammadkaif654/solematch-visual-search' },
    image: null,
    highlights: ['95.0% Recall@1', '645 held-out queries'],
  },
  {
    id: 'synapse',
    title: 'Synapse AI Wearable System',
    flag: '🚀 AI & Hardware',
    category: 'cv',
    year: '2025',
    summary: 'Wearable Body Area Network with ESP32, GPS and biometric sensors feeding context-aware AI.',
    description: 'Engineered a wearable Body Area Network utilizing ESP32, GPS, and biometric sensors. Integrated Whisper, Qwen, and A* pathfinding to translate data into context-aware AI interactions.',
    tech: ['Python', 'ESP32', 'Whisper', 'Algorithms'],
    links: { github: 'https://github.com/muhammadkaif654' },
    image: null,
    highlights: [],
  },
  {
    id: 'phantom-key',
    title: 'Phantom-Key Touchless Interface',
    flag: '👁️ Computer Vision',
    category: 'cv',
    year: '2025',
    summary: 'Hand gestures become desktop commands — mouse, keyboard, presentation and media modes.',
    description: 'Developed a CV system that accurately translates hand gestures into touchless desktop commands, mapping hand landmarks to complex OS commands with dedicated modes for mouse, keyboard, presentation, and media control. Designed a responsive GUI utilizing Figma and Tkinter.',
    tech: ['Python', 'OpenCV', 'MediaPipe'],
    links: { github: 'https://github.com/muhammadkaif654/Phantom-Key' },
    image: null,
    highlights: [],
  },
  {
    id: 'medidash',
    title: 'Medidash Autonomous Medical Robot',
    flag: '🤖 Robotics',
    category: 'cv',
    year: '2025',
    summary: 'Autonomous healthcare robot integrating custom hardware with ROS 2 and MQTT coordination.',
    description: 'Deployed an autonomous healthcare robot integrating custom hardware with ROS 2. Configured MQTT protocols to coordinate safe machine navigation.',
    tech: ['ROS 2', 'Gazebo', 'MQTT', 'Hardware'],
    links: { github: 'https://github.com/muhammadkaif654' },
    image: null,
    highlights: [],
  },
  {
    id: 'chess-3d',
    title: '3D Anime Chess',
    flag: '♟️ 3D Web',
    category: 'web',
    year: '2026',
    summary: 'Real chess rules rendered in Three.js / React Three Fiber with Attack on Titan–styled pieces.',
    description: 'A 3D anime-themed chess game — real chess rules (chess.js) rendered in Three.js/React Three Fiber, with pieces styled as Attack on Titan characters. Built with React, TypeScript, and Vite.',
    tech: ['React', 'TypeScript', 'R3F', 'chess.js'],
    links: { github: 'https://github.com/muhammadkaif654/3d-chess-game' },
    image: null,
    highlights: [],
  },
  {
    id: 'rideflow',
    title: 'RideFlow Ride-Sharing Platform',
    flag: '🌐 Full Stack',
    category: 'web',
    year: '2025',
    summary: 'Full-stack ride-hailing app with real-time trip lifecycles, JWT auth and a built-in PKR wallet.',
    description: 'Developed a full-stack application with real-time ride-matching capabilities. Architected complex workflows using MongoDB, SQL triggers, and Node.js, with secure JWT authentication and a built-in PKR wallet system.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    links: { github: 'https://github.com/muhammadkaif654/RideFlow-Node-JS' },
    image: null,
    highlights: [],
  },
  {
    id: 'movie-manager',
    title: 'Movie Data Manager',
    flag: '💻 DSA & C++',
    category: 'systems',
    year: '2025',
    summary: 'Graph-based system organising and querying 5,044 movies with optimised search & recommendations.',
    description: 'Designed a high-performance system to organize and query over 5,044 movies. Modeled movies as vertices within a custom graph structure to facilitate complex relation mapping and optimized time complexity for searching, recommending, and sorting operations.',
    tech: ['C++', 'Graphs', 'Data Structures'],
    links: { github: 'https://github.com/muhammadkaif654/Movie-Manager-DSA' },
    image: null,
    highlights: ['5,044 movies indexed'],
  },
  {
    id: 'retail-pulse',
    title: 'Retail Pulse OS',
    flag: '⚙️ Operating Systems',
    category: 'systems',
    year: '2025',
    summary: 'Multi-process pipeline using POSIX shared memory, named pipes and threads for real-time retail analytics.',
    description: 'A high-performance, multi-process data pipeline to ingest, process, and aggregate massive retail transaction datasets in real-time. Leverages POSIX Shared Memory, Named Pipes, and multi-threading to prevent sequential bottlenecks and maximize multi-core CPU utilization.',
    tech: ['Python', 'POSIX', 'Multithreading'],
    links: { github: 'https://github.com/muhammadkaif654/Retail-Pulse-OS' },
    image: null,
    highlights: [],
  },
]

/* -------------------------- JOURNEY / TIMELINE ----------------------- */
// type: 'education' | 'experience' | 'leadership' | 'award'
export const journey = [
  {
    type: 'education',
    title: 'Bachelors in Artificial Intelligence',
    org: 'National University of Computer and Emerging Sciences (FAST NUCES)',
    period: '2024 — 2028 (expected)',
    location: 'Islamabad, Pakistan',
    text: 'Building a robust foundation in engineering and intelligent systems — machine learning, robotics, data structures, databases and operating systems.',
    tags: ['AI', 'Robotics', 'DSA', 'DBMS', 'OS'],
  },
  {
    type: 'leadership',
    title: 'Member — WOH Society',
    org: 'Welfare of Humanity, FAST NUCES',
    period: 'TODO: add dates',
    location: 'Islamabad',
    text: 'TODO: describe your role, events you organised and impact.',
    tags: ['Community', 'Leadership'],
  },
  {
    type: 'experience',
    title: 'TODO: Your next role / internship',
    org: 'Company name',
    period: 'Start — End',
    location: 'Remote / City',
    text: 'TODO: what you built, the stack you used and the measurable result.',
    tags: ['Add', 'Tags'],
  },
]

export const certifications = {
  enabled: true,
  folderUrl: 'https://drive.google.com/drive/folders/1dhd25EK0JvXYmMY86UZTuvImwhe4M9g4?usp=drive_link',
  items: [
    { title: 'Programming for AI Project', issuer: 'FAST NUCES', icon: 'brain', url: null, date: '' },
    { title: 'WOH Society', issuer: 'Welfare of Humanity', icon: 'users', url: null, date: '' },
    // TODO: add more { title, issuer, icon, url, date }
  ],
}

/* ---------------------------- TESTIMONIALS --------------------------- */
// TODO: replace with real quotes from professors, teammates or clients — or set enabled: false
export const testimonials = {
  enabled: true,
  items: [
    { quote: 'Placeholder — a short quote from a professor about your work ethic and technical depth goes here.', name: 'Professor Name', role: 'Faculty, FAST NUCES' },
    { quote: 'Placeholder — a teammate describing what it was like to build a project with you.', name: 'Teammate Name', role: 'Project Partner' },
    { quote: 'Placeholder — a client or hackathon judge on the impact of what you delivered.', name: 'Client Name', role: 'Founder, Company' },
    { quote: 'Placeholder — a mentor on your growth in AI engineering and automation.', name: 'Mentor Name', role: 'Senior Engineer' },
  ],
}

/* ------------------------------ GITHUB ------------------------------- */
// Live section — fetches public repos from the GitHub API at runtime.
export const github = {
  enabled: true,
  username: 'muhammadkaif654',
  maxRepos: 6,
  exclude: ['portfolio-website'],
}

/* ------------------------------ CONTACT ------------------------------ */
export const contact = {
  heading: "Let's build something intelligent.",
  sub: 'Your message lands directly in my inbox. I typically respond within 24-48 hours.',
  web3formsKey: 'f5dd9f34-abab-42a1-a65d-87ec3122af9a',
  // Cities drawn as arcs from Islamabad on the 3D globe ("open to remote work")
  globeArcs: [
    { name: 'London', lat: 51.5, lon: -0.12 },
    { name: 'San Francisco', lat: 37.77, lon: -122.42 },
    { name: 'Dubai', lat: 25.2, lon: 55.27 },
    { name: 'Singapore', lat: 1.35, lon: 103.82 },
    { name: 'Berlin', lat: 52.52, lon: 13.4 },
    { name: 'Toronto', lat: 43.65, lon: -79.38 },
  ],
}

export const footer = {
  columns: [
    ['AI Engineering & Robotics', 'Python • Node.js • C++', 'Autonomous Applications'],
  ],
  copyright: '© 2026 Muhammad Kaif',
}

// Navigation (id must match a section id)
export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]
