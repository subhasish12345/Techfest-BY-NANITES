
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const imageSchema = z
  .any()
  .refine((file): file is File => file instanceof File, "Image is required.")
  .refine((file) => file.size > 0, "Image is required.")
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

// Schema for the client-side form (React Hook Form)
export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['technical', 'non-technical', 'cultural']),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  image: z.any().optional(), // Image is optional here, will be validated in onSubmit
  rules: z.array(z.string().min(1, "Rule cannot be empty")).min(1, 'At least one rule is required'),
  prizes: z.array(prizeSchema).min(1, 'At least one prize is required'),
});


export type EventFormData = z.infer<typeof eventSchema>;

// Schema for the server-side action (FormData)
export const eventFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    type: z.enum(['technical', 'non-technical', 'cultural']),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    image: imageSchema,
    rules: z.array(z.string().min(1, "Rule cannot be empty.")).min(1, "At least one rule is required."),
    prizes: z.string().transform((str, ctx) => {
        try {
            const parsed = JSON.parse(str);
            const prizesArraySchema = z.array(prizeSchema).min(1, "At least one prize is required.");
            const validation = prizesArraySchema.safeParse(parsed);
            if (!validation.success) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid prize format." });
                return z.NEVER;
            }
            return validation.data;
        } catch (e) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Prizes must be a valid JSON string." });
            return z.NEVER;
        }
    }),
});


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

export const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

export type PasswordFormData = z.infer<typeof passwordSchema>;

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

export interface EventRegistration {
  userId: string;
  userName: string;
  userEmail: string;
  regNo?: string;
  branch?: string;
  semester?: string;
  registeredAt: Timestamp;
}
