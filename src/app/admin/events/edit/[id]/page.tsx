
"use client"
import { EventForm } from "../event-form";

export default function EditEventPage({ params }: { params: { id: string } }) {
    return <EventForm eventId={params.id} />;
}
