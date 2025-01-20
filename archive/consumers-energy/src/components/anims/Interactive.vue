<template>
  <div
    class="ce-interactive-scene__scene-asset-container"
    :data-depth-x="parallaxDepthX"
    :data-depth-y="parallaxDepthY"
    :style="cssProps"
  >
    <HotspotEasterEgg
      v-if="hotspotPosX && hotspotPosY"
      @hotspot-click="onHotspotBtnClick()"
      :dialogueInfoPos="dialogueBoxPos"
      :dialogueInfoMessage="String(dialogueBoxMessages?.[currentMessageIndex])"
      :is-dialogue-info-active="isHotspotDialogueActive"
      :left-pos="hotspotPosX"
      :top-pos="hotspotPosY"
      :zindex="10"
    />

    <Vue3Lottie
      v-if="isLoaded"
      class="ce-interactive-scene__anim"
      :animationData="animJson"
      :delay="0"
      :loop="isAnimLooped"
      :speed="animSpeed || 1"
      @on-animation-loaded="onAnimationLoaded"
      ref="animation"
    />

    <!--
      <Vue3Lottie
      v-if="isLoaded"
      class="ce-interactive-scene__anim"
      :animationData="animJson"
      :delay="0"
      :loop="isAnimLooped"
      :speed="animSpeed || 1"
      @on-animation-loaded="onAnimationLoaded"
      renderer="canvas"
      :rendererSettings="{
        preserveAspectRatio:'xMinYMin meet'
      }"
      :noMargin="true"
      style="width:100%%;height:100%;"
      ref="animation"
    />
    -->

    <div v-if="vidUrlArray && vidUrlArray.length > 0" class="ce-interactive-scene__video-container">
      <video
        v-for="(vidUrl, index) in vidUrlArray"
        class="ce-interactive-scene__video"
        :class="{ active: currentVidIndex === index }"
        :loop="vidLoop"
        autoplay
        playsinline
        :muted="isMuted"
        :key="index"
      >
        <source :src="String(vidUrl)" type="video/mp4" ref="video" />
      </video>
    </div>

    <img
      v-if="type === 'Image'"
      class="ce-interactive-scene__video-container"
      :src="imageUrl"
      alt=""
      role="presentation"
    />
  </div>
</template>

<script lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import HotspotEasterEgg from '@/components/HotspotEasterEgg.vue'
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
  components: {
    HotspotEasterEgg,
    Vue3Lottie
  },
  props: {
    animSpeed: Number,
    animType: String,
    animUrl: String,
    dialogueBoxPos: String,
    dialogueBoxMessages: Array,
    heightPercentage: String,
    hotspotPosX: String,
    hotspotPosY: String,
    imageUrl: String,
    index: Number,
    isActive: Boolean,
    parallaxDepthX: Number,
    parallaxDepthY: Number,
    posLeftPercentage: String,
    posTopPercentage: String,
    sounds: Array,
    soundType: String,
    type: String,
    widthPercentage: String,
    vidBorderRadius: String,
    vidHeight: String,
    vidPosX: String,
    vidPosY: String,
    vidLoop: Boolean,
    vidUrlArray: Array,
    vidWidth: String,
    zindex: Number
  },
  data() {
    return {
      animJson: {},
      isAnimLooped: false,
      isLoaded: false,
      isHotspotDialogueActive: false,
      soundArray: [] as HTMLMediaElement[],
      currentMessageIndex: 0,
      currentSoundIndex: -1,
      currentVidIndex: -1,
      videoArray: [] as HTMLMediaElement[]
    }
  },
  mounted() {
    if (this.type === 'Anim') {
      if (this.animType === 'loop') {
        this.isAnimLooped = true
      }

      this.initAnim()
    }

    if (this.vidUrlArray && this.vidUrlArray.length > 0) {
      this.initVideos()
    }

    if (this.sounds && this.sounds.length > 0) {
      this.initSounds()
    }

    if (this.dialogueBoxMessages) {
      this.currentMessageIndex = this.dialogueBoxMessages?.length - 1
    }
  },
  methods: {
    async initAnim() {
      this.$emit('asset-loading')
      const res = await fetch(String(this.animUrl))
      const data = await res.json()

      this.animJson = data
      this.isLoaded = true
      this.$emit('asset-loaded')

      setTimeout(() => {
        const elements = document.querySelectorAll('.ce-interactive-scene__anim')
        for (var i = 0; i <= elements.length; i++) {
          ////console.log(elements[i]);
          ////console.log(elements[i].querySelector("canvas").width)
          //elements[i].querySelector("canvas").width = "100%";
          //elements[i].style.width = "100%";
        }
      }, 5000)
    },
    onAnimationLoaded() {
      if (this.animType === 'oneShot') {
        this.$refs?.animation?.stop()
      }
    },
    initVideos() {
      for (let i = 0; Number(this.vidUrlArray?.length) > i; i++) {
        this.$emit('asset-loading')
        this.videoArray.push(
          document.getElementsByClassName('ce-interactive-scene__video')[i] as HTMLVideoElement
        )

        this.videoArray[i]?.addEventListener('loadedmetadata', (e) => {
          this.$emit('asset-loaded')
          this.videoArray[i]?.pause()
        })
      }
    },
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
    onHotspotBtnClick() {
      if (this.soundArray && this.soundArray.length > 0 && this.currentSoundIndex !== -1) {
        if (!this.soundArray[this.currentSoundIndex].paused) {
          this.soundArray[this.currentSoundIndex]?.pause()

          if (this.isActive) {
            this.$emit('hotspot-easter-egg-click', this.index)
          }
        } else {
          this.$emit('hotspot-easter-egg-click', this.index)
        }
      } else {
        this.$emit('hotspot-easter-egg-click', this.index)
      }
    }
  },
  computed: {
    cssProps() {
      return {
        '--height-percentage': this?.heightPercentage,
        '--left-percentage': this?.posLeftPercentage,
        '--top-percentage': this?.posTopPercentage,
        '--vid-border-radius': this?.vidBorderRadius || '0',
        '--vid-height': this?.vidHeight || '100%',
        '--vid-pos-x': this?.vidPosX || '0',
        '--vid-pos-y': this?.vidPosY || '0',
        '--vid-pos': this?.vidPosX ? 'absolute' : 'relative',
        '--vid-width': this?.vidWidth || 'auto',
        '--width-percentage': this?.widthPercentage || 'auto',
        '--z-index': this?.zindex || '0'
      }
    },
    isMuted() {
      return this.soundSettings.isMuted
    }
  },
  watch: {
    isActive() {
      if (this.isActive) {
        if (this.dialogueBoxMessages) {
          this.currentMessageIndex =
            this.currentMessageIndex < this.dialogueBoxMessages?.length - 1
              ? (this.currentMessageIndex += 1)
              : 0

          this.isHotspotDialogueActive = true
        }

        if (this.type === 'Anim' && this.animType === 'oneShot') {
          this.$refs?.animation?.setDirection('forward')
          this.$refs?.animation?.play()
        }

        if (this.soundArray && this.soundArray.length > 0 && !this.soundSettings.isMuted) {
          this.soundArray.forEach((sound) => {
            sound.pause()
          })

          this.currentSoundIndex = Math.floor(Math.random() * this.soundArray.length)
          this.soundArray[this.currentSoundIndex].currentTime = 0

          this.soundArray[this.currentSoundIndex]?.play()
        }

        if (this.type === 'Video') {
          document.getElementById('ce-interactive-scene__video')?.play()
        }

        if (this.vidUrlArray && this.vidUrlArray.length > 0) {
          this.currentVidIndex =
            this.currentVidIndex < this.vidUrlArray?.length - 1 ? (this.currentVidIndex += 1) : 0

          const video = this.videoArray[this.currentVidIndex] as HTMLMediaElement
          video.currentTime = 0
          video?.play()
        }
      } else {
        if (this.type === 'Anim' && this.animType === 'oneShot') {
          this.$refs?.animation?.setDirection('reverse')
          this.$refs?.animation?.play()
        }

        if (this.soundArray && this.soundArray.length > 0 && !this.soundSettings.isMuted) {
          this.soundArray.forEach((sound) => {
            sound.pause()
          })
        }

        if (this.dialogueBoxMessages) {
          this.isHotspotDialogueActive = false
        }

        if (this.vidUrlArray && this.vidUrlArray.length > 0) {
          this.videoArray[this.currentVidIndex]?.pause()
        }
      }
    },
    isMuted() {
      if (this.isMuted) {
        if (this.soundArray && this.soundArray.length > 0) {
          this.soundArray.forEach((sound) => {
            sound.muted = true
          })
        }

        if (this.videoArray && this.videoArray.length > 0) {
          this.videoArray.forEach((video) => {
            video.muted = true
          })
        }
      } else {
        if (this.soundArray && this.soundArray.length > 0) {
          this.soundArray.forEach((sound) => {
            sound.muted = false
          })
        }

        if (this.videoArray && this.videoArray.length > 0) {
          this.videoArray.forEach((video) => {
            video.muted = false
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
    },
    'overlaySettings.isOutroOverlayOpen'() {
      if (this.overlaySettings.isOutroOverlayOpen) {
        this.soundArray.forEach((sound) => {
          sound.muted = true
        })
        this.videoArray.forEach((video) => {
          video.muted = true
        })
      } else {
        this.soundArray.forEach((sound) => {
          sound.muted = this.isMuted
        })
        this.videoArray.forEach((video) => {
          video.muted = this.isMuted
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-interactive-scene__scene-asset-container {
  left: var(--left-percentage) !important;
  height: var(--height-percentage);
  position: absolute !important;
  top: var(--top-percentage) !important;
  width: var(--width-percentage);
  z-index: var(--z-index);
}

.ce-interactive-scene__scene-asset {
  display: block;
  height: 100%;
}

.ce-interactive-scene__anim {
  z-index: 1;
}

.ce-interactive-scene__video-container {
  border-radius: var(--vid-border-radius);
  overflow: hidden;
  height: var(--vid-height);
  left: var(--vid-pos-x);
  position: var(--vid-pos);
  top: var(--vid-pos-y);
  width: var(--vid-width);
  z-index: 0;
}

.ce-interactive-scene__video {
  display: none;
  object-fit: fill;
  height: 100%;
  width: 100%;

  &.active {
    display: block;
  }
}
</style>
