<template>
  <section class="ce-overlay-details">
    <div class="ce-overlay-details__header">
      <div class="ce-overlay-details__header-container">
        <button
          class="ce-overlay-details__add-remove-btn"
          @click="onAddRemoveClick()"
          type="button"
        >
          <IconItemAddRemove :is-hotspot-active="isHotspotActive" :is-hotspot-viewed="false" />

          <h2 class="ce-overlay-details__header-label">
            {{ !isHotspotActive ? model?.AddToListLabel : model?.RemoveFromListLabel }}
          </h2>
        </button>
      </div>

      <button
        class="ce-overlay-details__close-btn"
        @click="$emit('overlayCloseBtnClick')"
        type="button"
        aria-label="Close Slide Out Overlay"
      >
        <IconCross color="" />
      </button>
    </div>

    <div class="ce-overlay-details__content-container">
      <div class="ce-overlay-details__heading">
        <div class="ce-overlay-details__heading-icon">
          <slot name="icon"></slot>
        </div>

        <h2 class="ce-overlay-details__heading-label" v-html="hotspotDetails?.Heading"></h2>
      </div>

      <div
        v-if="hotspotDetails?.Savings"
        class="ce-overlay-details__rebate"
        v-html="hotspotDetails?.Savings"
      ></div>

      <div class="ce-overlay-details__info">
        <h3 class="ce-overlay-details__subheading" v-html="hotspotDetails?.Subheading"></h3>
        <p class="ce-overlay-details__paragraph" v-html="hotspotDetails?.Overview"></p>
      </div>

      <div
        v-if="hotspotDetails?.SlideShow?.Slides[0]?.Content"
        class="ce-overlay-details__slider-container"
      >
        <div
          class="ce-overlay-details__slider-wrapper"
          :class="{
            'ce-overlay-details__slider-wrapper--single':
              hotspotDetails?.SlideShow?.Slides.length <= 1
          }"
        >
          <h3
            v-if="hotspotDetails?.SlideShow?.Heading"
            class="ce-overlay-details__slider-heading"
            v-html="hotspotDetails?.SlideShow?.Heading"
          ></h3>

          <swiper-container
            class="ce-overlay-details__slider"
            loop="true"
            navigation="true"
            pagination="true"
            init="false"
          >
            <swiper-slide
              v-for="(slide, index) in hotspotDetails?.SlideShow?.Slides"
              class="ce-overlay-details__slide"
              :key="index"
            >
              <h4
                v-if="slide.Heading"
                class="ce-overlay-details__slider-heading"
                v-html="slide.Heading"
              ></h4>
              <p class="ce-overlay-details__slider-paragraph" v-html="slide.Content"></p>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>

      <div v-if="hotspotDetails?.Tip?.Heading" class="ce-overlay-details__info">
        <h4 class="ce-overlay-details__subheading" v-html="hotspotDetails?.Tip?.Heading"></h4>
        <p class="ce-overlay-details__paragraph" v-html="hotspotDetails?.Tip?.Paragraph"></p>
      </div>

      <div v-if="hotspotDetails?.Rebate?.Heading" class="ce-overlay-details__info">
        <h4 class="ce-overlay-details__subheading" v-html="hotspotDetails?.Rebate?.Heading"></h4>
        <p class="ce-overlay-details__paragraph" v-html="hotspotDetails?.Rebate?.Paragraph"></p>
      </div>

      <img
        v-if="hotspotDetails?.Image?.Url"
        class="ce-overlay-details__image"
        :src="hotspotDetails?.Image?.Url"
        :alt="hotspotDetails?.Image?.Alt"
      />

      <p
        v-if="hotspotDetails?.Legal"
        class="ce-overlay-details__legal"
        v-html="hotspotDetails?.Legal"
      ></p>
    </div>

    <div v-if="hotspotDetails?.CtaPrimary?.Url" class="ce-overlay-details__cta-container">
      <a
        v-if="hotspotDetails?.CtaPrimary?.Url"
        class="ce-overlay-details__cta-primary"
        :href="hotspotDetails?.CtaPrimary?.Url"
        target="_blank"
        >{{ hotspotDetails?.CtaPrimary?.Label }}</a
      >

      <div
        v-if="hotspotDetails?.CtaSecondary?.Url"
        class="ce-overlay-details__cta-secondary-container"
      >
        <a
          class="ce-overlay-details__cta-secondary"
          :href="hotspotDetails?.CtaSecondary?.Url"
          target="_blank"
          >{{ hotspotDetails?.CtaSecondary?.Label }}
          <IconChevron class="ce-overlay-details__cta-secondary-icon" />
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import IconItemAddRemove from '@/components/icons/IconItemAddRemove.vue'
import IconCross from '@/components/icons/IconCross.vue'
import IconChevron from './icons/IconChevron.vue'
import { useSoundSettingsStore } from '@/stores/soundSettings'
import { useModelStore } from '@/stores/model'
import { register } from 'swiper/element/bundle'
register()

export default {
  setup() {
    const model = useModelStore().model?.Explore
    const soundSettings = useSoundSettingsStore()

    return {
      model,
      soundSettings
    }
  },
  props: {
    index: Number,
    isHotspotActive: Boolean,
    hotspotDetails: Object
  },
  components: {
    IconItemAddRemove,
    IconChevron,
    IconCross
  },
  data() {
    return {
      sound: {} as HTMLAudioElement
    }
  },
  mounted() {
    this.initSound()
    this.initSwiper()
  },
  methods: {
    initSound() {
      this.sound = new Audio(
        'https://scottduncancreative.com/archive/consumers-energy/sounds/global__add-to-list.mp3'
      )
    },
    initSwiper() {
      const swiperEl = document.querySelector('.ce-overlay-details__slider')

      if (swiperEl) {
        let params = {}

        if (this.hotspotDetails?.SlideShow?.Slides.length > 1) {
          params = {
            injectStyles: [
              `
              .swiper {
                position: initial;
              }

              .swiper-button-next,
              .swiper-button-prev {
                height: 25px;
                width: 15px;
              }

              .swiper-button-next::after,
              .swiper-button-prev::after {
                font-size: 2.4rem;
                font-weight: 900;
              }

              .swiper-pagination {
                background: #666666;
                border-radius: 100px;
                bottom: -35px !important;
                display: flex;
                left: 50% !important;
                transform: translateX(-50%);
                padding: 5.5px 8px;
                width: auto !important;
              }

              .swiper-pagination-bullet {
                background: none;
                border: 1px #ffffff solid;
                opacity: 1;
              }

              .swiper-pagination-bullet-active {
                background: #ffffff;
              }
            `
            ]
          }
        }

        Object.assign(swiperEl, params)
        swiperEl?.initialize()
      }
    },
    onAddRemoveClick() {
      if (!this.isHotspotActive && !this.isMuted) {
        this.sound.play()
      }

      this.$emit('hotspotActiveArrayAddRemoveClick', this.index)
    }
  },
  computed: {
    isMuted() {
      return this.soundSettings.isMuted
    }
  }
}
</script>

<style lang="less">
.ce-overlay-details__heading-icon svg {
  fill: #0079c1;
  height: 28px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  transition: 0.5s all;
  width: 28px;
}

.ce-overlay-details__rebate {
  span:first-of-type {
    background-color: #639d36;
    border-radius: 64px;
    color: #ffffff;
    display: inline-block;
    font-weight: 700;
    font-size: 2.6rem;
    letter-spacing: 0.15px;
    line-height: 32px;
    margin: 0;
    padding: 8px 16px;
  }

  span:nth-child(2) {
    font-family: 'Open Sans';
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.4;
  }

  sup {
    font-size: 1.8rem;
    line-height: 1;
  }
}

#ce-overlay-details__slider {
  .swiper-button-next {
    color: #000000 !important;
  }

  .swiper-pagination {
    bottom: 0;
  }
}
</style>

<style lang="less" scoped>
.ce-overlay-details {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.ce-overlay-details__content-container {
  background-color: rgba(255, 255, 255, 0.95);
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px;
  position: relative;
}

.ce-overlay-details__header {
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  z-index: 10;

  @media screen and (max-width: 640px) {
    padding: 10px 16px;
  }
}

.ce-overlay-details__header-container {
  align-items: center;
  display: flex;
  gap: 4px;
}

.ce-overlay-details__add-remove-btn {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 6px;
}

.ce-overlay-details__close-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
}

.ce-overlay-details__header-label {
  color: #000000;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 2px;
}

.ce-overlay-details__heading {
  align-items: center;
  display: flex;
  margin: 0 0 24px;
}

.ce-overlay-details__heading-icon {
  background: #dcf6ff;
  border-radius: 50%;
  display: block;
  flex-shrink: 0;
  font-size: 3rem;
  height: 48px;
  margin: 0 8px 0 0;
  position: relative;
  transition: 0.5s all;
  width: 48px;
}

.ce-overlay-details__heading-label {
  color: #000000;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 2px;
}

.ce-overlay-details__rebate {
  align-items: center;
  background: #f6f6f6;
  color: #000000;
  display: flex;
  font-family: 'Open Sans';
  font-size: 1.6rem;
  font-weight: 600;
  justify-content: left;
  gap: 16px;
  letter-spacing: 0.15px;
  line-height: 1.6;
  margin: 0 0 16px;
  padding: 16px;
}

.ce-overlay-details__info {
  margin: 16px 0 0;
}

.ce-overlay-details__subheading {
  color: #000000;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 8px;
}

.ce-overlay-details__paragraph {
  color: #000000;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
}

.ce-overlay-details__slider-container {
  color: #000000;
  margin: 0 0 42px;
  position: relative;
}

.ce-overlay-details__slider-wrapper {
  border: 1px solid #e5e5e5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  margin: 24px 40px 0;
  padding: 16px;
  position: initial;
}

.ce-overlay-details__slider-wrapper--single {
  margin: 24px 10px 0;
}

.ce-overlay-details__slider-heading {
  color: #0079c1;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.15px;
  margin: 0 0 8px;
}

.ce-overlay-details__slider {
  position: initial;
}

.ce-overlay-details__slider-heading {
  color: #0079c1;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 8px;
}

.ce-overlay-details__slider-paragraph {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 19px;
  margin: 0;
}

.ce-overlay-details__image {
  display: block;
  margin: 24px 0 0;
  width: 100%;
}

.ce-overlay-details__cta-container {
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  padding: 16px 16px;
  transition: 0.5s all;
  width: 100%;
  z-index: 10;
}

.ce-overlay-details__cta-primary {
  background-color: #639d36;
  color: #ffffff;
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 24px;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  width: 100%;
}

.ce-overlay-details__cta-secondary-container {
  display: flex;
  justify-content: center;
}

.ce-overlay-details__cta-secondary {
  align-items: center;
  color: #0079c1;
  display: inline-flex;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 24px;
  margin: 0;
  text-align: center;
}

.ce-overlay-details__cta-secondary-icon {
  height: 10px;
  margin: 3px 0 0 10px;
  width: 6px;
}

.ce-overlay-details__legal {
  color: #000000;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 16px;
  margin: 16px 0 0;
}
</style>
