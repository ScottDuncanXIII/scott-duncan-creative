<template>
  <div></div>
</template>

<script lang="ts">
import { useSoundSettingsStore } from '@/stores/soundSettings'
import { useOverlaySettingsStore } from '@/stores/overlaySettings'

export default {
  setup() {
    const overlaySettings = useOverlaySettingsStore()
    const soundSettings = useSoundSettingsStore()

    return {
      overlaySettings,
      soundSettings
    }
  },
  props: {
    url: String
  },
  data() {
    return {
      isLoaded: false,
      sound: {} as HTMLAudioElement
    }
  },
  mounted() {
    this.initSound()
  },
  methods: {
    initSound() {
      this.$emit('asset-loading')

      this.sound = new Audio(String(this.url))

      this.sound?.addEventListener('loadedmetadata', (e) => {
        this.$emit('asset-loaded')
        this.playSound()
      })
    },
    playSound() {
      if (this.sound?.currentTime === 0) {
        this.sound.loop = true
        this.sound.play()

        if (this.isMuted) {
          this.sound.muted = true
        }
      }
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
        if (this.sound && !this.overlaySettings.isOutroOverlayOpen) {
          this.sound.muted = true
        }
      } else {
        if (this.sound && !this.overlaySettings.isOutroOverlayOpen) {
          this.sound.muted = false
        }
      }
    },
    $route() {
      if (this.sound) {
        this.sound.src = ''
      }
    },
    'overlaySettings.isOutroOverlayOpen'() {
      if (this.overlaySettings.isOutroOverlayOpen) {
        this.sound.muted = true
      } else {
        this.sound.muted = this.isMuted
      }
    }
  }
}
</script>
