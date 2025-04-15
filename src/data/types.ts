// Define all data types for the application

// Category Types
export interface Category {
  id: string;
  name: string;
  count: number;
}

// Company Types
export interface Company {
  id: number;
  name: string;
  period: string;
  verified: boolean;
  badge?: string | number;
}

// Story Types
export interface Story {
  id: number;
  title: string;
  company: Company;
  period: string;
  category: 'SOW' | 'UBO' | 'RISK' | 'CORR';
  verified: boolean;
  issueIds: number[];
}

// Statistics Types
export interface Statistics {
  kycQuality: number;
  corroboration: number;
  risk: 'High' | 'Medium' | 'Low';
}

// Issue Types
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

// Issue Action Types
export interface IssueAction {
  label: string;
  type: "primary" | "default" | "dashed" | "link" | "text";
  onClick: (id: number) => void;
} 