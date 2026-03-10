export interface Company {
  _id: string;
  internalCode?: string;
  tradeName: string;
  address: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  state: string;
  phone: string;
  email: string;
  cnpj: string;
  createdAt: string;
  permissionId: string;
}

export interface CompaniesResponse {
  success: boolean;
  companies: Company[];
}

export interface CompanyResponse {
  success: boolean;
  company: Company;
}
