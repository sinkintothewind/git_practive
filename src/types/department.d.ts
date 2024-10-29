// data数据
  export interface data {
    companyId: string;
    companyName: string;
    companyManage: string;
    depts: Dept[];
  }
// 内层数组
  export interface Dept {
    id: string;
    pid: string;
    name: string;
    code: string;
    introduce: string;
    createTime: string;
    manager: string;
    children?:Dept[]
}
// 添加部门
export interface addDept {
  code: string;
  introduce: string;
  manager: string;
  name: string;
  pid: string;
  id?: string;
  createTime?:string
}
//负责人
interface Manager {
  id: string;
  username: string;
}
