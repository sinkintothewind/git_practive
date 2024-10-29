 export interface data {
    id: string;
    name: string;
    description: string;
    type: number;
    code: string;
    pid: string;
     enVisible: string;
     children?:data[]
}
  export interface addPermission {
    _id?: string;
    name: string;
    code: string;
    description: string;
    type: number;
    pid: string;
    enVisible: number;
    __v?: number;
    id?: string;
  }