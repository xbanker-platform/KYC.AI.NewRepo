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
  ],
  // For story ID 10 (PEP/AML Screening)
  10: [
    {
      id: 'doc-10-1',
      title: 'PEP Screening Results',
      type: 'document',
      content: `# PEP Screening Results

## Executive Summary

This document presents the findings of the PEP (Politically Exposed Person) screening conducted for Xiamen Limbach and its key personnel. The screening was performed using international databases and following FATF guidelines.

## Screening Results

| Name | Position | PEP Status | Risk Level |
|------|----------|------------|------------|
| Wei Zhang | CEO | Not a PEP | Low |
| Li Mei | CFO | Not a PEP | Low |
| Michael Limbach | Chairman | Former PEP (2015-2018) | Medium |
| Sarah Johnson | Board Member | Not a PEP | Low |

## Enhanced Due Diligence

For Michael Limbach (Former PEP):
- Former Deputy Minister of Trade (2015-2018)
- Enhanced monitoring implemented
- Source of wealth documentation verified
- Transaction monitoring thresholds lowered

## Conclusion

Based on the comprehensive screening, the company has one individual with PEP status (former). Appropriate enhanced due diligence measures have been implemented in accordance with regulatory requirements.

---

**Screening Date**: January 15, 2023
**Conducted By**: Global Compliance Partners Ltd.`,
      date: '2023-01-15',
      source: 'Global Compliance Partners'
    },
    {
      id: 'doc-10-2',
      title: 'AML Risk Assessment',
      type: 'document',
      content: `# Anti-Money Laundering Risk Assessment

## Risk Assessment Overview

This document presents the findings of the comprehensive Anti-Money Laundering (AML) risk assessment conducted for Xiamen Limbach. The assessment follows a risk-based approach in compliance with international standards.

## Risk Factors Evaluated

### Customer Risk
- Customer types and geographic locations
- Business relationships and transaction patterns
- Political exposure and high-risk industries

### Country/Geographic Risk
- Operations in high-risk jurisdictions
- Cross-border activities and transactions
- Sanctions and embargoes considerations

### Product/Service Risk
- Nature of products and services offered
- Delivery channels and payment methods
- Complexity and transparency of transactions

## Key Findings

1. **Overall AML Risk Rating**: Medium-Low
2. **Primary Risk Areas**:
   - Cross-border transactions with certain regions
   - Complex corporate structure requiring enhanced verification
3. **Mitigating Controls**:
   - Robust KYC procedures implemented
   - Transaction monitoring system in place
   - Regular staff training on AML compliance

## Recommendations

1. Enhance transaction monitoring for high-risk jurisdictions
2. Implement additional verification for certain customer categories
3. Increase frequency of screening against sanction lists

---

**Assessment Date**: February 10, 2023
**Conducted By**: AML Risk Specialists Inc.`,
      date: '2023-02-10',
      source: 'AML Risk Specialists Inc.'
    }
  ],
  
  // For story ID 11 (Industry Risk Assessment)
  11: [
    {
      id: 'doc-11-1',
      title: 'Industry Risk Profile',
      type: 'document',
      content: `# Industry Risk Profile Assessment

## Executive Summary

This document presents the comprehensive Industry Risk Profile Assessment for Xiamen Limbach operating in the aircraft engine manufacturing sector. The assessment evaluates inherent risks, regulatory landscape, and industry-specific compliance requirements.

## Industry Categorization

| Criteria | Rating | Notes |
|----------|--------|-------|
| Regulatory Intensity | High | Strict regulatory oversight from multiple jurisdictions |
| Environmental Impact | Medium-High | Manufacturing processes with environmental considerations |
| Strategic Importance | High | Critical for national aviation infrastructure |
| Corruption Risk | Medium | Industry with government contracts and global operations |

## Key Industry Risks

1. **Dual-Use Technology Concerns**
   - Export control compliance requirements
   - Potential for military/civilian dual applications
   - International trade restrictions

2. **Regulatory Compliance**
   - Aviation safety standards (FAA, EASA, CAAC)
   - Environmental regulations (emissions, waste management)
   - Global supply chain integrity requirements

3. **Geopolitical Factors**
   - International trade tensions impact
   - Technology transfer restrictions
   - Changing regulatory landscapes

## Risk Mitigation Assessment

The company has implemented appropriate industry-specific controls including:
- Export compliance program
- Environmental management system
- Supply chain due diligence procedures
- Regular regulatory compliance audits

## Conclusion

The aircraft engine manufacturing industry presents inherent risks due to its strategic nature and regulatory requirements. Xiamen Limbach has established appropriate controls proportionate to these industry-specific risks.

---

**Assessment Date**: March 5, 2023
**Conducted By**: Industry Risk Assessors LLC`,
      date: '2023-03-05',
      source: 'Industry Risk Assessors LLC'
    }
  ],
  
  // For story ID 12 (Related Company Check)
  12: [
    {
      id: 'doc-12-1',
      title: 'Related Entity Analysis',
      type: 'document',
      content: `# Related Entity Analysis

## Executive Summary

This document presents the findings of the Related Entity Analysis conducted for Xiamen Limbach. The analysis identifies all related entities, evaluates their risk profiles, and assesses potential reputational risks.

## Related Entities Identified

| Entity Name | Relationship | Jurisdiction | Risk Score |
|-------------|--------------|--------------|------------|
| Limbach Holding GmbH | Parent Company | Germany | Low |
| Xiamen Aero Components Ltd. | Subsidiary | China | Low |
| SkyParts Manufacturing Inc. | Joint Venture | United States | Medium |
| European Engine Services SA | Affiliate | France | Low |
| Pacific Rim Suppliers Ltd. | Significant Supplier | Singapore | Medium |

## Negative Media Screening

Each related entity was screened against global media sources, sanctions lists, and regulatory actions:

1. **Limbach Holding GmbH**: No significant negative findings
2. **Xiamen Aero Components Ltd.**: No significant negative findings
3. **SkyParts Manufacturing Inc.**: Environmental fine in 2020 (remediated)
4. **European Engine Services SA**: No significant negative findings
5. **Pacific Rim Suppliers Ltd.**: Historical labor dispute (2019, resolved)

## Risk Assessment

The overall risk exposure from related entities is assessed as LOW with the following considerations:
- No sanctions or serious regulatory issues identified
- Minor historical issues have been appropriately remediated
- Governance connections between entities appear appropriate
- No conflicts of interest identified

## Recommendations

1. Enhance monitoring of SkyParts Manufacturing compliance with environmental regulations
2. Implement periodic review of Pacific Rim Suppliers labor practices
3. Maintain documentation of arms-length transactions between related entities

---

**Analysis Date**: February 25, 2023
**Conducted By**: Corporate Intelligence Partners`,
      date: '2023-02-25',
      source: 'Corporate Intelligence Partners'
    }
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
  ],
  // For story ID 10 (PEP/AML Screening)
  10: [
    {
      id: 'link-10-1',
      title: 'Global PEP Database',
      type: 'link',
      content: `# Global PEP Database Verification

**URL**: [https://www.worldcompliance.com/pep-database](https://www.example.com/placeholder)

## Database Information

The World Compliance PEP Database is a comprehensive repository of politically exposed persons worldwide. It includes:

- Current and former government officials
- Senior political figures
- Judicial officials
- Military leaders
- Senior executives of state-owned enterprises
- Family members and close associates

## Verification Process

The database was accessed on January 10, 2023, to conduct screening of all key personnel associated with Xiamen Limbach. The screening process included:

1. Name matching against primary PEP lists
2. Verification of any potential matches
3. Assessment of PEP status and risk level
4. Documentation of findings

## Verification Results

The database search confirmed the PEP status findings in our assessment report. The database is updated daily and maintains records of over 1.5 million politically exposed persons globally.

This resource provides reliable, independent verification of the PEP status of key personnel.`,
      date: '2023-01-10',
      source: 'World Compliance Database'
    },
    {
      id: 'link-10-2',
      title: 'AML Compliance Framework',
      type: 'link',
      content: `# AML Compliance Framework Reference

**URL**: [https://www.fatf-gafi.org/recommendations](https://www.example.com/placeholder)

## Framework Overview

The Financial Action Task Force (FATF) Recommendations represent the international standard for combating money laundering and terrorist financing. They provide a comprehensive framework of measures that countries and financial institutions should implement.

## Key Elements Referenced

In conducting our AML assessment, we specifically referenced the following FATF standards:

1. **Recommendation 10**: Customer Due Diligence
2. **Recommendation 12**: Politically Exposed Persons
3. **Recommendation 20**: Suspicious Transaction Reporting
4. **Recommendation 22**: DNFBPs: Customer Due Diligence

## Application to Assessment

Our AML risk assessment methodology aligns directly with these international standards to ensure a comprehensive evaluation of money laundering risks. The framework provided the basis for our risk-based approach and control assessment.

The company's AML practices were evaluated against these global standards to ensure alignment with best practices and regulatory expectations.`,
      date: '2023-02-05',
      source: 'Financial Action Task Force'
    }
  ],
  
  // For story ID 11 (Industry Risk Assessment)
  11: [
    {
      id: 'link-11-1',
      title: 'Aviation Authority Database',
      type: 'link',
      content: `# Aviation Authority Database Verification

**URL**: [https://www.aviation-authority.gov/certification-database](https://www.example.com/placeholder)

## Database Information

The International Aviation Authority Certification Database provides comprehensive information on certified aircraft parts manufacturers and their regulatory compliance status. The database includes:

- Certification status and history
- Audit findings and resolutions
- Regulatory compliance records
- Safety notifications and bulletins

## Verification Process

The database was accessed on March 1, 2023, to verify Xiamen Limbach's certification status and compliance history in the aviation manufacturing sector. The search confirmed:

1. Current certification status (valid through December 2025)
2. Successful completion of recent regulatory audits
3. No outstanding compliance issues or safety concerns
4. Appropriate certifications for all manufacturing processes

## Significance

The verification through this official regulatory database provides independent confirmation of the company's legitimate operations in the highly regulated aviation industry and its compliance with stringent safety and quality standards.

This supports our industry risk assessment findings regarding the company's regulatory standing.`,
      date: '2023-03-01',
      source: 'International Aviation Authority'
    },
    {
      id: 'link-11-2',
      title: 'Industry Classification Standards',
      type: 'link',
      content: `# Industry Classification Standards Reference

**URL**: [https://www.industry-standards.org/classifications](https://www.example.com/placeholder)

## Classification Information

The Global Industry Classification Standard (GICS) provides a standardized system for categorizing companies by industry. This reference was used to properly classify Xiamen Limbach within the appropriate risk category.

## Industry Classification

Xiamen Limbach falls under:
- Sector: Industrials
- Industry Group: Aerospace & Defense
- Industry: Aerospace & Defense
- Sub-Industry: Aircraft Parts Manufacturing

## Risk Categorization

This classification system was used as a reference point for establishing the appropriate risk parameters for our assessment. The industry classification helped determine:

1. Relevant regulatory frameworks
2. Industry-specific risk factors
3. Appropriate control expectations
4. Benchmarking against industry peers

## Application to Assessment

Using this standardized classification ensured our risk assessment applied the appropriate industry-specific risk factors and control expectations for an aircraft parts manufacturer operating globally.`,
      date: '2023-02-15',
      source: 'Global Industry Classification Standard'
    }
  ],
  
  // For story ID 12 (Related Company Check)
  12: [
    {
      id: 'link-12-1',
      title: 'Corporate Registry Database',
      type: 'link',
      content: `# Corporate Registry Database Verification

**URL**: [https://www.corporate-registry.gov/public-search](https://www.example.com/placeholder)

## Database Information

The International Corporate Registry Database provides official registration information for companies across multiple jurisdictions. It contains:

- Company registration details
- Corporate structure and ownership
- Filing history and compliance status
- Official corporate documents

## Verification Process

The database was accessed on February 20, 2023, to verify the existence, registration status, and relationships between Xiamen Limbach and its related entities. The search confirmed:

1. Valid registration of all identified related entities
2. Corporate relationship structures as disclosed
3. Good standing status in respective jurisdictions
4. No undisclosed related entities identified

## Verification Results

The database search validated the corporate structures and relationships identified in our assessment. This official source provides independent confirmation of the legal existence and relationships between the entities.

This verification supports our related company risk assessment findings and confirms the completeness of our related entity identification.`,
      date: '2023-02-20',
      source: 'International Corporate Registry'
    },
    {
      id: 'link-12-2',
      title: 'News Media Archives',
      type: 'link',
      content: `# News Media Archives Research

**Multiple Sources**:
- Global Business News: [https://www.globalbusinessnews.com/archives](https://www.example.com/placeholder)
- Industry Today: [https://www.industrytoday.com/search](https://www.example.com/placeholder)
- Regional Business Journal: [https://www.regionalbusiness.com/companies](https://www.example.com/placeholder)

## Research Methodology

A comprehensive media search was conducted to identify any negative news, regulatory issues, or reputational concerns related to Xiamen Limbach and its related entities. The research:

- Covered the past 5 years (2018-2023)
- Included major global and industry-specific publications
- Utilized advanced search parameters to identify relevant content
- Applied systematic evaluation of search results

## Key Findings

The media search revealed:
1. SkyParts Manufacturing environmental fine (2020) - as noted in our report
2. Pacific Rim Suppliers labor dispute (2019) - as noted in our report
3. Positive coverage of Limbach Holding's sustainability initiatives
4. Industry recognition for Xiamen Aero Components quality standards

No additional negative findings were identified beyond those already documented in our assessment.

## Significance

The comprehensive media research provides independent verification of our negative findings assessment and confirms no additional undisclosed issues exist for the related entities.`,
      date: '2023-02-22',
      source: 'Multiple News Archives'
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