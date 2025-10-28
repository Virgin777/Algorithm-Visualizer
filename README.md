HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Algorithm Visualizer

An interactive web application that visualizes various sorting and searching algorithms to help users understand how they work step by step.

![Algorithm Visualizer](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Features

### Sorting Algorithms
- **Bubble Sort** - Simple comparison-based sorting
- **Quick Sort** - Efficient divide-and-conquer algorithm
- **Merge Sort** - Stable divide-and-conquer algorithm
- **Insertion Sort** - Efficient for small datasets

### Searching Algorithms
- **Linear Search** - Sequential search through array
- **Binary Search** - Efficient search on sorted arrays
- **Jump Search** - Block-based search algorithm

### Interactive Features
- 🎮 **Real-time Controls** - Play, pause, step forward/backward
- 🎯 **Speed Control** - Adjust animation speed (slow, medium, fast, instant)
- 📊 **Visual Feedback** - Color-coded array elements show algorithm state
- 📈 **Algorithm Analysis** - View time and space complexity
- 🔧 **Customizable Arrays** - Adjust array size and generate new datasets
- 🎲 **Random Target Selection** - For search algorithms

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Visualization**: Custom D3.js-inspired components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd algorithm-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Or use the provided batch file:
   ```bash
   start-dev.bat
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run build:clean` - Clean build directory and rebuild

### Quick Start Files

- **`start-dev.bat`** - Quick start development server (Windows)
- **`build-and-preview.bat`** - Build and preview production version (Windows)

## Usage Guide

### Sorting Algorithms

1. **Configure Array**: Adjust the array size using the slider (5-50 elements)
2. **Generate Data**: Click "Generate New Array" for random data
3. **Select Algorithm**: Choose from Bubble, Quick, Merge, or Insertion Sort
4. **Visualize**: Use play controls to watch the algorithm in action
5. **Learn**: Read algorithm information and complexity analysis

### Searching Algorithms

1. **Configure Array**: Set array size (5-30 elements) and target value
2. **Generate Data**: Create new random array or set random target
3. **Select Algorithm**: Choose Linear, Binary, or Jump Search
4. **Visualize**: Watch how the algorithm finds the target value
5. **Analyze**: Compare different search strategies

### Visualization Controls

- **Play/Pause**: Start or stop the animation
- **Step Controls**: Move forward/backward one step at a time
- **Speed Settings**: Adjust animation speed
- **Progress Bar**: Jump to any step in the algorithm
- **Reset**: Return to the beginning

### Color Legend

- 🔵 **Blue**: Default/unprocessed elements
- 🔴 **Red**: Elements being compared
- 🟡 **Yellow**: Elements being swapped or boundary markers
- 🟣 **Purple**: Pivot element (Quick Sort) or middle element (Binary Search)
- 🟢 **Green**: Sorted elements or found target

## Algorithm Complexity

### Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity |
|-----------|-----------|--------------|------------|------------------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |

### Searching Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity |
|-----------|-----------|--------------|------------|------------------|
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| Jump Search | O(1) | O(√n) | O(√n) | O(1) |

## Educational Benefits

- **Visual Learning**: See algorithms in action rather than just reading code
- **Step-by-step Understanding**: Control the pace of learning
- **Complexity Analysis**: Understand time and space trade-offs
- **Interactive Exploration**: Experiment with different array sizes and data
- **Comparative Analysis**: Compare different algorithms side by side

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Graph algorithms visualization (BFS, DFS, Dijkstra)
- [ ] Tree algorithms (BST operations, tree traversals)
- [ ] Dynamic programming visualizations
- [ ] Audio feedback for algorithm steps
- [ ] Export visualization as GIF/video
- [ ] Algorithm comparison mode
- [ ] Custom algorithm input
- [ ] Mobile-responsive improvements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classical algorithm visualization tools
- Built for educational purposes
- Designed to make computer science concepts more accessible

---

**Happy Learning! 🚀**

Made with ❤️ for computer science education

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Algorithm-Visualizer
A web-based Algorithm Visualizer that helps users understand and interact with sorting and searching algorithms through real-time visual animations and an engaging learning interface.
 b182bdc441ebefa2a7dd48e25635cc8280d7a45e
