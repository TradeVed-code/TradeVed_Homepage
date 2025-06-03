'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './WaitlistForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
}

interface Question {
  label: string;
  type: 'text' | 'email' | 'tel' | 'radio';
  name: keyof FormData;
  options?: string[];
  validate: (value: string) => string;
}

const WaitlistForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: ''
  });
  const [errors, setErrors] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions: Question[] = [
    {
      label: '1. Name*',
      type: 'text',
      name: 'name',
      validate: (value: string) => value.trim() ? '' : 'Name is required'
    },
    {
      label: '2. Email*',
      type: 'email',
      name: 'email',
      validate: (value: string) => {
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      }
    },
    {
      label: '3. Phone Number*',
      type: 'tel',
      name: 'phone',
      validate: (value: string) => {
        if (!value) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
        return '';
      }
    },
    {
      label: '4. Please select your experience in trading',
      type: 'radio',
      name: 'experience',
      options: [
        'Beginner (0-1 year)',
        'Intermediate (1-3 years)',
        'Advanced (3+ years)',
      ],
      validate: (value: string) => value ? '' : 'Please select an option'
    }
  ];

  const validateCurrentStep = (): boolean => {
    const question = questions[currentStep];
    const value = formData[question.name];
    const error = question.validate(value);
    setErrors(error);
    return !error;
  };

  const handleInputChange = (value: string) => {
    const question = questions[currentStep];
    setFormData(prev => ({
      ...prev,
      [question.name]: value
    }));
    setErrors('');
  };

  const handleContinue = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep === questions.length - 1) {
      await submitForm();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setErrors('');
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://tradeved-backend-1-pf7v.onrender.com/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/Congratulation');
      } else {
        if (data.message && data.message.toLowerCase().includes('already exists')) {
          router.push('/AlreadyRegistered');
        } else {
          alert(data.message || 'Failed to submit form. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < questions.length - 1) {
      e.preventDefault();
      handleContinue();
    }
  };

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const getPlaceholder = () => {
    switch (currentQuestion.name) {
      case 'name':
        return 'Type your name here';
      case 'email':
        return 'Type your email here';
      case 'phone':
        return 'Type your phone no here';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <div className="content">
        <main className="main">
          <div className="breadcrumb-nav">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">></span>
            <a className="breadcrumb-link">Join Waitlist</a>
          </div>
          <div className="title-div">
            <h1 className="title">Join Waitlist</h1>
          </div>
          <p className="description">
            Thousands of traders are figuring it out the hard way. You don't have to.<br />
            Get early access to a game-changing platform that helps you learn, build, and trade with clarity.<br />
            Early users get exclusive features, faster onboarding, and priority support
          </p>

          <div className="step-counter">
            {currentStep + 1}/4 question
          </div>

          <div className="question-card">
            <div className="question-label">
              {currentQuestion.label}
            </div>

            {currentQuestion.type === 'radio' ? (
              <div className="radio-container">
                {currentQuestion.options?.map((option, index) => (
                  <label key={index} className="radio-label">
                    <input
                      type="radio"
                      name={currentQuestion.name}
                      value={option}
                      checked={formData[currentQuestion.name] === option}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="radio-input"
                    />
                    <span className="radio-text">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={currentQuestion.type}
                value={formData[currentQuestion.name]}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-input"
                placeholder={getPlaceholder()}
              />
            )}

            {errors && (
              <div className="error-text">
                {errors}
              </div>
            )}
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={handleContinue}
              disabled={isSubmitting}
              className={`continue-button ${isSubmitting ? 'disabled' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Continue'}
            </button>

            {!isLastStep && (
              <div className="enter-hint">
                <span>press <strong>Enter</strong></span>
                <div className="enter-icon">↵</div>
              </div>
            )}
          </div>

          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="back-button"
            >
              ←
            </button>
          )}
        </main>
      </div>
    </div>
  );
};

export default WaitlistForm;
