
"use client";

import { useState, useEffect } from 'react';

// A utility function to generate a random number in a given range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function MeteorShower({ count = 20 }: { count?: number }) {
  const [meteors, setMeteors] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    const generatedMeteors = Array.from({ length: count }).map((_, i) => ({
      id: i,
      style: {
        top: '-10px', // Start off-screen
        left: `${random(0, 100)}%`,
        animationDelay: `${random(0, 10)}s`,
        animationDuration: `${random(2, 4)}s`,
      },
    }));
    setMeteors(generatedMeteors);
  }, [count]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor-particle"
          style={meteor.style}
        />
      ))}
    </div>
  );
}
