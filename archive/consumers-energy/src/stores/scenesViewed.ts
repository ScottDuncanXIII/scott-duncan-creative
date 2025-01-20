import { defineStore } from 'pinia'

export const useScenesViewedStore = defineStore('scenesViewed', () => {
  const residentialExterior: Boolean = false
  const residentialInterior: Boolean = false

  const smallBusinessExterior: Boolean = false
  const smallBusinessInterior: Boolean = false

  const largeBusinessExterior: Boolean = false
  const largeBusinessInterior: Boolean = false

  return {
    residentialExterior,
    residentialInterior,
    smallBusinessExterior,
    smallBusinessInterior,
    largeBusinessExterior,
    largeBusinessInterior
  }
})
