import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Algorithm, SearchAlgorithm } from '../types';

interface AlgorithmInfoProps {
  algorithm: Algorithm | SearchAlgorithm | null;
}

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const [copied, setCopied] = useState(false);

  const getImplementationCode = (algorithmName: string): string => {
    switch (algorithmName) {
      case 'Bubble Sort':
        return `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if they are in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`;
      case 'Quick Sort':
        return `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort elements before and after partition
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Choose last element as pivot
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;
      case 'Merge Sort':
        return `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  // Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  // Merge the two sorted arrays
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}`;
      case 'Insertion Sort':
        return `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements that are greater than key
    // one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Place key in its correct position
    arr[j + 1] = key;
  }
  
  return arr;
}`;
      case 'Linear Search':
        return `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // Check each element sequentially
    if (arr[i] === target) {
      return i; // Return index if found
    }
  }
  
  return -1; // Return -1 if not found
}`;
      case 'Binary Search':
        return `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}`;
      case 'Jump Search':
        return `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  // Find the block where target may be present
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    
    if (prev >= n) return -1;
  }
  
  // Linear search in the identified block
  while (arr[prev] < target) {
    prev++;
    
    if (prev === Math.min(step, n)) return -1;
  }
  
  // If target is found
  if (arr[prev] === target) return prev;
  
  return -1;
}`;
      default:
        return '';
    }
  };

  const handleCopyCode = async () => {
    if (!algorithm) return;
    
    const code = getImplementationCode(algorithm.name);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };
  if (!algorithm) {
    return (
      <Card title="Algorithm Information">
        <p className="text-gray-600 dark:text-gray-400">
          Select an algorithm to see its information and complexity analysis.
        </p>
      </Card>
    );
  }

  return (
    <Card title={algorithm.name}>
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          {algorithm.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Time Complexity
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Best:</span>
                <span className="font-mono text-green-600 dark:text-green-400">
                  {algorithm.timeComplexity.best}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Average:</span>
                <span className="font-mono text-yellow-600 dark:text-yellow-400">
                  {algorithm.timeComplexity.average}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Worst:</span>
                <span className="font-mono text-red-600 dark:text-red-400">
                  {algorithm.timeComplexity.worst}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Space Complexity
            </h4>
            <span className="font-mono text-blue-600 dark:text-blue-400 text-sm">
              {algorithm.spaceComplexity}
            </span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Key Characteristics
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            {algorithm.name === 'Bubble Sort' && (
              <>
                <li>• Simple comparison-based sorting algorithm</li>
                <li>• Stable sorting (maintains relative order of equal elements)</li>
                <li>• In-place sorting (requires only O(1) extra memory)</li>
                <li>• Poor performance on large datasets</li>
              </>
            )}
            {algorithm.name === 'Quick Sort' && (
              <>
                <li>• Efficient divide-and-conquer algorithm</li>
                <li>• Not stable (may change relative order of equal elements)</li>
                <li>• In-place sorting with O(log n) stack space</li>
                <li>• Performance depends on pivot selection</li>
              </>
            )}
            {algorithm.name === 'Merge Sort' && (
              <>
                <li>• Stable divide-and-conquer algorithm</li>
                <li>• Consistent O(n log n) performance</li>
                <li>• Requires O(n) extra memory space</li>
                <li>• Excellent for large datasets</li>
              </>
            )}
            {algorithm.name === 'Insertion Sort' && (
              <>
                <li>• Simple and efficient for small datasets</li>
                <li>• Stable and in-place sorting</li>
                <li>• Adaptive (performs well on nearly sorted data)</li>
                <li>• Online (can sort a list as it receives it)</li>
              </>
            )}
            {algorithm.name === 'Linear Search' && (
              <>
                <li>• Works on both sorted and unsorted arrays</li>
                <li>• Simple implementation</li>
                <li>• No preprocessing required</li>
                <li>• Sequential access pattern</li>
              </>
            )}
            {algorithm.name === 'Binary Search' && (
              <>
                <li>• Requires sorted array</li>
                <li>• Very efficient for large datasets</li>
                <li>• Divide and conquer approach</li>
                <li>• Random access pattern</li>
              </>
            )}
            {algorithm.name === 'Jump Search' && (
              <>
                <li>• Requires sorted array</li>
                <li>• Better than linear, worse than binary</li>
                <li>• Optimal jump size is √n</li>
                <li>• Good for systems with expensive comparisons</li>
              </>
            )}
          </ul>
        </div>

        {/* Algorithm Implementation */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <span className="mr-2">💻</span>
              Implementation
            </h4>
            <Button
              onClick={handleCopyCode}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
              }}
              showLineNumbers={true}
            >
              {getImplementationCode(algorithm.name)}
            </SyntaxHighlighter>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
              💡 This is a simplified implementation for educational purposes
            </span>
            <span className="text-gray-500">
              Language: JavaScript
            </span>
          </div>
        </div>

        {/* Step-by-Step Explanation */}
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
            <span className="mr-2">📚</span>
            How It Works (Step by Step)
          </h4>
          <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
            {algorithm.name === 'Bubble Sort' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Compare adjacent elements in the array</li>
                <li>If they are in the wrong order, swap them</li>
                <li>Continue through the entire array</li>
                <li>Repeat the process until no more swaps are needed</li>
                <li>The largest elements "bubble up" to their correct positions</li>
              </ol>
            )}
            {algorithm.name === 'Quick Sort' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Choose a pivot element from the array</li>
                <li>Partition the array so elements smaller than pivot are on the left</li>
                <li>Elements greater than pivot are placed on the right</li>
                <li>Recursively apply the same process to the left and right subarrays</li>
                <li>Continue until all subarrays are sorted</li>
              </ol>
            )}
            {algorithm.name === 'Merge Sort' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Divide the array into two halves</li>
                <li>Recursively sort both halves</li>
                <li>Merge the two sorted halves back together</li>
                <li>During merging, compare elements and place them in order</li>
                <li>Continue until the entire array is sorted</li>
              </ol>
            )}
            {algorithm.name === 'Insertion Sort' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Start with the second element (assume first is sorted)</li>
                <li>Compare the current element with the sorted portion</li>
                <li>Shift larger elements one position to the right</li>
                <li>Insert the current element in its correct position</li>
                <li>Repeat for all remaining elements</li>
              </ol>
            )}
            {algorithm.name === 'Linear Search' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Start from the first element of the array</li>
                <li>Compare the current element with the target value</li>
                <li>If they match, return the current index</li>
                <li>If not, move to the next element</li>
                <li>Continue until the target is found or the array ends</li>
              </ol>
            )}
            {algorithm.name === 'Binary Search' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Start with the entire sorted array</li>
                <li>Find the middle element</li>
                <li>Compare the middle element with the target</li>
                <li>If target is smaller, search the left half</li>
                <li>If target is larger, search the right half</li>
                <li>Repeat until the target is found or search space is empty</li>
              </ol>
            )}
            {algorithm.name === 'Jump Search' && (
              <ol className="list-decimal list-inside space-y-1">
                <li>Calculate the optimal jump size (√n)</li>
                <li>Jump ahead by the step size</li>
                <li>If the current element is greater than target, go back</li>
                <li>Perform linear search in the identified block</li>
                <li>Continue until the target is found or confirmed absent</li>
              </ol>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
