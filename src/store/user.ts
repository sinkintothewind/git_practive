import { getUserInfoApi, getUserProfileApi } from '@/api/user'
import type { UserProfile, UserInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type UserFullInfo = UserProfile & UserInfo
export const useUserStore = defineStore('user', () => {
  //存储token
  const token = ref('')
  const setToken = (newToken: string) => {
    token.value = newToken
  }

  // 获取用户信息
  const userInfo = ref<UserFullInfo>()
  const getUserProfile = async () => {
    const res = await getUserProfileApi()
    const res2 = await getUserInfoApi(res.data.userId)
    userInfo.value = { ...res.data, ...res2.data }
  }

  //退出登录 
  const logOut = () => {
    token.value = ''
    userInfo.value = undefined
    localStorage.removeItem('user')
  }

  return { token, setToken, getUserProfile, logOut, userInfo }
}, {
  persist: true
})