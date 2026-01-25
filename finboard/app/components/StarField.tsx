'use client';

import React, { useEffect, useState } from 'react';

export default function StarField() {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 30; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 2,
          size: Math.random() > 0.5 ? 'small' : 'large',
        });
      }
      return starArray;
    };
    
    setStars(generateStars());
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`floating-star ${star.size}`}
          style={{
            left: `${star.left}%`,
            bottom: '-10px',
            animation: `float-up ${star.duration}s linear infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}
