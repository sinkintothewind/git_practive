import type { addPermission, data } from "@/types/permission";
import { request } from "@/utils/request";
/**
 * 获取权限列表
 * @returns
 */
export const getPermissionListAPI=()=>{
    return request<data[]>('/sys/permission')
}
/**
 * 添加权限
 * @param params
 * @returns
 */
export const addPermissionAPI = (params : addPermission) => {
    return request('/sys/permission','POST',params)
}
/**
 * 编辑权限
 * @param id
 * @param data
 * @returns
 */
export const editPermissionAPI = (id:string,data : addPermission) => {
    return request(`/sys/permission/${id}`,'PUT',data)
}

/**
 * 删除权限
 * @param id
 * @returns
 */
export const delPermissionAPI = (id:string) => {
    return request(`/sys/permission/${id}`,'DELETE')
}
/**
 * 权限详情
 * @param id
 * @returns
 */
export const permissionDetailAPI = (id:string) => {
    return request<addPermission>(`/sys/permission/${id}`,'GET')
}
/**
 * 给角色分配权限
 * @param id
 * @param data
 * @returns
 */
export const assignPermissionAPI = (id:string,data:string[]) =>{
return request('/sys/role/assignPrem','PUT',data)
}






