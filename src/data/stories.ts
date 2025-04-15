import { Story } from './types';
import { companies } from './companies';

// SOW Stories
const sowStories: Story[] = [
  {
    id: 1,
    title: 'Owner Review: Xiamen Limbach',
    company: companies[0],
    period: '2015-2022',
    category: 'SOW',
    verified: false,
    issueIds: [1, 2, 3]
  },
  {
    id: 2,
    title: 'Corporate Structure Check',
    company: companies[0],
    period: '2015-2022',
    category: 'SOW',
    verified: false,
    issueIds: [13, 14, 15, 16]
  },
  {
    id: 3,
    title: 'Business Activities',
    company: companies[0],
    period: '2015-2022',
    category: 'SOW',
    verified: false,
    issueIds: [14, 17, 18, 19, 20]
  }
];

// UBO Stories
const uboStories: Story[] = [
  {
    id: 4,
    title: 'Personal Info Verification',
    company: companies[0],
    period: '2015-2022',
    category: 'UBO',
    verified: false,
    issueIds: [4, 5, 6]
  },
  {
    id: 5,
    title: 'Asset Composition Check',
    company: companies[0],
    period: '2015-2022',
    category: 'UBO',
    verified: false,
    issueIds: [5, 6, 7, 8]
  },
  {
    id: 6,
    title: 'Source of Wealth Check',
    company: companies[0], 
    period: '2015-2022',
    category: 'UBO',
    verified: false,
    issueIds: [6, 15, 16, 17, 18]
  }
];

// RISK Stories
const riskStories: Story[] = [
  {
    id: 7,
    title: 'Negative Screening Check',
    company: companies[0],
    period: '2015-2022',
    category: 'RISK',
    verified: false,
    issueIds: [7, 8, 9]
  },
  {
    id: 8,
    title: 'Country Risk Assessment',
    company: companies[0],
    period: '2015-2022',
    category: 'RISK',
    verified: false,
    issueIds: [8, 9, 10, 11]
  },
  {
    id: 9,
    title: 'Media Coverage Analysis',
    company: companies[0],
    period: '2015-2022',
    category: 'RISK',
    verified: false,
    issueIds: [9, 17, 18, 19, 20]
  }
];

// CORR Stories
const corrStories: Story[] = [
  {
    id: 10,
    title: 'PEP/AML Screening',
    company: companies[0],
    period: '2015-2022',
    category: 'CORR',
    verified: false,
    issueIds: [10, 11, 12]
  },
  {
    id: 11,
    title: 'Industry Risk Assessment',
    company: companies[0],
    period: '2015-2022',
    category: 'CORR',
    verified: false,
    issueIds: [11, 12, 7, 8]
  },
  {
    id: 12,
    title: 'Related Company Check',
    company: companies[0],
    period: '2015-2022',
    category: 'CORR',
    verified: false,
    issueIds: [12, 19, 20, 3, 4]
  }
];

// All stories
export const stories: Story[] = [
  ...sowStories,
  ...uboStories,
  ...riskStories,
  ...corrStories
];

// Get stories by category
export const getStoriesByCategory = (category: string): Story[] => {
  return stories.filter(story => story.category === category);
};

// Get story by ID
export const getStoryById = (id: number): Story | undefined => {
  return stories.find(story => story.id === id);
};

// Get issues for a story
export const getIssuesForStory = (storyId: number, issues: any[]): any[] => {
  const story = getStoryById(storyId);
  if (!story) return [];
  
  // Sort issues by ID to ensure consistent order
  return issues
    .filter(issue => story.issueIds.includes(issue.id))
    .sort((a, b) => a.id - b.id);
}; 