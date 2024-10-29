import { request } from '@/utils/request';
import type { LoginForm, UserInfo, UserProfile } from '@/types/user';

/**
 * 登录接口
 * @param loginForm 
 */
export const loginApi = (loginForm: LoginForm) => {
  return request<string>('/sys/login', 'POST', loginForm)
}

/**
 * 获取用户信息 用户名
 */
export const getUserProfileApi = ()=>{
  return request<UserProfile>('/sys/profile','POST')
}

/**
 * 获取用户基本信息 含头像
 * @param id 
 */
export const getUserInfoApi = (id:string)=>{
  return request<UserInfo>(`/sys/user/${id}`,'GET')
}