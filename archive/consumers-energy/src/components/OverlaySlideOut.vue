<template>
  <section
    class="ce-slide-out-overlay"
    :class="{ 'ce-slide-out-overlay__active': isOverlaySlideOutActive }"
  >
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { useSoundSettingsStore } from '@/stores/soundSettings'

export default {
  setup() {
    const soundSettings = useSoundSettingsStore()

    return {
      soundSettings
    }
  },
  props: {
    isOverlaySlideOutActive: Boolean
  },
  data() {
    return {
      sound: {} as HTMLAudioElement
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.sound = new Audio(
        'https://scottduncancreative.com/archive/consumers-energy/sounds/global__overlay.mp3'
      )
    }
  },
  computed: {
    isMuted() {
      return this.soundSettings.isMuted
    }
  },
  watch: {
    isOverlaySlideOutActive() {
      if (!this.isMuted) {
        this.sound.play()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-slide-out-overlay {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  height: 100%;
  max-width: 390px;
  padding: 8px 0 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate3d(100%, 0, 0);
  -webkit-transform: translate3d(100%, 0, 0);
  transition: 0.5s all;
  width: 100%;
  z-index: 9;
}

.ce-slide-out-overlay__active {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}

.ce-slide-out-overlay__close-btn {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 28px;
  z-index: 10;
}
</style>
