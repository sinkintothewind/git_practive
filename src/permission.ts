import router from "@/router";
import { useUserStore } from "./store/user";
const WHITELIST = ['/login','/404']
router.beforeEach(async (to) => {
  const { token, getUserProfile } = useUserStore()
  if (token) {
    if (to.path === '/login') {
      return { name: 'Dashboard' }
    }
    await getUserProfile()
  } else {
    if (!WHITELIST.includes(to.path)) {
      return { name: 'Login' }
    }
  }
})