import React from 'react';

export const FallingLeaves = () => {
  const leaves = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 10 + Math.random() * 10
  }));

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
