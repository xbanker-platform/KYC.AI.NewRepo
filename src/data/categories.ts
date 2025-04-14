import { Category } from './types';

// Default categories
export const categories: Category[] = [
  { id: 'SOW', name: 'SOW', count: 3 },
  { id: 'UBO', name: 'UBO', count: 3 },
  { id: 'RISK', name: 'RISK', count: 3 },
  { id: 'CORR', name: 'CORR', count: 3 },
];

// Update category counts based on issues
export const updateCategoryCounts = (categories: Category[], issues: any[]): Category[] => {
  return categories.map(category => {
    const count = issues.filter(issue => issue.category === category.id).length;
    return { ...category, count };
  });
}; 