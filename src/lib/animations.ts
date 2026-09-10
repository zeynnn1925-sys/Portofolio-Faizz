import { Variants, Transition } from 'motion/react';

// Refined cubic-bezier easing curve for smooth, professional motion
export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.65,
  ease: smoothEase,
};

// Section Header Animation Variants
export const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Stagger Container for Cards and lists
export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

// Single Card Entrance Variants
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

// Subtle Slide In from Left
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -36,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

// Subtle Slide In from Right
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 36,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

// Fade In Up with scale
export const fadeInUpScaleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Pop badge variant
export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEase,
    },
  },
};

// Reusable viewport configuration for consistent scroll-triggering
export const scrollViewport = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -60px 0px',
};
