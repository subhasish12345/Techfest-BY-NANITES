export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  time: string;
  rules: string[];
  prizes: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface Update {
  id: string;
  message: string;
  timestamp: string;
}

export const eventCategoriesList = [
  "AI & ML",
  "Web Development",
  "Cybersecurity",
  "Hardware & IoT",
  "Competitive Programming",
  "Gaming",
  "Robotics",
  "UI/UX Design",
];
