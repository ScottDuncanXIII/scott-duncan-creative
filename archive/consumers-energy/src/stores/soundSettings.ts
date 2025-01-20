import { defineStore } from 'pinia'

export const useSoundSettingsStore = defineStore('soundSettings', () => {
  const isMuted: boolean = false

  return {
    isMuted
  }
})
