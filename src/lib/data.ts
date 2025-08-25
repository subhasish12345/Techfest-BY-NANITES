import type { Event, Sponsor, ScheduleItem, Update } from "@/lib/types";

export const events: Event[] = [
  // Technical Events
  {
    id: "tech-1",
    title: "Code Combat",
    category: "Programming & Development",
    description: "An intense competitive programming challenge to test your algorithmic skills and problem-solving abilities under pressure.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "10:00 AM",
    rules: ["Solo participation only.", "Plagiarism leads to immediate disqualification.", "Standard library usage is allowed."],
    prizes: ["1st: 20000 INR", "2nd: 10000 INR", "3rd: 5000 INR"],
    type: "technical"
  },
  {
    id: "tech-2",
    title: "Web Dev Marathon",
    category: "Programming & Development",
    description: "A 24-hour hackathon to build a full-stack web application from scratch. Showcase your development prowess.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1-2",
    time: "12:00 PM",
    rules: ["Teams of 2-4.", "Must use at least one new technology.", "Code must be hosted on GitHub."],
    prizes: ["1st: 30000 INR", "2nd: 15000 INR", "Best UI/UX: 7500 INR"],
    type: "technical"
  },
  {
    id: "tech-3",
    title: "Mobile App Challenge",
    category: "Programming & Development",
    description: "Develop a native or cross-platform mobile application that solves a real-world problem.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "09:00 AM",
    rules: ["Android or iOS.", "Submit a working demo and source code.", "Original ideas are encouraged."],
    prizes: ["1st: 25000 INR", "2nd: 12000 INR"],
    type: "technical"
  },
  {
    id: "tech-4",
    title: "AI/ML Hackathon",
    category: "Programming & Development",
    description: "A project showcase where teams present their innovative machine learning models and AI-powered solutions.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "11:00 AM",
    rules: ["Teams of 2-3.", "Use of pre-trained models is allowed but must be declared.", "Focus on innovation and impact."],
    prizes: ["1st: 40000 INR", "Most Innovative: 10000 INR"],
    type: "technical"
  },
  {
    id: "tech-5",
    title: "Robo Wars",
    category: "Hardware & Innovation",
    description: "Build and battle your own robots in a thrilling head-to-head tournament. May the best machine win!",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "02:00 PM",
    rules: ["Weight limit: 15kg.", "No projectile or flame-based weapons.", "Compliance with safety regulations is mandatory."],
    prizes: ["Champion: 50000 INR", "Runner-up: 25000 INR"],
    type: "technical"
  },
  {
    id: "tech-6",
    title: "Circuit Master",
    category: "Hardware & Innovation",
    description: "Design and simulate complex electronic circuits to solve a given problem statement within the time limit.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "02:00 PM",
    rules: ["Solo event.", "Simulation must be done on provided software.", "Judging based on efficiency and design."],
    prizes: ["1st: 15000 INR", "2nd: 7000 INR"],
    type: "technical"
  },
  {
    id: "tech-7",
    title: "IoT Innovation",
    category: "Hardware & Innovation",
    description: "Create and present a smart device prototype that leverages the Internet of Things to create a connected solution.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "11:00 AM",
    rules: ["Hardware will be provided.", "Focus on practical application and feasibility.", "Presentation and demo required."],
    prizes: ["1st: 30000 INR", "Best Concept: 10000 INR"],
    type: "technical"
  },
  {
    id: "tech-8",
    title: "UI/UX Design Battle",
    category: "Design & Creativity",
    description: "Compete to design the most beautiful and functional user interface for a challenging problem statement.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "01:00 PM",
    rules: ["Use Figma or Adobe XD.", "Submit a clickable prototype.", "Focus on user-centric design principles."],
    prizes: ["1st: 15000 INR", "2nd: 7500 INR"],
    type: "technical"
  },
  {
    id: "tech-9",
    title: "Tech Presentation",
    category: "Design & Creativity",
    description: "Present a technical paper on a cutting-edge topic in front of a panel of experts and peers.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "03:00 PM",
    rules: ["15-minute presentation, 5-minute Q&A.", "Topics must be pre-approved.", "Clarity and depth of knowledge are key."],
    prizes: ["Best Paper: 10000 INR", "Best Presenter: 5000 INR"],
    type: "technical"
  },
  {
    id: "tech-10",
    title: "Innovation Pitch",
    category: "Design & Creativity",
    description: "Pitch your groundbreaking startup idea to a panel of investors and entrepreneurs. Convince them of your vision.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "04:00 PM",
    rules: ["5-minute pitch, 5-minute Q&A.", "Business model canvas is required.", "Market viability is a key judging criterion."],
    prizes: ["Best Pitch: 20000 INR", "Incubation Opportunity"],
    type: "technical"
  },

  // Non-Technical Events
  {
    id: "non-tech-1",
    title: "Digital Art Contest",
    category: "Creative Arts",
    description: "Unleash your creativity in this digital art competition. The theme will be revealed on the spot.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "11:00 AM",
    rules: ["Bring your own devices.", "Any digital art software is allowed.", "Original work only."],
    prizes: ["1st: 10000 INR", "2nd: 5000 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-2",
    title: "Photography Challenge",
    category: "Creative Arts",
    description: "Capture the essence of TechVista 2025 through your lens. A tech-themed photography challenge.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1-2",
    time: "All Day",
    rules: ["Photos must be taken within campus during the fest.", "Submit your best 3 shots.", "Minimal post-processing allowed."],
    prizes: ["Best Shot: 8000 INR", "Runner-up: 4000 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-3",
    title: "Video Creation",
    category: "Creative Arts",
    description: "Create a short film or documentary capturing the spirit of innovation at the festival.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "10:00 AM",
    rules: ["Max length: 5 minutes.", "Theme: 'Technology for a Better Tomorrow'.", "Mobile or professional cameras allowed."],
    prizes: ["Best Film: 12000 INR", "Best Editing: 5000 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-4",
    title: "Content Writing",
    category: "Creative Arts",
    description: "Pen a compelling technical blog post on a given topic. Showcase your writing and analytical skills.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "03:00 PM",
    rules: ["Word limit: 800 words.", "Topic will be provided on the spot.", "Clarity, accuracy, and engagement."],
    prizes: ["Best Article: 7000 INR", "Runner-up: 3500 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-5",
    title: "Tech Quiz",
    category: "Interactive Competitions",
    description: "Test your general technology knowledge in this fast-paced quiz tournament. For tech enthusiasts of all levels.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "01:00 PM",
    rules: ["Teams of 2.", "Multiple rounds: prelims, semis, finals.", "No use of electronic devices."],
    prizes: ["Winners: 10000 INR", "Runners-up: 5000 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-6",
    title: "Debate Tournament",
    category: "Interactive Competitions",
    description: "Engage in heated discussions on the ethics and future of technology. Argue your points and convince the judges.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "10:00 AM",
    rules: ["Teams of 2.", "Topics provided 15 minutes before the round.", "Respectful discourse is mandatory."],
    prizes: ["Best Team: 8000 INR", "Best Speaker: 4000 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-7",
    title: "Case Study Analysis",
    category: "Interactive Competitions",
    description: "Analyze a real-world business or technical problem and present your innovative solution.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "10:00 AM",
    rules: ["Teams of 3.", "Case study will be provided.", "Presentation and Q&A session."],
    prizes: ["Best Solution: 15000 INR", "Runner-up: 7000 INR"],
    type: "non-technical"
  },
  {
    id: "non-tech-8",
    title: "Gaming Tournament",
    category: "Entertainment",
    description: "Compete in popular e-sports titles and prove you're the ultimate gamer on campus.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1-2",
    time: "All Day",
    rules: ["Games: Valorant, BGMI, FIFA.", "Follow tournament brackets.", "Fair play is expected."],
    prizes: ["Varies by game, up to 20000 INR prize pool"],
    type: "non-technical"
  },
  {
    id: "non-tech-9",
    title: "Treasure Hunt",
    category: "Entertainment",
    description: "Solve a series of tech-themed puzzles and riddles that will lead you on a hunt across the campus.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "03:00 PM",
    rules: ["Teams of 4.", "First team to solve all clues wins.", "Smartphones are allowed and necessary."],
    prizes: ["Winning Team: 10000 INR worth of goodies"],
    type: "non-technical"
  },
  {
    id: "non-tech-10",
    title: "Meme Competition",
    category: "Entertainment",
    description: "Create the most hilarious and creative tech-themed memes. Let the meme wars begin!",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "05:00 PM",
    rules: ["Submit up to 3 memes.", "Theme: 'Life of an Engineer'.", "Most viral meme wins."],
    prizes: ["Meme Lord: 5000 INR"],
    type: "non-technical"
  },

  // Cultural Events
  {
    id: "cultural-1",
    title: "Live Music & Band Performances",
    category: "Cultural Fest",
    description: "Experience an electrifying night of live music from talented student bands and solo artists.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "07:00 PM",
    rules: ["Open stage for all genres.", "Pre-registration required for performance slots."],
    prizes: ["Best Band: 15000 INR", "Best Solo Artist: 7000 INR"],
    type: "cultural"
  },
  {
    id: "cultural-2",
    title: "Dance Competitions",
    category: "Cultural Fest",
    description: "Witness breathtaking dance performances in solo, group, and battle categories.",
    image: "https://placehold.co/600x400.png",
    date: "Day 1",
    time: "08:00 PM",
    rules: ["Time limits apply for each category.", "Props are allowed.", "Judged on choreography, sync, and energy."],
    prizes: ["Best Group: 20000 INR", "Best Solo: 8000 INR"],
    type: "cultural"
  },
  {
    id: "cultural-3",
    title: "Stand-up Comedy & Open Mic",
    category: "Cultural Fest",
    description: "A night of laughter and expression. Take the stage and share your jokes, poetry, or stories.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "07:00 PM",
    rules: ["5-minute slots.", "Content must be appropriate for a college audience.", "Sign up at the venue."],
    prizes: ["Funniest Act: 5000 INR"],
    type: "cultural"
  },
  {
    id: "cultural-4",
    title: "Fashion Show",
    category: "Cultural Fest",
    description: "A dazzling fashion show with a unique 'Cyberpunk & Tech Wear' theme. See futuristic fashion on the runway.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "08:00 PM",
    rules: ["Teams design and showcase their collection.", "Theme interpretation is key.", "Sustainability is encouraged."],
    prizes: ["Best Collection: 15000 INR", "Best Model: 5000 INR"],
    type: "cultural"
  },
  {
    id: "cultural-5",
    title: "DJ Night & Electronic Music",
    category: "Cultural Fest",
    description: "The grand finale! Dance the night away to the beats of top student and professional DJs.",
    image: "https://placehold.co/600x400.png",
    date: "Day 2",
    time: "09:00 PM",
    rules: ["Entry for registered participants only.", "Enjoy responsibly."],
    prizes: ["None, just pure fun!"],
    type: "cultural"
  }
];


export const sponsors: Sponsor[] = [
  { id: "1", name: "TechCorp", logo: "https://placehold.co/200x100.png", url: "#" },
  { id: "2", name: "Innovate Inc.", logo: "https://placehold.co/200x100.png", url: "#" },
  { id: "3", name: "Future Systems", logo: "https://placehold.co/200x100.png", url: "#" },
  { id: "4", name: "Cyber Solutions", logo: "https://placehold.co/200x100.png", url: "#" },
  { id: "5", name: "Dev Tools", logo: "https://placehold.co/200x100.png", url: "#" },
  { id: "6", name: "Quantum Leap", logo: "https://placehold.co/200x100.png", url: "#" },
];

export const schedule: ScheduleItem[] = [
  {
    time: "Day 1 - 09:00 AM",
    title: "Opening Ceremony",
    description: "Kick-off speech and introduction to TechVista 2025.",
  },
  {
    time: "Day 1 - 10:00 AM",
    title: "Technical & Non-Technical Events Begin",
    description: "First wave of competitions and workshops starts across the campus.",
  },
  {
    time: "Day 1 - 07:00 PM",
    title: "Cultural Fest Kick-off",
    description: "The evening comes alive with music, dance, and performances.",
  },
  {
    time: "Day 2 - 10:00 AM",
    title: "Day 2 Events Commence",
    description: "The second day of exciting technical and non-technical events begins.",
  },
  {
    time: "Day 2 - 07:00 PM",
    title: "Prize Distribution",
    description: "Recognizing the winners of the various competitions.",
  },
  {
    time: "Day 2 - 09:00 PM",
    title: "Closing Ceremony & DJ Night",
    description: "Concluding the fest with awards and a grand celebration.",
  },
];

export const updates: Update[] = [
  { id: "1", message: "Web Dev Marathon has officially begun! Good luck to all teams.", timestamp: "2h ago" },
  { id: "2", message: "Keynote speaker for the closing ceremony announced: Sundar Pichai (CEO, Google).", timestamp: "5h ago" },
  { id: "3", message: "Venue for RoboWars has been moved to the Main Auditorium.", timestamp: "1d ago" },
  { id: "4", message: "Welcome to TechVista 2025! Let the innovation begin!", timestamp: "2d ago" },
];
