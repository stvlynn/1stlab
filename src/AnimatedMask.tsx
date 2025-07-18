import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface MaskPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimatedMaskProps {
  targetRect: MaskPosition | null;
  hoveredRect: MaskPosition | null;
  duration?: number;
  easing?: keyof typeof easingFunctions;
  maskColor?: string;
  maskOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

// Easing functions for smooth animations
const easingFunctions = {
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
};

// Animation hook for smooth transitions
export const useAnimatedMask = (
  targetRect: MaskPosition | null,
  hoveredRect: MaskPosition | null,
  duration: number = 300,
  easing: keyof typeof easingFunctions = 'easeOutQuart'
) => {
  const [currentRect, setCurrentRect] = useState<MaskPosition | null>(targetRect);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | undefined>(undefined);
  const startRectRef = useRef<MaskPosition | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easingFunctions[easing](progress);
    
    if (startRectRef.current && hoveredRect) {
      const newRect: MaskPosition = {
        x: startRectRef.current.x + (hoveredRect.x - startRectRef.current.x) * easedProgress,
        y: startRectRef.current.y + (hoveredRect.y - startRectRef.current.y) * easedProgress,
        width: startRectRef.current.width + (hoveredRect.width - startRectRef.current.width) * easedProgress,
        height: startRectRef.current.height + (hoveredRect.height - startRectRef.current.height) * easedProgress,
      };
      
      setCurrentRect(newRect);
    }
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCurrentRect(hoveredRect);
      setIsAnimating(false);
      startTimeRef.current = undefined;
    }
  }, [hoveredRect, duration, easing]);

  useEffect(() => {
    if (hoveredRect && (!currentRect || 
        hoveredRect.x !== currentRect.x || 
        hoveredRect.y !== currentRect.y || 
        hoveredRect.width !== currentRect.width || 
        hoveredRect.height !== currentRect.height)) {
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      startRectRef.current = currentRect;
      startTimeRef.current = undefined;
      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(animate);
    } else if (!hoveredRect && targetRect && targetRect !== currentRect) {
      // Return to target position when hover ends
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      startRectRef.current = currentRect;
      startTimeRef.current = undefined;
      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredRect, targetRect, animate, currentRect]);

  return {
    currentRect,
    isAnimating,
    maskStyle: getAnimatedMaskStyle(currentRect),
  };
};

// Enhanced mask style generator with animation support
export const getAnimatedMaskStyle = (
  rect: MaskPosition | null,
  maskColor: string = 'rgba(255,255,255,0.3)',
  maskOpacity: number = 0.3
) => {
  if (!rect) return {};
  
  const maskGradient = `radial-gradient(ellipse ${rect.width}px ${rect.height}px at ${rect.x + rect.width/2}px ${rect.y + rect.height/2}px, ${maskColor} 0px, ${maskColor} ${Math.max(rect.width/2, rect.height/2)}px, transparent ${Math.max(rect.width/2, rect.height/2) + 2}px)`;
  
  return {
    maskImage: maskGradient,
    WebkitMaskImage: maskGradient,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    transition: 'none', // We'll handle animation via JavaScript
  };
};

// Reusable AnimatedMask component
export const AnimatedMask: React.FC<AnimatedMaskProps> = ({
  targetRect,
  hoveredRect,
  duration = 300,
  easing = 'easeOutQuart',
  maskColor = 'rgba(255,255,255,0.3)',
  maskOpacity = 0.3,
  className = '',
  children
}) => {
  const { currentRect, maskStyle } = useAnimatedMask(targetRect, hoveredRect, duration, easing);
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-0 rounded-32 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg"
        style={maskStyle}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

// Utility hook for tracking element positions
export const useElementPosition = (
  containerRef: React.RefObject<HTMLElement>,
  elementRef: React.RefObject<HTMLElement>,
  deps: React.DependencyList = []
) => {
  const [position, setPosition] = useState<MaskPosition | null>(null);

  const updatePosition = useCallback(() => {
    if (containerRef.current && elementRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();
      
      setPosition({
        x: elementRect.left - containerRect.left,
        y: elementRect.top - containerRect.top,
        width: elementRect.width,
        height: elementRect.height
      });
    }
  }, [containerRef, elementRef]);

  useEffect(() => {
    updatePosition();
    
    // Update on resize and scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [updatePosition, ...deps]);

  return { position, updatePosition };
};

// Utility for managing multiple refs
export const useRefMap = <T extends HTMLElement>() => {
  const refs = useRef<{ [key: string]: T | null }>({});
  
  const setRef = useCallback((key: string) => (el: T | null) => {
    refs.current[key] = el;
  }, []);
  
  const getRef = useCallback((key: string) => refs.current[key], []);
  
  return { refs: refs.current, setRef, getRef };
};

export default AnimatedMask;