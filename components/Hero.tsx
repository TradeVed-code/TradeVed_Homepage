
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({
  title = "Unified platform for systematic trading and learning",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  buttonText = "Join Waitlist",
  onButtonClick
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}) => {
  const handleButtonClick = () => {
    onButtonClick ? onButtonClick() : window.location.href = '/join-waitlist';
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-description">{description}</p>
        <button 
          className="hero-button"
          onClick={handleButtonClick}
          type="button"
        >
          <span>{buttonText}</span>

        </button>
      </div>
      
<div className="max-w-[1200px] mx-auto px-[6.5rem] py-8">
  <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur border border-white/10">
    <Image
      src="/hero.png"
      alt="Trading platform interface"
      width={920}
      height={480}
      priority
      className="w-full h-auto rounded-2xl"
    />
  </div>
</div>


       
      
    </section>
  );
};

export default Hero;

