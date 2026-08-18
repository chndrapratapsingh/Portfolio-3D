import { Project, Skill, SkillCategoryBreakdown, Experience } from '../types';

export const PERSONAL_INFO = {
  name: 'Chandrapratap Suryavanshi',
  brand: '<Chandrapratap Suryavanshi/>',
  headline: 'DEVELOPER • GAMER • STUDENT',
  tagline: '"Building the future, one line of code at a time"',
  badges: ['PROGRAMMER', 'GAMER', 'AI CREATOR', 'STUDENT'],
  whoAmI: `I'm a passionate developer, dedicated gamer, and computer science student who bridges the gap between creativity and technology. My journey spans multiple programming languages and platforms, with a special focus on artificial intelligence and machine learning.`,
  mission: `Currently developing Lucy - a personal AI assistant that aims to surpass ChatGPT, Gemini, and DeepSeek. Think of it as a real-world JARVIS, designed to revolutionize how we interact with AI technology.`,
  email: 'chandrapratapsuryavanshi@gmail.com',
  discordUser: 'DevGamer#1234',
  availability: 'Available for Remote Work',
  github: 'https://github.com/chndrapratapsingh',
  youtube: 'https://www.youtube.com/@I_Am_Undifined',
  twitter: 'https://x.com/Evi7862628547',
  discordUrl: 'https://discord.com/users/LuciferMS12',
  resumeUrl: './Chandrapratap_Suryavanshi_Resume.pdf',
  terminal: {
    whoami: 'Developer • Gamer • Student',
    skills: 'C/ C++/ SpringBoot/ NodeJS/ Python/ Java/ Kotlin/ HTML5/ CSS3 /JS',
    lucy: 'Personal AI Assistant - Next-gen JARVIS',
    status: 'Learning • Building • Innovating',
  },
  contactText: `Whether you're interested in collaborating on projects, discussing AI development, or just want to chat about the latest in tech and gaming - I'd love to hear from you!`,
  copyright: '© 2025 Chandrapratap Portfolio. Built with passion for code.',
};

export const PROJECTS: Project[] = [
  {
    id: 'lucy-ai',
    title: 'LUCY AI',
    subhead: 'Personal AI Assistant • Next-gen JARVIS',
    statusBadge: 'ACTIVE DEVELOPMENT',
    tagline: 'Surpass market leaders like ChatGPT, Gemini, and DeepSeek',
    description: 'Lucy is an advanced AI assistant designed to surpass current market leaders like ChatGPT, Gemini, and DeepSeek. Built with cutting-edge machine learning algorithms and natural language processing, Lucy aims to be the ultimate personal AI companion.',
    longDescription: 'Lucy is engineered as an autonomous, multi-modal personal AI companion. Designed with modern deep learning and real-time execution pipelines, Lucy combines conversation, task scheduling, system automation, and cross-platform interaction into a unified intelligence center.',
    category: 'AI & Machine Learning',
    tags: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
    featured: true,
    githubUrl: 'https://github.com/chndrapratapsingh',
    videoUrl: 'https://www.youtube.com/watch?v=7e2wifqQZpk',
    modelType: 'sphere',
    color: '#06b6d4',
    keyFeatures: [
      'Advanced conversational AI & multi-modal support',
      'Real-time learning & context-aware memory',
      'Task automation & scheduling engine',
      'Autonomous system execution pipeline',
    ],
    metrics: [
      { label: 'Latency', value: 'Sub-300ms' },
      { label: 'Architecture', value: 'Multi-Modal Transformer' },
      { label: 'Development Phase', value: 'Active Alpha' },
    ],
  },
  {
    id: 'spotlight-launcher',
    title: 'Spotlight Launcher',
    subhead: 'Windows Productivity Launcher • PySide6 & Gemini AI',
    statusBadge: 'FEATURED SPOTLIGHT',
    tagline: 'Fast, keyboard-driven launcher inspired by macOS Spotlight & Raycast',
    description: 'A lightning-fast productivity launcher for Windows built with Python and PySide6 (Qt). Instantly finds applications, files, and URLs with global hotkey support (Ctrl + Shift + Space), built-in natural language calculator, live weather, terminal launcher, and Google Gemini AI integration.',
    category: 'Python & AI Desktop',
    tags: ['Python', 'PySide6', 'Qt', 'Google Gemini AI', 'Windows API'],
    featured: true,
    githubUrl: 'https://github.com/chndrapratapsingh',
    modelType: 'cyberCube',
    color: '#38bdf8',
    keyFeatures: [
      '🔍 Instant application & deep file search',
      '🤖 Google Gemini AI-powered search & answers',
      '⌨️ Global hotkey (Ctrl + Shift + Space) & system tray',
      '🧮 Natural language calculator & unit converter',
      '🌦️ Live weather information & terminal launcher',
      '⚙️ Configurable modular plugin-based architecture',
    ],
  },
  {
    id: 'futureme-ai',
    title: 'FutureME AI',
    subhead: 'Living Interface That Evolves With Your Dreams',
    statusBadge: 'GOOGLE STITCH CHALLENGE',
    tagline: 'Emotion-aware adaptive UI & interactive timeline for personal growth',
    description: 'Built for the Google Stitch Challenge, FutureMe AI creates an interface that feels alive. It adapts to user emotions, visualizes future career goals through an interactive timeline, and transforms the user experience based on personal growth and ambitions.',
    category: 'AI & Machine Learning',
    tags: ['Generative AI', 'Google Stitch', 'React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/chndrapratapsingh',
    liveUrl: 'https://lnkd.in/gCZd77Sz',
    modelType: 'icosahedron',
    color: '#a855f7',
    keyFeatures: [
      '🧠 Emotion-aware adaptive user interface',
      '🗺️ AI-generated future roadmap & timeline',
      '📈 Smart memory system & living interactions',
      '🚀 Career & business growth simulation',
    ],
  },
  {
    id: 'ecwallpaper',
    title: 'ECWallpaper',
    subhead: 'Smart Festival-Aware Desktop Wallpaper App',
    tagline: 'Automates desktop wallpapers based on current date & cultural festivals',
    description: 'ECWallpaper automatically updates desktop wallpapers based on current dates and upcoming cultural festivals. Features an information panel explaining festival significance, combining technology with culture.',
    category: 'Desktop & Web',
    tags: ['Python', 'Desktop GUI', 'Festival API', 'Windows OS API'],
    featured: false,
    githubUrl: 'https://github.com/chndrapratapsingh',
    modelType: 'torus',
    color: '#f59e0b',
    keyFeatures: [
      '📅 Automatic daily festival wallpaper updates',
      '📖 Information panel explaining cultural significance',
      '🎨 Personalized & engaging desktop experience',
      '⚡ Lightweight background execution',
    ],
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    subhead: 'C++ OpenGL Custom Game Engine',
    tagline: 'Custom 2D game engine built in C++ with OpenGL support',
    description: 'Custom 2D game engine built in C++ with OpenGL support. Features real-time rendering, optimized math operations, and clean game loop management.',
    category: 'System Programming & Gaming',
    tags: ['C++', 'OpenGL'],
    featured: false,
    githubUrl: 'https://github.com/chndrapratapsingh',
    modelType: 'cube',
    color: '#ec4899',
    keyFeatures: [
      'Custom OpenGL 2D Renderer',
      'Low-latency Game Loop',
      'Hardware-accelerated Graphics',
      'State Management & Collision Vector System',
    ],
  },
  {
    id: 'firebase-projects',
    title: 'Firebase Web Ecosystem',
    subhead: 'Authentication, Firestore & Serverless Applications',
    tagline: 'Multiple production websites utilizing Firebase core backend services',
    description: 'Created multiple high-performance web applications using Firebase features such as Authentication, Cloud Firestore real-time data streaming, Security Rules, and cloud serverless logic.',
    category: 'Web Development',
    tags: ['JavaScript', 'Python', 'Firebase', 'Node.js'],
    featured: false,
    githubUrl: 'https://github.com/chndrapratapsingh',
    modelType: 'octahedron',
    color: '#10b981',
    keyFeatures: [
      'Secure User Authentication Flows',
      'Real-time Firestore Sync',
      'Serverless Cloud Functions',
      'REST & Database Integrations',
    ],
  },
  {
    id: 'aicamx',
    title: 'AiCamX — AI-Powered Camera App',
    subhead: 'Kotlin • Jetpack Compose • CameraX • Google ML Kit',
    statusBadge: 'FEATURED CAMERA APP',
    tagline: 'AiCamX — Capture. Understand. Organize.',
    description: 'A modern Android camera app built with Kotlin, Jetpack Compose, CameraX, and Google ML Kit. Combines real-time 16:9 preview, multi-face detection, smart gallery album naming, and AI photo organization.',
    longDescription: `AiCamX is a modern Android camera application built with Kotlin, Jetpack Compose, CameraX, and Google ML Kit. It combines a clean, smartphone-style camera interface with intelligent AI-powered features for capturing, organizing, and analyzing photos and videos.

📸 Camera Features:
• Real-time camera preview with 16:9 framing
• Front and rear camera switching & flash ON/OFF control
• Photo & video capture with pinch-to-zoom & camera timer
• Multiple camera modes: Night, Portrait, Photo, Video, Supermoon, Ultra HD Document

🤖 AI Features:
• Real-time face detection using Google ML Kit (detects multiple faces in preview)
• AI-assisted photo organization & foundation for automatic naming

🗂️ Smart Gallery & Naming:
• Select or create a name-based gallery before taking photos (e.g. Rahul → saved to Rahul's gallery)
• Auto-suggestions for previously used names or default AiCamX Gallery

🎯 Tech Stack & Goal:
Kotlin, Jetpack Compose, CameraX, Google ML Kit, Android SDK, Material 3.
Goal: Create a powerful AI-based camera experience that combines camera controls, AI vision, and intelligent photo organization in a single Android application.`,
    category: 'Android Development',
    tags: ['Kotlin', 'Jetpack Compose', 'CameraX', 'Google ML Kit', 'Android SDK', 'Material 3'],
    featured: true,
    githubUrl: 'https://github.com/chndrapratapsingh',
    modelType: 'cyberCube',
    color: '#3DDC84',
    keyFeatures: [
      '📸 16:9 Camera Preview, 30x Zoom & Night/Portrait Modes',
      '🤖 Real-time Multi-Face Detection via Google ML Kit',
      '🗂️ Smart Name-Based Gallery & Auto-Organization',
      '⚡ Built with Kotlin, Jetpack Compose & CameraX',
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    name: 'Python',
    levelBadge: 'Expert',
    category: 'AI & Machine Learning',
    level: 98,
    icon: 'Sparkles',
    description: 'Core AI foundation: PyTorch, TensorFlow, PySide6, NLP pipelines, neural architecture, and Lucy AI development.',
  },
  {
    name: 'C++',
    levelBadge: 'Expert',
    category: 'System Programming',
    level: 98,
    icon: 'Code',
    description: 'Object-oriented C++, OpenGL graphics shaders, game engine development, and low-latency algorithm optimization.',
  },
  {
    name: 'C',
    levelBadge: 'Expert',
    category: 'System Programming',
    level: 96,
    icon: 'Cpu',
    description: 'Low-level memory management, pointers, system primitives, and maximum hardware performance tuning.',
  },
  {
    name: 'Node.js',
    levelBadge: 'Advanced',
    category: 'Web Development',
    level: 88,
    icon: 'Server',
    description: 'Asynchronous event loops, RESTful API design, Express backends, database ORM integration, and web servers.',
  },
  {
    name: 'JavaScript',
    levelBadge: 'Expert',
    category: 'Web Development',
    level: 95,
    icon: 'Code2',
    description: 'Modern ES6+, async/await execution, DOM manipulation, client-side algorithms, and web app reactivity.',
  },
  {
    name: 'HTML5',
    levelBadge: 'Expert',
    category: 'Web Development',
    level: 96,
    icon: 'Layout',
    description: 'Semantic markup, accessibility (WCAG), canvas element, media streaming, and responsive document structures.',
  },
  {
    name: 'CSS3',
    levelBadge: 'Expert',
    category: 'Web Development',
    level: 94,
    icon: 'Palette',
    description: 'Modern flexbox, CSS grid, keyframe animations, 3D transforms, custom CSS variables, and Tailwind CSS.',
  },
  {
    name: 'Java',
    levelBadge: 'Learning',
    category: 'Languages & Tools',
    level: 70,
    icon: 'Smartphone',
    description: 'Android app development, Java Virtual Machine internals, object-oriented concepts, and mobile software patterns.',
  },
  {
    name: 'Spring Boot',
    levelBadge: 'Advanced',
    category: 'Backend & Web',
    level: 85,
    icon: 'Server',
    description: 'Enterprise Java framework, REST APIs, Dependency Injection, Spring Security, and scalable backend microservices.',
  },
  {
    name: 'Kotlin',
    levelBadge: 'Advanced',
    category: 'Android Development',
    level: 88,
    icon: 'Layers',
    description: 'Modern Android development with Jetpack Compose, CameraX, Google ML Kit, coroutines, and clean MVVM architecture.',
  },
  {
    name: 'AI/ML',
    levelBadge: 'Advanced',
    category: 'AI & Machine Learning',
    level: 92,
    icon: 'Brain',
    description: 'Neural networks, Natural Language Processing (NLP), Computer Vision, and Transformer models for JARVIS-class AI.',
  },
];

export const CATEGORY_BREAKDOWN: SkillCategoryBreakdown[] = [
  {
    title: 'Full-Stack & Web Development',
    icon: 'Globe',
    items: [
      'Frontend (HTML5, CSS3, JavaScript, React)',
      'Backend (Node.js, Express, Spring Boot)',
      'RESTful APIs & Microservices Architecture',
      'Cloud & Databases (Firestore, MySQL, MongoDB)',
    ],
  },
  {
    title: 'Android Development',
    icon: 'Smartphone',
    items: [
      'Native Android Development (Kotlin & Java)',
      'Jetpack Compose & Material 3 UI',
      'CameraX & Google ML Kit Vision',
      'MVVM Architecture & Background Services',
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'Brain',
    items: [
      'Deep Learning (PyTorch & TensorFlow)',
      'Natural Language Processing (NLP)',
      'Real-time Multi-Face Detection & Vision',
      'Lucy AI JARVIS Architecture',
    ],
  },
  {
    title: 'System Programming & Engines',
    icon: 'Cpu',
    items: [
      'C & C++ Low-Level Hardware Optimization',
      'OpenGL 2D/3D Rendering & Shaders',
      'PySide6 / Qt Desktop Applications',
      'Algorithm & Performance Tuning',
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-lucy-ai',
    role: 'Lead AI Engineer & Creator',
    company: 'Lucy AI Project',
    period: '2024 - Present',
    location: 'Remote',
    type: 'Work',
    description: [
      'Architecting and training Lucy AI - a Next-Gen personal assistant JARVIS alternative.',
      'Developing neural language models, task scheduling automation, and real-time context-aware conversational response engines.',
      'Integrating PyTorch, TensorFlow, and NLP frameworks for multi-modal interactions.',
    ],
    skills: ['Python', 'PyTorch', 'TensorFlow', 'NLP', 'Machine Learning', 'AI Systems'],
  },
  {
    id: 'exp-android-dev',
    role: 'Android Developer',
    company: 'Mobile App Development',
    period: '2023 - Present',
    location: 'Remote',
    type: 'Work',
    description: [
      'Designing and building high-performance native Android applications using Kotlin and Java.',
      'Integrating Firebase Authentication, Firestore real-time database, and RESTful APIs.',
      'Implementing clean MVVM mobile architecture, Android SDK components, material UI, and background services.',
    ],
    skills: ['Android SDK', 'Kotlin', 'Java', 'Firebase', 'MVVM Architecture', 'REST APIs'],
  },
  {
    id: 'exp-cs-student',
    role: 'Computer Science & Engineering Student',
    company: 'Jabalpur Engineering College (IT) Department',
    period: '2022 - Present',
    location: 'India',
    type: 'Education',
    description: [
      'Studying core Computer Science: Data Structures & Algorithms, Operating Systems, Computer Networks, and Database Management.',
      'Bridging academic theory with practical AI, full-stack web architectures, and mobile applications.',
      'Active developer and gamer exploring cutting-edge technology and 3D web frameworks.',
    ],
    skills: ['Data Structures', 'Algorithms', 'Java', 'Node.js', 'Firebase', 'System Design'],
  },
];

