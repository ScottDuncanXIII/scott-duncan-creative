<template>
  <section class="ce-interactive-scene">
    <div
      id="ce-interactive-scene__viewport"
      class="ce-interactive-scene__viewport"
      @wheel.prevent="onWheelScroll"
      @mousedown.stop="onMouseDown"
      @mouseup.stop="onMouseUp"
      @mousemove.prevent="onMouseMove"
      @scroll.passive="onViewportScroll"
    >
      <div class="ce-interactive-scene__container">
        <div id="parallax-scene" class="ce-interactive-scene__wrapper" @click="onSceneClick" 
        @touchmove="$emit('on-scene-click', false)">
          <slot name="PopUpTutorialAvatars"></slot>

          <slot name="backgroundDarkenOverlay"></slot>

          <slot name="hotspotItems"></slot>

          <slot name="backgroundAssetImages"></slot>

          <slot name="backgroundSceneImages"></slot>
        </div>
      </div>
    </div>

    <button
      class="ce-interactive-scene__scroll-btn ce-interactive-scene__scroll-btn--left"
      :class="{ active: isSceneScrollLoaded }"
      @pointerdown.stop="onScrollBtnMouseDown('left')"
      type="button"
    >
      <IconChevron class="ce-interactive-scene__scroll-btn-icon" />
    </button>

    <button
      class="ce-interactive-scene__scroll-btn ce-interactive-scene__scroll-btn--right"
      :class="{ active: isSceneScrollLoaded }"
      @pointerdown.stop="onScrollBtnMouseDown('right')"
      type="button"
    >
      <IconChevron class="ce-interactive-scene__scroll-btn-icon" />
    </button>
  </section>
</template>

<script lang="ts">
import Parallax from 'parallax-js'
import gsap from 'gsap'
import IconChevron from './icons/IconChevron.vue'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

export default {
  components: {
    IconChevron
  },
  props: {
    isSceneDisabled: Boolean,
    isTutorialHotspotViewed: Boolean
  },
  data() {
    return {
      currentScenePosition: 0,
      currentScenePositionPercentage: 0,
      isMouseDown: false,
      isSceneScrollLoaded: false,
      hoverInterval: 0,
      lastScrollFireTime: 0,
      scenePosition: 0,
      scrollSpeed: 10,
      sceneWidthOffset: 0,
      startX: 0,
      scrollBtnInterval: 0,
      scrollLeft: 0,
      scrollTimer: 0,
      viewport: document?.querySelector('#ce-interactive-scene__viewport') as HTMLElement
    }
  },
  mounted() {
    this.initScene()
  },
  methods: {
    initScene() {
      this.viewport = document?.querySelector('#ce-interactive-scene__viewport') as HTMLElement
      const scene = document.getElementById('parallax-scene')

      const parallaxInstance = new Parallax(scene, {
        relativeInput: true
      })

      setTimeout(() => {
        gsap.set(this.viewport, {
          scrollTo: {
            x:
              Number(document?.querySelector('.ce-interactive-scene__container')?.clientWidth) -
              this.getBrowserWidth()
          }
        })

        gsap.to(this.viewport, {
          duration: 3,
          scrollTo: { x: 0 },
          delay: 2.5,
          ease: 'power2.inOut',
          onComplete: () => {
            this.isSceneScrollLoaded = true
            if (!this.isTutorialHotspotViewed) {
              this.goToInitPosition()
            }
          }
        })
      }, 100)
    },
    goToInitPosition() {
      gsap.to(this.viewport, {
        duration: 1.5,
        scrollTo: { x: '#ce-tutorial-pop-up__initial', offsetX: 200 },
        ease: 'power2.inOut'
      })
    },
    onWheelScroll(e: WheelEvent) {
      if (this.isSceneScrollLoaded && !this.isSceneDisabled) {
        const minScrollTime = 15
        let now = new Date().getTime()

        if (!this.scrollTimer) {
          if (now - this.lastScrollFireTime > 3 * minScrollTime) {
            this.lastScrollFireTime = now

            this.viewport.scrollBy({
              left: e.deltaX < 0 || e.deltaY < 0 ? -35 : 35
            })
          }

          this.scrollTimer = setTimeout(() => {
            this.scrollTimer = 0
            this.lastScrollFireTime = new Date().getTime()

            this.viewport.scrollBy({
              left: e.deltaX < 0 || e.deltaY < 0 ? -35 : 35
            })
          }, minScrollTime)
        }

        this.$emit('on-scene-click', false)
      }
    },
    onMouseDown(e: MouseEvent) {
      if (!this.isSceneDisabled) {
        this.isMouseDown = true
        this.startX = e.pageX - this.viewport?.offsetLeft
        this.scrollLeft = this.viewport?.scrollLeft
      }
    },
    onMouseUp(e: MouseEvent) {
      this.isMouseDown = false
    },
    onMouseMove(e: MouseEvent) {
      if (!this.isMouseDown) {
        return
      }

      const x = e.pageX - this.viewport.offsetLeft
      const scroll = x - this.startX
      this.currentScenePosition = this.scrollLeft - scroll
      this.viewport.scrollLeft = this.currentScenePosition
    },
    onScrollBtnMouseDown(direction: String) {
      this.scrollBtnInterval = setInterval(() => {
        this.viewport.scrollBy({
          left: direction === 'left' ? -10 : 10
        })
      }, 10)

      document.addEventListener(
        'mouseup',
        () => {
          clearInterval(this.scrollBtnInterval)
        },
        { once: true }
      )

      document.addEventListener(
        'pointerup',
        () => {
          clearInterval(this.scrollBtnInterval)
        },
        { once: true }
      )
    },
    onViewportScroll() {
      this.sceneWidthOffset =
        Number(document?.querySelector('.ce-interactive-scene__container')?.clientWidth) -
        this.getBrowserWidth()
      const x = this.viewport.scrollLeft - this.viewport.offsetLeft
      const scroll = x - this.startX
      this.currentScenePosition = this.scrollLeft - scroll
    },
    onSceneClick(e: MouseEvent) {
      let isHotspot = false

      if (
        (e.target as HTMLElement).getAttribute('class') === 'ce-interactive-scene__hotspot-outer' ||
        (e.target as HTMLElement).getAttribute('class') === 'ce-interactive-scene__hotspot-inner'
      ) {
        isHotspot = true
      }

      this.$emit('on-scene-click', isHotspot)
    },
    getBrowserWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      )
    },
    getTranslateX() {
      var style = window.getComputedStyle(
        document?.querySelector('.ce-interactive-scene__container') as Element
      )
      var matrix = new WebKitCSSMatrix(style.transform)
      return matrix.m41
    }
  },
  watch: {
    currentScenePosition() {
      this.currentScenePositionPercentage = (this.viewport.scrollLeft / this.sceneWidthOffset) * 100

      if (this.currentScenePositionPercentage === 0) {
        clearInterval(this.scrollBtnInterval)
        ;(
          document.getElementsByClassName(
            'ce-interactive-scene__scroll-btn'
          )[0] as HTMLButtonElement
        ).disabled = true
      } else if (this.currentScenePositionPercentage >= 99) {
        clearInterval(this.scrollBtnInterval)
        ;(
          document.getElementsByClassName(
            'ce-interactive-scene__scroll-btn'
          )[1] as HTMLButtonElement
        ).disabled = true
      } else {
        ;(
          document.getElementsByClassName(
            'ce-interactive-scene__scroll-btn'
          )[0] as HTMLButtonElement
        ).disabled = false
        ;(
          document.getElementsByClassName(
            'ce-interactive-scene__scroll-btn'
          )[1] as HTMLButtonElement
        ).disabled = false
      }

      this.$emit('update-scene-position-progress', this.currentScenePositionPercentage)
    },
    isSceneScrollLoaded() {
      this.$emit('is-scene-scroll-loaded')
    },
    isSceneDisabled() {
      ;(
        document.getElementsByClassName('ce-interactive-scene__scroll-btn')[0] as HTMLButtonElement
      ).disabled = this.isSceneDisabled
      ;(
        document.getElementsByClassName('ce-interactive-scene__scroll-btn')[1] as HTMLButtonElement
      ).disabled = this.isSceneDisabled
    }
  }
}
</script>

<style lang="less" scoped>
.ce-interactive-scene {
  height: 100%;
}

.ce-interactive-scene__viewport {
  height: 100%;
  overflow-x: auto;
  position: relative;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}

.ce-interactive-scene__container {
  height: 100%;
  overflow: hidden;
  position: absolute;

  @media screen and (max-width: 640px) {
    height: 100%;
  }
}

@-moz-document url-prefix() {
  .ce-interactive-scene__container {
    height: calc(100vh - 88px);
  }
}

.ce-interactive-scene__wrapper {
  height: 100%;
  pointer-events: all !important;
}

.ce-interactive-scene__scroll-btn {
  align-items: center;
  background-color: #ffffff;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  height: 48px;
  justify-content: center;
  opacity: 0;
  position: fixed;
  top: 50%;
  transform: translate3d(0, -50%,0);
  -webkit-transform: translate3d(0, -50%,0);
  transition: 0.5s all;
  width: 48px;
  will-change: opacity, transform;

  @media screen and (max-width: 640px) {
    display: none;
  }

  &.active {
    transform: translate3d(0, -50%,0);
    -webkit-transform: translate3d(0, -50%,0);
    opacity: 1;
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
}

.ce-interactive-scene__scroll-btn--left {
  transform: translate3d(100%, -50%,0);
  -webkit-transform: translate3d(100%, -50%,0);
}

.ce-interactive-scene__scroll-btn--right {
  right: 0;
  transform: translate3d(100%, -50%,0);
  -webkit-transform: translate3d(100%, -50%,0);
}

.ce-interactive-scene__scroll-btn-icon {
  width: 12px;
}

.ce-interactive-scene__scroll-btn--left {
  .ce-interactive-scene__scroll-btn-icon {
    transform: translate3d(0,0,0) rotate(180deg);
    -webkit-transform: translate3d(0,0,0) rotate(180deg);
  }
}
</style>
