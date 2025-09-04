/**
 * Base class for all cache replacement algorithms
 * Provides common functionality and interface for cache implementations
 */
export class BaseCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
    this.operations = [];
  }

  /**
   * Get the current cache state
   * @returns {Object} Cache state information
   */
  getState() {
    return {
      cache: Array.from(this.cache.keys()),
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions,
      hitRate: this.getHitRate(),
      missRate: this.getMissRate(),
      operations: [...this.operations]
    };
  }

  /**
   * Calculate hit rate
   * @returns {number} Hit rate as percentage
   */
  getHitRate() {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : (this.hits / total) * 100;
  }

  /**
   * Calculate miss rate
   * @returns {number} Miss rate as percentage
   */
  getMissRate() {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : (this.misses / total) * 100;
  }

  /**
   * Reset cache statistics
   */
  reset() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
    this.operations = [];
  }

  /**
   * Abstract method to be implemented by subclasses
   * @param {*} key - The key to access
   * @returns {Object} Operation result
   */
  access(key) {
    throw new Error('access method must be implemented by subclass');
  }

  /**
   * Log an operation for tracking
   * @param {string} type - Operation type (hit, miss, evict)
   * @param {*} key - The key involved
   * @param {*} details - Additional operation details
   */
  logOperation(type, key, details = {}) {
    this.operations.push({
      type,
      key,
      timestamp: Date.now(),
      cacheState: Array.from(this.cache.keys()),
      ...details
    });
  }
}
