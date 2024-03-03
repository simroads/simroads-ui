/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import maplibre from './maplibre'
import pinia from './pinia'
import i18n from './i18n'
import router from './router'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(pinia)
  app.use(vuetify)
  app.use(maplibre)
  app.use(i18n)
  app.use(router)
}
