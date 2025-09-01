
"use client"
import { EventForm } from "@/app/admin/events/event-form";

export default function EditEventPage({ params }: { params: { id: string } }) {
    // This form will now pre-populate from dummy data
    return <EventForm eventId={params.id} />;
}
