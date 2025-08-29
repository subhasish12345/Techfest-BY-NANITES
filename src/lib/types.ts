
import {z} from 'zod';
import { Timestamp } from 'firebase/firestore';


export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  time: string;
  rules: string[];
  prizes: { position: string, prize: string }[];
  type: "technical" | "non-technical" | "cultural";
  status?: "upcoming" | "ongoing" | "completed";
}

const prizeSchema = z.object({
    position: z.string().min(1, 'Position is required'),
    prize: z.string().min(1, 'Prize is required'),
});

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['technical', 'non-technical', 'cultural']),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  image: z.string().url('Must be a valid URL'),
  rules: z.array(z.string()).min(1, 'At least one rule is required'),
  prizes: z.array(prizeSchema).min(1, 'At least one prize is required'),
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
  timestamp: Timestamp;
}

export const updateSchema = z.object({
    message: z.string().min(10, 'Update message must be at least 10 characters long.')
})
export type UpdateFormData = z.infer<typeof updateSchema>;


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
    "Cultural Fest",
  ]
};

export const eventCategoriesList = [
    "Programming & Development",
    "Hardware & Innovation",
    "Design & Creativity",
    "Creative Arts",
    "Interactive Competitions",
    "Entertainment",
    "Cultural Fest"
];

export const userProfileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  email: z.string().email(),
  regNo: z.string().optional(),
  degree: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
  section: z.string().optional(),
  mobileNo: z.string().optional(),
  profile: z.string().optional(),
  profilePhoto: z.string().url().optional().or(z.literal('')),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  profile: string;
  registeredEvents: string[];
  role?: 'admin' | 'user';
  profilePhoto?: string;
  regNo?: string;
  degree?: string;
  branch?: string;
  semester?: string;
  section?: string;
  mobileNo?: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
}
