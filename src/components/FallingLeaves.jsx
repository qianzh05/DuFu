import React, { useMemo } from 'react';

export const FallingLeaves = () => {
  const leaves = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 15, // Slower: 20-35 seconds
      size: 10 + Math.random() * 10
    }))
  , []); // Empty dependency array means this only runs once

  return (
    <div className="falling-leaves">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`
          }}
        />
      ))}
    </div>
  );
};
