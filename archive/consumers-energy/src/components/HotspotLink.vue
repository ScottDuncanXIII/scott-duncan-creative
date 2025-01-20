<template>
  <div class="ce-hotspot" :data-depth-x="depthX" :data-depth-y="depthY" :style="cssProps">
    <router-link
      :to="String(url)"
      class="ce-hotspot__link"
      @mouseover="onHotspotOver()"
      @mouseleave="onHotspotLeave()"
      :title="title"
    >
      <IconHotspot
        class="ce-hotspot__icon"
        :is-idle-anim="isIdleAnimation"
        :is-mouse-over="isHotspotMouseOver"
      />
    </router-link>

    <div class="ce-hotspot__label">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
import IconHotspot from './icons/IconHotspot.vue'

export default {
  components: {
    IconHotspot
  },
  props: {
    title: String,
    depthX: Number,
    depthY: Number,
    topPos: String,
    leftPos: String,
    url: String
  },
  data() {
    return {
      idleAnimInterval: 0,
      isIdleAnimation: true,
      isHotspotMouseOver: false
    }
  },
  mounted() {
    this.initIdleAnim()
  },
  methods: {
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
        '--left-pos': this.leftPos
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-hotspot {
  background: none;
  border: 0;
  display: inline-block !important;
  left: var(--left-pos) !important;
  opacity: 0;
  padding: 0;
  position: absolute !important;
  top: var(--top-pos) !important;
  z-index: 10;
}

.ce-hotspot__icon {
  transition: 0.5s all;
}

.ce-hotspot__label {
  color: #ffffff;
  font-family: 'Open Sans';
  font-size: 1.5rem;
  font-weight: 700;
  left: 50%;
  line-height: 1.6;
  position: absolute;
  text-align: center;
  text-decoration: none;
  text-shadow: 0px 1px 8px rgba(0, 0, 0, 0.9);
  transform: translate3d(-50%, 0,0);
  -webkit-transform: translate3d(-50%,0,0);
}
</style>
