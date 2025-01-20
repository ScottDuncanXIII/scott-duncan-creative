<template>
  <section class="ce-outro-overlay">
    <button v-if="!isOverlayEmailActive" @click="onVideoEnded" class="ce-outro-overlay__skip-link">
      {{ model?.SkipLabel }} <IconChevron class="ce-outro-overlay__skip-link--icon" />
    </button>

    <div class="ce-outro-overlay__video-wrapper" @click.stop="hideVideoOverlay()">
      <div class="ce-outro-overlay__video-container">
        <button
          class="ce-outro-overlay__video-close-btn"
          @click="isOverlayVideoVisible = false"
          type="button"
          aria-label="Close Slide Out Overlay"
        >
          <IconCross color="#ffffff" />
        </button>

        <vue-vimeo-player
          class="ce-outro-overlay__video"
          ref="videoPlayer"
          :video-url="model?.Video?.Desktop"
          @ready="onVideoLoaded()"
          @ended="hideVideoOverlay()"
        ></vue-vimeo-player>

        <!--<vue-vimeo-player
          v-else
          class="ce-outro-overlay__video"
          ref="videoPlayer"
          video-url="https://player.vimeo.com/video/891254851"
          @ready="onVideoLoaded()"
          @ended="hideVideoOverlay()"
        ></vue-vimeo-player>-->
      </div>
    </div>

    <OverlayEmail
      @on-email-overlay-close-btn-click="hideOutroOverlay()"
      @on-email-overlay-download-button-click="$emit('on-email-overlay-download-button-click')"
      :is-active="isOverlayEmailActive"
      ref="OverlayEmail"
    />

    <BackgroundDarkenOverlay :zindex="Number(1)" :isActive="isOverlayVideoVisible" />

    <Preloader ref="preloader" />
  </section>
</template>

<script lang="ts">
import gsap from 'gsap'
import BackgroundDarkenOverlay from '../components/BackgroundDarkenOverlay.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import IconCross from '@/components/icons/IconCross.vue'
import OverlayEmail from '@/components/OverlayEmail.vue'
import Preloader from '@/components/Preloader.vue'
import { useModelStore } from '@/stores/model'
import { useSoundSettingsStore } from '@/stores/soundSettings'
import { vueVimeoPlayer } from 'vue-vimeo-player'

export default {
  setup() {
    const model = useModelStore().model.Outro
    const soundSettings = useSoundSettingsStore()

    return {
      model,
      soundSettings
    }
  },
  components: {
    BackgroundDarkenOverlay,
    IconChevron,
    IconCross,
    OverlayEmail,
    Preloader,
    vueVimeoPlayer
  },
  data() {
    return {
      isMobile: false,
      isOverlayEmailActive: false,
      isOverlayVideoVisible: true,
      isVideoPlaying: false,
      video: {} as HTMLMediaElement
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    gsap.to(this.$el, { duration: 0.8, y: 0, autoAlpha: 1 })
  },
  methods: {
    onVideoLoaded() {
      this.$refs?.preloader?.loadingCompleted()
      this.isOverlayVideoVisible = true

      setTimeout(() => {
        gsap.to('.ce-outro-overlay__video-wrapper', {
          autoAlpha: 1,
          duration: 0.5,
          onComplete: () => {
            ;(this.$refs?.videoPlayer as HTMLMediaElement).play()
          }
        })
      }, 2200)
    },
    showVideoOverlay() {
      gsap.to('.ce-outro-overlay__video-wrapper', {
        autoAlpha: 1,
        duration: 0.5,
        onComplete: () => {
          ;(this.$refs?.videoPlayer as HTMLMediaElement).play()
        }
      })
    },
    hideVideoOverlay() {
      ;(this.$refs?.videoPlayer as HTMLMediaElement).pause()
      this.isOverlayVideoVisible = false

      gsap.to('.ce-outro-overlay__video-wrapper', {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => {
          this.isOverlayEmailActive = true
        }
      })
    },
    hideOutroOverlay() {
      gsap.to(this.$el, {
        duration: 0.5,
        autoAlpha: 0,
        onComplete: () => {
          this.$emit('on-outro-overlay-close-btn-click')
        }
      })
    },
    onResize() {
      this.isMobile = window.innerWidth <= 640 ? true : false
    }
  },
  computed: {
    isMuted() {
      return this.soundSettings.isMuted
    }
  },
  watch: {
    isMuted() {
      if (this.isMuted) {
        if (this.video) {
          this.video.muted = true
        }
      } else {
        if (this.video) {
          this.video.muted = false
        }
      }
    },
    isOverlayVideoVisible() {
      if (this.isOverlayVideoVisible) {
        this.showVideoOverlay()
      } else {
        this.hideVideoOverlay()
      }
    }
  }
}
</script>

<style lang="less">
.ce-outro-overlay__video {
  iframe {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>

<style lang="less" scoped>
.ce-outro-overlay {
  background-image: url(/imgs/intro-still.png);
  background-position: 50%;
  background-size: cover;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  position: absolute;
  transform: translate3d(0, 100%, 0);
  -webkit-transform: translate3d(0, 100%, 0);
  width: 100%;
  z-index: 10;
}

.ce-outro-overlay__skip-link {
  align-items: center;
  background: none;
  border: none;
  bottom: 26px;
  color: var(--color-font-main);
  cursor: pointer;
  display: flex;
  font-family: 'Open Sans';
  font-size: 2rem;
  font-weight: 700;
  gap: 8px;
  padding: 0;
  position: absolute;
  right: 32px;
  text-decoration: none;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);
  z-index: 1;

  @media screen and (max-width: 640px) {
    font-size: 1.6rem;
    left: 50%;
    right: auto;
    transform: translate3d(-50%, 0, 0);
    -webkit-transform: translate3d(-50%, 0, 0);
    right: auto;
  }
}

.ce-outro-overlay__skip-link--icon {
  font-size: 1.6rem;
  fill: #ffffff;
  width: 10px;
}

.ce-outro-overlay__video-close-btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  z-index: 10;
  padding: 0;
  position: absolute;
  right: 45px;
  top: 0;
  transform: scale(1.2);

  svg {
    stroke: white;

    path {
      fill: white;
    }
  }
}

.ce-outro-overlay__video-wrapper {
  border: none;
  height: auto;
  min-height: 100%;
  opacity: 0;
  position: absolute;
  padding: 10px;
  top: 0;
  visibility: hidden;
  width: 100%;
  z-index: 2;
}

.ce-outro-overlay__video-container {
  aspect-ratio: 16 / 9;
  bottom: 0;
  left: 0;
  margin: auto;
  max-height: 100%;
  max-width: 1280px;
  padding: 15px;
  position: absolute;
  right: 0;
  top: 0;

  /*@media screen and (max-width: 640px) {
    aspect-ratio: 9 / 15.5;
    padding: 25px;
  }*/
}

.ce-outro-overlay__video {
  height: 100% !important;
  position: relative;
  width: 100%;
}
</style>
