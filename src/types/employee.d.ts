export interface data {
    total: number;
    rows: employee[];
  }

  export interface employee {
    id: string;
    mobile: string;
    username: string;
    password: string;
    timeOfEntry: string;
    formOfEmployment: number;
    workNumber: string;
    correctionTime: string;
    departmentName: string;
    staffPhoto: string;
}
export interface params{
    page: number,
    size:number
}
interface addEmployee {
    username: string;
    mobile: string;
    formOfEmployment: number;
    workNumber: string;
    departmentName: string;
    timeOfEntry: string;
    correctionTime: string;
    staffPhoto?: string;
    id?: string;
    password?: string;
    roleIds?: [];
    companyId?: string;
    companyName?:string
  }