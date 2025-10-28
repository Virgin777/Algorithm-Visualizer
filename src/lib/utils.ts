import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomArray(size: number, min: number = 10, max: number = 500): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getSpeedDelay(speed: 'slow' | 'medium' | 'fast' | 'instant'): number {
  switch (speed) {
    case 'slow': return 1000;
    case 'medium': return 500;
    case 'fast': return 200;
    case 'instant': return 0;
    default: return 500;
  }
}
