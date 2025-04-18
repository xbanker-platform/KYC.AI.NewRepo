import { Category } from './types';
import { Company } from './types';
import { Issue } from './types';
import { Statistics } from './types';
import { IssueAction } from './types';
import { Story } from './types';

import { categories, updateCategoryCounts } from './categories';
import { companies, getCompanyById, addCompany, updateCompany } from './companies';
import { statistics, updateStatistics } from './statistics';
import { 
  issues, 
  getIssueById, 
  getIssuesByCategory, 
  getIssuesByCompany,
  getIssuesByState,
  addIssue,
  updateIssue,
  deleteIssue
} from './issues';
import { 
  stories, 
  getStoriesByCategory, 
  getStoryById,
  getIssuesForStory
} from './stories';
import {
  getSupportingDocuments,
  getMentionedLinks,
  getCorroborationSupport
} from './corroborationSupport';

/**
 * DataManager provides a centralized interface for accessing and managing application data.
 * It acts as a facade over individual data modules, simplifying data access and ensuring
 * consistency when data is modified.
 */
class DataManager {
  // Categories
  getCategories(): Category[] {
    return categories;
  }

  // Companies
  getCompanies(): Company[] {
    return companies;
  }

  getCompanyById(id: number): Company | undefined {
    return getCompanyById(id);
  }

  addCompany(company: Omit<Company, 'id'>): Company {
    return addCompany(company);
  }

  updateCompany(id: number, updates: Partial<Company>): Company | undefined {
    return updateCompany(id, updates);
  }

  // Stories
  getStories(): Story[] {
    return stories;
  }

  getStoryById(id: number): Story | undefined {
    return getStoryById(id);
  }

  getStoriesByCategory(category: string): Story[] {
    return getStoriesByCategory(category);
  }

  getIssuesForStory(storyId: number): Issue[] {
    return getIssuesForStory(storyId, issues);
  }

  // Issues
  getIssues(): Issue[] {
    return issues;
  }

  getIssueById(id: number): Issue | undefined {
    return getIssueById(id);
  }

  getIssuesByCategory(category: string): Issue[] {
    return getIssuesByCategory(category);
  }

  getIssuesByCompany(companyId: number): Issue[] {
    return getIssuesByCompany(companyId);
  }

  getIssuesByState(state: 'open' | 'solved' | 'dismissed'): Issue[] {
    return getIssuesByState(state);
  }

  addIssue(issue: Omit<Issue, 'id'>): Issue {
    return addIssue(issue);
  }

  updateIssue(id: number, updates: Partial<Issue>): Issue | undefined {
    return updateIssue(id, updates);
  }

  deleteIssue(id: number): boolean {
    return deleteIssue(id);
  }

  // Statistics
  getStatistics(): Statistics {
    return statistics;
  }

  // Calculate and update statistics based on current issues
  refreshStatistics(): Statistics {
    return updateStatistics(issues);
  }

  // Update category counts based on current issues
  refreshCategoryCounts(): Category[] {
    return updateCategoryCounts(categories, issues);
  }

  // Get corroboration specific support data
  getSupportingDocuments(storyId: number) {
    return getSupportingDocuments(storyId);
  }

  getMentionedLinks(storyId: number) {
    return getMentionedLinks(storyId);
  }

  getCorroborationSupport(storyId: number) {
    return getCorroborationSupport(storyId);
  }

  // Get standard issue actions that can be used by components
  getStandardIssueActions(onIssueAction: (id: number, action: string) => void): IssueAction[] {
    return [
      {
        label: 'Approve',
        type: 'primary',
        onClick: (id: number) => onIssueAction(id, 'approve')
      },
      {
        label: 'Reject',
        type: 'default',
        onClick: (id: number) => onIssueAction(id, 'reject')
      }
    ];
  }

  // Get corroboration-specific issue actions
  getCorroborationIssueActions(onIssueAction: (id: number, action: string) => void): IssueAction[] {
    return [
      {
        label: 'Verify',
        type: 'primary',
        onClick: (id: number) => onIssueAction(id, 'verify')
      },
      {
        label: 'Request More Info',
        type: 'default',
        onClick: (id: number) => onIssueAction(id, 'request_info')
      },
      {
        label: 'Reject',
        type: 'default',
        onClick: (id: number) => onIssueAction(id, 'reject')
      }
    ];
  }
}

// Export a singleton instance for use throughout the application
export const dataManager = new DataManager(); 