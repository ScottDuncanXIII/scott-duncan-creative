<template>
  <section class="ce-residential-interior">
    <HeaderProgressBar :percentage="scenePositionProgress" />

    <div class="ce-residential-interior__viewport">
      <LocationSelector
        @location-selector-click="onLocationSelectorClick"
        @show-email-overlay="onShowOverlayEmail"
        :is-disabled="isLocationSelectorDisabled"
        dialogueInfoArrowPos="topCenter"
        :dialogueInfoDescription="tutorials?.LocationSelector?.Interior?.Description"
        :dialogueInfoHeading="tutorials?.LocationSelector?.Interior?.Heading"
        :isDialogueInfoActive="isTutorialLocationActive"
        :isActive="isLocationSelectorActive"
      />

      <InteractiveScene
        @is-scene-scroll-loaded="onSceneLoaded()"
        @update-scene-position-progress="(value: number) => (scenePositionProgress = value)"
        @on-scene-click="onSceneClick"
        :is-scene-disabled="isSceneDisabled"
        :is-tutorial-hotspot-viewed="Boolean(tutorialsViewedStore?.tutorialHotspotViewed)"
      >
        <template #hotspotItems>
          <HotspotDefault
            v-for="(hotspot, index) in model?.Interior?.Hotspots"
            @hotspot-click="onHotspotBtnClick(index, LOCATION_TYPE_INTERIOR)"
            dialogueInfoArrowPos="bottomCenter"
            :dialogueInfoDescription="index === 0 ? tutorials?.Hotspot?.Description : ''"
            :index="index"
            :is-dialogue-info-active="isTutorialHotspotActive"
            :is-hotspot-active="hotspotsInteriorActiveArray[index]"
            :is-hotspot-viewed="hotspotsInteriorViewedArray[index]"
            :title="hotspot?.Heading"
            :depth-x="Number(hotspot?.DepthX)"
            :depth-y="Number(hotspot?.DepthY)"
            :left-pos="hotspot?.LeftPos"
            :top-pos="hotspot?.TopPos"
            :sounds="hotspot?.Sounds"
            :key="index"
            :zindex="index === 0 && isFirstHotspotHighlighted ? 100 : 10"
          />

          <HotspotLink
            v-for="(hotspotLink, index) in model?.Interior?.HotspotLinks"
            :title="hotspotLink?.Title"
            :depth-x="Number(hotspotLink?.DepthX)"
            :depth-y="Number(hotspotLink?.DepthY)"
            :left-pos="hotspotLink?.LeftPos"
            :top-pos="hotspotLink?.TopPos"
            :url="hotspotLink?.Url"
            :key="index"
          />
        </template>

        <template #PopUpTutorialAvatars>
          <PopUpTutorialAvatar
            id="ce-tutorial-pop-up__initial"
            @tutorial-avatar-click="closeAllElements"
            avatar="b"
            :depth-x="Number(0.1)"
            :depth-y="Number(0.1)"
            heightPerc="60%"
            imageHeight="150%"
            dialogueInfoX="0"
            dialogueInfoY="-145%"
            dialogueInfoArrowPos="bottomCenter"
            :isActive="isTutorialHotspotActive"
            posBottom="0"
            posLeft="7.8%"
            posRight="auto"
            :zindex="Number(100)"
            ref="tutorialHotspot"
          />
        </template>

        <template #backgroundDarkenOverlay>
          <BackgroundDarkenOverlay
            @background-darken-overlay-click="closeAllElements"
            :zindex="Number(99)"
            :isActive="isBackgroundDarkenOverlayActive"
          />
        </template>

        <template #backgroundAssetImages>
          <AnimInteractive
            v-for="(easterEgg, index) in model?.Interior?.EasterEggs"
            :key="index"
            @asset-loading="$emit('asset-loading')"
            @asset-loaded="$emit('asset-loaded')"
            @hotspot-easter-egg-click="onHotspotEasterEggBtnClick"
            :animSpeed="Number(easterEgg.AnimSpeed)"
            :animType="easterEgg.AnimType"
            :animUrl="easterEgg.AnimUrl"
            :dialogueBoxPos="easterEgg.DialogueBoxPos"
            :dialogueBoxMessages="easterEgg.DialogueBoxMessages"
            :heightPercentage="easterEgg.HeightPercentage"
            :hotspotPosX="easterEgg.HotspotPosX"
            :hotspotPosY="easterEgg.HotspotPosY"
            :index="index"
            :imageUrl="easterEgg.ImageUrl"
            :isActive="hotspotEasterEggActiveArray[index]"
            :parallaxDepthX="Number(easterEgg.ParallaxDepthX)"
            :parallaxDepthY="Number(easterEgg.ParallaxDepthY)"
            :posLeftPercentage="easterEgg.PosLeftPercentage"
            :posTopPercentage="easterEgg.PosTopPercentage"
            :sounds="easterEgg.Sounds"
            :soundType="easterEgg.SoundType"
            :type="easterEgg.Type"
            :width-percentage="easterEgg.WidthPercentage"
            :vidBorderRadius="easterEgg.VidBorderRadius"
            :vidHeight="easterEgg.VidHeight"
            :vidLoop="easterEgg.VidLoop === 'true' ? true : false"
            :vidPosX="easterEgg.VidPosX"
            :vidPosY="easterEgg.VidPosY"
            :vidSpeed="Number(easterEgg.VidSpeed)"
            :vidUrlArray="easterEgg.VidUrlArray"
            :vidWidth="easterEgg.VidWidth"
            :zindex="Number(easterEgg.ZIndex)"
          />

          <AnimNonInteractive
            v-for="(animation, index) in model?.Interior?.Animations"
            :key="index"
            @asset-loading="$emit('asset-loading')"
            @asset-loaded="$emit('asset-loaded')"
            :depth-X="Number(animation.DepthX)"
            :depth-y="Number(animation.DepthY)"
            :height-percentage="animation.HeightPercentage"
            :left-percentage="animation.LeftPercentage"
            :top-percentage="animation.TopPercentage"
            :type="animation.Type"
            :url="animation.Url"
            :zindex="Number(animation.ZIndex)"
          />
        </template>

        <template #backgroundSceneImages>
          <BackgroundSceneImage
            v-for="(backgroundSceneImage, index) in model?.Interior?.BackgroundSceneImages"
            :key="index"
            @asset-loading="$emit('asset-loading')"
            @asset-loaded="$emit('asset-loaded')"
            :depth-X="Number(backgroundSceneImage.DepthX)"
            :depth-y="Number(backgroundSceneImage.DepthY)"
            :scale="Number(backgroundSceneImage.Scale)"
            :url="backgroundSceneImage.Url"
            :zindex="Number(backgroundSceneImage.ZIndex)"
          />
        </template>
      </InteractiveScene>

      <ButtonListOpen
        class="ce-residential-interior__list-open-btn"
        @list-open-btn-click="onListOpenBtnClick"
        :selected-count="hotspotActiveCount"
        :is-button-disabled="isListButtonDisabled"
        :dialogueInfoDescription="tutorials?.ListBtn?.Description"
        :dialogueInfoHeading="tutorials?.ListBtn?.Heading"
        :isDialogueInfoActive="isTutorialListBtnActive"
      />
    </div>

    <OverlaySlideOut :isOverlaySlideOutActive="isOverlaySlideOutActive">
      <template v-if="overlayType === OVERLAY_TYPE_LIST">
        <OverlaySlideOutList
          :heading="model?.Interior?.Heading"
          :subheading="model?.Interior?.Subheading"
          :hotspot-active-count="hotspotActiveCount"
        >
          <template #icon>
            <IconResidential />
          </template>

          <template #progress>
            <OverlaySlideOutListProgress
              @overlay-close-btn-click="onOverlayListCloseBtnClick()"
              :progressCount="hotspotViewedCount"
              :progressTotal="hotspotCount"
            />
          </template>

          <template #listItemsPrimaryHeading>{{ listItemsPrimaryHeading }}</template>

          <template #listItemsPrimary>
            <OverlaySlideOutListItem
              v-for="(hotspot, index) in model?.Interior?.Hotspots"
              @hotspot-active-array-add-remove-click="
                onHotspotActiveArrayAddRemoveClick(index, LOCATION_TYPE_INTERIOR)
              "
              @list-item-product-btn-click="onHotspotBtnClick(index, LOCATION_TYPE_INTERIOR)"
              :index="index"
              :is-hotspot-active="hotspotsInteriorActiveArray[index]"
              :is-hotspot-viewed="hotspotsInteriorViewedArray[index]"
              :title="hotspot?.Heading"
              :key="index"
            />
          </template>

          <template #listItemsSecondaryHeading>{{ listItemsSecondaryHeading }}</template>

          <template #listItemsSecondary>
            <OverlaySlideOutListItem
              v-for="(hotspot, index) in model?.Exterior?.Hotspots"
              @hotspot-active-array-add-remove-click="
                onHotspotActiveArrayAddRemoveClick(index, LOCATION_TYPE_EXTERIOR)
              "
              @list-item-product-btn-click="onHotspotBtnClick(index, LOCATION_TYPE_EXTERIOR)"
              :index="index"
              :is-hotspot-active="hotspotsExteriorActiveArray[index]"
              :is-hotspot-viewed="hotspotsExteriorViewedArray[index]"
              :title="hotspot?.Heading"
              :key="index"
            />
          </template>
        </OverlaySlideOutList>

        <OverlaySlideOutListExport
          :selected-count="hotspotActiveCount"
          @export-button-click="onExportButtonClick"
        />
      </template>

      <template v-if="overlayType === OVERLAY_TYPE_PRODUCT">
        <OverlaySlideOutDetails
          @hotspot-active-array-add-remove-click="
            onHotspotActiveArrayAddRemoveClick(currentProductIndex, currentHotspotLocation)
          "
          @overlay-close-btn-click="onOverlayDetailsCloseBtnClick()"
          :hotspot-details="currentHotspotDetails"
          :index="currentProductIndex"
          :is-hotspot-active="
            currentHotspotLocation === LOCATION_TYPE_INTERIOR
              ? hotspotsInteriorActiveArray[currentProductIndex]
              : hotspotsExteriorActiveArray[currentProductIndex]
          "
          :key="currentProductIndex"
        >
          <template #icon>
            <IconResidential />
          </template>
        </OverlaySlideOutDetails>
      </template>
    </OverlaySlideOut>

    <PopUpTutorialAvatar
      @tutorial-avatar-click="closeAllElements"
      :avatar="isMobile ? 'a' : 'b'"
      :delay="Number(0.3)"
      :depth-x="Number(0.1)"
      :depth-y="Number(0.1)"
      :heightPerc="isMobile ? '75%' : '65%'"
      :imageHeight="isMobile ? '105%' : '155%'"
      :isActive="isTutorialListBtnActive"
      :posBottom="isMobile ? '0' : '-5.5%'"
      :posLeft="isMobile ? '50%' : 'auto'"
      :posRight="isMobile ? 'auto' : '-95px'"
      :posX="isMobile ? '-50%' : '0'"
      :zindex="Number(0)"
    />

    <PopUpTutorialAvatar
      @tutorial-avatar-click="closeAllElements"
      avatar="b"
      :delay="Number(0.4)"
      :depth-x="Number(0.1)"
      :depth-y="Number(0.1)"
      heightPerc="50%"
      imageHeight="215%"
      dialogueInfoArrowPos="bottomRight"
      :dialogueInfoDescription="tutorials?.List?.Description"
      :dialogueInfoHeading="tutorials?.List?.Heading"
      dialogueInfoBottom="auto"
      dialogueInfoLeft="0"
      dialogueInfoRight=""
      dialogueInfoTop="0"
      dialogueInfoX="0"
      dialogueInfoY="-110%"
      :isActive="isTutorialListActive"
      posBottom="0"
      posLeft="auto"
      posRight="-90px"
      :zindex="Number(10)"
    />

    <PopUpTutorialAvatar
      @tutorial-avatar-click="closeAllElements"
      avatar="c"
      :delay="Number(0)"
      :depth-x="Number(0.1)"
      :depth-y="Number(0.1)"
      heightPerc="60%"
      imageHeight="165%"
      :isActive="isTutorialLocationActive"
      posBottom="0"
      :posLeft="isMobile ? '50%' : '10%'"
      posRight="auto"
      :posX="isMobile ? '-50%' : '0'"
      :zindex="Number(4)"
    />

    <OverlayEmail
      @on-email-overlay-close-btn-click="closeAllElements()"
      @on-email-overlay-download-button-click="onExportButtonClick()"
      :is-active="isOverlayEmailActive"
      ref="OverlayEmail"
    />

    <OverlayOutro
      v-if="overlaySettings.isOutroOverlayOpen"
      @on-outro-overlay-close-btn-click="closeAllElements()"
      @on-email-overlay-download-button-click="onExportButtonClick()"
      :is-active="overlaySettings.isOutroOverlayOpen"
      ref="OverlayOutro"
    />
  </section>
</template>

<script lang="ts">
import gsap from 'gsap'
import AnimInteractive from '@/components/anims/Interactive.vue'
import AnimNonInteractive from '@/components/anims/NonInteractive.vue'
import BackgroundDarkenOverlay from '@/components/BackgroundDarkenOverlay.vue'
import BackgroundSceneImage from '@/components/BackgroundSceneImage.vue'
import ButtonListOpen from '@/components/ButtonListOpen.vue'
import HeaderProgressBar from '@/components/HeaderProgressBar.vue'
import HotspotDefault from '@/components/HotspotDefault.vue'
import HotspotLink from '@/components/HotspotLink.vue'
import IconResidential from '@/components/icons/IconResidential.vue'
import InteractiveScene from '@/components/InteractiveScene.vue'
import LocationSelector from '@/components/LocationSelector.vue'
import OverlayEmail from '@/components/OverlayEmail.vue'
import OverlayOutro from '@/components/OverlayOutro.vue'
import OverlaySlideOut from '@/components/OverlaySlideOut.vue'
import OverlaySlideOutList from '@/components/OverlaySlideOutList.vue'
import OverlaySlideOutListItem from '@/components/OverlaySlideOutListItem.vue'
import OverlaySlideOutListExport from '@/components/OverlaySlideOutListExport.vue'
import OverlaySlideOutListProgress from '@/components/OverlaySlideOutListProgress.vue'
import OverlaySlideOutDetails from '@/components/OverlaySlideOutDetails.vue'
import PopUpTutorialAvatar from '@/components/PopUpTutorialAvatar.vue'
import { useModelStore } from '@/stores/model'
import { useHotspotsActiveStore } from '@/stores/hotspotsActive'
import { useHotspotsViewedStore } from '@/stores/hotspotsViewed'
import { useTutorialViewedStore } from '@/stores/tutorialsViewed'
import { useScenesViewedStore } from '@/stores/scenesViewed'
import { useOverlaySettingsStore } from '@/stores/overlaySettings'

export default {
  setup() {
    const model = useModelStore().model?.Explore?.Residential

    if (useHotspotsActiveStore().residentialActiveExteriorArray.length === 0) {
      useHotspotsActiveStore().residentialActiveExteriorArray = new Array(
        model?.Exterior?.Hotspots.length
      ).fill(false)
    }

    const hotspotsExteriorActiveArray = useHotspotsActiveStore().residentialActiveExteriorArray

    if (useHotspotsActiveStore().residentialActiveInteriorArray.length === 0) {
      useHotspotsActiveStore().residentialActiveInteriorArray = new Array(
        model?.Interior?.Hotspots.length
      ).fill(false)
    }

    const hotspotsInteriorActiveArray = useHotspotsActiveStore().residentialActiveInteriorArray

    if (useHotspotsViewedStore().residentialViewedExteriorArray.length === 0) {
      useHotspotsViewedStore().residentialViewedExteriorArray = new Array(
        model?.Exterior?.Hotspots.length
      ).fill(false)
    }

    const hotspotsExteriorViewedArray = useHotspotsViewedStore().residentialViewedExteriorArray

    if (useHotspotsViewedStore().residentialViewedInteriorArray.length === 0) {
      useHotspotsViewedStore().residentialViewedInteriorArray = new Array(
        model?.Interior?.Hotspots.length
      ).fill(false)
    }

    const hotspotsInteriorViewedArray = useHotspotsViewedStore().residentialViewedInteriorArray

    const listItemsPrimaryHeading = useModelStore().model?.Explore?.InteriorLabel
    const listItemsSecondaryHeading = useModelStore().model?.Explore?.ExteriorLabel
    const tutorials = useModelStore().model?.Explore?.Tutorials
    const tutorialsViewedStore = useTutorialViewedStore()
    const scenesViewedStore = useScenesViewedStore()
    const overlaySettings = useOverlaySettingsStore()

    return {
      model,
      hotspotsExteriorActiveArray,
      hotspotsExteriorViewedArray,
      hotspotsInteriorActiveArray,
      hotspotsInteriorViewedArray,
      listItemsPrimaryHeading,
      listItemsSecondaryHeading,
      overlaySettings,
      scenesViewedStore,
      tutorials,
      tutorialsViewedStore
    }
  },
  components: {
    AnimInteractive,
    AnimNonInteractive,
    BackgroundDarkenOverlay,
    BackgroundSceneImage,
    ButtonListOpen,
    HeaderProgressBar,
    HotspotDefault,
    HotspotLink,
    IconResidential,
    InteractiveScene,
    LocationSelector,
    OverlayEmail,
    OverlayOutro,
    OverlaySlideOut,
    OverlaySlideOutList,
    OverlaySlideOutListItem,
    OverlaySlideOutListExport,
    OverlaySlideOutListProgress,
    OverlaySlideOutDetails,
    PopUpTutorialAvatar
  },
  data() {
    return {
      OVERLAY_TYPE_PRODUCT: 'product',
      OVERLAY_TYPE_LIST: 'list',
      LOCATION_TYPE_EXTERIOR: 'exterior',
      LOCATION_TYPE_INTERIOR: 'interior',
      currentHotspotDetails: {},
      currentProductIndex: -1,
      currentHotspotLocation: '',
      hotspotEasterEggActiveArray: [] as Array<boolean>,
      isBackgroundDarkenOverlayActive: false,
      isCurrentProductActive: false,
      isOverlayEmailActive: false,
      isFirstHotspotHighlighted: false,
      isOverlaySlideOutActive: false,
      isListButtonDisabled: false,
      isLocationSelectorActive: false,
      isLocationSelectorDisabled: false,
      isMobile: false,
      isSceneDisabled: false,
      isSceneLoaded: false,
      isTutorialHotspotActive: false,
      isTutorialListBtnActive: false,
      isTutorialListActive: false,
      isTutorialLocationActive: false,
      overlayType: '',
      scenePositionProgress: 0
    }
  },
  mounted() {
    this.initScene()
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    initScene() {
      this.hotspotEasterEggActiveArray = new Array(this.model?.Interior?.EasterEggs.length).fill(
        false
      )
      this.scenesViewedStore.residentialInterior = true
      this.isBackgroundDarkenOverlayActive = false
    },
    onSceneLoaded() {
      this.isSceneLoaded = true
      gsap.to('.ce-hotspot__btn', { duration: 0.5, autoAlpha: 1 })
      gsap.to('.ce-hotspot', { duration: 0.5, autoAlpha: 1 })
      gsap.to('.ce-button-list-open', { duration: 0.5, autoAlpha: 1 })
      gsap.to('.ce-location-selector', { duration: 0.5, autoAlpha: 1 })
      this.showTutorialHotspot()
    },
    onExportButtonClick() {
      let hotspotsActiveInfoArray = new Array()

      const hotspotsExteriorActiveIndexArray = this.hotspotsExteriorActiveArray.flatMap(
        (bool, index) => (bool ? index : [])
      )

      hotspotsExteriorActiveIndexArray.forEach((index) => {
        hotspotsActiveInfoArray.push(this.model?.Exterior?.Hotspots[index])
      })

      const hotspotsInteriorActiveIndexArray = this.hotspotsInteriorActiveArray.flatMap(
        (bool, index) => (bool ? index : [])
      )

      hotspotsInteriorActiveIndexArray.forEach((index) => {
        hotspotsActiveInfoArray.push(this.model?.Interior?.Hotspots[index])
      })

      this.$emit('on-export-button-click', hotspotsActiveInfoArray, this.model.Interior.Heading)
    },
    onListOpenBtnClick() {
      this.overlayType = this.OVERLAY_TYPE_LIST
      this.isOverlaySlideOutActive = true
      this.isLocationSelectorActive = false
      this.currentProductIndex = -1

      if (!this.tutorialsViewedStore.tutorialListBtnViewed) {
        this.tutorialsViewedStore.tutorialListBtnViewed = true
      }

      this.hideTutorialListBtn()
      this.showTutorialList()
    },
    onHotspotBtnClick(index: number, position: string) {
      this.currentHotspotLocation = position

      if (this.currentHotspotLocation === this.LOCATION_TYPE_EXTERIOR) {
        this.hotspotsExteriorViewedArray[index] = true
        this.currentHotspotDetails = this.model?.Exterior?.Hotspots[index]
        this.isCurrentProductActive = this.hotspotsExteriorActiveArray[index]
      } else if (this.currentHotspotLocation === this.LOCATION_TYPE_INTERIOR) {
        this.hotspotsInteriorViewedArray[index] = true
        this.currentHotspotDetails = this.model?.Interior?.Hotspots[index]
        this.isCurrentProductActive = this.hotspotsInteriorActiveArray[index]
      }

      if (this.currentProductIndex === index) {
        this.isOverlaySlideOutActive = false
        this.currentProductIndex = -1
      } else {
        this.overlayType = this.OVERLAY_TYPE_PRODUCT
        this.isOverlaySlideOutActive = true
        this.currentProductIndex = index
      }

      this.isLocationSelectorActive = false

      this.hideTutorialHotspot()
      this.hideTutorialList()
    },
    onHotspotActiveArrayAddRemoveClick(index: number, location: string) {
      if (location === this.LOCATION_TYPE_EXTERIOR) {
        this.hotspotsExteriorActiveArray[index] = !this.hotspotsExteriorActiveArray[index]
      } else if (location === this.LOCATION_TYPE_INTERIOR) {
        this.hotspotsInteriorActiveArray[index] = !this.hotspotsInteriorActiveArray[index]
      }

      this.hideTutorialList()
    },
    onHotspotEasterEggBtnClick(index: number) {
      if (this.hotspotEasterEggActiveArray[index] === true) {
        this.hotspotEasterEggActiveArray = new Array(this.model?.Interior?.EasterEggs.length).fill(
          false
        )
      } else {
        this.hotspotEasterEggActiveArray = new Array(this.model?.Interior?.EasterEggs.length).fill(
          false
        )
        this.hotspotEasterEggActiveArray[index] = true
      }

      this.isOverlaySlideOutActive = false
      this.isLocationSelectorActive = false
    },
    onOverlayDetailsCloseBtnClick() {
      this.isOverlaySlideOutActive = false

      this.showTutorialListBtn()
    },
    onOverlayListCloseBtnClick() {
      this.isOverlaySlideOutActive = false

      this.hideTutorialList()
    },
    onLocationSelectorClick() {
      if (!this.tutorialsViewedStore.tutorialLocationSelectorViewed) {
        this.tutorialsViewedStore.tutorialLocationSelectorViewed = true
      }

      this.isLocationSelectorActive = !this.isLocationSelectorActive
      this.isOverlaySlideOutActive = false

      this.hideTutorialLocationSelector()
    },
    showTutorialHotspot() {
      if (!this.tutorialsViewedStore.tutorialHotspotViewed) {
        this.isBackgroundDarkenOverlayActive = true
        this.isListButtonDisabled = true
        this.isLocationSelectorDisabled = true
        this.isFirstHotspotHighlighted = true
        this.isTutorialHotspotActive = true
      }
    },
    hideTutorialHotspot() {
      this.isBackgroundDarkenOverlayActive = false
      this.isListButtonDisabled = false
      this.isLocationSelectorDisabled = false
      this.isFirstHotspotHighlighted = false
      this.isTutorialHotspotActive = false
    },
    showTutorialListBtn() {
      if (!this.tutorialsViewedStore.tutorialListBtnViewed) {
        this.isTutorialListBtnActive = true
        this.isBackgroundDarkenOverlayActive = true
        this.tutorialsViewedStore.tutorialListBtnViewed = true
        this.isLocationSelectorDisabled = true
        this.isTutorialListBtnActive = true
      }
    },
    hideTutorialListBtn() {
      this.isBackgroundDarkenOverlayActive = false
      this.isTutorialListBtnActive = true
      this.isLocationSelectorDisabled = false
      this.isTutorialListBtnActive = false
    },
    showTutorialList() {
      if (!this.tutorialsViewedStore.tutorialListViewed) {
        this.hideTutorialListBtn()
        this.hideTutorialLocationSelector()
        this.isBackgroundDarkenOverlayActive = true
        this.isTutorialListActive = true
        this.tutorialsViewedStore.tutorialListViewed = true
        this.isLocationSelectorDisabled = true
      }
    },
    hideTutorialList() {
      this.isTutorialListActive = false
      this.isBackgroundDarkenOverlayActive = false
      this.isLocationSelectorDisabled = false
    },
    showTutorialLocationSelector() {
      if (!this.tutorialsViewedStore.tutorialLocationSelectorViewed) {
        this.hideTutorialListBtn()
        this.hideTutorialHotspot()
        this.isBackgroundDarkenOverlayActive = true
        this.isTutorialLocationActive = true
        this.tutorialsViewedStore.tutorialLocationSelectorViewed = true
        this.isListButtonDisabled = true
        this.isTutorialListActive = false
        this.isOverlaySlideOutActive = false
      }
    },
    hideTutorialLocationSelector() {
      this.isBackgroundDarkenOverlayActive = false
      this.isTutorialLocationActive = false
      this.isListButtonDisabled = false
    },
    closeAllElements() {
      this.isBackgroundDarkenOverlayActive = false
      this.isFirstHotspotHighlighted = false
      this.isListButtonDisabled = false
      this.isLocationSelectorDisabled = false
      this.isTutorialListActive = false
      this.isTutorialLocationActive = false
      this.isTutorialListBtnActive = false
      this.isTutorialHotspotActive = false
      this.isOverlayEmailActive = false
      this.isSceneDisabled = false
      this.tutorialsViewedStore.tutorialHotspotViewed = true
      this.overlaySettings.isOutroOverlayOpen = false
    },
    onSceneClick(isHotspot: Boolean) {
      if (!isHotspot) {
        this.isOverlaySlideOutActive = false

        if (this.hotspotEasterEggActiveArray.includes(true)) {
          this.hotspotEasterEggActiveArray = new Array(
            this.model?.Interior?.EasterEggs?.length
          ).fill(false)
        }
      }

      if (this.isTutorialListActive) {
        this.hideTutorialList()
      }

      this.isLocationSelectorActive = false
    },
    onShowOverlayEmail() {
      this.closeAllElements()
      this.isLocationSelectorActive = false
      this.isBackgroundDarkenOverlayActive = true
      this.isOverlayEmailActive = true
      this.isListButtonDisabled = true
      this.isLocationSelectorDisabled = true
      this.isSceneDisabled = true
    },
    onShowOverlayOutro() {
      this.closeAllElements()
      this.isLocationSelectorActive = false
      this.isOverlayEmailActive = false
      this.isListButtonDisabled = true
      this.isLocationSelectorDisabled = true
      this.isSceneDisabled = true
      this.overlaySettings.isOutroOverlayOpen = true
      this.overlaySettings.outroViewed = true
    },
    onResize() {
      this.isMobile = window.innerWidth <= 640 ? true : false
    }
  },
  computed: {
    hotspotCount(): number {
      return this.model?.Exterior?.Hotspots.length + this.model?.Interior?.Hotspots.length
    },
    hotspotActiveCount(): number {
      return (
        this.hotspotsExteriorActiveArray.filter(Boolean).length +
        this.hotspotsInteriorActiveArray.filter(Boolean).length
      )
    },
    hotspotViewedCount(): number {
      return (
        this.hotspotsExteriorViewedArray.filter(Boolean).length +
        this.hotspotsInteriorViewedArray.filter(Boolean).length
      )
    }
  },
  watch: {
    scenePositionProgress() {
      if (this.scenePositionProgress >= 98 && this.hotspotViewedCount >= 2) {
        this.showTutorialLocationSelector()
      }

      if (
        this.isSceneLoaded &&
        this.scenePositionProgress >= 98 &&
        this.hotspotViewedCount >= 2 &&
        this.hotspotActiveCount >= 1 &&
        this.scenesViewedStore.residentialExterior &&
        this.scenesViewedStore.residentialInterior &&
        !this.overlaySettings.outroViewed
      ) {
        this.onShowOverlayOutro()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-residential-interior {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  position: inherit;
}

.ce-residential-interior__viewport {
  flex: 1;
  overflow: hidden;
  position: relative;
  width: 100%;
}
</style>
