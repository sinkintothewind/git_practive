import type { addEmployee, data,params } from "@/types/employee";
import { request } from "@/utils/request";
/**
 * 获取员工列表
 * @param params
 * @returns
 */
export const getEmployeeListAPI = (params:params) => {
    return request<data>('/sys/user','GET',params)
}
/**
 * 添加员工
 * @param data
 * @returns
 */
export const addEmployeeAPI = (data:addEmployee) => {
    return request('/sys/user','POST',data)
}
/**
 * 编辑员工信息
 * @param id
 * @param data
 * @returns
 */
export const editEmployeeAPI = (id:string,data:addEmployee) => {
    return request(`/sys/user/${id}`,'PUT',data)
}
/**
 * 删除员工
 * @param id
 * @returns
 */
export const delEmployeeAPI = (id:string) => {
    return request(`/sys/user/${id}`,'DELETE')
}
/**
 * 获取员工详情
 * @param id
 * @returns
 */
export const getEmployeeDetailAPI = (id:string) => {
    return request<addEmployee>(`/sys/user/${id}`,'GET')
}

export const assignRoleAPI = (id:string,rolesId:string[]) => {
    return request<addEmployee>(`/sys/user/assignRoles`,'PUT',{id,rolesId})
}
