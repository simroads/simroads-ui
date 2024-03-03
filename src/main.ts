import './assets/base.css'

import axios from 'axios'

axios.defaults.baseURL = import.meta.env.BASE_URL

import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

import App from './App.vue'

const app = createApp(App)

await registerPlugins(app);

app.mount('#app')
