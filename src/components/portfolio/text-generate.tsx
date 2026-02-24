"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}

/**
 * TextGenerateEffect - Animated text that reveals word by word
 * Creates a premium typing effect for headlines
 */
export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: TextGenerateEffectProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const wordsArray = words.split(" ");

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="flex flex-wrap">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
            animate={isVisible ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{
              duration: duration,
              delay: isVisible ? idx * 0.1 : 0,
              ease: "easeOut",
            }}
            className="mr-2 mb-1"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/**
 * TextGenerateEffectGradient - With gradient text effect
 */
export function TextGenerateEffectGradient({
  words,
  className,
  duration = 0.5,
  delay = 0,
}: TextGenerateEffectProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const wordsArray = words.split(" ");

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="flex flex-wrap justify-center">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            initial={{ 
              opacity: 0, 
              filter: "blur(10px)",
              y: 20,
            }}
            animate={isVisible ? { 
              opacity: 1, 
              filter: "blur(0px)",
              y: 0,
            } : {}}
            transition={{
              duration: duration,
              delay: isVisible ? idx * 0.08 : 0,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="mr-3 mb-2 animated-gradient-text"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/**
 * TypewriterEffect - Classic typewriter animation
 */
export function TypewriterEffect({
  words,
  className,
  speed = 50,
  delay = 0,
}: TextGenerateEffectProps & { speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTyping = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= words.length) {
          setDisplayText(words.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTyping);
  }, [words, speed, delay, isInView]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <span>{displayText}</span>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1 inline-block w-0.5 h-[1em] bg-current align-middle"
        />
      )}
    </div>
  );
}
