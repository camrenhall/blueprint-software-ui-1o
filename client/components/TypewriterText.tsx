import { useState, useEffect } from 'react';
import MessageContent from './MessageContent';

interface TypewriterTextProps {
  text: string;
  speed?: number; // Characters per second
  onComplete?: () => void;
  onProgressUpdate?: (progress: number) => void;
  initialProgress?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50, // Default: 50 characters per second
  onComplete,
  onProgressUpdate,
  initialProgress = 0,
  className
}: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = useState(initialProgress);
  const [isComplete, setIsComplete] = useState(initialProgress >= text.length);

  const displayedText = text.slice(0, currentIndex);

  useEffect(() => {
    // If we're starting with progress already at or past the end, mark as complete
    if (initialProgress >= text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Set initial index from props
    setCurrentIndex(initialProgress);
    setIsComplete(false);
  }, [text, initialProgress, onComplete]);

  useEffect(() => {
    if (currentIndex < text.length && !isComplete) {
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
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        onProgressUpdate?.(newIndex);

        if (newIndex >= text.length) {
          setIsComplete(true);
          onComplete?.();
        }
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text, speed, onComplete, onProgressUpdate, isComplete]);

  return (
    <div className={className}>
      <MessageContent content={displayedText} />
      {!isComplete && (
        <span className="inline-block w-0.5 h-4 bg-[#99C0F0]/80 animate-pulse ml-1 align-middle rounded-full" />
      )}
    </div>
  );
}
