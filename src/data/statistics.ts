import { Statistics } from './types';
import { Issue } from './types';

// Default statistics
export const statistics: Statistics = {
  kycQuality: 80,
  corroboration: 78,
  risk: 'Low' as const
};

// Calculate KYC Quality based on issues
export const calculateKycQuality = (issues: Issue[]): number => {
  if (issues.length === 0) return 100;
  
  // Count issues by state
  const openIssues = issues.filter(issue => issue.state === 'open').length;
  const solvedIssues = issues.filter(issue => issue.state === 'solved').length;
  const dismissedIssues = issues.filter(issue => issue.state === 'dismissed').length;
  
  // Calculate quality score
  const totalIssues = openIssues + solvedIssues + dismissedIssues;
  const resolvedScore = ((solvedIssues + dismissedIssues) / totalIssues) * 100;
  
  // Weight by issue severity
  const highSeverityIssues = issues.filter(issue => issue.severity === 'High' && issue.state === 'open').length;
  const mediumSeverityIssues = issues.filter(issue => issue.severity === 'Medium' && issue.state === 'open').length;
  
  // Apply severity penalties
  let qualityScore = resolvedScore;
  qualityScore -= highSeverityIssues * 5;
  qualityScore -= mediumSeverityIssues * 2;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, Math.round(qualityScore)));
};

// Calculate risk level based on issues
export const calculateRiskLevel = (issues: Issue[]): 'High' | 'Medium' | 'Low' => {
  if (issues.length === 0) return 'Low';
  
  const openHighSeverityIssues = issues.filter(issue => 
    issue.severity === 'High' && issue.state === 'open'
  ).length;
  
  const openMediumSeverityIssues = issues.filter(issue => 
    issue.severity === 'Medium' && issue.state === 'open'
  ).length;
  
  if (openHighSeverityIssues >= 2) return 'High';
  if (openHighSeverityIssues === 1 || openMediumSeverityIssues >= 3) return 'Medium';
  return 'Low';
};

// Update statistics based on issues
export const updateStatistics = (issues: Issue[]): Statistics => {
  return {
    kycQuality: calculateKycQuality(issues),
    corroboration: 78, // Could implement calculation for this
    risk: calculateRiskLevel(issues)
  };
}; 