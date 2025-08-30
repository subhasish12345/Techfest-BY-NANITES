
'use server';

import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { eventFormSchema } from '@/lib/types';


// This function now handles both configuration and checking credentials.
function configureAndCheckCloudinary() {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error('Cloudinary environment variables are missing. Please check your .env file.');
    }
    if (cloudName === 'YOUR_CLOUD_NAME_HERE' || apiKey === 'YOUR_API_KEY' || apiSecret === 'YOUR_API_SECRET') {
        throw new Error('Default Cloudinary credentials found. Please replace them with your actual credentials in the .env file.');
    }

    // Configure Cloudinary inside the function to use the latest process.env values
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });
}

async function uploadImageToCloudinary(image: File): Promise<string> {
    // Configure and check credentials on every upload attempt.
    configureAndCheckCloudinary();
    
    const fileBuffer = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
    
    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: 'techfest_events',
        });
        return result.secure_url;
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        // Throw a more specific error to help with debugging.
        throw new Error(`Cloudinary upload failed: ${error.message}. Please ensure your credentials are correct.`);
    }
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
    console.error("Zod Validation Errors:", validation.error.flatten().fieldErrors);
    throw new Error('Invalid form data provided.');
  }

  const { image, ...eventData } = validation.data;
  
  if (!image || image.size === 0) {
      throw new Error('Image is required for a new event.');
  }

  try {
    const imageUrl = await uploadImageToCloudinary(image);
    
    const finalEventData = {
      ...eventData,
      image: imageUrl,
      status: 'upcoming'
    };

    await addDoc(collection(db, 'events'), finalEventData);

    revalidatePath('/admin');
    revalidatePath('/events');

  } catch (error: any) {
    console.error('Error creating event:', error);
    throw new Error(error.message || 'Failed to create event.');
  }
}

export async function updateEvent(id: string, formData: FormData) {
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
        console.error("Zod Validation Errors:", validation.error.flatten().fieldErrors);
        throw new Error('Invalid form data provided for update.');
    }

    const { image, ...eventData } = validation.data;
    const eventRef = doc(db, 'events', id);

    try {
        let imageUrl;
        // The image object might be a File with size 0 if no new file is selected
        if (image && image.size > 0) {
            imageUrl = await uploadImageToCloudinary(image);
        }

        const finalEventData: any = {
            ...eventData
        };

        if (imageUrl) {
            finalEventData.image = imageUrl;
        }

        await updateDoc(eventRef, finalEventData);

        revalidatePath('/admin');
        revalidatePath('/events');
        revalidatePath(`/events/${id}`);

    } catch (error: any) {
        console.error('Error updating event:', error);
        throw new Error(error.message || 'Failed to update event.');
    }
}
