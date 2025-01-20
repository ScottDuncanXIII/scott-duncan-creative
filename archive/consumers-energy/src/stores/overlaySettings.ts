import { defineStore } from 'pinia'

export const useOverlaySettingsStore = defineStore('overlaysSettings', () => {
  const emailViewed: Boolean = false
  const outroViewed: Boolean = false
  const isOutroOverlayOpen: Boolean = false

  return {
    isOutroOverlayOpen,
    emailViewed,
    outroViewed
  }
})
