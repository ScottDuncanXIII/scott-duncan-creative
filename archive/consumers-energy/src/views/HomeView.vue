<template>
  <section class="ce-home">
    <div class="ce-home__content">
      <h1 class="ce-home__heading" v-html="model?.Heading"></h1>
      <h2 class="ce-home__subheading" v-html="model?.Subheading"></h2>
    </div>

    <button
      v-if="!isVideoPlaying"
      @click="isVideoOverlayVisible = true"
      class="ce-home__video-control--play"
      type="button"
      v-html="model?.PlayLabel"
    ></button>

    <button @click="onVideoEnded" class="ce-home__skip-link">
      {{ model?.SkipLabel }}
      <IconChevron class="ce-home__skip-link--icon" />
    </button>

    <div class="ce-home__video-wrapper" @click.stop="onVideoEnded()">
      <div class="ce-home__video-container">
        <button
          class="ce-home__video-close-btn"
          @click="onVideoEnded()"
          type="button"
          aria-label="Close Slide Out Overlay"
        >
          <IconCross color="#ffffff" />
        </button>

        <vue-vimeo-player
          v-if="!isMobile"
          class="ce-home__video"
          ref="videoPlayer"
          :video-url="model?.Video?.Desktop"
          @ready="onVideoLoaded()"
          @ended="onVideoEnded()"
        ></vue-vimeo-player>

        <vue-vimeo-player
          v-else
          class="ce-home__video"
          ref="videoPlayer"
          :video-url="model?.Video?.Mobile"
          @ready="onVideoLoaded()"
          @ended="onVideoEnded()"
        ></vue-vimeo-player>
      </div>
    </div>

    <Preloader ref="preloader" />

    <BackgroundDarkenOverlay :zindex="Number(1)" :isActive="isVideoOverlayVisible" />
  </section>
</template>

<script lang="ts">
import gsap from 'gsap'
import { useModelStore } from '@/stores/model'
import BackgroundDarkenOverlay from '../components/BackgroundDarkenOverlay.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import IconCross from '@/components/icons/IconCross.vue'
import Preloader from '@/components/Preloader.vue'
import { vueVimeoPlayer } from 'vue-vimeo-player'

export default {
  setup() {
    const model = useModelStore().model.Home

    return {
      model
    }
  },
  components: {
    BackgroundDarkenOverlay,
    IconChevron,
    IconCross,
    Preloader,
    vueVimeoPlayer
  },
  data() {
    return {
      isMobile: false,
      isVideoOverlayVisible: false,
      isVideoMuted: true,
      isVideoPlaying: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    onVideoLoaded() {
      this.$refs?.preloader?.loadingCompleted()
    },
    showVideoOverlay() {
      gsap.to('.ce-home__video-wrapper', {
        autoAlpha: 1,
        duration: 0.5,
        onComplete: () => {
          ;(this.$refs?.videoPlayer as HTMLMediaElement).play()
        }
      })
    },
    hideVideoOverlay() {
      ;(this.$refs?.videoPlayer as HTMLMediaElement).pause()
      this.isVideoOverlayVisible = false

      gsap.to('.ce-home__video-wrapper', { autoAlpha: 0, duration: 0.5 })
    },
    onVideoEnded() {
      this.$refs?.preloader?.reset()

      setTimeout(() => {
        this.$router.push('/explore')
      }, 1000)
    },
    onResize() {
      this.isMobile = window.innerWidth <= 640 ? true : false
    }
  },
  watch: {
    isVideoOverlayVisible() {
      if (this.isVideoOverlayVisible) {
        this.showVideoOverlay()
      } else {
        this.hideVideoOverlay()
      }
    }
  }
}
</script>

<style lang="less">
.ce-home__video {
  iframe {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>

<style lang="less" scoped>
.ce-home {
  background-image: url(/imgs/intro-still.png);
  background-position: 50%;
  background-size: cover;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.ce-home__content {
  color: var(--color-font-main);
  margin: 0 auto;
  padding: 40px 0 0;
  max-width: 386px;
  text-align: center;
  z-index: 1;
}

.ce-home__heading {
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-style: normal;
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: 0.15px;
  line-height: 1.1;
  margin: 0 0 1.6rem;
  padding: 0 20px;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.55);

  @media screen and (max-width: 640px) {
    font-size: 2.7rem;
    margin: 0 0 0.8rem;
  }
}

.ce-home__subheading {
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0 0 32px;
  letter-spacing: 0.15px;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 640px) {
    font-size: 1.3rem;
  }
}

.ce-home__video-control--mute {
  background: none;
  border: none;
  bottom: 10px;
  cursor: pointer;
  left: 28px;
  padding: 0;
  position: absolute;
  z-index: 1;

  @media screen and (max-width: 640px) {
    bottom: 20px;
    left: 20px;
  }
}

.ce-home__skip-link {
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

.ce-home__skip-link--icon {
  font-size: 1.6rem;
  fill: #ffffff;
  width: 10px;
}

.ce-home__video-control--play {
  background: #639d36;
  border-radius: 2px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto;
  padding: 12px 24px;
  z-index: 1;

  @media screen and (max-width: 640px) {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    -webkit-transform: translate3d(-50%, -50%, 0);
  }
}

.ce-home__video-close-btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  z-index: 10;
  padding: 0;
  position: absolute;
  right: 45px;
  top: 0;
  transform: scale(1.2) translate3d(0, 0, 0);
  -webkit-transform: scale(1.2) translate3d(0, 0, 0);

  svg {
    stroke: white;

    path {
      fill: white;
    }
  }

  @media screen and (max-width: 640px) {
    right: 40px;
    top: 18px;
  }
}

.ce-home__video-wrapper {
  border: none;
  height: auto;
  min-height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  visibility: hidden;
  width: 100%;
  z-index: 2;
}

.ce-home__video-container {
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

  @media screen and (max-width: 640px) {
    aspect-ratio: 9 / 15.5;
    padding: 25px;
  }
}

.ce-home__video {
  height: 100% !important;
  position: relative;
  width: 100%;

  iframe {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
