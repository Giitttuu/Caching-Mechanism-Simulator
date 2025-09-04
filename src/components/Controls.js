import React, { useState } from "react";

const Controls = ({
  memoryTrace,
  onTraceChange,
  selectedAlgorithms,
  onAlgorithmsChange,
  cacheCapacity,
  onCapacityChange,
  speed,
  onSpeedChange,
  isRunning,
  currentStep,
  totalSteps,
  onStart,
  onStop,
  onStepForward,
  onStepBackward,
  onReset,
  onInitialize,
}) => {
  const [traceInput, setTraceInput] = useState("");
  const [presetTraces] = useState({
    Sequential: "1,2,3,4,5,6,7,8",
    "Repeated Access": "1,2,3,1,2,3,1,2,3",
    Locality: "1,2,3,4,1,2,5,6,1,2,7,8",
    Random:
      "3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,4,1,9,7",
    "FIFO Worst Case": "1,2,3,4,1,2,3,4,1,2,3,4",
    "LRU Worst Case": "1,2,3,4,5,1,2,3,4,5,1,2,3,4,5",
  });

  const handleTraceSubmit = () => {
    if (traceInput.trim()) {
      onTraceChange(traceInput);
    }
  };

  const handlePresetSelect = (presetName) => {
    const presetTrace = presetTraces[presetName];
    setTraceInput(presetTrace);
    onTraceChange(presetTrace);
  };

  const handleAlgorithmToggle = (algorithm) => {
    const newAlgorithms = selectedAlgorithms.includes(algorithm)
      ? selectedAlgorithms.filter((alg) => alg !== algorithm)
      : [...selectedAlgorithms, algorithm];
    onAlgorithmsChange(newAlgorithms);
  };

  return (
    <div className="space-y-4">
      {/* Memory Trace Input */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Memory Trace</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter memory references (comma or space separated):
            </label>
            <textarea
              className="input-field h-20 resize-none"
              placeholder="e.g., 1,2,3,4,1,2,5,6"
              value={traceInput}
              onChange={(e) => setTraceInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleTraceSubmit}
              className="btn-primary flex-1"
              disabled={!traceInput.trim()}
            >
              Load Trace
            </button>
            <button
              onClick={() => {
                setTraceInput("");
                onTraceChange("");
              }}
              className="btn-secondary"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Preset Traces */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preset Traces:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(presetTraces).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetSelect(preset)}
                className="text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {memoryTrace.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Loaded:</strong> {memoryTrace.length} references
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {memoryTrace.slice(0, 10).join(", ")}
              {memoryTrace.length > 10 && "..."}
            </p>
          </div>
        )}
      </div>

      {/* Row: Algorithms | Configuration | Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Algorithm Selection */}
        <div className="card">
          <h3 className="text-base font-semibold mb-3">Cache Algorithms</h3>
          <div className="space-y-2">
            {["FIFO", "LRU", "LFU"].map((algorithm) => (
              <label key={algorithm} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.includes(algorithm)}
                  onChange={() => handleAlgorithmToggle(algorithm)}
                  className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  {algorithm}
                  <span className="ml-2 text-xs text-gray-500">
                    {algorithm === "FIFO" && "(First In, First Out)"}
                    {algorithm === "LRU" && "(Least Recently Used)"}
                    {algorithm === "LFU" && "(Least Frequently Used)"}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cache Configuration */}
        <div className="card">
          <h3 className="text-base font-semibold mb-3">Cache Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cache Capacity: {cacheCapacity}
              </label>
              <input
                type="range"
                min="2"
                max="16"
                value={cacheCapacity}
                onChange={(e) => onCapacityChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2</span>
                <span>16</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation Speed: {speed}ms
              </label>
              <input
                type="range"
                min="100"
                max="3000"
                step="100"
                value={speed}
                onChange={(e) => onSpeedChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="card">
          <h3 className="text-base font-semibold mb-3">Simulation Controls</h3>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={onInitialize}
                className="btn-primary flex-1"
                disabled={selectedAlgorithms.length === 0}
              >
                Initialize Caches
              </button>
            </div>

            <div className="flex gap-2">
              {!isRunning ? (
                <button
                  onClick={onStart}
                  className="btn-primary flex-1"
                  disabled={
                    memoryTrace.length === 0 || selectedAlgorithms.length === 0
                  }
                >
                  Start Simulation
                </button>
              ) : (
                <button onClick={onStop} className="btn-secondary flex-1">
                  Stop Simulation
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onStepBackward}
                className="btn-secondary flex-1"
                disabled={currentStep === 0 || isRunning}
              >
                ← Step Back
              </button>
              <button
                onClick={onStepForward}
                className="btn-secondary flex-1"
                disabled={currentStep >= totalSteps || isRunning}
              >
                Step Forward →
              </button>
            </div>

            <button onClick={onReset} className="btn-secondary w-full">
              Reset Simulation
            </button>
          </div>

          {/* Progress */}
          {totalSteps > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {currentStep} / {totalSteps}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
