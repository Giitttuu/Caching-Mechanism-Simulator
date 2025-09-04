/**
 * Test data and utility functions for the cache simulator
 */

export const TEST_TRACES = {
  // Simple sequential access
  sequential: [1, 2, 3, 4, 5, 6, 7, 8],

  // Repeated access pattern showing temporal locality
  repeated: [1, 2, 3, 1, 2, 3, 1, 2, 3],

  // Locality pattern with spatial and temporal locality
  locality: [1, 2, 3, 4, 1, 2, 5, 6, 1, 2, 7, 8],

  // Random access pattern
  random: [
    3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3,
    3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7,
  ],

  // FIFO worst case - causes maximum misses
  fifoWorstCase: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],

  // LRU worst case - causes maximum misses
  lruWorstCase: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],

  // Working set pattern
  workingSet: [1, 2, 3, 4, 5, 1, 2, 3, 6, 7, 8, 1, 2, 3, 9, 10, 11, 1, 2, 3],

  // Stack distance pattern
  stackDistance: [1, 2, 3, 4, 3, 2, 1, 5, 6, 7, 6, 5, 8, 9, 10, 9, 8],
};

/**
 * Generate a random memory trace
 * @param {number} length - Length of the trace
 * @param {number} maxValue - Maximum value in the trace
 * @returns {Array} Random memory trace
 */
export function generateRandomTrace(length, maxValue = 10) {
  return Array.from({ length }, () => Math.floor(Math.random() * maxValue) + 1);
}

/**
 * Generate a trace with specific locality characteristics
 * @param {number} length - Length of the trace
 * @param {number} workingSetSize - Size of the working set
 * @param {number} localityFactor - Probability of accessing recent items (0-1)
 * @returns {Array} Memory trace with locality
 */
export function generateLocalityTrace(
  length,
  workingSetSize = 5,
  localityFactor = 0.7
) {
  const trace = [];
  const workingSet = Array.from({ length: workingSetSize }, (_, i) => i + 1);

  for (let i = 0; i < length; i++) {
    if (Math.random() < localityFactor && trace.length > 0) {
      // Access recent items with high probability
      const recentItems = trace.slice(-Math.min(5, trace.length));
      trace.push(recentItems[Math.floor(Math.random() * recentItems.length)]);
    } else {
      // Access random item from working set
      trace.push(workingSet[Math.floor(Math.random() * workingSet.length)]);
    }
  }

  return trace;
}

/**
 * Calculate theoretical hit rate for a given trace and cache size
 * @param {Array} trace - Memory trace
 * @param {number} cacheSize - Cache size
 * @returns {Object} Theoretical metrics
 */
export function calculateTheoreticalMetrics(trace, cacheSize) {
  const uniqueItems = new Set(trace);
  const totalAccesses = trace.length;
  const uniqueAccesses = uniqueItems.size;

  return {
    uniqueItems: uniqueAccesses,
    totalAccesses,
    theoreticalMaxHitRate: Math.min(
      100,
      ((totalAccesses - uniqueAccesses) / totalAccesses) * 100
    ),
    cacheUtilization: Math.min(100, (uniqueAccesses / cacheSize) * 100),
  };
}
