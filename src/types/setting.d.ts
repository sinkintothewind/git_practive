
  export  interface data {
    total: number;
    rows: Row[];
  }

  export  interface Role {
    id: string;
    name: string;
    description: string;
}
export interface Page {
    page: number;
    pagesize: number
}
export interface addRole {
    name: string;
    description: string;
    id?: string;
    permIds?:string[]
}
export interface company{
  id: string;
  name: string;
  managerId: string;
  version: string;
  renewalDate?: any;
  expirationDate?: any;
  companyArea?: any;
  companyAddress: string;
  businessLicenseId?: any;
  legalRepresentative: string;
  companyPhone: string;
  mailbox: string;
  companySize?: any;
  industry?: any;
  remarks: string;
  auditState: string;
  state: number;
  balance: number;
  createTime: string;
  }