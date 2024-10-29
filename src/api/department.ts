import { request } from "@/utils/request";
import type { data,addDept,Manager } from '@/types/department'
/**
 * 获取部门列表
 * @returns
 */
export const getDepartmentListAPI = () => {
    return request<data>('/company/department','GET')
}
/**
 * 添加部门
 * @param data
 * @returns
 */
export const addDepartmentAPI = (data:addDept) => {
    return request('/company/department','POST',data)
}
/**
 * 获取负责人列表
 * @returns
 */
export const getManagerListAPI = () => {
    return request<Manager[]>('/sys/user/simple','GET')
}
/**
 * 删除部门
 * @param id
 * @returns
 */
export const delDepartmentAPI = (id:string) => {
    return request('/company/department/'+id,'delete')
}
/**
 * 获取部门详情
 * @param id
 * @returns
 */
export const departmentDetailAPI = (id:string) => {
    return request<addDept>(`/company/department/${id}`,'GET',)
}
/**
 * 编辑部门
 * @param id
 * @param data
 * @returns
 */
export const editDepartmentAPI = (id:string,data:addDept) => {
    return request(`/company/department/${id}`,'PUT',data)
}