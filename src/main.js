import { createApp } from 'vue'
import App from './App.vue'

// ClassStore
import store from './store/index.js'

import Router from './router/index'

// TailwindCSS
import './index.css'

// Icons
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(store).use(Router).mount('#app')