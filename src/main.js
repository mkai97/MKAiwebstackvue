import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'

import Modal from './components/mkModal/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
app.component('mk-modal', Modal);

// 注册为组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  

app.use(store); // 挂载pina

app.mount('#app')
