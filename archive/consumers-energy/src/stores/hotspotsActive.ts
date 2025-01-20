import { defineStore } from 'pinia'

export const useHotspotsActiveStore = defineStore('hotspotActive', () => {
  const residentialActiveExteriorArray: Array<boolean> = []
  const residentialActiveInteriorArray: Array<boolean> = []

  const smallBusinessActiveExteriorArray: Array<boolean> = []
  const smallBusinessActiveInteriorArray: Array<boolean> = []

  const largeBusinessActiveExteriorArray: Array<boolean> = []
  const largeBusinessActiveInteriorArray: Array<boolean> = []

  return {
    residentialActiveExteriorArray,
    residentialActiveInteriorArray,
    smallBusinessActiveExteriorArray,
    smallBusinessActiveInteriorArray,
    largeBusinessActiveExteriorArray,
    largeBusinessActiveInteriorArray
  }
})
