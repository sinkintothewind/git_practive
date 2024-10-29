import { createRouter, createWebHistory } from 'vue-router'

export const Layout = () => import("@/layout/index.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/LoginIndex.vue'),
      meta: { title: '登录', hidden: true },
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard/index.vue'),
          meta: { title: '首页', icon: 'dashboard' }
        }
      ]
    },
    {
      path: '/department',
      component: Layout,
      children: [
        {
          path: '',
          name: 'departments',
          component: () => import('@/views/Departments/index.vue'),
          meta: { title: '组织架构', icon: 'tree' }
        }
      ]
    },
    {
      path: '/setting',
      component: Layout,
      children: [
        {
          path: '',
          name: 'settings',
          component: () => import('@/views/Setting/index.vue'),
          meta: { title: '公司设置', icon: 'setting' }
        }
      ]
    },
    {
      path: '/employees',
      component: Layout,
      children: [
        {
          path: '',
          name: 'employees',
          component: () => import('@/views/Employees/index.vue'),
          meta: { title: '员工', icon: 'people' }
        }
      ]
    },
    {
      path: '/permission',
      component: Layout,
      children: [
        {
          path: '',
          name: 'permissions',
          component: () => import('@/views/Permission/index.vue'),
          meta: { title: '权限管理', icon: 'lock' }
        }
      ]
    },
    {
      path: '/approvals',
      component: Layout,
      children: [
        {
          path: '',
          name: 'approvals',
          component: () => import('@/views/Approvals/index.vue'),
          meta: { title: '审批', icon: 'lock' }
        }
      ]
    },
    {
      path: '/attendances',
      component: Layout,
      children: [
        {
          path: '',
          name: 'attendances',
          component: () => import('@/views/Attendances/index.vue'),
          meta: { title: '考勤', icon: 'lock' }
        }
      ]
    },
    {
      path: '/social',
      component: Layout,
      children: [
        {
          path: '',
          name: 'social_securitys',
          component: () => import('@/views/Social/index.vue'),
          meta: { title: '社保', icon: 'lock' }
        }
      ]
    },
    {
      path: '/salary',
      component: Layout,
      children: [
        {
          path: '',
          name: 'salarys',
          component: () => import('@/views/Salarys/index.vue'),
          meta: { title: '工资', icon: 'lock' }
        }
      ]
    },
    // 新增 权限模块
    {
      path: '/wanghong',
      component: Layout,
      children: [
        {
          path: '',
          name: 'wanghong',
          component: () => import('@/views/Wanghong/index.vue'),
          meta: { title: '王红', icon: 'lock' },
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/index.vue')
    },
    // 当路由匹配不上时，跳转到404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/404'
    }
  ]
})

export default router
