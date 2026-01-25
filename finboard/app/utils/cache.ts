interface CacheEntry {
  data: any;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const apiCache: Map<string, CacheEntry> = new Map();

export const getFromCache = (key: string): any | null => {
  const entry = apiCache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
  if (isExpired) {
    apiCache.delete(key);
    return null;
  }

  return entry.data;
};

export const setInCache = (key: string, data: any): void => {
  apiCache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const clearCache = (): void => {
  apiCache.clear();
};

export const getCacheSize = (): number => {
  return apiCache.size;
};
