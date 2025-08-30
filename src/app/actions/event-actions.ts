
'use server';

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prizeSchema = z.object({
    position: z.string().min(1, 'Position is required'),
    prize: z.string().min(1, 'Prize is required'),
});

// Zod schema for FormData validation
const eventFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(['technical', 'non-technical', 'cultural']),
  date: z.string().min(1),
  time: z.string().min(1),
  image: z.instanceof(File),
  rules: z.array(z.string()),
  prizes: z.string().transform((str) => JSON.parse(str)),
});


async function uploadImageToCloudinary(image: File): Promise<string> {
    const fileBuffer = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
    
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'techfest_events',
    });
    
    return result.secure_url;
}


export async function addEvent(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    type: formData.get('type'),
    date: formData.get('date'),
    time: formData.get('time'),
    image: formData.get('image'),
    rules: formData.getAll('rules[]'),
    prizes: formData.get('prizes')
  };

  const validation = eventFormSchema.safeParse(rawData);

  if (!validation.success) {
    console.error(validation.error.flatten().fieldErrors);
    throw new Error('Invalid form data provided.');
  }

  const { image, ...eventData } = validation.data;

  try {
    const imageUrl = await uploadImageToCloudinary(image);
    
    const finalEventData = {
      ...eventData,
      image: imageUrl,
      status: 'upcoming'
    };

    await addDoc(collection(db, 'events'), finalEventData);

    // Revalidate the events page to show the new event
    revalidatePath('/events');
    revalidatePath('/admin/events');

  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event.');
  }
}
