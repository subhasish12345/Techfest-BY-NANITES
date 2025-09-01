
"use client"
import { EventForm } from "../../event-form";

export default function EditEventPage({ params }: { params: { id: string } }) {
    // This form will now pre-populate from dummy data
    return <EventForm eventId={params.id} />;
}

    