'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade-in';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number; // milisaniye cinsinden gecikme
  threshold?: number; // 0-1 arası değer, elementin ne kadarının görünür olması gerektiği
  once?: boolean; // Animasyonun bir kez mi çalışacağı
}

export default function AnimatedSection({
  children,
  className = '',
  animationType = 'fade-up',
  delay = 0,
  threshold = 0.1,
  once = true
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Animasyon sınıflarını belirle
  const getAnimationClasses = () => {
    const baseClass = 'transition-all duration-1000 ease-out';
    
    const initialStyles = {
      'fade-up': 'opacity-0 translate-y-10',
      'fade-down': 'opacity-0 -translate-y-10',
      'fade-left': 'opacity-0 translate-x-10',
      'fade-right': 'opacity-0 -translate-x-10',
      'zoom-in': 'opacity-0 scale-95',
      'fade-in': 'opacity-0',
    };
    
    const animatedStyles = {
      'fade-up': 'opacity-100 translate-y-0',
      'fade-down': 'opacity-100 translate-y-0',
      'fade-left': 'opacity-100 translate-x-0',
      'fade-right': 'opacity-100 translate-x-0',
      'zoom-in': 'opacity-100 scale-100',
      'fade-in': 'opacity-100',
    };
    
    return {
      initial: `${baseClass} ${initialStyles[animationType]}`,
      animated: `${baseClass} ${animatedStyles[animationType]}`,
    };
  };

  const { initial, animated } = getAnimationClasses();

  useEffect(() => {
    // Tarayıcıda çalıştığından emin ol
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Element görünür olduğunda ve henüz animasyon yapılmadıysa (once=true ise)
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          // Gecikme varsa uygula
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          }, delay);
        } else if (!entry.isIntersecting && !once) {
          // Eğer once=false ise ve element artık görünür değilse
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, once, threshold, hasAnimated]);

  return (
    <div
      ref={ref}
      className={cn(isVisible ? animated : initial, className)}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
} 