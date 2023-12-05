// 配置 pīnia 插件
import { createPinia } from 'pinia' 
import piniaPluginPersist from 'pinia-plugin-persist'



const store = createPinia()
store.use(piniaPluginPersist)




export default store