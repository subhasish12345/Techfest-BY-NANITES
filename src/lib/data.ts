
import type { Event, Sponsor, ScheduleItem, Update } from "@/lib/types";

export const events: Event[] = [
  // This data is now fetched from Firestore. This file can be used for backup or seeding.
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
