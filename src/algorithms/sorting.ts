import type { Algorithm, AlgorithmStep } from '../types';

export function bubbleSort(inputArray: number[]): Algorithm {
  const array = [...inputArray];
  const steps: AlgorithmStep[] = [];
  const n = array.length;

  steps.push({
    array: [...array],
    description: "Starting Bubble Sort - Compare adjacent elements and swap if needed"
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        description: `Comparing elements at positions ${j} and ${j + 1}`
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        
        steps.push({
          array: [...array],
          swapping: [j, j + 1],
          description: `Swapping ${array[j + 1]} and ${array[j]}`
        });
      }
    }
    
    steps.push({
      array: [...array],
      sorted: [n - 1 - i],
      description: `Element at position ${n - 1 - i} is now in its final position`
    });

    if (!swapped) break;
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    description: "Bubble Sort completed! All elements are sorted."
  });

  return {
    name: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    steps
  };
}

export function quickSort(inputArray: number[]): Algorithm {
  const array = [...inputArray];
  const steps: AlgorithmStep[] = [];

  steps.push({
    array: [...array],
    description: "Starting Quick Sort - Divide and conquer algorithm using pivot"
  });

  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      pivot: high,
      description: `Selected pivot: ${pivot} at position ${high}`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j],
        pivot: high,
        description: `Comparing ${arr[j]} with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
        steps.push({
          array: [...arr],
          swapping: [i, j],
          pivot: high,
          description: `Swapping ${arr[j]} and ${arr[i]}`
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      swapping: [i + 1, high],
      description: `Placing pivot ${pivot} in correct position`
    });

    return i + 1;
  }

  function quickSortHelper(arr: number[], low: number, high: number): void {
    if (low < high) {
      const pi = partition(arr, low, high);
      
      steps.push({
        array: [...arr],
        sorted: [pi],
        description: `Pivot ${arr[pi]} is in its final position`
      });

      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  }

  quickSortHelper(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: "Quick Sort completed! All elements are sorted."
  });

  return {
    name: "Quick Sort",
    description: "An efficient divide-and-conquer algorithm that picks a pivot element and partitions the array around it.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(log n)",
    steps
  };
}

export function mergeSort(inputArray: number[]): Algorithm {
  const steps: AlgorithmStep[] = [];
  const array = [...inputArray];

  steps.push({
    array: [...array],
    description: "Starting Merge Sort - Divide and conquer algorithm"
  });

  function merge(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;

      steps.push({
        array: [...arr],
        description: `Merged element ${arr[k-1]} into position ${k-1}`
      });
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      steps.push({
        array: [...arr],
        description: `Adding remaining element ${arr[k-1]} from left subarray`
      });
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      steps.push({
        array: [...arr],
        description: `Adding remaining element ${arr[k-1]} from right subarray`
      });
    }
  }

  function mergeSortHelper(arr: number[], left: number, right: number): void {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        array: [...arr],
        description: `Dividing array from position ${left} to ${right}`
      });

      mergeSortHelper(arr, left, mid);
      mergeSortHelper(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  }

  mergeSortHelper(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: "Merge Sort completed! All elements are sorted."
  });

  return {
    name: "Merge Sort",
    description: "A stable divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)"
    },
    spaceComplexity: "O(n)",
    steps
  };
}

export function insertionSort(inputArray: number[]): Algorithm {
  const array = [...inputArray];
  const steps: AlgorithmStep[] = [];

  steps.push({
    array: [...array],
    sorted: [0],
    description: "Starting Insertion Sort - First element is considered sorted"
  });

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      comparing: [i],
      sorted: Array.from({ length: i }, (_, idx) => idx),
      description: `Inserting ${key} into the sorted portion`
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        description: `Comparing ${array[j]} with ${key}`
      });

      array[j + 1] = array[j];
      j--;

      steps.push({
        array: [...array],
        swapping: [j + 1, j + 2],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        description: `Shifting ${array[j + 2]} to the right`
      });
    }

    array[j + 1] = key;
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `Placed ${key} in its correct position`
    });
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    description: "Insertion Sort completed! All elements are sorted."
  });

  return {
    name: "Insertion Sort",
    description: "A simple sorting algorithm that builds the final sorted array one item at a time by inserting elements into their correct position.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1)",
    steps
  };
}
