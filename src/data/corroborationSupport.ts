import { SupportItem, SupportType } from '@/components/CorroborationSupportCard';

// Mock data for supporting documents
const supportingDocs: Record<number, SupportItem[]> = {
  // For story ID 3 (assuming this is a CORR story)
  3: [
    {
      id: 'doc-1',
      title: 'Business Registration Certificate',
      type: 'document',
      content: `# Business Registration Certificate
      
## Registration Details

- **Registration Number**: BRC-2022-78901
- **Date of Registration**: March 15, 2022
- **Business Type**: Limited Liability Company
- **Status**: Active

## Company Information

The business has been registered with the appropriate regulatory authorities and has been operating since 2022. The registration confirms that:

1. The company is legally established
2. It has met all regulatory requirements for its industry
3. It has the necessary licenses to operate

## Validation Method

This document has been verified through:
- Cross-referencing with public records
- Digital signature validation
- Official stamp verification

---

**Note**: This document was provided by the client and verified through official channels.`,
      date: '2022-03-15',
      source: 'Business Registry Office'
    },
    {
      id: 'doc-2',
      title: 'Financial Statement 2022',
      type: 'document',
      content: `# Financial Statement 2022

## Summary of Financial Position

| Item | Amount (USD) |
|------|-------------|
| Total Assets | $12,450,000 |
| Total Liabilities | $5,230,000 |
| Net Worth | $7,220,000 |

## Revenue Sources

- Manufacturing contracts: 45%
- Service agreements: 30%
- Consulting: 15%
- Other sources: 10%

## Key Financial Indicators

- **Debt-to-Equity Ratio**: 0.72
- **Current Ratio**: 1.8
- **Return on Assets**: 8.5%
- **Return on Equity**: 12.3%

The financial health of the company appears stable with a positive trend in earnings and a manageable debt profile.

---

**Auditor Notes**: Financial data has been independently verified.`,
      date: '2023-01-30',
      source: 'Ernst & Young'
    },
  ],
  // For story ID 4
  4: [
    {
      id: 'doc-3',
      title: 'Company Ownership Structure',
      type: 'document',
      content: `# Company Ownership Structure

## Ownership Breakdown

| Shareholder | Ownership Percentage |
|-------------|---------------------|
| Xiamen Holdings Ltd. | 51% |
| Limbach Investment Group | 30% |
| Executive Partners Pool | 12% |
| Other Investors | 7% |

## Key Beneficial Owners

### Xiamen Holdings Ltd.
- Registered in Singapore
- Ultimate beneficial owner: Li Wei (35%), Zhang Min (30%), Wu Corporation (35%)

### Limbach Investment Group
- Registered in Germany
- Publicly traded company (Frankfurt Stock Exchange)
- No individual owns more than 10%

## Changes in Ownership
The ownership structure has remained stable since 2020, with only minor changes in the "Other Investors" category.

---

**Verification Status**: Ownership information verified against corporate registries and stock exchange disclosures.`,
      date: '2022-11-10',
      source: 'Company Registry'
    },
  ],
  // For story ID 5
  5: [
    {
      id: 'doc-4',
      title: 'Audit Report 2022',
      type: 'document',
      content: `# Audit Report 2022

## Executive Summary

This report presents the findings of the comprehensive audit conducted on Xiamen Limbach Aircraft Engine Co. for the fiscal year 2022. The audit was performed in accordance with International Standards on Auditing.

## Key Findings

1. **Financial Statement Accuracy**
   - Financial statements fairly represent the financial position
   - No material misstatements identified
   - Accounting procedures follow IFRS standards

2. **Internal Controls**
   - Robust internal control systems in place
   - Minor improvements recommended for procurement process
   - IT systems security meets industry standards

3. **Regulatory Compliance**
   - High level of compliance with relevant regulations
   - All necessary licenses and permits are valid and current
   - No significant compliance issues identified

## Recommendations

- Enhance documentation for related party transactions
- Implement additional controls for overseas operations
- Update risk assessment procedures

## Opinion

Based on our audit, the financial statements present fairly, in all material respects, the financial position of Xiamen Limbach Aircraft Engine Co. as of December 31, 2022, and its financial performance and cash flows for the year then ended in accordance with International Financial Reporting Standards.

---

**Auditor**: Global Audit Partners LLP
**Lead Partner**: Sarah Johnson, CPA`,
      date: '2023-03-20',
      source: 'Global Audit Partners'
    },
  ]
};

// Mock data for mentioned links
const mentionedLinks: Record<number, SupportItem[]> = {
  // For story ID 3
  3: [
    {
      id: 'link-1',
      title: 'Company Official Website',
      type: 'link',
      content: `# Xiamen Limbach Official Website

**URL**: [https://www.xiamenlimbach.com](https://www.example.com/placeholder)

## Website Content Verification

The official website contains the following relevant information:

- Company history dating back to 2015
- Corporate structure and leadership team
- Products and services offered
- Regulatory compliance statements
- Industry certifications
- News and press releases

## Verification Notes

The website was accessed and archived on February 10, 2023. The information provided aligns with other documentation and public records reviewed as part of the verification process.

Key information including the company's founding date, ownership structure, and primary business activities has been cross-referenced with official records and found to be accurate.

## Digital Footprint Assessment

The website maintains a professional presence with regular updates. Domain registration information confirms it has been registered to the company since 2016 and properly maintained.`,
      date: '2023-02-10',
      source: 'Corporate Website'
    },
    {
      id: 'link-2',
      title: 'Industry Association Membership',
      type: 'link',
      content: `# Industry Association Membership Verification

**URL**: [https://www.aeroengine-association.org/members](https://www.example.com/placeholder)

## Membership Details

Xiamen Limbach Aircraft Engine Co. is listed as an active member of the International Aero Engine Association, a respected industry body that requires strict vetting of its members.

## Membership Requirements

To maintain membership, companies must:
- Maintain appropriate industry certifications
- Comply with international quality standards
- Submit to periodic operational reviews
- Adhere to the association's code of ethics

## Verification Process

The membership was verified through:
1. Direct contact with the association secretariat
2. Confirmation of current membership status
3. Review of membership duration (joined in 2017)
4. Verification of good standing status

## Significance

Membership in this association provides additional corroboration of the company's legitimate operations within the industry and its compliance with international standards.`,
      date: '2023-01-15',
      source: 'International Aero Engine Association'
    }
  ],
  // For story ID 4
  4: [
    {
      id: 'link-3',
      title: 'Regulatory Filing Database',
      type: 'link',
      content: `# Regulatory Filing Database Access

**URL**: [https://www.regulatoryfilings.gov/public-search](https://www.example.com/placeholder)

## Filing History

The regulatory database contains multiple filings from Xiamen Limbach Aircraft Engine Co. dating from 2015 to present, including:

- Annual compliance reports
- Ownership change notifications
- Export control compliance certificates
- Environmental compliance documentation

## Key Regulatory Events

| Date | Filing Type | Status |
|------|------------|--------|
| 2022-12-10 | Annual Compliance Report | Approved |
| 2022-06-15 | Environmental Audit | Compliant |
| 2021-09-30 | Export Control Assessment | Cleared |
| 2020-11-05 | Ownership Update | Recorded |

## Verification Notes

All regulatory filings were accessed directly from the official government database. The company has maintained consistent compliance with regulatory requirements with no significant violations or penalties recorded.

This provides strong corroboration of the company's legitimate operations and regulatory compliance.`,
      date: '2023-02-25',
      source: 'Government Regulatory Database'
    }
  ],
  // For story ID 5
  5: [
    {
      id: 'link-4',
      title: 'Business Press Coverage',
      type: 'link',
      content: `# Business Press Coverage Analysis

**Multiple Sources**:
- Financial Times: [https://www.ft.com/content/aerospace-suppliers](https://www.example.com/placeholder)
- Aviation Weekly: [https://www.aviationweekly.com/engine-manufacturers](https://www.example.com/placeholder)
- Industry Today: [https://www.industrytoday.com/xiamen-limbach-expansion](https://www.example.com/placeholder)

## Media Coverage Summary

Xiamen Limbach Aircraft Engine Co. has received consistent coverage in reputable business and industry press over the period 2015-2022. The coverage provides corroborating evidence of:

- Company's market position and operations
- Key business developments and milestones
- Industry recognition and partnerships
- Expansion into new markets

## Key Articles

1. "Aircraft Engine Manufacturers Weathering Supply Chain Challenges" - Financial Times, November 2022
2. "Xiamen Limbach Expands European Presence with New Facility" - Aviation Weekly, July 2021
3. "Rising Stars in Aircraft Component Manufacturing" - Industry Today, March 2020

## Verification Assessment

The press coverage from multiple independent sources provides consistent information about the company's operations, leadership, and industry position. This serves as valuable third-party corroboration of the company's business activities.`,
      date: '2023-01-05',
      source: 'Multiple Business Publications'
    },
    {
      id: 'link-5',
      title: 'Industry Conference Presentations',
      type: 'link',
      content: `# Industry Conference Presentations

**Conference URLs**:
- Aero Innovation Summit: [https://aeroinnovation.org/2022/speakers](https://www.example.com/placeholder)
- Global Aviation Expo: [https://globalaviation.expo/archives/2021](https://www.example.com/placeholder)

## Presentation History

Representatives from Xiamen Limbach Aircraft Engine Co. have presented at major industry conferences, providing additional verification of their industry presence and expertise:

### Aero Innovation Summit 2022
- Speaker: Dr. Zhang Wei, Chief Technology Officer
- Topic: "Next Generation Fuel Efficiency in Aircraft Engines"
- Date: September 15, 2022
- Verification: Presentation slides, conference program, attendee feedback

### Global Aviation Expo 2021
- Speaker: Michael Limbach, VP of International Operations
- Topic: "East-West Partnerships in Aviation Manufacturing"
- Date: May 22, 2021
- Verification: Video recording, speaker biography, industry publication coverage

## Significance

These public presentations at respected industry events provide strong corroboration of:
1. The company's technical expertise
2. The existence and roles of key personnel
3. The company's standing within the industry
4. The nature of their business activities

All presentation materials were retrieved from official conference archives and independently verified.`,
      date: '2022-09-15',
      source: 'Industry Conference Archives'
    }
  ]
};

// Function to get supporting documents for a story
export const getSupportingDocuments = (storyId: number): SupportItem[] => {
  return supportingDocs[storyId] || [];
};

// Function to get mentioned links for a story
export const getMentionedLinks = (storyId: number): SupportItem[] => {
  return mentionedLinks[storyId] || [];
};

// Add these functions to dataManager
export const getCorroborationSupport = (storyId: number) => {
  return {
    documents: getSupportingDocuments(storyId),
    links: getMentionedLinks(storyId)
  };
}; 