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
  roles: ['AI Engineer', 'ML Engineer', 'Vision AI Developer', 'LLM & Agent Builder', 'Full Stack Developer'],
  tagline: 'I build machine learning models, computer vision systems and LLM-powered agents — and ship them as full-stack products.',
  bio: "Hi, I'm Muhammad Kaif — an AI Engineer studying Artificial Intelligence at FAST NUCES in Islamabad. My work spans machine learning, deep learning and computer vision, NLP & LLMs, knowledge representation & reasoning, and autonomous agents. I take models from raw data to measurable results (95% Recall@1 visual search, R² 0.886 price prediction) and deploy them behind real APIs, databases and interfaces.",
  location: 'Islamabad, Pakistan',
  coords: { lat: 33.6844, lon: 73.0479 }, // used by the 3D globe in the contact section
  timezone: 'Asia/Karachi',
  university: 'FAST NUCES',
  email: 'i240071@isb.nu.edu.pk',
  phone: '+92 337 9872895',
  phoneHref: 'tel:+923379872895',
  resumeUrl: '/resume.pdf', // your CV lives at /public/resume.pdf
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
  { label: 'Machine Learning', icon: 'brain' },
  { label: 'Computer Vision', icon: 'eye' },
  { label: 'LLMs & AI Agents', icon: 'robot' },
  { label: 'Full Stack & Databases', icon: 'server' },
]

// "Currently" card in the About section — TODO: keep this fresh
export const currently = [
  { label: 'Building', value: 'Agentic AI & n8n automation workflows', icon: 'bolt' },
  { label: 'Exploring', value: 'Metric learning & open-set recognition', icon: 'eye' },
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
  'Machine Learning', 'Computer Vision', 'Deep Learning', 'LLMs', 'AI Agents', 'RAG', 'NLP', 'Knowledge Representation',
  'Scikit-Learn', 'XGBoost', 'OpenCV', 'YOLO11', 'FAISS', 'LangChain', 'n8n', 'ROS 2', 'Python', 'FastAPI', 'React', 'PostgreSQL', 'MongoDB',
]

/* ----------------------------- SKILLS -------------------------------- */
// level: 'core' = hands-on project experience, 'familiar' = familiar / learning
export const skillCategories = [
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: 'brain',
    skills: [
      { name: 'Supervised & Unsupervised Learning', short: 'ML', level: 'core' },
      { name: 'Scikit-Learn & XGBoost', short: 'XGBoost', level: 'core' },
      { name: 'Feature Engineering & Model Evaluation', short: 'Features', level: 'core' },
      { name: 'Hyperparameter Tuning (CV Search)', short: 'Tuning', level: 'core' },
      { name: 'SHAP Explainability', short: 'SHAP', level: 'core' },
      { name: 'Pandas & NumPy', short: 'Pandas', level: 'core' },
    ],
  },
  {
    id: 'cv',
    title: 'Deep Learning & Computer Vision',
    icon: 'eye',
    skills: [
      { name: 'Computer Vision (OpenCV)', short: 'OpenCV', level: 'core' },
      { name: 'Hand & Pose Tracking (MediaPipe)', short: 'MediaPipe', level: 'core' },
      { name: 'CNNs & Transfer Learning (ResNet50)', short: 'CNNs', level: 'core' },
      { name: 'Object Detection & Tracking (YOLO11, ByteTrack)', short: 'YOLO11', level: 'core' },
      { name: 'Metric Learning (Triplet / ArcFace)', short: 'ArcFace', level: 'core' },
      { name: 'CLIP & Embedding Search (FAISS)', short: 'FAISS', level: 'core' },
    ],
  },
  {
    id: 'nlp',
    title: 'NLP & Large Language Models',
    icon: 'chat',
    skills: [
      { name: 'LLMs (Llama 3.3, Qwen)', short: 'LLMs', level: 'core' },
      { name: 'Prompt Engineering', short: 'Prompting', level: 'core' },
      { name: 'Speech-to-Text (Whisper)', short: 'Whisper', level: 'core' },
      { name: 'Retrieval-Augmented Generation (RAG)', short: 'RAG', level: 'familiar' },
      { name: 'Vector Databases (Pinecone / Milvus)', short: 'Pinecone', level: 'familiar' },
    ],
  },
  {
    id: 'auto',
    title: 'AI Agents & Automation',
    icon: 'robot',
    skills: [
      { name: 'n8n Workflow Automation', short: 'n8n', level: 'core' },
      { name: 'CrewAI & LangChain Agents', short: 'LangChain', level: 'core' },
      { name: 'Voice Agents (Vapi.ai)', short: 'Vapi.ai', level: 'core' },
      { name: 'API Integrations & Webhooks', short: 'Webhooks', level: 'core' },
    ],
  },
  {
    id: 'krr',
    title: 'Knowledge Representation & Reasoning',
    icon: 'network',
    skills: [
      { name: 'Propositional & First-Order Logic', short: 'FOL', level: 'core' },
      { name: 'Inference & Resolution', short: 'Inference', level: 'core' },
      { name: 'Search & Planning (A*, Heuristics)', short: 'A* Search', level: 'core' },
      { name: 'Knowledge Graphs & Ontologies', short: 'Knowledge Graphs', level: 'familiar' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & Embedded AI',
    icon: 'chip',
    skills: [
      { name: 'ROS 2', level: 'core' },
      { name: 'Gazebo Simulation', short: 'Gazebo', level: 'core' },
      { name: 'ESP32 & Sensor Networks', short: 'ESP32', level: 'core' },
      { name: 'MQTT Messaging', short: 'MQTT', level: 'core' },
    ],
  },
  {
    id: 'db',
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'SQL (PostgreSQL / MySQL)', short: 'PostgreSQL', level: 'core' },
      { name: 'MongoDB', level: 'core' },
      { name: 'Triggers & Stored Procedures', short: 'SQL Triggers', level: 'core' },
      { name: 'Aiven Cloud Services', short: 'Aiven', level: 'familiar' },
    ],
  },
  {
    id: 'web',
    title: 'Full Stack',
    icon: 'server',
    skills: [
      { name: 'React & Next.js', short: 'React', level: 'core' },
      { name: 'Node.js & Express.js', short: 'Node.js', level: 'core' },
      { name: 'FastAPI (ML Model Serving)', short: 'FastAPI', level: 'core' },
      { name: 'REST APIs & GraphQL', short: 'GraphQL', level: 'familiar' },
      { name: 'Three.js & React Three Fiber', short: 'Three.js', level: 'familiar' },
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
      { name: 'SQL & Bash', short: 'Bash', level: 'core' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    icon: 'tools',
    skills: [
      { name: 'Git & GitHub', short: 'Git', level: 'core' },
      { name: 'Jupyter Notebooks', short: 'Jupyter', level: 'core' },
      { name: 'Linux & Bash Scripting', short: 'Linux', level: 'core' },
      { name: 'Docker & Containers', short: 'Docker', level: 'familiar' },
    ],
  },
  {
    id: 'cs',
    title: 'Computer Science Concepts',
    icon: 'graduation',
    skills: [
      { name: 'Data Structures & Algorithms', short: 'DSA', level: 'core' },
      { name: 'Object-Oriented Programming (OOP)', short: 'OOP', level: 'core' },
      { name: 'Database Management Systems (DBMS)', short: 'DBMS', level: 'core' },
      { name: 'Operating Systems (Linux/Ubuntu)', short: 'OS', level: 'core' },
    ],
  },
]

/* --------------------------- AI EXPERTISE ---------------------------- */
// "AI Expertise" section: one card per focus area, each backed by proof from a real project.
export const aiExpertise = [
  {
    title: 'Machine Learning',
    icon: 'brain',
    text: 'End-to-end ML pipelines: data cleaning, feature engineering, leakage-safe splits, model comparison, hyperparameter tuning and explainability.',
    tags: ['Scikit-Learn', 'XGBoost', 'Random Forest', 'SHAP', 'Pandas'],
    proof: 'House Price Prediction: R² 0.886 on ~93K listings',
  },
  {
    title: 'Deep Learning & Computer Vision',
    icon: 'eye',
    text: 'Object detection and tracking, metric learning and real-time vision: fine-tuned YOLO11 detectors, embeddings trained with triplet and ArcFace loss, image retrieval and hand tracking.',
    tags: ['YOLO11', 'ByteTrack', 'OpenCV', 'MediaPipe', 'ResNet50', 'CLIP', 'ArcFace', 'FAISS'],
    proof: 'SoleMatch: 95.0% Recall@1 on 645 unseen queries',
  },
  {
    title: 'NLP & Large Language Models',
    icon: 'chat',
    text: 'LLM-powered applications with prompt engineering, retrieval-augmented generation, speech-to-text and vector search.',
    tags: ['Llama 3.3', 'Qwen', 'Whisper', 'RAG', 'Pinecone'],
    proof: 'Synapse wearable: Whisper + Qwen context-aware assistant',
  },
  {
    title: 'AI Agents & Automation',
    icon: 'robot',
    text: 'Autonomous agents and voice assistants wired into real tools: calendars, spreadsheets, web scrapers and email.',
    tags: ['LangChain', 'CrewAI', 'n8n', 'Vapi.ai', 'Webhooks'],
    proof: 'Clara: AI receptionist that books real appointments',
  },
  {
    title: 'Knowledge Representation & Reasoning',
    icon: 'network',
    text: 'Logic-based AI: propositional and first-order logic, inference and resolution, knowledge graphs, plus heuristic search and planning.',
    tags: ['First-Order Logic', 'Inference', 'Knowledge Graphs', 'A* Search'],
    proof: 'A* pathfinding inside the Synapse wearable',
  },
  {
    title: 'Robotics & Embedded AI',
    icon: 'chip',
    text: 'Autonomous navigation, simulation and sensor networks: bringing AI out of the notebook and onto hardware.',
    tags: ['ROS 2', 'Gazebo', 'ESP32', 'MQTT'],
    proof: 'Medidash: autonomous medical robot on ROS 2',
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
// image: cover image in /public/images/projects (1600x832 .webp). Without one a generated 3D-style cover is shown.
// details: shown in the case-study modal when a card is clicked — TODO: add problem / approach / results.
export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'ML & Deep Learning' },
  { id: 'agents', label: 'LLMs & Agents' },
  { id: 'cv', label: 'Vision & Robotics' },
  { id: 'web', label: 'Full Stack & 3D' },
  { id: 'systems', label: 'Systems & DSA' },
]

export const projects = [
  {
    id: 'solematch',
    title: 'SoleMatch — Visual Sneaker Search',
    flag: '🔎 Deep Learning & Retrieval',
    category: 'ml',
    year: '2026',
    summary: 'Upload a photo, get the sneaker. Fine-tuned ResNet50 triplet embeddings over FAISS — 95.0% Recall@1 on unseen queries.',
    description: 'Sneaker visual search engine — upload a photo, get the model plus visually similar alternatives from a 3,433-image catalog. Compares zero-shot CLIP ViT-B/32 against a ResNet50 fine-tuned with triplet loss, indexed in FAISS. Fine-tuning lifted Recall@1 from 82.8% to 95.0% on 645 held-out queries that were never indexed or trained on. React + Three.js frontend on a FastAPI retrieval service.',
    tech: ['ResNet50', 'Triplet Loss', 'CLIP', 'FAISS', 'FastAPI', 'React'],
    links: { github: 'https://github.com/muhammadkaif654/solematch-visual-search' },
    image: '/images/projects/solematch.webp',
    highlights: ['95.0% Recall@1 (up from 82.8% zero-shot CLIP)', '645 held-out queries across 43 sneaker models', 'MRR 0.954'],
  },
  {
    id: 'pitchvision',
    title: 'PitchVision AI — Football Match Analytics',
    flag: '⚽ Computer Vision & Sports AI',
    category: 'cv',
    year: '2026',
    summary: 'Broadcast football clip in, tactical map out: fine-tuned YOLO11 + ByteTrack tracking, automatic pitch calibration, player stats and heatmaps.',
    description: "Turns a broadcast football clip into tracked players, a bird's-eye tactical map, player and team metrics, heatmaps and shareable reports, all from a Streamlit dashboard that runs on an ordinary laptop. Players, goalkeepers, referees and the ball are detected with fine-tuned YOLO11 models and tracked with ByteTrack; jersey colours are clustered with KMeans to split the teams; a 32-keypoint pose model plus ORB/RANSAC camera-motion tracking fits a homography to a 105 × 68 m pitch, even with a panning, zooming camera. From there it computes distance, top speed, sprints and possession, and exports annotated H.264 video, CSV/Excel reports and heatmaps. OpenVINO runs the models on an Intel integrated GPU 3–4× faster than the CPU.",
    tech: ['YOLO11', 'ByteTrack', 'OpenCV', 'Homography', 'OpenVINO', 'Streamlit'],
    links: { github: 'https://github.com/muhammadkaif654/pitchvision-ai-football-analytics' },
    image: '/images/projects/pitchvision.webp',
    highlights: [
      'Custom models find the ball in 93% of frames vs 47% pretrained',
      'mAP50: players 0.88, ball 0.96, pitch keypoints 0.995',
      '3–4× faster on an Intel GPU via OpenVINO (85 ms/frame)',
      '~90 unit tests covering metrics, homography and tracking',
    ],
  },
  {
    id: 'house-price',
    title: 'House Price Prediction — End-to-End ML',
    flag: '📈 Machine Learning',
    category: 'ml',
    year: '2026',
    summary: 'Property valuation for Lahore, Karachi & Islamabad: ~93K listings, tuned Random Forest with R² 0.886 and SHAP explanations.',
    description: 'An AI-assisted property valuation system built from raw Zameen.com listings to a trained model, a REST API and a web interface. Covers data cleaning, leakage-safe feature engineering, EDA, comparison of Linear Regression, Random Forest and XGBoost, RandomizedSearchCV tuning and SHAP explainability. Served with FastAPI and a React frontend.',
    tech: ['Scikit-Learn', 'XGBoost', 'SHAP', 'Pandas', 'FastAPI', 'React'],
    links: { github: 'https://github.com/muhammadkaif654/house-price-prediction' },
    image: '/images/projects/house-price.webp',
    highlights: ['R² 0.886 with a tuned Random Forest', '~93K cleaned listings, 20% held-out test set', 'SHAP explanations for every prediction'],
  },
  {
    id: 'charaid',
    title: 'CharaID — Open-Set Character Recognition',
    flag: '👁️ Deep Learning & CV',
    category: 'ml',
    year: '2026',
    summary: 'Recognises anime characters from a photo using ArcFace embeddings — new characters need 5 images and zero retraining.',
    description: 'An open-set recognition system built like production face recognition: an anime-specific face detector, an encoder trained with ArcFace (additive angular margin) loss producing 512-d embeddings, and cosine matching against a FAISS gallery with a calibrated threshold so it can answer "unknown" instead of guessing. Results are enriched from the AniList GraphQL API. Evaluated on characters held out from training entirely.',
    tech: ['ArcFace', 'Metric Learning', 'FAISS', 'Python', 'GraphQL'],
    links: { github: 'https://github.com/muhammadkaif654/charaid' },
    image: '/images/projects/charaid.webp',
    highlights: ['Open-set: add a character with 5 images, no retraining', 'Calibrated "unknown" threshold'],
  },
  {
    id: 'clara',
    title: 'Clara — AI Voice Receptionist',
    flag: '🎙️ AI Voice Agent',
    category: 'agents',
    year: '2026',
    summary: 'Inbound AI voice agent that answers clinic calls, checks live availability and books appointments through natural conversation.',
    description: 'Developed an inbound AI voice agent that answers clinic calls, checks real-time appointment availability against Google Calendar, and schedules bookings via natural conversation. Built with Vapi.ai for voice orchestration and self-hosted n8n workflows for backend calendar logic.',
    tech: ['Vapi.ai', 'LLMs', 'n8n', 'Google Calendar'],
    links: { github: 'https://github.com/muhammadkaif654/vapi-n8n-dental-assistant' },
    image: '/images/projects/clara.webp',
    highlights: [],
  },
  {
    id: 'agents-hub',
    title: 'AI Automation Agents Hub',
    flag: '🤖 AI Agents & Pipelines',
    category: 'agents',
    year: '2026',
    summary: 'Autonomous LLM agent pipelines, including a lead-generation agent that researches companies and drafts outreach.',
    description: 'Architected a curated repository of high-performance, autonomous AI agent pipelines. Includes a deep web-scraping lead generation builder using Tavily, Groq (Llama 3.3), Firecrawl and Google Sheets, which analyses each business with an LLM and drafts personalised outreach emails automatically.',
    tech: ['Groq (Llama 3.3)', 'n8n', 'Firecrawl', 'Tavily'],
    links: { github: 'https://github.com/muhammadkaif654/ai-automation-agents' },
    image: '/images/projects/agents-hub.webp',
    highlights: [],
  },
  {
    id: 'synapse',
    title: 'Synapse AI Wearable System',
    flag: '🚀 AI & Hardware',
    category: 'cv',
    year: '2025',
    summary: 'Wearable Body Area Network with ESP32, GPS and biometric sensors feeding a Whisper + Qwen context-aware assistant.',
    description: 'Engineered a wearable Body Area Network utilizing ESP32, GPS, and biometric sensors. Integrated Whisper speech-to-text, the Qwen LLM and A* pathfinding to translate sensor data into context-aware AI interactions.',
    tech: ['Python', 'Whisper', 'Qwen', 'A* Search', 'ESP32'],
    links: { github: 'https://github.com/muhammadkaif654' },
    image: '/images/projects/synapse.webp',
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
    image: '/images/projects/phantom-key.webp',
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
    image: '/images/projects/medidash.webp',
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
    tech: ['Node.js', 'Express', 'MongoDB', 'SQL', 'JWT'],
    links: { github: 'https://github.com/muhammadkaif654/RideFlow-Node-JS' },
    image: '/images/projects/rideflow.webp',
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
    image: '/images/projects/chess-3d.webp',
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
    image: '/images/projects/movie-manager.webp',
    highlights: ['5,044 movies indexed'],
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
    {
      quote: 'Kaif kept our whole team on track. He broke the project into clear milestones, gave everyone ownership of a piece, ran quick check-ins and made sure we shipped on time without anyone burning out. Easily the best-managed project I have been part of.',
      name: 'Teammate',
      role: 'University project team',
    },
    {
      quote: "Kaif's AI skills are genuinely amazing. He doesn't just call a library — he understands why a model works, evaluates it honestly and pushes it until the results are strong. He picks up new techniques remarkably fast.",
      name: 'AI Project Mentor',
      role: 'Programming for AI project',
    },
    {
      quote: 'His leadership on our civics project was outstanding. Kaif organised the group, delegated with confidence, motivated everyone to contribute and represented the team clearly from start to finish.',
      name: 'Civics Project Supervisor',
      role: 'Civics project, FAST NUCES',
    },
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
  { id: 'expertise', label: 'AI Expertise' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]
