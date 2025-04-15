import { Issue } from './types';
import { updateCategoryCounts } from './categories';
import { categories } from './categories';
import { statistics, updateStatistics } from './statistics';

// Issues are grouped by category but are referenced by stories
// Each issue may appear in multiple stories
// Here's the mapping from stories to issues:
//
// Story 1 (Owner Review: Xiamen Limbach): issues [1, 2, 3]
// Story 2 (Corporate Structure Check): issues [13, 14, 15, 16]
// Story 3 (Business Activities): issues [14, 17, 18, 19, 20]
// Story 4 (Personal Info Verification): issues [4, 5, 6]
// Story 5 (Asset Composition Check): issues [5, 6, 7, 8]
// Story 6 (Source of Wealth Check): issues [6, 15, 16, 17, 18]
// Story 7 (Negative Screening Check): issues [7, 8, 9]
// Story 8 (Country Risk Assessment): issues [8, 9, 10, 11]
// Story 9 (Media Coverage Analysis): issues [9, 17, 18, 19, 20]
// Story 10 (PEP/AML Screening): issues [10, 11, 12]
// Story 11 (Industry Risk Assessment): issues [11, 12, 7, 8]
// Story 12 (Related Company Check): issues [12, 19, 20, 3, 4]

// SOW category issues
const sowIssues: Issue[] = [
  {
    id: 1,
    title: 'Missing Ownership Documentation',
    description: 'Legal ownership documentation is incomplete or missing',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 80,
    category: 'SOW',
    badge: '2',
    state: 'open',
    requirements: [
      'Legal ownership structure documentation',
      'Shareholder information and percentages',
      'Corporate governance information'
    ],
    considerations: [
      'Verification of ownership claims against public records',
      'Analysis of beneficial ownership structure',
      'Identification of any ownership changes in the past 3 years'
    ]
  },
  {
    id: 2,
    title: 'Incomplete Employment Records',
    description: 'Employment details and compensation information are incomplete',
    severity: 'High',
    status: 'warning',
    companyId: 1,
    materiality: 75,
    category: 'SOW',
    state: 'solved',
    requirements: [
      'Employer name for any additional employment if available',
      'Any other roles held during this employment, if applicable',
      'Annual bonus information',
      'Stock option details'
    ],
    considerations: [
      'Specification of whether there were any other roles held during this employment',
      'Detail of any additional compensation beyond base salary',
      'Clarification on employment history gaps if any exist'
    ]
  },
  {
    id: 3,
    title: 'Financial Benchmark Discrepancy',
    description: 'Financial performance shows significant deviation from industry benchmarks',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 70,
    category: 'SOW',
    state: 'dismissed',
    requirements: [
      'Financial statements for the last fiscal year',
      'Revenue growth rate comparison to industry benchmark',
      'Profit margin analysis against competitors',
      'Debt-to-equity ratio evaluation'
    ],
    considerations: [
      'Assessment of financial health compared to industry standards',
      'Identification of any unusual financial patterns',
      'Evaluation of sustainable growth indicators'
    ]
  },
  {
    id: 13,
    title: 'Unclear Organizational Chart',
    description: 'Company structure and reporting lines are not clearly defined',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 65,
    category: 'SOW',
    state: 'open',
    requirements: [
      'Organization chart with reporting lines',
      'Parent-subsidiary relationships documentation',
      'Board of directors composition',
      'Key management personnel identification'
    ],
    considerations: [
      'Verification of corporate structure against official records',
      'Assessment of management control effectiveness',
      'Identification of any recent corporate restructuring events'
    ]
  },
  {
    id: 14,
    title: 'Inconsistent Business Activities',
    description: 'Declared business activities do not match operational evidence',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 60,
    category: 'SOW',
    state: 'open',
    requirements: [
      'Description of primary business activities',
      'Product and service portfolio',
      'Key markets and geographic presence',
      'Major customers and suppliers information'
    ],
    considerations: [
      'Alignment of activities with stated business purpose',
      'Review of operational risks in key markets',
      'Assessment of supplier and customer concentration risks'
    ]
  }
];

// UBO category issues
const uboIssues: Issue[] = [
  {
    id: 4,
    title: 'Missing UBO Identification',
    description: 'Ultimate beneficial owner information is incomplete',
    severity: 'Medium',
    status: 'success',
    companyId: 1,
    materiality: 50,
    category: 'UBO',
    state: 'open',
    requirements: [
      'Full legal name',
      'Date of birth',
      'Nationality',
      'Current residential address',
      'Government-issued identification'
    ],
    considerations: [
      'Verification of identity against official documents',
      'Cross-check of personal information with public records',
      'Confirmation of current address validity'
    ]
  },
  {
    id: 5,
    title: 'Asset Verification Required',
    description: 'Declared assets require additional verification',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 60,
    category: 'UBO',
    state: 'solved',
    requirements: [
      'Details of shareholdings in companies',
      'Real estate ownership information',
      'Investment portfolio summary',
      'Other significant assets'
    ],
    considerations: [
      'Assessment of asset diversification',
      'Verification of declared assets against public records',
      'Analysis of any concentrated risk in asset holdings'
    ]
  },
  {
    id: 6,
    title: 'Account Purpose Unclear',
    description: 'Purpose of accounts is insufficiently explained',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 55,
    category: 'UBO',
    state: 'dismissed',
    requirements: [
      'Primary purpose of the account',
      'Expected transaction types and volumes',
      'Source of funds documentation',
      'Expected account activity patterns'
    ],
    considerations: [
      'Alignment of stated purpose with business activities',
      'Reasonableness of expected transaction patterns',
      'Verification of source of funds'
    ]
  },
  {
    id: 15,
    title: 'Wealth Source Documentation Missing',
    description: 'Insufficient documentation on source of wealth',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 70,
    category: 'UBO',
    state: 'open',
    requirements: [
      'Income tax returns for past 3 years',
      'Documentation of business income and investments',
      'Explanation of significant assets acquisition',
      'Banking statements supporting wealth sources'
    ],
    considerations: [
      'Consistency of wealth sources with disclosed activities',
      'Verification of major financial transactions',
      'Assessment of wealth accumulation timeline'
    ]
  },
  {
    id: 16,
    title: 'UBO Relationship Discrepancy',
    description: 'Relationships between UBOs contain inconsistencies',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 55,
    category: 'UBO',
    state: 'solved',
    requirements: [
      'Family relationship diagrams if applicable',
      'Business relationship documentation',
      'Historical association evidence',
      'Control structure clarification'
    ],
    considerations: [
      'Assessment of relationship impact on business control',
      'Verification of disclosed associations against public records',
      'Identification of any undisclosed material relationships'
    ]
  }
];

// RISK category issues
const riskIssues: Issue[] = [
  {
    id: 7,
    title: 'Negative Screening Hit',
    description: 'Negative screening has produced significant matches',
    severity: 'High',
    status: 'warning',
    companyId: 1,
    materiality: 85,
    category: 'RISK',
    state: 'open',
    badge: '3',
    requirements: [
      'Screening against global sanctions lists',
      'Politically exposed person (PEP) screening',
      'Adverse media screening',
      'Industry risk assessment'
    ],
    considerations: [
      'Evaluation of any negative findings against business context',
      'Assessment of risk mitigation measures in place',
      'Determination of risk level based on findings'
    ]
  },
  {
    id: 8,
    title: 'High-Risk Country Operations',
    description: 'Business operations in countries with elevated risk profiles',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 75,
    category: 'RISK',
    state: 'solved',
    hit: 'Zhang Yunfeng Hit',
    requirements: [
      'Identification of all business activities in sensitive countries',
      'Nature and extent of operations in high-risk jurisdictions',
      'Compliance with applicable sanctions and restrictions',
      'Risk controls for sensitive country operations'
    ],
    considerations: [
      'Evaluation of exposure to geopolitical and compliance risks',
      'Assessment of controls relative to identified country risks',
      'Analysis of business necessity for sensitive country operations'
    ]
  },
  {
    id: 9,
    title: 'Adverse Media Mentions',
    description: 'Multiple negative media references require evaluation',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 70,
    category: 'RISK',
    state: 'dismissed',
    hit: 'Chen Jiaqing Hit',
    requirements: [
      'Comprehensive media search results',
      'Analysis of negative media themes and severity',
      'Assessment of reputational impact',
      'Company responses to negative coverage'
    ],
    considerations: [
      'Credibility and reach of media sources reporting negative information',
      'Recency and relevance of negative coverage',
      'Effectiveness of company\'s response to allegations'
    ]
  },
  {
    id: 17,
    title: 'Regulatory Compliance Gaps',
    description: 'Identified gaps in regulatory compliance documentation',
    severity: 'High',
    status: 'warning',
    companyId: 1,
    materiality: 80,
    category: 'RISK',
    state: 'open',
    requirements: [
      'Regulatory compliance audit results',
      'Past violations and remediation actions',
      'Current compliance program description',
      'Pending regulatory investigations if any'
    ],
    considerations: [
      'Assessment of compliance program effectiveness',
      'Analysis of regulatory risk exposure',
      'Evaluation of remediation actions for past issues'
    ]
  },
  {
    id: 18,
    title: 'Operational Risk Vulnerabilities',
    description: 'Several operational vulnerabilities require mitigation',
    severity: 'Medium',
    status: 'success',
    companyId: 1,
    materiality: 65,
    category: 'RISK',
    state: 'solved',
    requirements: [
      'Operational risk management framework',
      'Business continuity planning documentation',
      'Key operational vulnerabilities assessment',
      'Risk mitigation strategies'
    ],
    considerations: [
      'Adequacy of operational risk controls',
      'Industry-specific operational risk factors',
      'Historical operational incidents and responses'
    ]
  }
];

// CORR category issues
const corrIssues: Issue[] = [
  {
    id: 10,
    title: 'PEP Status Confirmation Required',
    description: 'Politically exposed person status needs verification',
    severity: 'Medium',
    status: 'success',
    companyId: 1,
    materiality: 65,
    category: 'CORR',
    state: 'open',
    badge: '1',
    requirements: [
      'Politically exposed person status verification',
      'Anti-money laundering screening results',
      'Enhanced due diligence documentation if applicable',
      'Ongoing monitoring protocols'
    ],
    considerations: [
      'Evaluation of PEP risk level if identified',
      'Assessment of AML controls adequacy',
      'Analysis of transaction monitoring procedures'
    ]
  },
  {
    id: 11,
    title: 'Sensitive Industry Exposure',
    description: 'Business has exposure to industries requiring enhanced due diligence',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 60,
    category: 'CORR',
    state: 'solved',
    requirements: [
      'Identification of all business activities in sensitive industries',
      'Regulatory compliance status for industry-specific requirements',
      'Risk controls for sensitive industry operations',
      'Industry reputation assessment'
    ],
    considerations: [
      'Evaluation of exposure to industry-specific risks',
      'Assessment of controls relative to identified industry risks',
      'Analysis of business operations against industry best practices'
    ]
  },
  {
    id: 12,
    title: 'Related Company Risk Flags',
    description: 'Associated companies have risk indicators requiring review',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 55,
    category: 'CORR',
    state: 'dismissed',
    requirements: [
      'Identification of all related companies and entities',
      'Screening results for related companies',
      'Assessment of impact of any negative findings',
      'Verification of separation between entities if applicable'
    ],
    considerations: [
      'Determination of materiality of related entity findings',
      'Evaluation of governance connections between entities',
      'Assessment of contagion risk from related entity issues'
    ]
  },
  {
    id: 19,
    title: 'Transaction Monitoring Alert',
    description: 'Transaction patterns require enhanced scrutiny',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 70,
    category: 'CORR',
    state: 'open',
    requirements: [
      'Transaction monitoring system description',
      'Alert handling procedures',
      'Past suspicious activity reports',
      'Recent system effectiveness testing results'
    ],
    considerations: [
      'Adequacy of monitoring thresholds and scenarios',
      'Timeliness of alert investigation',
      'Quality of suspicious activity reporting'
    ]
  },
  {
    id: 20,
    title: 'Governance Documentation Gaps',
    description: 'Corporate governance documentation is incomplete',
    severity: 'Low',
    status: 'success',
    companyId: 1,
    materiality: 60,
    category: 'CORR',
    state: 'solved',
    requirements: [
      'Board composition and independence analysis',
      'Corporate governance policies documentation',
      'Decision-making process description',
      'Stakeholder communication protocols'
    ],
    considerations: [
      'Alignment with corporate governance best practices',
      'Effectiveness of board oversight',
      'Transparency in stakeholder communications'
    ]
  }
];

// Combine all issues
export const issues: Issue[] = [
  ...sowIssues,
  ...uboIssues,
  ...riskIssues,
  ...corrIssues
];

// Get issue by ID
export const getIssueById = (id: number): Issue | undefined => {
  return issues.find(issue => issue.id === id);
};

// Get issues by category
export const getIssuesByCategory = (category: string): Issue[] => {
  return issues.filter(issue => issue.category === category);
};

// Get issues by company
export const getIssuesByCompany = (companyId: number): Issue[] => {
  return issues.filter(issue => issue.companyId === companyId);
};

// Get issues by state
export const getIssuesByState = (state: 'open' | 'solved' | 'dismissed'): Issue[] => {
  return issues.filter(issue => issue.state === state);
};

// Add a new issue
export const addIssue = (issue: Omit<Issue, 'id'>): Issue => {
  const newId = Math.max(...issues.map(i => i.id)) + 1;
  const newIssue = { ...issue, id: newId };
  issues.push(newIssue);
  
  // Update category counts
  updateCategoryCounts(categories, issues);
  
  // Update statistics
  updateStatistics(issues);
  
  return newIssue;
};

// Update an existing issue
export const updateIssue = (id: number, updates: Partial<Issue>): Issue | undefined => {
  const index = issues.findIndex(issue => issue.id === id);
  if (index === -1) return undefined;
  
  issues[index] = { ...issues[index], ...updates };
  
  // Update category counts
  updateCategoryCounts(categories, issues);
  
  // Update statistics
  updateStatistics(issues);
  
  return issues[index];
};

// Delete an issue
export const deleteIssue = (id: number): boolean => {
  const index = issues.findIndex(issue => issue.id === id);
  if (index === -1) return false;
  
  issues.splice(index, 1);
  
  // Update category counts
  updateCategoryCounts(categories, issues);
  
  // Update statistics
  updateStatistics(issues);
  
  return true;
}; 