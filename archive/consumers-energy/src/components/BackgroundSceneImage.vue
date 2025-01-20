<template>
  <div
    class="ce-interactive-scene__bg-image-container"
    :data-depth-x="depthX"
    :data-depth-y="depthY"
    :style="cssProps"
  >
    <img
      class="ce-interactive-scene__bg-image"
      :src="url"
      role="presentation"
      @load="imageLoaded"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    depthX: Number,
    depthY: Number,
    scale: Number,
    url: String,
    zindex: Number
  },
  mounted() {
    this.imageInitialized()
  },
  methods: {
    imageInitialized() {
      this.$emit('asset-loading')
    },
    imageLoaded() {
      this.$emit('asset-loaded')
    }
  },
  computed: {
    cssProps() {
      return {
        '--z-index': this.zindex,
        '--scale': this.scale,
        '--position': this.zindex === 0 ? 'relative' : 'absolute'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-interactive-scene__bg-image-container {
  display: block;
  height: 100%;
  pointer-events: none;
  position: var(--position) !important;
  z-index: var(--z-index);

  @media screen and (max-width: 640px) {
    height: 100%;
  }
}

.ce-interactive-scene__bg-image {
  display: block;
  height: 100%;
  pointer-events: none;
  transform: scale(var(--scale)) translate3d(0,0,0);
  -webkit-transform: scale(var(--scale)) translate3d(0,0,0);
}
</style>
