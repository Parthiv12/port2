const resume = {
  name: 'Parthiv Chandra Gajula',
  contact: {
    phone: '(+1) 248-250-0975',
    email: 'sign2parthiv@gmail.com',
    location: 'Troy, MI',
    linkedin: 'https://www.linkedin.com/in/parthiv-gajula-b84a12182/',
    github: 'https://github.com/Parthiv12'
  },
  education: {
    school: 'Wayne State University',
    degree: 'B.S. Computer Science',
    expected: 'May 2026',
    coursework: ['Deep Learning', 'Training LLMS', 'Intelligent Systems', 'Ubuntu Administration']
  },
  skills: {
    languages: ['Java', 'Python', 'C++', 'C', 'JavaScript', 'R', 'Kotlin'],
    frameworks: ['Flask', 'React', 'Next.js', 'HuggingFace', 'TensorFlow', 'Kubernetes', 'Docker']
  },
  experience: [
    {
      role: 'Database Intern',
      company: '365 Retail',
      period: 'May 2025 - Aug 2025',
      bullets: [
        'Optimized SQL queries, improving execution speed by up to 45% through indexing strategies and execution plan analysis',
        'Connected and managed remote database servers, configuring and starting replication between instances',
        'Analyzed ad-hoc queries, prepared statements, plan cache, and buffer pool for performance tuning',
        'Created and implemented custom trigger statements for automated data processing'
      ]
    }
  ],
  projects: [
    {
      name: 'Dearborn Hacks 2025 - Best Use of ElevenLabs',
      bullets: [
        'Integrated Fetch.ai ASI-1 model for contextual real-time conversation',
        'Built browser-based speech-to-text pipeline + ElevenLabs AI voices for natural TTS',
        'Multi-agent architecture used for voice routing, memory, and response generation',
        'React frontend with live conversation tracking'
      ],
      tech: ['Fetch.ai ASI-1', 'uAgents', 'ElevenLabs TTS', 'Web Speech API', 'Flask', 'React', 'TensorFlow']
    },
    {
      name: 'Grizz Hacks 2024 - HarmonAIze (Interactive Media)',
      bullets: ['Full-stack web app recommending songs based on heart rate', 'Improved BPM prediction accuracy using K-Means'],
      tech: ['Flask', 'React', 'K-Means']
    },
    {
      name: 'Movie Recommendation System',
      bullets: ['Full-stack app suggesting movies using collaborative filtering and K-Means clustering'],
      tech: ['Flask', 'Supabase', 'K-Means']
    }
  ],
  current: [
    {
      name: 'Job Search App',
      status: 'In Progress',
      bullets: ['Gamified job search platform', 'AI match scoring & progression system'],
      tech: ['React', 'Flask', 'MongoDB', 'JWT']
    }
  ]
}

export default resume
