import { BaseCache } from './BaseCache.js';

/**
 * First In, First Out (FIFO) Cache Implementation
 * Evicts the oldest item when cache is full
 */
export class FIFOCache extends BaseCache {
  constructor(capacity) {
    super(capacity);
    this.insertionOrder = [];
  }

  access(key) {
    const result = {
      type: 'miss',
      key,
      evicted: null,
      cacheState: Array.from(this.cache.keys())
    };

    if (this.cache.has(key)) {
      // Cache hit
      this.hits++;
      result.type = 'hit';
      this.logOperation('hit', key);
      return result;
    }

    // Cache miss
    this.misses++;
    result.type = 'miss';

    if (this.cache.size >= this.capacity) {
      // Cache is full, need to evict
      const oldestKey = this.insertionOrder.shift();
      this.cache.delete(oldestKey);
      this.evictions++;
      result.evicted = oldestKey;
      this.logOperation('evict', oldestKey, { evictedFor: key });
    }

    // Add new item
    this.cache.set(key, true);
    this.insertionOrder.push(key);
    this.logOperation('miss', key, { evicted: result.evicted });

    result.cacheState = Array.from(this.cache.keys());
    return result;
  }

  reset() {
    super.reset();
    this.insertionOrder = [];
  }
}
