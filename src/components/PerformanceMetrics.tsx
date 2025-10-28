import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import type { Algorithm, SearchAlgorithm } from '../types';

interface PerformanceMetricsProps {
  algorithm: Algorithm | SearchAlgorithm | null;
  arraySize: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  algorithm, 
  arraySize 
}) => {
  const [estimatedOps, setEstimatedOps] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    if (!algorithm) return;

    // Calculate estimated operations based on complexity
    let ops = 0;
    const n = arraySize;

    switch (algorithm.name) {
      case 'Bubble Sort':
        ops = n * n; // O(n²)
        break;
      case 'Quick Sort':
        ops = n * Math.log2(n); // O(n log n) average case
        break;
      case 'Merge Sort':
        ops = n * Math.log2(n); // O(n log n)
        break;
      case 'Insertion Sort':
        ops = n * n; // O(n²) worst case
        break;
      case 'Linear Search':
        ops = n; // O(n)
        break;
      case 'Binary Search':
        ops = Math.log2(n); // O(log n)
        break;
      case 'Jump Search':
        ops = Math.sqrt(n); // O(√n)
        break;
    }

    setEstimatedOps(Math.round(ops));

    // Estimate time (assuming 1 operation = 1 microsecond)
    if (ops < 1000) {
      setEstimatedTime(`${ops.toFixed(0)} μs`);
    } else if (ops < 1000000) {
      setEstimatedTime(`${(ops / 1000).toFixed(1)} ms`);
    } else {
      setEstimatedTime(`${(ops / 1000000).toFixed(2)} s`);
    }
  }, [algorithm, arraySize]);

  if (!algorithm) return null;

  return (
    <Card title="Performance Metrics">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {arraySize}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Array Size
          </div>
        </div>
        
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {estimatedOps.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">
            Est. Operations
          </div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {estimatedTime}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Est. Time
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
        * Estimates based on theoretical complexity analysis
      </div>
    </Card>
  );
};
