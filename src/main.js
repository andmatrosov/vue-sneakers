import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import { createRouter } from 'vue-router'

const app = createApp(App)

app.use(autoAnimatePlugin)
app.mount('#app')
