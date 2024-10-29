import type { addRole, company, data } from "@/types/setting";
import type { Page } from "@/types/setting";
import { request } from "@/utils/request";
/**
 * 获取角色列表
 * @returns
 */
export const getRolesListAPI = (params:Page) => {
    return request<data>('/sys/role','GET',params)
}
/**
 * 添加角色
 * @param data
 * @returns
 */
export const addRoleAPI = (data:addRole) => {
    return request('/sys/role','POST',data)
}
/**
 * 修改角色
 * @param id
 * @param data
 * @returns
 */
export const editRoleAPI = (id:string,data:addRole) => {
    return request(`/sys/role/${id}`,'PUT',data)
}
/**
 * 删除角色
 * @param id
 * @returns
 */
export const delRoleAPI = (id:string) => {
    return request(`/sys/role/${id}`,'DELETE')
}
/**
 * 获取角色详情
 * @param id
 * @returns
 */
export const getRoleDetailAPI = (id:string) => {
    return request<addRole>(`/sys/role/${id}`,'GET')
}
/**
 * 获取公司信息
 * @param id
 * @returns
 */
export const getCompanyAPI = (id:string) => {
    return request<company>(`/company/${id}`,'GET')
}
