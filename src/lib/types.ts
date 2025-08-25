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
  type: "technical" | "non-technical" | "cultural";
  status?: "upcoming" | "ongoing" | "completed";
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

export const eventCategories = {
  technical: [
    "Programming & Development",
    "Hardware & Innovation",
    "Design & Creativity",
  ],
  "non-technical": [
    "Creative Arts",
    "Interactive Competitions",
    "Entertainment",
  ],
  cultural: [
    "Cultural Fest"
  ]
};


export const eventCategoriesList = [
  ...eventCategories.technical,
  ...eventCategories["non-technical"],
  ...eventCategories.cultural,
];
