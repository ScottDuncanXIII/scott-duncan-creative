<template>
  <div
    @click="$emit('background-darken-overlay-click')"
    class="ce-background-darken-overlay"
    :style="cssProps"
  ></div>
</template>

<script lang="ts">
import gsap from 'gsap'

export default {
  props: {
    isActive: Boolean,
    zindex: Number
  },
  mounted() {
    if (this.isActive) {
      this.show()
    } else {
      this.hide()
    }
  },
  methods: {
    show() {
      gsap.set('.ce-background-darken-overlay', { display: 'block' })
      gsap.to('.ce-background-darken-overlay', { autoAlpha: 1, duration: 0.5 })
    },
    hide() {
      gsap.to('.ce-background-darken-overlay', { autoAlpha: 0, duration: 0.5 })
    }
  },
  computed: {
    cssProps() {
      return {
        '--z-index': this.zindex
      }
    }
  },
  watch: {
    isActive() {
      if (this.isActive) {
        this.show()
      } else {
        this.hide()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-background-darken-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: var(--z-index);
}
</style>
