export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  description: string;
}

export interface Algorithm {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  steps: AlgorithmStep[];
}

export interface SearchStep {
  array: number[];
  target: number;
  searching?: number[];
  found?: number;
  left?: number;
  right?: number;
  mid?: number;
  description: string;
}

export interface SearchAlgorithm {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  steps: SearchStep[];
}

export type AnimationSpeed = 'slow' | 'medium' | 'fast' | 'instant';

export interface VisualizationConfig {
  speed: AnimationSpeed;
  arraySize: number;
  isPlaying: boolean;
  currentStep: number;
}
