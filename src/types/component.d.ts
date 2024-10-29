import SvgIcon from '@/components/SvgIcon.vue'
import PageTools from '@/components/PageTools.vue'
declare module 'vue' {
  interface GlobalComponents {
    SvgIcon: typeof SvgIcon,
    PageTools: typeof PageTools
  }
}