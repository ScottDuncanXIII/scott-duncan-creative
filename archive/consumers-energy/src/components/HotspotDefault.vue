<template>
  <button
    @click.stop="onHotspotClick()"
    @mouseover="onHotspotOver()"
    @mouseleave="onHotspotLeave()"
    class="ce-hotspot__btn"
    type="button"
    :aria-label="title"
    :data-depth-x="depthX"
    :data-depth-y="depthY"
    :style="cssProps"
  >
    <IconHotspot
      class="ce-hotspot__icon"
      :is-viewed="isHotspotViewed"
      :is-mouse-over="isHotspotMouseOver"
      :is-idle-anim="isIdleAnimation"
    />

    <PopUpDialogueInfo
      v-if="dialogueInfoDescription"
      :arrowPos="dialogueInfoArrowPos"
      :animationDelay="Number(0.5)"
      animationDirection="down"
      :description="dialogueInfoDescription"
      :isActive="isDialogueInfoActive"
      posBottom=""
      posLeft="50%"
      posRight=""
      posTop="auto"
      :posX="dialogueInfoX || '-50%'"
      posY="-160%"
    />
  </button>
</template>

<script lang="ts">
import PopUpDialogueInfo from '@/components/PopUpDialogueInfo.vue'
import IconHotspot from './icons/IconHotspot.vue'
import { useSoundSettingsStore } from '@/stores/soundSettings'

export default {
  setup() {
    const soundSettings = useSoundSettingsStore()

    return {
      soundSettings
    }
  },
  components: {
    IconHotspot,
    PopUpDialogueInfo
  },
  props: {
    index: Number,
    dialogueInfoArrowPos: String,
    dialogueInfoDescription: String,
    dialogueInfoX: String,
    isDialogueInfoActive: Boolean,
    isHotspotActive: Boolean,
    isHotspotViewed: Boolean,
    depthX: Number,
    depthY: Number,
    topPos: String,
    leftPos: String,
    sounds: Array,
    title: String,
    zindex: Number
  },
  data() {
    return {
      currentSoundIndex: 0,
      idleAnimInterval: 0,
      isIdleAnimation: true,
      isHotspotMouseOver: false,
      soundArray: [] as HTMLAudioElement[]
    }
  },
  mounted() {
    if (this.sounds && this.sounds.length > 0) {
      this.initSounds()
    }

    this.initIdleAnim()
  },
  methods: {
    initSounds() {
      for (let i = 0; Number(this.sounds?.length) > i; i++) {
        this.$emit('asset-loading')

        const sound = new Audio(String(this.sounds?.[i]))
        this.soundArray.push(sound)

        this.soundArray[i]?.addEventListener('loadedmetadata', (e) => {
          this.$emit('asset-loaded')
          this.soundArray[i]?.pause()
        })
      }
    },
    initIdleAnim() {
      this.idleAnimInterval = setInterval(
        () => {
          this.isIdleAnimation = true

          setTimeout(() => {
            this.isIdleAnimation = false
          }, 1500)
        },
        Math.round(Math.random() * 5000) + 3000
      )
    },
    showInfoDialogue() {
      if (this.dialogueInfoDescription) {
        this.$refs?.popUpDialogueInfo?.show()
      }
    },
    hideInfoDialogue() {
      if (this.dialogueInfoDescription) {
        this.$refs?.popUpDialogueInfo?.hide()
      }
    },
    onHotspotClick() {
      if (this.soundArray && this.soundArray.length > 0 && !this.isMuted) {
        this.soundArray.forEach((sound) => {
          sound.pause()
        })

        this.currentSoundIndex = Math.floor(Math.random() * this.soundArray.length)
        this.soundArray[this.currentSoundIndex].currentTime = 0
        this.soundArray[this.currentSoundIndex]?.play()
      }

      this.$emit('hotspot-click', this.index)
    },
    onHotspotOver() {
      this.isHotspotMouseOver = true
    },
    onHotspotLeave() {
      this.isHotspotMouseOver = false
    }
  },
  computed: {
    cssProps() {
      return {
        '--top-pos': this.topPos,
        '--left-pos': this.leftPos,
        '--z-index': this.zindex
      }
    },
    isMuted() {
      return this.soundSettings.isMuted
    }
  },
  watch: {
    isDialogueInfoActive() {
      if (this.isDialogueInfoActive) {
        this.showInfoDialogue()
      } else {
        this.hideInfoDialogue()
      }
    },
    /*isHotspotViewed() {
      if (this.isHotspotViewed) {
        clearInterval(this.idleAnimInterval);
      }
    },*/
    isMuted() {
      if (this.isMuted) {
        if (this.soundArray && this.soundArray.length > 0) {
          this.soundArray.forEach((sound) => {
            sound.muted = true
          })
        }
      } else {
        if (this.soundArray && this.soundArray.length > 0) {
          this.soundArray.forEach((sound) => {
            sound.muted = false
          })
        }
      }
    },
    $route() {
      if (this.soundArray && this.soundArray.length > 0) {
        this.soundArray.forEach((sound) => {
          sound.src = ''
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-hotspot__btn {
  background: none;
  border: 0;
  cursor: pointer;
  display: inline-block !important;
  left: var(--left-pos) !important;
  opacity: 0;
  padding: 0;
  position: absolute !important;
  top: var(--top-pos) !important;
  z-index: var(--z-index);
}
</style>
