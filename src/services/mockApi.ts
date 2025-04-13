import { Issue } from '@/data/types';

// Mock delay to simulate API call
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock successful API call with data
export const fetchIssuesSuccess = async (): Promise<Issue[]> => {
  await mockDelay(1000); // Simulate network delay
  
  // Return mock issues data
  return [
    {
      id: 101,
      title: 'Critical Security Vulnerability',
      description: 'High-risk security issue requiring immediate attention',
      severity: 'High',
      status: 'warning',
      companyId: 1,
      materiality: 95,
      requirements: ['Immediate patch', 'Security audit'],
      considerations: ['Impact on production systems', 'User data protection'],
      category: 'RISK',
      state: 'open'
    },
    {
      id: 102,
      title: 'Performance Optimization Required',
      description: 'System response time exceeds threshold',
      severity: 'Medium',
      status: 'warning',
      companyId: 1,
      materiality: 70,
      requirements: ['Performance analysis', 'Code optimization'],
      considerations: ['User experience impact', 'Resource allocation'],
      category: 'SOW',
      state: 'open'
    },
    {
      id: 103,
      title: 'Documentation Update Needed',
      description: 'API documentation is outdated',
      severity: 'Low',
      status: 'success',
      companyId: 2,
      materiality: 40,
      requirements: ['Review current docs', 'Update API endpoints'],
      considerations: ['Development team cooperation', 'Version control'],
      category: 'CORR',
      state: 'solved'
    }
  ];
};

// Mock successful API call with empty data
export const fetchIssuesEmpty = async (): Promise<Issue[]> => {
  await mockDelay(1000);
  return []; // Return empty array
};

// Mock API call that fails with an error
export const fetchIssuesError = async (): Promise<Issue[]> => {
  await mockDelay(1000);
  throw new Error('Failed to fetch issues: Network error 500');
};

// Mock API call with custom delay and result
export const mockApiCall = <T>(
  data: T | null, 
  options: { 
    delay?: number;
    shouldFail?: boolean;
    errorMessage?: string; 
  } = {}
): Promise<T> => {
  const { delay = 1000, shouldFail = false, errorMessage = 'API call failed' } = options;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(errorMessage));
      } else {
        resolve(data as T);
      }
    }, delay);
  });
}; 