import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'


const app = createApp(App)

for (let iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}

app.use(store).use(router).use(ElementPlus).use(ElIcons).mount('#app')
