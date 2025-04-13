export const categories = [
  { id: 'SOW', name: 'SOW', count: 3 },
  { id: 'UBO', name: 'UBO', count: 3 },
  { id: 'RISK', name: 'RISK', count: 3 },
  { id: 'CORR', name: 'CORR', count: 3 },
];

export const companies = [
  {
    id: 1,
    name: 'Xiamen Limbach Aircraft Engine Co.Ltd',
    period: '2015-2022',
    verified: false,
    badge: '2'
  },
  {
    id: 2,
    name: '嘉兴锡诚旅游用品有限公司',
    period: '2012-2020',
    verified: true
  },
  {
    id: 3,
    name: '嘉兴瑞杰国际货运代理有限公司',
    period: '2017-2023',
    verified: true
  }
];

export const statistics = {
  kycQuality: 80,
  corroboration: 78,
  risk: 'Low' as const
};

export interface Issue {
  id: number;
  title: string;
  description?: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'warning' | 'success' | 'neutral';
  companyId: number;
  materiality: number;
  requirements: string[];
  considerations: string[];
  category: 'SOW' | 'UBO' | 'RISK' | 'CORR';
  badge?: string | number;
  hit?: string;
  state: 'open' | 'solved' | 'dismissed';
}

// SOW category issues
const sowIssues: Issue[] = [
  {
    id: 1,
    title: 'Business Owner Review: Xiamen Limbach Aircraft Engine Co.Ltd',
    description: 'Comprehensive review of business ownership structure',
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
    title: 'Missing employment details for Xiamen Limbach Aircraft Engine Co.Ltd',
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
    title: 'Financial Benchmark Assessment',
    description: 'Financial analysis and benchmarking required',
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
    title: 'Corporate Structure Verification',
    description: 'Verification of the corporate structure and relationships',
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
    title: 'Business Activity Assessment',
    description: 'Review of core business activities and operations',
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
    title: 'Personal Information',
    description: 'Please provide the personal information of the UBO',
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
    title: 'Asset Composition',
    description: 'Please provide the asset composition of the UBO',
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
    title: 'Account Purpose',
    description: 'Please provide the account purpose of the ACC',
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
    title: 'Source of Wealth Verification',
    description: 'Verification of the source of wealth for the UBO',
    severity: 'High',
    status: 'warning',
    companyId: 1,
    materiality: 85,
    category: 'UBO',
    state: 'open',
    requirements: [
      'Documentation of wealth origins',
      'History of business activities and income',
      'Inheritance or investment records if applicable',
      'Tax filings for income verification'
    ],
    considerations: [
      'Consistency of wealth sources with known activities',
      'Reasonableness of wealth accumulation timeline',
      'Assessment of wealth origins for potential risk factors'
    ]
  },
  {
    id: 16,
    title: 'Relationship Assessment',
    description: 'Analysis of relationships with politically exposed persons',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 70,
    category: 'UBO',
    state: 'open',
    requirements: [
      'List of close associates and family members',
      'Identification of any PEP relationships',
      'Nature and extent of any PEP relationships',
      'Documentation of any official positions held'
    ],
    considerations: [
      'Assessment of risk from any identified PEP relationships',
      'Evaluation of potential influence from relationships',
      'Review of changes in relationship status over time'
    ]
  }
];

// RISK category issues
const riskIssues: Issue[] = [
  {
    id: 7,
    title: 'Negative Check',
    description: 'Check for negative screening results including SCAP, SIAP risks',
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
    title: 'Sensitive Country Association Risk',
    description: 'Assessment of business ties with sensitive jurisdictions',
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
    title: 'Negative Media Coverage',
    description: 'Analysis of negative media mentions and public reputation',
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
    title: 'Money Laundering Risk Assessment',
    description: 'Evaluation of potential money laundering risk factors',
    severity: 'High',
    status: 'warning',
    companyId: 1,
    materiality: 90,
    category: 'RISK',
    state: 'open',
    requirements: [
      'Transaction pattern analysis',
      'Assessment of cash-intensive operations',
      'Review of cross-border fund movements',
      'Identification of high-risk business relationships'
    ],
    considerations: [
      'Evaluation of AML controls adequacy',
      'Assessment of transaction monitoring effectiveness',
      'Review of suspicious activity reporting procedures'
    ]
  },
  {
    id: 18,
    title: 'Tax Compliance Risk',
    description: 'Assessment of tax compliance and tax evasion risks',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 65,
    category: 'RISK',
    state: 'open',
    requirements: [
      'Tax filing history review',
      'Assessment of offshore structures if applicable',
      'Analysis of transfer pricing policies',
      'Review of tax planning strategies'
    ],
    considerations: [
      'Evaluation of tax compliance in all jurisdictions',
      'Assessment of potential aggressive tax planning risks',
      'Review of tax authority inquiries or disputes'
    ]
  }
];

// CORR category issues
const corrIssues: Issue[] = [
  {
    id: 10,
    title: 'PEP/AML Screening',
    description: 'Check for PEP status and AML screening results',
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
    title: 'Sensitive Industry Affected Party ("SIAP") Risk',
    description: 'Assessment of involvement in sensitive industries',
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
    title: 'Related Company Negative Hits',
    description: 'Investigation of negative findings for related entities',
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
    title: 'Regulatory Compliance Verification',
    description: 'Verification of compliance with industry-specific regulations',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 70,
    category: 'CORR',
    state: 'open',
    requirements: [
      'Licensing and registration requirements review',
      'Compliance history with regulatory bodies',
      'Assessment of regulatory violations if any',
      'Regulatory reporting obligations fulfillment'
    ],
    considerations: [
      'Evaluation of regulatory compliance program effectiveness',
      'Assessment of regulatory risk exposure',
      'Review of remediation efforts for any identified issues'
    ]
  },
  {
    id: 20,
    title: 'Third-Party Relationship Risk',
    description: 'Assessment of risks from third-party business relationships',
    severity: 'Medium',
    status: 'warning',
    companyId: 1,
    materiality: 65,
    category: 'CORR',
    state: 'open',
    requirements: [
      'Identification of key third-party relationships',
      'Due diligence performed on third parties',
      'Contractual safeguards assessment',
      'Third-party monitoring procedures review'
    ],
    considerations: [
      'Evaluation of third-party risk management program',
      'Assessment of reputational exposure from third parties',
      'Review of third-party compliance verification procedures'
    ]
  }
];

export const issues: Issue[] = [
  ...sowIssues,
  ...uboIssues,
  ...riskIssues,
  ...corrIssues
]; 