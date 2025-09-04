import { BaseCache } from './BaseCache.js';

/**
 * Least Frequently Used (LFU) Cache Implementation
 * Evicts the least frequently used item when cache is full
 * In case of tie, evicts the least recently used among tied items
 */
export class LFUCache extends BaseCache {
  constructor(capacity) {
    super(capacity);
    this.frequency = new Map(); // key -> frequency count
    this.frequencyGroups = new Map(); // frequency -> Set of keys
    this.accessTime = new Map(); // key -> last access time
  }

  access(key) {
    const result = {
      type: 'miss',
      key,
      evicted: null,
      cacheState: Array.from(this.cache.keys())
    };

    if (this.cache.has(key)) {
      // Cache hit - increment frequency
      this.hits++;
      result.type = 'hit';
      
      this.incrementFrequency(key);
      this.logOperation('hit', key, { frequency: this.frequency.get(key) });
      return result;
    }

    // Cache miss
    this.misses++;
    result.type = 'miss';

    if (this.cache.size >= this.capacity) {
      // Cache is full, evict least frequently used
      const evictedKey = this.evictLFU();
      this.cache.delete(evictedKey);
      this.evictions++;
      result.evicted = evictedKey;
      this.logOperation('evict', evictedKey, { evictedFor: key });
    }

    // Add new item with frequency 1
    this.cache.set(key, true);
    this.frequency.set(key, 1);
    this.accessTime.set(key, Date.now());
    
    // Add to frequency group 1
    if (!this.frequencyGroups.has(1)) {
      this.frequencyGroups.set(1, new Set());
    }
    this.frequencyGroups.get(1).add(key);
    
    this.logOperation('miss', key, { evicted: result.evicted, frequency: 1 });

    result.cacheState = Array.from(this.cache.keys());
    return result;
  }

  incrementFrequency(key) {
    const currentFreq = this.frequency.get(key);
    const newFreq = currentFreq + 1;
    
    // Remove from current frequency group
    this.frequencyGroups.get(currentFreq).delete(key);
    if (this.frequencyGroups.get(currentFreq).size === 0) {
      this.frequencyGroups.delete(currentFreq);
    }
    
    // Add to new frequency group
    if (!this.frequencyGroups.has(newFreq)) {
      this.frequencyGroups.set(newFreq, new Set());
    }
    this.frequencyGroups.get(newFreq).add(key);
    
    // Update frequency and access time
    this.frequency.set(key, newFreq);
    this.accessTime.set(key, Date.now());
  }

  evictLFU() {
    // Find minimum frequency
    const minFreq = Math.min(...this.frequencyGroups.keys());
    const minFreqGroup = this.frequencyGroups.get(minFreq);
    
    // Among items with minimum frequency, evict the least recently used
    let lruKey = null;
    let oldestTime = Infinity;
    
    for (const key of minFreqGroup) {
      const accessTime = this.accessTime.get(key);
      if (accessTime < oldestTime) {
        oldestTime = accessTime;
        lruKey = key;
      }
    }
    
    // Remove from frequency group
    minFreqGroup.delete(lruKey);
    if (minFreqGroup.size === 0) {
      this.frequencyGroups.delete(minFreq);
    }
    
    // Clean up frequency and access time maps
    this.frequency.delete(lruKey);
    this.accessTime.delete(lruKey);
    
    return lruKey;
  }

  reset() {
    super.reset();
    this.frequency.clear();
    this.frequencyGroups.clear();
    this.accessTime.clear();
  }
}
