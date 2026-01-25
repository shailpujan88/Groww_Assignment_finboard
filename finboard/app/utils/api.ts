import axios, { AxiosError } from 'axios';
import { getFromCache, setInCache } from './cache';

/**
 * Fetch data from an API endpoint with caching support
 * @param url - The API URL to fetch from
 * @param useCache - Whether to use cached data (default: true)
 * @param useProxy - Whether to use the proxy route for CORS handling (default: true)
 * @returns Promise with the API response data
 */
export const fetchApiData = async (
  url: string,
  useCache = true,
  useProxy = true
): Promise<Record<string, any>> => {
  const cacheKey = url;

  // Check cache first
  if (useCache) {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    // Use proxy route if useProxy is true (helps with CORS issues)
    const fetchUrl = useProxy ? `/api/proxy?url=${encodeURIComponent(url)}` : url;

    const response = await axios.get<any>(fetchUrl, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;

    // Cache the successful response
    if (useCache) {
      setInCache(cacheKey, data);
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }

    if (axiosError.code === 'ECONNABORTED') {
      throw new Error('API request timeout. Please check your connection.');
    }

    if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'ECONNREFUSED') {
      throw new Error('Cannot reach API endpoint. Please check the URL.');
    }

    if (axiosError.message === 'Network Error') {
      throw new Error('Network error. Please check your connection.');
    }

    throw new Error(`Failed to fetch data: ${axiosError.message}`);
  }
};

export const validateApiUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const extractFieldsFromResponse = (response: Record<string, any>, depth = 0, maxDepth = 3): string[] => {
  const fields: string[] = [];

  if (depth > maxDepth) return fields;

  const extractFields = (obj: any, prefix = ''): void => {
    if (obj === null || obj === undefined) return;

    if (Array.isArray(obj)) {
      if (obj.length > 0 && typeof obj[0] === 'object') {
        extractFields(obj[0], prefix);
      }
      return;
    }

    if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (value === null || value === undefined) {
          fields.push(fullKey);
        } else if (typeof value === 'object' && depth < maxDepth) {
          if (!Array.isArray(value) || value.length === 0) {
            extractFields(value, fullKey);
          } else {
            fields.push(fullKey);
          }
        } else {
          fields.push(fullKey);
        }
      });
    }
  };

  extractFields(response);
  return [...new Set(fields)];
};

export const getNestedValue = (obj: Record<string, any>, path: string): any => {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
};

export const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, any> => {
  const flattened: Record<string, any> = {};

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      flattened[fullKey] = value;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value, fullKey));
    } else {
      flattened[fullKey] = value;
    }
  });

  return flattened;
};
