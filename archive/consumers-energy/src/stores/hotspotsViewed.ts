import { defineStore } from 'pinia'

export const useHotspotsViewedStore = defineStore('hotspotViewed', () => {
  const residentialViewedExteriorArray: Array<boolean> = []
  const residentialViewedInteriorArray: Array<boolean> = []

  const smallBusinessViewedExteriorArray: Array<boolean> = []
  const smallBusinessViewedInteriorArray: Array<boolean> = []

  const largeBusinessViewedExteriorArray: Array<boolean> = []
  const largeBusinessViewedInteriorArray: Array<boolean> = []

  return {
    residentialViewedExteriorArray,
    residentialViewedInteriorArray,
    smallBusinessViewedExteriorArray,
    smallBusinessViewedInteriorArray,
    largeBusinessViewedExteriorArray,
    largeBusinessViewedInteriorArray
  }
})
