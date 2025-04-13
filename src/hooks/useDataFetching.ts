import { useState, useEffect } from 'react';

// Define the possible states for data fetching
export type FetchStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

// Define the return type for our hook
export interface UseDataFetchingResult<T> {
  data: T | null;
  status: FetchStatus;
  error: Error | null;
  refetch: () => void;
  reset: () => void;
}

/**
 * A custom hook for handling data fetching with various states
 * 
 * @param fetchFn - Function that returns a promise with the data
 * @param initialFetch - Whether to fetch data on mount
 * @returns Object with data, status, error, and refetch function
 */
export function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  initialFetch = true
): UseDataFetchingResult<T> {
  // State for storing the fetched data
  const [data, setData] = useState<T | null>(null);
  
  // State for tracking the current status
  const [status, setStatus] = useState<FetchStatus>('idle');
  
  // State for storing any error that occurs
  const [error, setError] = useState<Error | null>(null);

  // Function to reset the state
  const reset = () => {
    setData(null);
    setStatus('idle');
    setError(null);
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      setStatus('loading');
      setError(null);
      
      const result = await fetchFn();
      
      // Check if we got data back
      if (result === null || result === undefined || 
          (Array.isArray(result) && result.length === 0) ||
          (typeof result === 'object' && Object.keys(result).length === 0)) {
        setStatus('empty');
      } else {
        setStatus('success');
      }
      
      setData(result);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setData(null);
    }
  };
  
  // Fetch data on mount if initialFetch is true
  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
  }, [initialFetch]);
  
  return {
    data,
    status,
    error,
    refetch: fetchData,
    reset
  };
}

export default useDataFetching; 