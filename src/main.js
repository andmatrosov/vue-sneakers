import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import { router } from '@/routes/routes.js'

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
