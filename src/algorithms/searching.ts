import type { SearchAlgorithm, SearchStep } from '../types';

export function linearSearch(inputArray: number[], target: number): SearchAlgorithm {
  const array = [...inputArray];
  const steps: SearchStep[] = [];

  steps.push({
    array: [...array],
    target,
    description: `Starting Linear Search for target: ${target}`
  });

  for (let i = 0; i < array.length; i++) {
    steps.push({
      array: [...array],
      target,
      searching: [i],
      description: `Checking element at position ${i}: ${array[i]}`
    });

    if (array[i] === target) {
      steps.push({
        array: [...array],
        target,
        found: i,
        description: `Found target ${target} at position ${i}!`
      });
      
      return {
        name: "Linear Search",
        description: "A simple search algorithm that checks every element in the array sequentially until the target is found.",
        timeComplexity: {
          best: "O(1)",
          average: "O(n)",
          worst: "O(n)"
        },
        spaceComplexity: "O(1)",
        steps
      };
    }
  }

  steps.push({
    array: [...array],
    target,
    description: `Target ${target} not found in the array.`
  });

  return {
    name: "Linear Search",
    description: "A simple search algorithm that checks every element in the array sequentially until the target is found.",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)"
    },
    spaceComplexity: "O(1)",
    steps
  };
}

export function binarySearch(inputArray: number[], target: number): SearchAlgorithm {
  const array = [...inputArray].sort((a, b) => a - b); // Ensure array is sorted
  const steps: SearchStep[] = [];
  
  let left = 0;
  let right = array.length - 1;

  steps.push({
    array: [...array],
    target,
    left,
    right,
    description: `Starting Binary Search for target: ${target} (array sorted first)`
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      array: [...array],
      target,
      left,
      right,
      mid,
      searching: [mid],
      description: `Checking middle element at position ${mid}: ${array[mid]}`
    });

    if (array[mid] === target) {
      steps.push({
        array: [...array],
        target,
        found: mid,
        description: `Found target ${target} at position ${mid}!`
      });
      
      return {
        name: "Binary Search",
        description: "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)"
        },
        spaceComplexity: "O(1)",
        steps
      };
    }

    if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...array],
        target,
        left,
        right,
        description: `${array[mid]} < ${target}, searching right half`
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...array],
        target,
        left,
        right,
        description: `${array[mid]} > ${target}, searching left half`
      });
    }
  }

  steps.push({
    array: [...array],
    target,
    description: `Target ${target} not found in the array.`
  });

  return {
    name: "Binary Search",
    description: "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)"
    },
    spaceComplexity: "O(1)",
    steps
  };
}

export function jumpSearch(inputArray: number[], target: number): SearchAlgorithm {
  const array = [...inputArray].sort((a, b) => a - b); // Ensure array is sorted
  const steps: SearchStep[] = [];
  const n = array.length;
  const jumpStep = Math.floor(Math.sqrt(n));
  let step = jumpStep;
  let prev = 0;

  steps.push({
    array: [...array],
    target,
    description: `Starting Jump Search for target: ${target} with step size: ${jumpStep}`
  });

  // Finding the block where element is present
  while (array[Math.min(step, n) - 1] < target) {
    steps.push({
      array: [...array],
      target,
      searching: [Math.min(step, n) - 1],
      description: `Checking position ${Math.min(step, n) - 1}: ${array[Math.min(step, n) - 1]} < ${target}, jumping forward`
    });

    prev = step;
    step += jumpStep;
    
    if (prev >= n) {
      steps.push({
        array: [...array],
        target,
        description: `Target ${target} not found in the array.`
      });
      
      return {
        name: "Jump Search",
        description: "A search algorithm that works on sorted arrays by jumping ahead by fixed steps and then performing linear search.",
        timeComplexity: {
          best: "O(1)",
          average: "O(√n)",
          worst: "O(√n)"
        },
        spaceComplexity: "O(1)",
        steps
      };
    }
  }

  // Linear search in the identified block
  steps.push({
    array: [...array],
    target,
    description: `Found potential block, performing linear search from position ${prev}`
  });

  while (prev < Math.min(step, n)) {
    steps.push({
      array: [...array],
      target,
      searching: [prev],
      description: `Linear search: checking position ${prev}: ${array[prev]}`
    });

    if (array[prev] === target) {
      steps.push({
        array: [...array],
        target,
        found: prev,
        description: `Found target ${target} at position ${prev}!`
      });
      
      return {
        name: "Jump Search",
        description: "A search algorithm that works on sorted arrays by jumping ahead by fixed steps and then performing linear search.",
        timeComplexity: {
          best: "O(1)",
          average: "O(√n)",
          worst: "O(√n)"
        },
        spaceComplexity: "O(1)",
        steps
      };
    }
    prev++;
  }

  steps.push({
    array: [...array],
    target,
    description: `Target ${target} not found in the array.`
  });

  return {
    name: "Jump Search",
    description: "A search algorithm that works on sorted arrays by jumping ahead by fixed steps and then performing linear search.",
    timeComplexity: {
      best: "O(1)",
      average: "O(√n)",
      worst: "O(√n)"
    },
    spaceComplexity: "O(1)",
    steps
  };
}
