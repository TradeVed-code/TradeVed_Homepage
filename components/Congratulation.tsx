'use client';

import { useEffect } from 'react';
import './Congratulation.css';

export default function Congratulation() {
  useEffect(() => {
    // Sparkles
    for (let i = 0; i < 15; i++) {
      createSparkle();
    }

    function createSparkle() {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');

      const x = Math.random() * (window.innerWidth - 10);
      const y = Math.random() * (window.innerHeight - 10);

      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.animationDelay = `${Math.random() * 5}s`;

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
        createSparkle();
      }, 3000 + Math.random() * 2000);
    }

    // Redirect to FrontPage after 4 seconds
    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div className="gradient-corner gradient-top-right"></div>
      <div className="gradient-corner gradient-bottom-left"></div>

      <div className="container">
{/*         <img src="/logo.png" alt="TradeVed Logo" className="logo top-logo" /> */}
        <img src="/Vector (3).png" alt="Success Checkmark" className="checkmark-image" />

        <h1 className="congrats-title">Congratulations !!</h1>
        <p className="congrats-subtext">You have joined our waitlist</p>
      </div>
    </div>
  );
}
