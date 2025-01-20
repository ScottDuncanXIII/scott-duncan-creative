<template>
  <div class="ce-preloader" :class="{ 'ce-preloader--loaded': isLoadComplete }">
    <div class="ce-preloader__container">
      <video class="ce-preloader__video" autoplay muted="true" loop playsinline>
        <source :src="vidUrl" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script lang="ts">
import VidUrl from '/vids/preloader.mp4?url'
import gsap from 'gsap'

export default {
  props: {},
  data() {
    return {
      isLoadComplete: false,
      totalImagesCount: 0,
      totalImagesLoaded: 0,
      vidUrl: VidUrl
    }
  },
  methods: {
    incrementTotalImagesCount() {
      this.totalImagesCount++
    },
    incrementTotalImagesLoaded() {
      this.totalImagesLoaded++

      if (this.totalImagesCount === this.totalImagesLoaded) {
        this.loadingCompleted()
      }
    },
    loadingCompleted() {
      gsap.to('.ce-preloader', { height: 0, duration: 1, delay: 1.5, ease: 'power4.inOut' })
    },
    reset() {
      this.isLoadComplete = false
      this.totalImagesCount = 0
      this.totalImagesLoaded = 0

      gsap.to('.ce-preloader', {
        height: '100%',
        duration: 0.5,
        ease: 'power4.inOut'
      })
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.ce-preloader {
  top: 0;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  will-change: height;
  z-index: 10;
}

.ce-preloader--loaded {
  //height: 0;
}

.ce-preloader__container {
  background: #0079c1;
  height: 100%;
  width: 100vw;
}

.ce-preloader__video {
  border-radius: 50%;
  left: 50%;
  padding: 0 50px;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  max-width: 300px;
}
</style>
