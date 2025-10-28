import React, { useState, useEffect, useCallback } from 'react';
import { ArrayVisualizer } from './ArrayVisualizer';
import { AlgorithmControls } from './AlgorithmControls';
import { AlgorithmInfo } from './AlgorithmInfo';
import { PerformanceMetrics } from './PerformanceMetrics';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { generateRandomArray, getSpeedDelay } from '../lib/utils';
import { bubbleSort, quickSort, mergeSort, insertionSort } from '../algorithms/sorting';
import type { Algorithm, AnimationSpeed } from '../types';

const SORTING_ALGORITHMS = {
  bubble: bubbleSort,
  quick: quickSort,
  merge: mergeSort,
  insertion: insertionSort,
};

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<AnimationSpeed>('medium');

  // Generate new random array
  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize, 10, 300);
    setArray(newArray);
    setAlgorithm(null);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [arraySize]);

  // Generate initial array
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  // Run algorithm
  const runAlgorithm = (algorithmName: keyof typeof SORTING_ALGORITHMS) => {
    if (array.length === 0) return;
    
    const algorithmFunction = SORTING_ALGORITHMS[algorithmName];
    const result = algorithmFunction(array);
    setAlgorithm(result);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !algorithm) return;

    const timer = setTimeout(() => {
      if (currentStep < algorithm.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, getSpeedDelay(speed));

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, algorithm, speed]);

  // Control functions
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleStepForward = () => {
    if (algorithm && currentStep < algorithm.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleSpeedChange = (newSpeed: AnimationSpeed) => setSpeed(newSpeed);
  const handleStepChange = (step: number) => setCurrentStep(step);

  const maxValue = Math.max(...array);
  const currentAlgorithmStep = algorithm?.steps[currentStep];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sorting Algorithm Visualizer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Watch how different sorting algorithms work step by step
        </p>
      </div>

      {/* Array Controls */}
      <Card title="Array Configuration">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isPlaying}
              className="flex-1"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={generateNewArray} disabled={isPlaying}>
              Generate New Array
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Current array: [{array.slice(0, 10).join(', ')}{array.length > 10 ? '...' : ''}]
            </div>
          </div>
        </div>
      </Card>

      {/* Algorithm Selection */}
      <Card title="Choose Sorting Algorithm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={() => runAlgorithm('bubble')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Bubble Sort' ? 'primary' : 'outline'}
          >
            Bubble Sort
          </Button>
          <Button
            onClick={() => runAlgorithm('quick')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Quick Sort' ? 'primary' : 'outline'}
          >
            Quick Sort
          </Button>
          <Button
            onClick={() => runAlgorithm('merge')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Merge Sort' ? 'primary' : 'outline'}
          >
            Merge Sort
          </Button>
          <Button
            onClick={() => runAlgorithm('insertion')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Insertion Sort' ? 'primary' : 'outline'}
          >
            Insertion Sort
          </Button>
        </div>
      </Card>

      {/* Visualization */}
      {currentAlgorithmStep && (
        <div className="mt-8">
          <ArrayVisualizer
            step={currentAlgorithmStep}
            maxValue={maxValue}
            animationSpeed={speed}
          />
        </div>
      )}

      {/* Controls */}
      {algorithm && (
        <div className="mt-8">
          <AlgorithmControls
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={algorithm.steps.length}
            speed={speed}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onSpeedChange={handleSpeedChange}
            onStepChange={handleStepChange}
          />
        </div>
      )}

      {/* Performance Metrics */}
      {algorithm && (
        <div className="mt-8">
          <PerformanceMetrics algorithm={algorithm} arraySize={arraySize} />
        </div>
      )}

      {/* Algorithm Information */}
      <div className="mt-8">
        <AlgorithmInfo algorithm={algorithm} />
      </div>
    </div>
  );
};
