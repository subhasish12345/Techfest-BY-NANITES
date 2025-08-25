import {z} from 'zod';

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

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['technical', 'non-technical', 'cultural']),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  image: z.string().url('Must be a valid URL'),
  rules: z.array(z.string()).min(1, 'At least one rule is required'),
  prizes: z.array(z.string()).min(1, 'At least one prize is required'),
});

export type EventFormData = z.infer<typeof eventSchema>;


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

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  profile: string;
  registeredEvents: string[];
  role?: 'admin' | 'user';
}
