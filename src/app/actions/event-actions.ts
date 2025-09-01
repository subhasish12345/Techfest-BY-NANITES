
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { eventFormSchema } from '@/lib/types';


export async function addEvent(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    type: formData.get('type'),
    date: formData.get('date'),
    time: formData.get('time'),
    rules: formData.getAll('rules[]'),
    prizes: formData.get('prizes')
  };

  const validation = eventFormSchema.omit({ image: true }).safeParse(rawData);

  if (!validation.success) {
    console.error("Zod Validation Errors:", validation.error.flatten().fieldErrors);
    throw new Error('Invalid form data provided.');
  }

  const eventData = validation.data;
  
  try {
    const imageUrl = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
    
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
        rules: formData.getAll('rules[]'),
        prizes: formData.get('prizes')
    };

    const updateSchema = eventFormSchema.omit({ image: true });

    const validation = updateSchema.safeParse(rawData);
    if (!validation.success) {
        console.error("Zod Validation Errors:", validation.error.flatten().fieldErrors);
        throw new Error('Invalid form data provided for update.');
    }

    const eventData = validation.data;
    const eventRef = doc(db, 'events', id);

    try {
        await updateDoc(eventRef, eventData);

        revalidatePath('/admin');
        revalidatePath('/events');
        revalidatePath(`/events/${id}`);

    } catch (error: any) {
        console.error('Error updating event:', error);
        throw new Error(error.message || 'Failed to update event.');
    }
}
