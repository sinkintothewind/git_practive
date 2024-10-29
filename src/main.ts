import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon.vue'
import persist from 'pinia-plugin-persistedstate'
import '@/styles/index.scss';
import 'uno.css';
import './permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import PageTools from './components/PageTools.vue'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.component('PageTools', PageTools)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia().use(persist))
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.directive('imgError',{
  mounted(el,binding){
    el.onerror = function(){
      el.src = binding.value
    }
  }
})
app.mount('#app')
