import { Company } from './types';

// Default companies
export const companies: Company[] = [
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

// Get company by ID
export const getCompanyById = (id: number): Company | undefined => {
  return companies.find(company => company.id === id);
};

// Add a new company
export const addCompany = (company: Omit<Company, 'id'>): Company => {
  const newId = Math.max(...companies.map(c => c.id)) + 1;
  const newCompany = { ...company, id: newId };
  companies.push(newCompany);
  return newCompany;
};

// Update existing company
export const updateCompany = (id: number, updates: Partial<Company>): Company | undefined => {
  const index = companies.findIndex(company => company.id === id);
  if (index === -1) return undefined;
  
  companies[index] = { ...companies[index], ...updates };
  return companies[index];
}; 