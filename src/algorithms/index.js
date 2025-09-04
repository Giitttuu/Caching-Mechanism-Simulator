import { BaseCache } from './BaseCache.js';
import { FIFOCache } from './FIFOCache.js';
import { LRUCache } from './LRUCache.js';
import { LFUCache } from './LFUCache.js';

// Re-export for external use
export { BaseCache, FIFOCache, LRUCache, LFUCache };

// Cache algorithm registry for easy extension
export const CACHE_ALGORITHMS = {
  FIFO: FIFOCache,
  LRU: LRUCache,
  LFU: LFUCache,
};

/**
 * Create a cache instance by algorithm name
 * @param {string} algorithm - Algorithm name (FIFO, LRU, LFU)
 * @param {number} capacity - Cache capacity
 * @returns {BaseCache} Cache instance
 */
export function createCache(algorithm, capacity) {
  const CacheClass = CACHE_ALGORITHMS[algorithm];
  if (!CacheClass) {
    throw new Error(`Unknown cache algorithm: ${algorithm}`);
  }
  return new CacheClass(capacity);
}
