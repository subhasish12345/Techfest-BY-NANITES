"use client";

import { useState, useEffect, useCallback } from "react";
import type { Event } from "@/lib/types";
import { eventCategoriesList } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FiltersProps {
  allEvents: Event[];
  setFilteredEvents: (events: Event[]) => void;
}

export function Filters({ allEvents, setFilteredEvents }: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [day, setDay] = useState("all");
  const [type, setType] = useState("all");

  const applyFilters = useCallback(() => {
    let events = [...allEvents];

    if (searchTerm) {
      events = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      events = events.filter((event) => event.category === category);
    }
    
    if (type !== "all") {
        events = events.filter((event) => event.type === type);
    }

    if (day !== "all") {
      // This logic might need adjustment if your date format changes
      const dayNumber = day.split(" ")[1];
      events = events.filter((event) => event.date.includes(`Day ${dayNumber}`));
    }
    
    setFilteredEvents(events);
  }, [searchTerm, category, day, type, allEvents, setFilteredEvents]);


  useEffect(() => {
    applyFilters();
  }, [searchTerm, category, day, type, applyFilters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-lg bg-card border border-primary/20">
      <div className="relative md:col-span-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={type} onValuecha/nge={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="technical">Technical</SelectItem>
          <SelectItem value="non-technical">Non-Technical</SelectItem>
          <SelectItem value="cultural">Cultural</SelectItem>
        </SelectContent>
      </Select>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {eventCategoriesList.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={day} onValueChange={setDay}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by day" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Days</SelectItem>
          <SelectItem value="Day 1">Day 1</SelectItem>
          <SelectItem value="Day 2">Day 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
