import { useState, useEffect } from 'react';
import MessageContent from './MessageContent';

interface TypewriterTextProps {
  text: string;
  speed?: number; // Characters per second
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterText({ 
  text, 
  speed = 50, // Default: 50 characters per second
  onComplete, 
  className 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Add slight randomness to typing speed for more natural feel
      const char = text[currentIndex];
      let delay = 1000 / speed;

      // Slower for punctuation and line breaks
      if (['.', '!', '?', '\n'].includes(char)) {
        delay *= 2;
      } else if ([',', ';', ':'].includes(char)) {
        delay *= 1.5;
      } else if (char === ' ') {
        delay *= 0.5;
      }

      // Add small random variance (±20%)
      delay *= (0.8 + Math.random() * 0.4);

      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeoutId);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <div className={className}>
      <MessageContent content={displayedText} />
      {!isComplete && (
        <span className="inline-block w-0.5 h-4 bg-[#99C0F0]/80 animate-pulse ml-1 align-middle rounded-full" />
      )}
    </div>
  );
}
