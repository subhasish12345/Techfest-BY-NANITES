import type { Event, Sponsor, ScheduleItem, Update } from "@/lib/types";

export const events: Event[] = [
  {
    id: "1",
    title: "CodeGenesis",
    category: "Competitive Programming",
    description: "An intense coding competition to test your algorithmic skills.",
    image: "https://placehold.co/600x400",
    date: "Day 1",
    time: "10:00 AM",
    rules: ["Solo participation only.", "All languages allowed."],
    prizes: ["1st: $500", "2nd: $250", "3rd: $100"],
  },
  {
    id: "2",
    title: "Hack-a-Thon",
    category: "Web Development",
    description: "Build a full-stack web application in 24 hours.",
    image: "https://placehold.co/600x400",
    date: "Day 1-2",
    time: "12:00 PM",
    rules: ["Teams of 2-4.", "Must use at least one new technology."],
    prizes: ["1st: $1000", "2nd: $500", "Best UI/UX: $200"],
  },
  {
    id: "3",
    title: "CyberClash",
    category: "Cybersecurity",
    description: "A capture-the-flag style cybersecurity challenge.",
    image: "https://placehold.co/600x400",
    date: "Day 2",
    time: "02:00 PM",
    rules: ["Ethical hacking only.", "No DDoS attacks."],
    prizes: ["1st: $750", "2nd: $300"],
  },
  {
    id: "4",
    title: "Pixel Perfect",
    category: "UI/UX Design",
    description: "Design a beautiful and functional user interface for a given problem.",
    image: "https://placehold.co/600x400",
    date: "Day 1",
    time: "01:00 PM",
    rules: ["Use Figma or Adobe XD.", "Submit a prototype link."],
    prizes: ["1st: $400", "2nd: $200"],
  },
  {
    id: "5",
    title: "RoboWars",
    category: "Robotics",
    description: "Build and battle robots in a head-to-head tournament.",
    image: "https://placehold.co/600x400",
    date: "Day 3",
    time: "11:00 AM",
    rules: ["Weight limit: 15kg.", "No projectile weapons."],
    prizes: ["Champion: $1200", "Runner-up: $600"],
  },
  {
    id: "6",
    title: "AI Innovate",
    category: "AI & ML",
    description: "Develop an AI model to solve a real-world problem.",
    image: "https://placehold.co/600x400",
    date: "Day 2",
    time: "09:00 AM",
    rules: ["Submit your code and a presentation.", "Pre-trained models are allowed."],
    prizes: ["1st: $1500", "Most Innovative: $500"],
  },
];

export const sponsors: Sponsor[] = [
  { id: "1", name: "TechCorp", logo: "https://placehold.co/200x100", url: "#" },
  { id: "2", name: "Innovate Inc.", logo: "https://placehold.co/200x100", url: "#" },
  { id: "3", name: "Future Systems", logo: "https://placehold.co/200x100", url: "#" },
  { id: "4", name: "Cyber Solutions", logo: "https://placehold.co/200x100", url: "#" },
  { id: "5", name: "Dev Tools", logo: "https://placehold.co/200x100", url: "#" },
  { id: "6", name: "Quantum Leap", logo: "https://placehold.co/200x100", url: "#" },
];

export const schedule: ScheduleItem[] = [
  {
    time: "Day 1 - 09:00 AM",
    title: "Opening Ceremony",
    description: "Kick-off speech and introduction to TechFest 2024.",
  },
  {
    time: "Day 1 - 10:00 AM",
    title: "CodeGenesis Begins",
    description: "The ultimate competitive programming challenge starts.",
  },
  {
    time: "Day 1 - 12:00 PM",
    title: "Hack-a-Thon Begins",
    description: "24 hours of intense building and innovation.",
  },
  {
    time: "Day 2 - 02:00 PM",
    title: "CyberClash CTF",
    description: "Capture the flag and prove your hacking skills.",
  },
  {
    time: "Day 3 - 03:00 PM",
    title: "Keynote by AI Expert",
    description: "A talk on the future of Artificial Intelligence.",
  },
  {
    time: "Day 3 - 05:00 PM",
    title: "Closing & Awards Ceremony",
    description: "Announcing the winners and concluding the fest.",
  },
];

export const updates: Update[] = [
  { id: "1", message: "Hack-a-Thon team registrations are now closed.", timestamp: "2h ago" },
  { id: "2", message: "Keynote speaker for Day 3 announced: Dr. Eva Rostova.", timestamp: "5h ago" },
  { id: "3", message: "Venue for RoboWars has been moved to Hall B.", timestamp: "1d ago" },
  { id: "4", message: "Welcome to TechFest 2024! Let the innovation begin!", timestamp: "2d ago" },
];
