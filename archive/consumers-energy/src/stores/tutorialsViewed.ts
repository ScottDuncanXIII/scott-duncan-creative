import { defineStore } from 'pinia'

export const useTutorialViewedStore = defineStore('tutorialsViewed', () => {
  const tutorialHotspotViewed: Boolean = false
  const tutorialListBtnViewed: Boolean = false
  const tutorialListViewed: Boolean = false
  const tutorialLocationSelectorViewed: Boolean = false

  return {
    tutorialHotspotViewed,
    tutorialListBtnViewed,
    tutorialListViewed,
    tutorialLocationSelectorViewed
  }
})
