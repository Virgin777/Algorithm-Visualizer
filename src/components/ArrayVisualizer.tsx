import React from 'react';
import type { AlgorithmStep } from '../types';

interface ArrayVisualizerProps {
  step: AlgorithmStep;
  maxValue: number;
  animationSpeed: 'slow' | 'medium' | 'fast' | 'instant';
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ 
  step, 
  maxValue, 
  animationSpeed 
}) => {
  const getBarColor = (index: number): string => {
    if (step.sorted?.includes(index)) return 'bg-green-500';
    if (step.comparing?.includes(index)) return 'bg-red-500';
    if (step.swapping?.includes(index)) return 'bg-yellow-500';
    if (step.pivot === index) return 'bg-purple-500';
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
    <div className="w-full h-[500px] bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
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
      
      {/* Description */}
      <div className="mt-12 text-center">
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
          <span className="text-gray-600 dark:text-gray-400">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Pivot</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Sorted</span>
        </div>
      </div>
    </div>
  );
};
