<template>
  <section class="ce-location-selector">
    <div
      class="ce-location-selector__container"
      :class="{
        'ce-location-selector--loaded': isLoaded,
        'ce-location-selector--disabled': isDisabled
      }"
    >
      <button
        @click="onSelectorClick"
        class="ce-location-selector__btn"
        :class="{ ' ce-location-selector__btn--active': isActive }"
        type="button"
        :aria-expanded="isActive"
      >
        <div class="ce-location-selector__btn-icon">
          <IconResidential
            v-if="$route.name === 'ResidentialExterior' || $route.name === 'ResidentialInterior'"
          />

          <IconSmallBusiness
            v-if="
              $route.name === 'SmallBusinessExterior' || $route.name === 'SmallBusinessInterior'
            "
          />

          <IconLargeBusiness
            v-if="
              $route.name === 'LargeBusinessExterior' || $route.name === 'LargeBusinessInterior'
            "
          />
        </div>

        <div class="ce-location-selector__btn-content">
          <div class="ce-location-selector__btn-heading ce-location-selector__btn-heading--active">
            <template
              v-if="$route.name === 'ResidentialExterior' || $route.name === 'ResidentialInterior'"
            >
              {{ model.Residential.Heading }}
            </template>

            <template
              v-if="
                $route.name === 'SmallBusinessExterior' || $route.name === 'SmallBusinessInterior'
              "
            >
              {{ model.SmallBusiness.Heading }}
            </template>

            <template
              v-if="
                $route.name === 'LargeBusinessExterior' || $route.name === 'LargeBusinessInterior'
              "
            >
              {{ model.LargeBusiness.Heading }}
            </template>
          </div>

          <div class="ce-location-selector__btn-subheading">
            <template
              v-if="
                $route.name === 'ResidentialExterior' ||
                $route.name === 'SmallBusinessExterior' ||
                $route.name === 'LargeBusinessExterior'
              "
            >
              {{ model.Exterior }}
            </template>

            <template
              v-if="
                $route.name === 'ResidentialInterior' ||
                $route.name === 'SmallBusinessInterior' ||
                $route.name === 'LargeBusinessInterior'
              "
            >
              {{ model.Interior }}
            </template>
          </div>
        </div>

        <IconCaret
          class="ce-location-selector__caret"
          :class="{ 'ce-location-selector__caret--active': isActive }"
        />
      </button>

      <div
        class="ce-location-selector__link-container"
        :class="{ 'ce-location-selector__link-container--active': isActive }"
      >
        <div class="ce-location-selector__link-wrapper">
          <button
            v-if="$route.name !== 'ResidentialExterior' && $route.name !== 'ResidentialInterior'"
            class="ce-location-selector__btn"
            @click="onChangeSceneClick('ResidentialExterior')"
          >
            <div class="ce-location-selector__link-icon">
              <IconResidential />
            </div>

            <div class="ce-location-selector__btn-content">
              <div class="ce-location-selector__btn-heading">
                {{ model.Residential.Heading }}
              </div>
            </div>
          </button>

          <button
            v-if="
              $route.name !== 'SmallBusinessExterior' && $route.name !== 'SmallBusinessInterior'
            "
            class="ce-location-selector__btn"
            @click="onChangeSceneClick('SmallBusinessExterior')"
          >
            <div class="ce-location-selector__link-icon">
              <IconSmallBusiness />
            </div>

            <div class="ce-location-selector__btn-content">
              <div class="ce-location-selector__btn-heading">
                {{ model.SmallBusiness.Heading }}
              </div>
            </div>
          </button>

          <button
            v-if="
              $route.name !== 'LargeBusinessExterior' && $route.name !== 'LargeBusinessInterior'
            "
            class="ce-location-selector__btn"
            @click="onChangeSceneClick('LargeBusinessExterior')"
          >
            <div class="ce-location-selector__link-icon">
              <IconLargeBusiness />
            </div>

            <div class="ce-location-selector__btn-content">
              <div class="ce-location-selector__btn-heading">
                {{ model.LargeBusiness.Heading }}
              </div>
            </div>
          </button>

          <div class="ce-location-selector__ext-int-container">
            <RouterLink
              :to="getCurrentExteriorUrl()"
              class="ce-location-selector__ext-int-btn"
              :class="{
                'ce-location-selector__ext-int-btn--active':
                  $route.name === 'ResidentialExterior' ||
                  $route.name === 'SmallBusinessExterior' ||
                  $route.name === 'LargeBusinessExterior'
              }"
            >
              {{ model.Exterior }}
            </RouterLink>

            <RouterLink
              :to="getCurrentInteriorUrl()"
              class="ce-location-selector__ext-int-btn"
              :class="{
                'ce-location-selector__ext-int-btn--active':
                  $route.name === 'ResidentialInterior' ||
                  $route.name === 'SmallBusinessInterior' ||
                  $route.name === 'LargeBusinessInterior'
              }"
            >
              {{ model.Interior }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <PopUpDialogueInfo
      :arrowPos="isMobile ? 'topCenter' : 'topLeft'"
      :animationDelay="Number(0.5)"
      animationDirection="up"
      :description="dialogueInfoDescription"
      :heading="dialogueInfoHeading"
      :isActive="isDialogueInfoActive"
      posBottom=""
      :posLeft="isMobile ? '50%' : '0'"
      posRight=""
      posTop="auto"
      :posX="isMobile ? '-50%' : '0'"
      posY="20%"
    />
  </section>
</template>

<script lang="ts">
import PopUpDialogueInfo from '@/components/PopUpDialogueInfo.vue'
import IconResidential from '@/components/icons/IconResidential.vue'
import IconSmallBusiness from '@/components/icons/IconSmallBusiness.vue'
import IconLargeBusiness from '@/components/icons/IconLargeBusiness.vue'
import IconCaret from '@/components/icons/IconCaret.vue'
import gsap from 'gsap'
import { useModelStore } from '@/stores/model'
import { useHotspotsActiveStore } from '@/stores/hotspotsActive'
import { useTutorialViewedStore } from '@/stores/tutorialsViewed'
import { useOverlaySettingsStore } from '@/stores/overlaySettings'

export default {
  setup() {
    const model = useModelStore().model?.LocationSelector

    const hotspotsResidentialExteriorActiveArray =
      useHotspotsActiveStore().residentialActiveExteriorArray
    const hotspotsResidenitalInteriorActiveArray =
      useHotspotsActiveStore().residentialActiveInteriorArray

    const hotspotsSmallBusinessExteriorActiveArray =
      useHotspotsActiveStore().smallBusinessActiveExteriorArray
    const hotspotsSmallBusinessInteriorActiveArray =
      useHotspotsActiveStore().smallBusinessActiveInteriorArray

    const hotspotsLargeBusinessExteriorActiveArray =
      useHotspotsActiveStore().largeBusinessActiveExteriorArray
    const hotspotsLargeBusinessInteriorActiveArray =
      useHotspotsActiveStore().largeBusinessActiveInteriorArray

    let tutorialsViewedStore = useTutorialViewedStore()
    let overlaySettingsStore = useOverlaySettingsStore()

    return {
      model,
      hotspotsResidentialExteriorActiveArray,
      hotspotsResidenitalInteriorActiveArray,
      hotspotsSmallBusinessExteriorActiveArray,
      hotspotsSmallBusinessInteriorActiveArray,
      hotspotsLargeBusinessExteriorActiveArray,
      hotspotsLargeBusinessInteriorActiveArray,
      tutorialsViewedStore,
      overlaySettingsStore
    }
  },
  components: {
    IconResidential,
    IconSmallBusiness,
    IconLargeBusiness,
    IconCaret,
    PopUpDialogueInfo
  },
  props: {
    dialogueInfoArrowPos: String,
    dialogueInfoDescription: String,
    dialogueInfoHeading: String,
    isActive: Boolean,
    isDisabled: Boolean,
    isDialogueInfoActive: Boolean
  },
  data() {
    return {
      isLoaded: false,
      isMobile: false
    }
  },
  mounted() {
    this.isLoaded = true
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    getCurrentExteriorUrl() {
      let url = ''

      switch (this.$route.name) {
        case 'ResidentialExterior':
        case 'ResidentialInterior':
          url = this.model.Residential.Exterior.Url
          break
        case 'SmallBusinessExterior':
        case 'SmallBusinessInterior':
          url = this.model.SmallBusiness.Exterior.Url
          break
        case 'LargeBusinessExterior':
        case 'LargeBusinessInterior':
          url = this.model.LargeBusiness.Exterior.Url
          break
      }

      return url
    },
    getCurrentInteriorUrl() {
      let url = ''

      switch (this.$route.name) {
        case 'ResidentialExterior':
        case 'ResidentialInterior':
          url = this.model.Residential.Interior.Url
          break
        case 'SmallBusinessExterior':
        case 'SmallBusinessInterior':
          url = this.model.SmallBusiness.Interior.Url
          break
        case 'LargeBusinessExterior':
        case 'LargeBusinessInterior':
          url = this.model.LargeBusiness.Interior.Url
          break
      }

      return url
    },
    onSelectorClick() {
      this.$emit('location-selector-click')
    },
    onChangeSceneClick(routeName: string) {
      if (this.hotspotsActiveTotal >= 2 && !this.overlaySettingsStore.emailViewed) {
        this.overlaySettingsStore.emailViewed = true
        this.$emit('show-email-overlay')
      } else {
        this.$router.push({ name: routeName })
      }
    },
    show() {
      gsap.set('.ce-location-selector__link-container', { height: 'auto' })
      gsap.from('.ce-location-selector__link-container', { height: 0, duration: 0.4 })
      gsap.to('.ce-location-selector__link-container', { autoAlpha: 1, duration: 0.4 })
    },
    hide() {
      gsap.to('.ce-location-selector__link-container', { height: 0, autoAlpha: 0, duration: 0.4 })
    },
    onResize() {
      this.isMobile = window.innerWidth <= 640 ? true : false
    }
  },
  computed: {
    hotspotsActiveTotal(): number {
      const hotspotsActiveTotal = [
        ...this.hotspotsResidentialExteriorActiveArray,
        ...this.hotspotsResidenitalInteriorActiveArray,
        ...this.hotspotsSmallBusinessExteriorActiveArray,
        ...this.hotspotsSmallBusinessInteriorActiveArray,
        ...this.hotspotsLargeBusinessExteriorActiveArray,
        ...this.hotspotsLargeBusinessInteriorActiveArray
      ].filter(Boolean).length

      return hotspotsActiveTotal
    }
  },
  watch: {
    isActive() {
      if (this.isActive) {
        this.show()
      } else {
        this.hide()
      }
    },
    '$route.name'() {
      this.onSelectorClick()
    }
  }
}
</script>

<style lang="less">
.ce-location-selector__btn-icon svg,
.ce-location-selector__link-icon svg {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%,0);
  -webkit-transform: translate3d(-50%, -50%,0);
  transition: 0.5s all;
  width: 20px;
}

.ce-location-selector__btn-icon svg {
  fill: #0079c1;
}

.ce-location-selector__link-icon svg {
  fill: #666666;
}
</style>

<style lang="less" scoped>
.ce-location-selector {
  left: 24px;
  opacity: 0;
  position: absolute;
  top: 17px;
  transition: 0.5s all;
  z-index: 5;

  @media screen and (max-width: 640px) {
    left: 50%;
    top: 8px;
    transform: translate3d(-50%,0,0);
    -webkit-transform: translate3d(-50%,0,0);
  }
}

.ce-location-selector--disabled {
  opacity: 0.5 !important;
  pointer-events: none;
}

.ce-location-selector__container {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  width: 206px;
}

.ce-location-selector__link-container {
  background-color: #ffffff;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.ce-location-selector__caret {
  fill: #666666;
  transition: 0.5s all;
}

.ce-location-selector__caret--active {
  transform: translate3d(0,0,0) rotate(180deg);
  -webkit-transform: translate3d(0,0,0) rotate(180deg);
}

.ce-location-selector__link-wrapper {
  padding: 0;
}

.ce-location-selector__link-container--active {
  height: auto;
}

.ce-location-selector__btn {
  align-items: center;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  text-align: left;
  text-decoration: none;
  transition: 0.5s all;
  width: 100%;
}

.ce-location-selector__btn-icon,
.ce-location-selector__link-icon {
  border-radius: 50%;
  display: block;
  font-size: 3rem;
  height: 40px;
  margin: 0;
  position: relative;
  transition: 0.5s all;
  width: 40px;
}

.ce-location-selector__btn-subheading {
  color: #000000;
  font-family: 'Open Sans';
  font-size: 1.3rem;
  font-weight: 400;
  transition: 0.5s all;
}

.ce-location-selector__btn--active .ce-location-selector__btn-subheading {
  display: none;
}

.ce-location-selector__link-icon {
  background: none;
  height: 40px;
}

.ce-location-selector__btn-content {
  flex: 1;
}

.ce-location-selector__btn-heading {
  color: #000;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 2px;
  transition: 0.5s all;
}

.ce-location-selector__btn-heading--active {
  color: #0079c1;
}

.ce-location-selector__ext-int-container {
  background-color: #f6f6f6;
  border-top: 1px solid #cecece;
  display: flex;
  padding: 8px;
}

.ce-location-selector__ext-int-btn {
  border-radius: 2px;
  color: #000000;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 4px 0 6px;
  text-align: center;
  text-decoration: none;
  transition: 0.5s all;
  width: 50%;
}

.ce-location-selector__ext-int-btn--active {
  border: 2px solid #0079c1;
  color: #0079c1;
}
</style>
@/stores/overlaySettings
