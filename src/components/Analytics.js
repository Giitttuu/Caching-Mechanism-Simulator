import React, { useMemo } from "react";

const Analytics = ({ cacheStates, simulationResults, memoryTrace }) => {
  const analytics = useMemo(() => {
    if (Object.keys(cacheStates).length === 0) return null;

    const algorithms = Object.keys(cacheStates);
    const comparison = algorithms.map((algorithm) => {
      const state = cacheStates[algorithm];
      return {
        algorithm,
        hits: state.hits,
        misses: state.misses,
        evictions: state.evictions,
        hitRate: state.hitRate,
        missRate: state.missRate,
        totalAccesses: state.hits + state.misses,
      };
    });

    // Calculate step-by-step metrics
    const stepMetrics = simulationResults.map((step, index) => {
      const stepData = { step: step.step, reference: step.reference };
      algorithms.forEach((algorithm) => {
        const result = step.results[algorithm];
        stepData[`${algorithm}_type`] = result.type;
        stepData[`${algorithm}_evicted`] = result.evicted;
      });
      return stepData;
    });

    return { comparison, stepMetrics };
  }, [cacheStates, simulationResults]);

  const renderComparisonChart = () => {
    if (!analytics || analytics.comparison.length === 0) return null;

    const data = analytics.comparison;
    const maxValue = Math.max(...data.map((d) => d.totalAccesses));

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Performance Comparison</h4>
        {data.map((item, index) => (
          <div key={item.algorithm} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">
                {item.algorithm}
              </span>
              <span className="text-sm text-gray-600">
                Hit Rate: {item.hitRate.toFixed(1)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(item.totalAccesses / maxValue) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
              <div className="text-center">
                <div className="font-semibold text-cache-hit">{item.hits}</div>
                <div>Hits</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-cache-miss">
                  {item.misses}
                </div>
                <div>Misses</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-cache-evict">
                  {item.evictions}
                </div>
                <div>Evictions</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHitRateChart = () => {
    if (!analytics || analytics.comparison.length === 0) return null;

    const data = analytics.comparison;
    const maxHitRate = Math.max(...data.map((d) => d.hitRate));

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Hit Rate Comparison</h4>
        {data.map((item) => (
          <div key={item.algorithm} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {item.algorithm}
              </span>
              <span className="text-sm font-semibold text-primary-600">
                {item.hitRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(item.hitRate / maxHitRate) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStepByStepTable = () => {
    if (!analytics || analytics.stepMetrics.length === 0) return null;

    const algorithms = Object.keys(cacheStates);
    const maxSteps = Math.min(analytics.stepMetrics.length, 20); // Show last 20 steps

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Recent Operations</h4>
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-1">Step</th>
                <th className="text-left py-2 px-1">Ref</th>
                {algorithms.map((alg) => (
                  <th key={alg} className="text-center py-2 px-1">
                    {alg}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analytics.stepMetrics.slice(-maxSteps).map((step, index) => (
                <tr key={step.step} className="border-b border-gray-100">
                  <td className="py-1 px-1 font-mono">{step.step}</td>
                  <td className="py-1 px-1 font-mono font-semibold">
                    {step.reference}
                  </td>
                  {algorithms.map((alg) => {
                    const type = step[`${alg}_type`];
                    const evicted = step[`${alg}_evicted`];
                    return (
                      <td key={alg} className="py-1 px-1 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            type === "hit"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {type}
                        </span>
                        {evicted && (
                          <div className="text-xs text-orange-600 mt-1">
                            evict: {evicted}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    if (!analytics || analytics.comparison.length === 0) return null;

    const data = analytics.comparison;
    const totalHits = data.reduce((sum, item) => sum + item.hits, 0);
    const totalMisses = data.reduce((sum, item) => sum + item.misses, 0);
    const totalEvictions = data.reduce((sum, item) => sum + item.evictions, 0);
    const overallHitRate =
      totalHits + totalMisses > 0
        ? (totalHits / (totalHits + totalMisses)) * 100
        : 0;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{totalHits}</div>
          <div className="text-sm text-green-700">Total Hits</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{totalMisses}</div>
          <div className="text-sm text-red-700">Total Misses</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {totalEvictions}
          </div>
          <div className="text-sm text-orange-700">Total Evictions</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {overallHitRate.toFixed(1)}%
          </div>
          <div className="text-sm text-blue-700">Overall Hit Rate</div>
        </div>
      </div>
    );
  };

  if (!analytics) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Analytics</h3>
        <div className="text-center text-gray-500 py-8">
          Initialize caches and run a simulation to see analytics
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
        {renderStatistics()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance Comparison */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
          {renderComparisonChart()}
        </div>

        {/* Hit Rate Comparison */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Hit Rate Analysis</h3>
          {renderHitRateChart()}
        </div>
      </div>

      {/* Step-by-Step Operations */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Operation History</h3>
        {renderStepByStepTable()}
      </div>
    </div>
  );
};

export default Analytics;
