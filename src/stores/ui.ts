import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    settingsDrawer: false,
  }),
  actions: {
    toggleSettingsDrawer() {
      this.settingsDrawer = !this.settingsDrawer
    },
  }
})
