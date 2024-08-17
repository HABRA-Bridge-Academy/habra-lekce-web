

import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import "@/styles/index.scss";


const app = createApp(App)

registerPlugins(app)

app.mount('#app')
