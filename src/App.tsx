import { useState } from 'react';
import { SortingVisualizer } from './components/SortingVisualizer';
import { SearchingVisualizer } from './components/SearchingVisualizer';
import { Button } from './components/ui/Button';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'sorting' | 'searching'>('sorting');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Algorithm Visualizer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore and understand algorithms through interactive visualizations. 
            Watch step-by-step how sorting and searching algorithms work.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <Button
              onClick={() => setActiveTab('sorting')}
              variant={activeTab === 'sorting' ? 'primary' : 'outline'}
              className="mr-1"
            >
              Sorting Algorithms
            </Button>
            <Button
              onClick={() => setActiveTab('searching')}
              variant={activeTab === 'searching' ? 'primary' : 'outline'}
            >
              Searching Algorithms
            </Button>
          </div>
        </div>

        {/* Content */}
        <main>
          {activeTab === 'sorting' && <SortingVisualizer />}
          {activeTab === 'searching' && <SearchingVisualizer />}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>
            Built with React, TypeScript, and Tailwind CSS. 
            Learn algorithms through interactive visualization.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
