import { BaseCache } from './BaseCache.js';

/**
 * Least Recently Used (LRU) Cache Implementation
 * Evicts the least recently used item when cache is full
 */
export class LRUCache extends BaseCache {
  constructor(capacity) {
    super(capacity);
    this.accessOrder = [];
  }

  access(key) {
    const result = {
      type: 'miss',
      key,
      evicted: null,
      cacheState: Array.from(this.cache.keys())
    };

    if (this.cache.has(key)) {
      // Cache hit - move to end (most recently used)
      this.hits++;
      result.type = 'hit';
      
      // Remove from current position and add to end
      const index = this.accessOrder.indexOf(key);
      this.accessOrder.splice(index, 1);
      this.accessOrder.push(key);
      
      this.logOperation('hit', key);
      return result;
    }

    // Cache miss
    this.misses++;
    result.type = 'miss';

    if (this.cache.size >= this.capacity) {
      // Cache is full, evict least recently used (first in accessOrder)
      const lruKey = this.accessOrder.shift();
      this.cache.delete(lruKey);
      this.evictions++;
      result.evicted = lruKey;
      this.logOperation('evict', lruKey, { evictedFor: key });
    }

    // Add new item to end of access order
    this.cache.set(key, true);
    this.accessOrder.push(key);
    this.logOperation('miss', key, { evicted: result.evicted });

    result.cacheState = Array.from(this.cache.keys());
    return result;
  }

  reset() {
    super.reset();
    this.accessOrder = [];
  }
}
