import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Router } from 'vue-router'


const pinia = createPinia()
//pinia.use(piniaPluginPersistedstate)

export default pinia
