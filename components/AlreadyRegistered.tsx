'use client';

import { useEffect } from 'react';
import './Congratulation.css'; // Reuse the same CSS for background/styling

export default function AlreadyRegistered() {
  useEffect(() => {
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
        <img src="/logo.png" alt="TradeVed Logo" className="logo top-logo" />
        {/* <img src="/Vector (3).png" alt="Already Registered Checkmark" className="checkmark-image" /> */}

        <h1 className="congrats-title">Already on the waitlist</h1>
        {/* <p className="congrats-subtext">Thank you for your interest!</p> */}
      </div>
    </div>
  );
}
