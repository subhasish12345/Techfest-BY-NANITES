"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Set initial value
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) {
    return null; // Don't render on the server
  }

  const timeParts = timeLeft ? Object.entries(timeLeft) : [];
  
  if (!timeLeft) {
    return <div className="font-code text-2xl md:text-4xl text-accent">The Fest is Live!</div>;
  }

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timeParts.map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="font-headline text-4xl md:text-6xl font-bold text-primary tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
          <div className="font-code text-sm uppercase tracking-widest text-muted-foreground">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
