import { useUserStore } from '@/store/user';
import axios, { type Method } from 'axios';
import { ElMessage } from 'element-plus'
import router from '@/router'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});
service.interceptors.request.use(
  (config) => {
    const { token } = useUserStore()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (err) => Promise.reject(err)
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.success) {
      ElMessage.error(res.message)
      return Promise.reject(res.message);
    }
    return res;
  },
  (err) => {
    // console.log(err);
    if (err.response && err.response.status === 401) {
      ElMessage.error('登录已过期，请重新登录')
      const { logOut } = useUserStore()
      logOut()
      router.push('/login')
    }
    return Promise.reject(err)
  }
);


//响应结果类型
type Data<T> = {
  code: number,
  data: T,
  message: string,
  success: boolean
}

// 4. 请求工具函数
export const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return service.request<T, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
