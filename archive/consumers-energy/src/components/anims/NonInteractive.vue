<template>
  <div
    class="ce-interactive-scene__scene-asset-container"
    :data-depth-x="depthX"
    :data-depth-y="depthY"
    :style="cssProps"
  >
    <img
      v-if="type === 'Static'"
      class="ce-interactive-scene__scene-asset"
      :src="url"
      role="presentation"
    />

    <Vue3Lottie
      v-else-if="type === 'Anim' && isLoaded"
      class="ce-interactive-scene__scene-asset-anim"
      :animationData="animJson"
      :speed="speed || 1"
      ref="animation"
    />
  </div>
</template>

<script lang="ts">
import { Vue3Lottie } from 'vue3-lottie'

export default {
  props: {
    delay: Number,
    depthX: Number,
    depthY: Number,
    heightPercentage: String,
    leftPercentage: String,
    speed: Number,
    topPercentage: String,
    type: String,
    url: String,
    zindex: Number
  },
  components: {
    Vue3Lottie
  },
  data() {
    return {
      animJson: {},
      isLoaded: false
    }
  },
  mounted() {
    if (this.type === 'Anim') {
      this.init()
    }
  },
  methods: {
    async init() {
      this.$emit('asset-loading')
      const res = await fetch(String(this.url))
      const data = await res.json()

      this.animJson = data
      this.isLoaded = true
      this.$emit('asset-loaded')
    }
  },
  computed: {
    cssProps() {
      return {
        '--height-percentage': this?.heightPercentage,
        '--left-percentage': this?.leftPercentage,
        '--top-percentage': this?.topPercentage,
        '--z-index': this?.zindex
      }
    }
  }
}
</script>

<style lang="less">
.ce-interactive-scene__scene-asset-container {
  svg {
    width: auto !important;
  }
}
</style>

<style lang="less" scoped>
.ce-interactive-scene__scene-asset-container {
  left: var(--left-percentage) !important;
  height: var(--height-percentage);
  position: absolute !important;
  top: var(--top-percentage) !important;
  z-index: var(--z-index);
}

.ce-interactive-scene__scene-asset {
  display: block;
  height: 100%;
}
</style>
