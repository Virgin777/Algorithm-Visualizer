import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: 'slow' | 'medium' | 'fast' | 'instant';
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onSpeedChange: (speed: 'slow' | 'medium' | 'fast' | 'instant') => void;
  onStepChange: (step: number) => void;
}

export const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onStepChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          disabled={isPlaying}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button
          onClick={onStepBackward}
          variant="outline"
          size="sm"
          disabled={isPlaying || currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={isPlaying ? onPause : onPlay}
          variant="primary"
          size="md"
          disabled={currentStep >= totalSteps - 1}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Play
            </>
          )}
        </Button>
        
        <Button
          onClick={onStepForward}
          variant="outline"
          size="sm"
          disabled={isPlaying || currentStep >= totalSteps - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={() => onStepChange(totalSteps - 1)}
          variant="outline"
          size="sm"
          disabled={isPlaying}
        >
          <SkipForward className="w-4 h-4 mr-2" />
          End
        </Button>
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onStepChange(Number(e.target.value))}
          disabled={isPlaying}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
        />
      </div>
      
      {/* Speed Controls */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Animation Speed
        </label>
        <div className="flex space-x-2">
          {(['slow', 'medium', 'fast', 'instant'] as const).map((speedOption) => (
            <Button
              key={speedOption}
              onClick={() => onSpeedChange(speedOption)}
              variant={speed === speedOption ? 'primary' : 'outline'}
              size="sm"
              className="capitalize"
            >
              {speedOption}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Step Info */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Use the controls above to step through the algorithm visualization
      </div>
    </div>
  );
};
