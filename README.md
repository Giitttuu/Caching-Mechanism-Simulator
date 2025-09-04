# 🚀 Interactive Cache Simulator

A comprehensive React.js application that visualizes different cache replacement algorithms (FIFO, LRU, LFU) with real-time analytics and interactive controls.

![Cache Simulator](https://img.shields.io/badge/React-18.2.0-blue) ![D3.js](https://img.shields.io/badge/D3.js-7.8.5-orange) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-cyan) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## ✨ Features

- **🎯 Multiple Cache Algorithms**: Support for FIFO, LRU, and LFU replacement policies
- **📊 Interactive Visualization**: Real-time D3.js visualizations of cache states and operations
- **⏯️ Step-by-Step Execution**: Manual step control and automatic simulation modes
- **📈 Comprehensive Analytics**: Hit/miss ratios, performance comparisons, and operation history
- **🏗️ Modular Architecture**: Easy to extend with new cache algorithms
- **📱 Responsive Design**: Modern UI built with Tailwind CSS
- **🎮 Preset Traces**: Built-in memory traces for testing different scenarios
- **🎨 Real-time Speed Control**: Adjustable animation speed during simulation
- **📜 Manual Scrolling**: Interactive scrollbar for memory trace navigation

## 🎯 Cache Algorithms

### FIFO (First In, First Out)

- **Principle**: Evicts the oldest item when cache is full
- **Implementation**: Simple queue-based approach with insertion order tracking
- **Use Case**: Simple and predictable, good for sequential access patterns

### LRU (Least Recently Used)

- **Principle**: Evicts the least recently accessed item
- **Implementation**: Maintains access order for optimal replacement decisions
- **Use Case**: Excellent for temporal locality, widely used in practice

### LFU (Least Frequently Used)

- **Principle**: Evicts the item with lowest access frequency
- **Implementation**: Tracks access counts, with LRU as tiebreaker
- **Use Case**: Good for applications with stable access patterns

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd cache-simulator
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 📖 How to Use

### 🏠 Home Page

- **Theory Section**: Learn about cache memory fundamentals
- **Algorithm Explanations**: Detailed explanations of FIFO, LRU, and LFU
- **Step-by-Step Instructions**: Beginner-friendly guide to using the simulator

### 🎮 Simulator Page

#### 1. **Load Memory Trace**

- **Manual Input**: Enter memory references separated by commas or spaces
  ```
  Example: 1,2,3,4,1,2,5,6
  ```
- **Preset Traces**: Choose from built-in test cases:
  - **Sequential**: Basic sequential access pattern
  - **Repeated Access**: Shows temporal locality
  - **Locality**: Demonstrates spatial and temporal locality
  - **Random**: Random access pattern
  - **FIFO Worst Case**: Pattern that performs poorly with FIFO
  - **LRU Worst Case**: Pattern that performs poorly with LRU

#### 2. **Select Algorithms**

- Choose which cache algorithms to compare
- Select multiple algorithms to see side-by-side performance
- Available: FIFO, LRU, LFU

#### 3. **Configure Cache**

- **Cache Capacity**: Set the number of cache slots (default: 4)
- **Animation Speed**: Adjust simulation speed (100ms - 3000ms)

#### 4. **Initialize Caches**

- Click "Initialize Caches" to prepare the simulation
- This step is required before running any simulation

#### 5. **Run Simulation**

- **Start Simulation**: Automatic execution with adjustable speed
- **Step Forward**: Manual step-by-step execution
- **Step Backward**: Go back to previous step
- **Stop Simulation**: Pause automatic execution
- **Reset**: Clear all results and start over

#### 6. **Analyze Results**

- **Real-time Visualization**: See cache states and operations
- **Performance Metrics**: Hit/miss ratios and statistics
- **Step-by-Step History**: Detailed operation log
- **Algorithm Comparison**: Side-by-side performance analysis


## 🛠️ Development

### Available Scripts

- **`npm start`**: Start development server
- **`npm build`**: Create production build
- **`npm test`**: Run test suite
- **`npm eject`**: Eject from Create React App

### Tech Stack

**Frontend Framework**: React.js 18.2.0, React DOM 18.2.0, React Scripts 5.0.1

**Data Visualization**: D3.js 7.8.5

**Styling**: Tailwind CSS 3.3.6, PostCSS 8.4.32, Autoprefixer 10.4.16

**Development Tools**: Node.js, npm, Webpack, Babel, ESLint

**Languages**: JavaScript ES6+, HTML5, CSS3

## 📝 Troubleshooting

### Common Issues

1. **Simulation not starting**:

   - Ensure memory trace is loaded
   - Check that caches are initialized
   - Verify algorithms are selected

2. **Step controls not working**:

   - Initialize caches first
   - Ensure simulation is not running
   - Check that memory trace is loaded

3. **Visualization not updating**:

   - Refresh the page
   - Check browser console for errors
   - Ensure D3.js is loaded properly

4. **Speed control not working**:
   - Start simulation first
   - Adjust speed during automatic execution
   - Manual steps are not affected by speed

### Performance Tips

- **Use smaller traces** for faster rendering
- **Close other browser tabs** for better performance
- **Use Chrome** for optimal D3.js performance
- **Disable browser extensions** if experiencing issues

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- **More Algorithms**: MRU, ARC, Clock, Second Chance
- **Advanced Visualizations**: Heatmaps, 3D views, network graphs
- **Export Functionality**: Save results and visualizations
- **Performance Benchmarking**: Built-in performance testing tools
- **Real Memory Traces**: Integration with actual memory access patterns
- **Multi-level Cache**: Support for L1, L2, L3 cache simulation
- **Custom Algorithms**: User-defined cache replacement policies


**Made by Lokesh Singh 🔥**
