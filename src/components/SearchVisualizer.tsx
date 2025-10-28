import React from 'react';
import type { SearchStep } from '../types';

interface SearchVisualizerProps {
  step: SearchStep;
  maxValue: number;
  animationSpeed: 'slow' | 'medium' | 'fast' | 'instant';
}

export const SearchVisualizer: React.FC<SearchVisualizerProps> = ({ 
  step, 
  maxValue, 
  animationSpeed 
}) => {
  const getBarColor = (index: number): string => {
    if (step.found === index) return 'bg-green-500';
    if (step.searching?.includes(index)) return 'bg-red-500';
    if (step.left === index || step.right === index) return 'bg-yellow-500';
    if (step.mid === index) return 'bg-purple-500';
    return 'bg-blue-500';
  };

  const getBarHeight = (value: number): string => {
    const percentage = (value / maxValue) * 100;
    return `${Math.max(percentage, 5)}%`; // Minimum 5% height for visibility
  };

  const getAnimationClass = (): string => {
    switch (animationSpeed) {
      case 'slow': return 'transition-all duration-1000';
      case 'medium': return 'transition-all duration-500';
      case 'fast': return 'transition-all duration-200';
      case 'instant': return '';
      default: return 'transition-all duration-500';
    }
  };

  return (
    <div className="w-full h-[600px] bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
      {/* Target display */}
      <div className="mb-6 text-center">
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Target: <span className="text-blue-600 dark:text-blue-400">{step.target}</span>
        </span>
      </div>
      
      <div className="flex items-end justify-center h-80 space-x-1">
        {step.array.map((value: number, index: number) => (
          <div
            key={index}
            className={`algorithm-bar flex-1 max-w-8 relative ${getBarColor(index)} ${getAnimationClass()}`}
            style={{ height: getBarHeight(value) }}
          >
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 font-medium">
              {value}
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-500 font-medium">
              {index}
            </div>
          </div>
        ))}
      </div>
      
      {/* Binary search indicators */}
      {(step.left !== undefined || step.right !== undefined) && (
        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          {step.left !== undefined && (
            <span className="mr-4">Left: {step.left}</span>
          )}
          {step.mid !== undefined && (
            <span className="mr-4">Mid: {step.mid}</span>
          )}
          {step.right !== undefined && (
            <span>Right: {step.right}</span>
          )}
        </div>
      )}
      
      {/* Description */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border">
          {step.description}
        </p>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex justify-center flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Default</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Searching</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Boundary</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Middle</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Found</span>
        </div>
      </div>
    </div>
  );
};
