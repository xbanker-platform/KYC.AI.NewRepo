export const categories = [
  { id: 1, name: 'SOW', count: 7, selected: true },
  { id: 2, name: 'UBO', count: 5, selected: false },
  { id: 3, name: 'RISK', count: 4, selected: false },
  { id: 4, name: 'CORR', count: 8, selected: false },
  { id: 5, name: 'AML', count: 3, selected: false },
  { id: 6, name: 'PEP', count: 2, selected: false },
];

export const companies = [
  {
    id: 1,
    name: 'Xiamen Limbach Aircraft Engine Co.Ltd',
    period: '2015-2022',
    verified: false,
    badge: 2,
    selected: true
  },
  {
    id: 2,
    name: '嘉兴锡诚旅游用品有限公司',
    period: '2012-2020',
    verified: true,
    selected: false
  },
  {
    id: 3,
    name: '嘉兴瑞杰国际货运代理有限公司',
    period: '2017-2023',
    verified: true,
    selected: false
  },
  {
    id: 4,
    name: 'Shanghai Tech Industries Ltd',
    period: '2018-2023',
    verified: true,
    selected: false
  },
  {
    id: 5,
    name: 'Beijing Financial Holdings Group',
    period: '2014-2022',
    verified: false,
    badge: 3,
    selected: false
  }
];

export const issues = [
  {
    id: 1,
    title: 'Missing employment details for Xiamen Limbach Aircraft Engine Co.Ltd',
    status: 'warning',
    companyId: 1,
    expanded: true,
    requirements: [
      'Employer name for any additional employment if available',
      'Any other roles held during this employment, if applicable',
      'Any roles held during other employments, if applicable',
      'Annual bonus in the role of Operator',
      'Stock option in the role of Operator'
    ],
    considerations: [
      'Specification of whether there were any other roles held during this employment.',
      'Detail of any additional compensation beyond base salary.',
      'Clarification on employment history gaps if any exist.'
    ]
  },
  {
    id: 2,
    title: 'Financial Benchmark Assessment (Xiamen Limbach Aircraft Engine Co.Ltd)',
    status: 'warning',
    companyId: 1,
    expanded: false,
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
    id: 3,
    title: 'Sensitive Country Affected Party ("SCAP") Risk',
    status: 'success',
    companyId: 1,
    expanded: false,
    requirements: [
      'Confirmation of operations in sensitive countries',
      'Nature and extent of business in these jurisdictions',
      'Risk mitigation measures in place',
      'Compliance with international sanctions'
    ],
    considerations: [
      'Assessment of exposure to geopolitical risks',
      'Review of compliance mechanisms for international trade regulations'
    ]
  },
  {
    id: 4,
    title: 'Sensitive Industry Affected Party ("SIAP") Risk',
    status: 'success',
    companyId: 1,
    expanded: false,
    requirements: [
      'Confirmation of involvement in sensitive industries',
      'Nature and extent of activities in these sectors',
      'Compliance with industry-specific regulations',
      'Risk management framework'
    ],
    considerations: [
      'Assessment of industry-specific compliance standards',
      'Evaluation of potential reputational risks'
    ]
  },
  {
    id: 5,
    title: 'Related Company Negative Hits',
    status: 'neutral',
    companyId: 1,
    expanded: false,
    requirements: [
      'Review of affiliated companies and subsidiaries',
      'Assessment of negative news or regulatory actions',
      'Analysis of potential impact on the main entity'
    ],
    considerations: [
      'Determination of materiality of negative information',
      'Evaluation of remediation measures taken'
    ]
  },
  {
    id: 6,
    title: 'Ownership Structure Verification',
    status: 'warning',
    companyId: 2,
    expanded: false,
    requirements: [
      'Complete ownership chain documentation',
      'Identification of ultimate beneficial owners',
      'Verification of ownership percentages',
      'Corporate structure diagram'
    ],
    considerations: [
      'Identification of complex or unusual ownership structures',
      'Assessment of transparency in ownership disclosure'
    ]
  },
  {
    id: 7,
    title: 'Regulatory Compliance Assessment',
    status: 'success',
    companyId: 2,
    expanded: false,
    requirements: [
      'Review of compliance with local regulations',
      'History of regulatory inspections and outcomes',
      'Remediation of past compliance issues'
    ],
    considerations: [
      'Evaluation of compliance culture and processes',
      'Assessment of proactive compliance measures'
    ]
  },
  {
    id: 8,
    title: 'Supply Chain Due Diligence',
    status: 'warning',
    companyId: 3,
    expanded: false,
    requirements: [
      'List of key suppliers and partners',
      'Supplier vetting procedures',
      'Third-party risk management processes',
      'Supply chain transparency measures'
    ],
    considerations: [
      'Assessment of potential exposure to third-party risks',
      'Evaluation of supply chain resilience'
    ]
  },
  {
    id: 9,
    title: 'Environmental Compliance Review',
    status: 'success',
    companyId: 3,
    expanded: false,
    requirements: [
      'Environmental permits and licenses',
      'Compliance with environmental regulations',
      'History of environmental incidents',
      'Environmental management systems'
    ],
    considerations: [
      'Assessment of environmental risk management',
      'Evaluation of sustainability initiatives'
    ]
  },
  {
    id: 10,
    title: 'Anti-Corruption Policy Assessment',
    status: 'warning',
    companyId: 4,
    expanded: false,
    requirements: [
      'Anti-corruption policies and procedures',
      'Training programs for employees',
      'Whistleblower mechanisms',
      'Past incidents and remediation'
    ],
    considerations: [
      'Evaluation of tone at the top regarding corruption',
      'Assessment of controls to prevent corrupt practices'
    ]
  },
  {
    id: 11,
    title: 'Board Governance Structure',
    status: 'success',
    companyId: 4,
    expanded: false,
    requirements: [
      'Board composition and independence',
      'Committee structures and responsibilities',
      'Board meeting frequency and attendance',
      'Director qualifications and experience'
    ],
    considerations: [
      'Assessment of board effectiveness',
      'Evaluation of governance best practices'
    ]
  },
  {
    id: 12,
    title: 'Litigation History Analysis',
    status: 'warning',
    companyId: 5,
    expanded: false,
    requirements: [
      'Past and current litigation',
      'Settlement agreements',
      'Material legal risks',
      'Legal provision adequacy'
    ],
    considerations: [
      'Assessment of litigation pattern and materiality',
      'Evaluation of legal risk management'
    ]
  },
  {
    id: 13,
    title: 'Sanctions Screening Results',
    status: 'success',
    companyId: 5,
    expanded: false,
    requirements: [
      'Screening against global sanctions lists',
      'Identification of potential matches',
      'Resolution of false positives',
      'Ongoing monitoring procedures'
    ],
    considerations: [
      'Assessment of sanctions compliance program',
      'Evaluation of screening technology effectiveness'
    ]
  },
  {
    id: 14,
    title: 'Market Reputation Assessment',
    status: 'warning',
    companyId: 1,
    expanded: false,
    requirements: [
      'Media and public perception analysis',
      'Customer feedback and reviews',
      'Industry reputation',
      'Brand value assessment'
    ],
    considerations: [
      'Evaluation of reputational strengths and weaknesses',
      'Assessment of reputational risk management'
    ]
  },
  {
    id: 15,
    title: 'Information Security Controls',
    status: 'warning',
    companyId: 2,
    expanded: false,
    requirements: [
      'Cybersecurity policies and procedures',
      'Data protection measures',
      'Security incident history',
      'Third-party security assessments'
    ],
    considerations: [
      'Evaluation of information security maturity',
      'Assessment of data breach response readiness'
    ]
  },
  {
    id: 16,
    title: 'Human Rights Due Diligence',
    status: 'success',
    companyId: 3,
    expanded: false,
    requirements: [
      'Human rights policies',
      'Labor practices assessment',
      'Supply chain human rights screening',
      'Remediation processes for violations'
    ],
    considerations: [
      'Assessment of human rights risk exposure',
      'Evaluation of human rights governance'
    ]
  },
  {
    id: 17,
    title: 'Tax Compliance Review',
    status: 'warning',
    companyId: 4,
    expanded: false,
    requirements: [
      'Tax filing history',
      'Tax authority audits and outcomes',
      'Transfer pricing policies',
      'Tax risk management approach'
    ],
    considerations: [
      'Assessment of tax governance',
      'Evaluation of tax transparency'
    ]
  },
  {
    id: 18,
    title: 'Product Safety Assessment',
    status: 'success',
    companyId: 5,
    expanded: false,
    requirements: [
      'Product safety certifications',
      'Compliance with safety standards',
      'Product recall history',
      'Quality control processes'
    ],
    considerations: [
      'Evaluation of product safety culture',
      'Assessment of product safety risk management'
    ]
  },
  {
    id: 19,
    title: 'Business Continuity Planning',
    status: 'warning',
    companyId: 1,
    expanded: false,
    requirements: [
      'Business continuity plans',
      'Disaster recovery procedures',
      'Crisis management protocols',
      'Testing and simulation exercises'
    ],
    considerations: [
      'Assessment of operational resilience',
      'Evaluation of recovery time objectives'
    ]
  },
  {
    id: 20,
    title: 'Conflict of Interest Management',
    status: 'neutral',
    companyId: 2,
    expanded: false,
    requirements: [
      'Conflict of interest policies',
      'Disclosure requirements',
      'Management and mitigation procedures',
      'Training and awareness programs'
    ],
    considerations: [
      'Assessment of conflict identification processes',
      'Evaluation of management effectiveness'
    ]
  }
]; 