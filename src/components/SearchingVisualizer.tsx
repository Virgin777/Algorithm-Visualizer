import React, { useState, useEffect, useCallback } from 'react';
import { SearchVisualizer } from './SearchVisualizer';
import { AlgorithmControls } from './AlgorithmControls';
import { AlgorithmInfo } from './AlgorithmInfo';
import { PerformanceMetrics } from './PerformanceMetrics';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { generateRandomArray, getSpeedDelay } from '../lib/utils';
import { linearSearch, binarySearch, jumpSearch } from '../algorithms/searching';
import type { SearchAlgorithm, AnimationSpeed } from '../types';

const SEARCH_ALGORITHMS = {
  linear: linearSearch,
  binary: binarySearch,
  jump: jumpSearch,
};

export const SearchingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(20);
  const [target, setTarget] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<AnimationSpeed>('medium');

  // Generate new random array
  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize, 10, 100);
    setArray(newArray);
    setTarget(newArray[Math.floor(Math.random() * newArray.length)]); // Set target to an existing element
    setAlgorithm(null);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [arraySize]);

  // Generate initial array
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  // Run algorithm
  const runAlgorithm = (algorithmName: keyof typeof SEARCH_ALGORITHMS) => {
    if (array.length === 0) return;
    
    const algorithmFunction = SEARCH_ALGORITHMS[algorithmName];
    const result = algorithmFunction(array, target);
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
          Search Algorithm Visualizer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Watch how different search algorithms find target values
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
              max="30"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isPlaying}
              className="flex-1"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Value:
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              disabled={isPlaying}
              className="px-3 py-1 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={generateNewArray} disabled={isPlaying}>
              Generate New Array
            </Button>
            <Button 
              onClick={() => setTarget(array[Math.floor(Math.random() * array.length)])}
              disabled={isPlaying || array.length === 0}
              variant="outline"
            >
              Random Target
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current array: [{array.slice(0, 15).join(', ')}{array.length > 15 ? '...' : ''}]
          </div>
        </div>
      </Card>

      {/* Algorithm Selection */}
      <Card title="Choose Search Algorithm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={() => runAlgorithm('linear')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Linear Search' ? 'primary' : 'outline'}
          >
            Linear Search
          </Button>
          <Button
            onClick={() => runAlgorithm('binary')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Binary Search' ? 'primary' : 'outline'}
          >
            Binary Search
          </Button>
          <Button
            onClick={() => runAlgorithm('jump')}
            disabled={isPlaying || array.length === 0}
            variant={algorithm?.name === 'Jump Search' ? 'primary' : 'outline'}
          >
            Jump Search
          </Button>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Note: Binary Search and Jump Search require sorted arrays. The array will be sorted automatically.
        </div>
      </Card>

      {/* Visualization */}
      {currentAlgorithmStep && (
        <div className="mt-8">
          <SearchVisualizer
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
