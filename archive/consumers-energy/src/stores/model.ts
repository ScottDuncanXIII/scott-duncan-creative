import { defineStore } from 'pinia'

export const useModelStore = defineStore('model', () => {
  const model = {}

  return { model }
})
