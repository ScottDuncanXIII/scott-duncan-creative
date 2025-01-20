<template>
  <div class="ce-dialogue-info" :style="cssProps">
    <div
      class="ce-dialogue-info__container"
      :class="{
        'ce-dialogue-info__container--top-left': arrowPos === 'topLeft',
        'ce-dialogue-info__container--top-right': arrowPos === 'topRight',
        'ce-dialogue-info__container--top-center': arrowPos === 'topCenter',
        'ce-dialogue-info__container--bottom-left': arrowPos === 'bottomLeft',
        'ce-dialogue-info__container--bottom-right': arrowPos === 'bottomRight',
        'ce-dialogue-info__container--bottom-center': arrowPos === 'bottomCenter'
      }"
    >
      <h2 v-if="heading" class="ce-dialogue-info__container-heading" v-html="heading"></h2>
      <p
        v-if="description"
        class="ce-dialogue-info__container-description"
        v-html="description"
      ></p>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap'

export default {
  props: {
    arrowPos: String,
    animationDelay: Number,
    animationDirection: String,
    description: String,
    heading: String,
    isActive: Boolean,
    posBottom: String,
    posLeft: String,
    posRight: String,
    posTop: String,
    posX: String,
    posY: String,
    ZIndex: Number
  },
  methods: {
    show() {
      gsap.set(this.$el, { display: 'block' })
      gsap.set(this.$el.querySelector('.ce-dialogue-info__container'), {
        y: this.animationDirection === 'up' ? '50%' : '-50%'
      })

      gsap.to(this.$el, { autoAlpha: 1, duration: 0.5, delay: this.animationDelay })
      gsap.to(this.$el.querySelector('.ce-dialogue-info__container'), {
        y: 0,
        duration: 1,
        delay: this.animationDelay,
        ease: 'back.out(1.1)'
      })
    },
    hide() {
      gsap.to(this.$el, { autoAlpha: 0, duration: 0.5, delay: 0.1 })
      gsap.to(this.$el.querySelector('.ce-dialogue-info__container'), {
        y: this.animationDirection === 'up' ? '50%' : '-50%',
        duration: 0.5,
        delay: 0.1
      })
    }
  },
  computed: {
    cssProps() {
      return {
        '--pos-bottom': this.posBottom,
        '--pos-left': this.posLeft,
        '--pos-right': this.posRight,
        '--pos-top': this.posTop,
        '--pos-x': this.posX,
        '--pos-y': this.posY,
        '--z-index': this.ZIndex || '0'
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

<style lang="less">
.ce-dialogue-info__container-description {
  svg {
    vertical-align: sub;
  }

  span {
    display: block;
    font-size: 1.3vh;
  }
}
</style>

<style lang="less" scoped>
.ce-dialogue-info {
  bottom: var(--pos-bottom);
  display: none;
  left: var(--pos-left);
  opacity: 0;
  position: absolute;
  right: var(--pos-right);
  top: var(--pos-top);
  transform: translate3d(var(--pos-x), var(--pos-y),0);
  -webkit-transform: translate3d(var(--pos-x), var(--pos-y),0);
  z-index: var(--z-index);
}

.ce-dialogue-info__container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 1.3;
  padding: 2.5vh 1.5vh;
  position: relative;
  width: 30vh;
  z-index: 10;

  &:after {
    border-top: 1.5vh solid #ffffff;
    border-left: 1.8vh solid transparent;
    border-right: 1.8vh solid transparent;
    content: '';
    height: 0;
    position: absolute;
    transform: translate3d(0, 90%,0);
    -webkit-transform: translate3d(0, 90%,0);
    width: 0;
    z-index: 0;
  }

  &.ce-dialogue-info__container--top-left {
    &:after {
      top: 0;
      left: 1.8vh;
      transform: translate3d(0, -90%,0) rotate(180deg);
      -webkit-transform: translate3d(0, -90%,0) rotate(180deg);
    }
  }

  &.ce-dialogue-info__container--top-right {
    &:after {
      top: 0;
      right: 1.8vh;
      transform: translate3d(0, -90%,0) rotate(180deg);
      -webkit-transform: translate3d(0, -90%,0) rotate(180deg);
    }
  }

  &.ce-dialogue-info__container--top-center {
    &:after {
      top: 0;
      left: 50%;
      transform: translate3d(-50%, -90%,0) rotate(180deg);
      -webkit-transform: translate3d(-50%, -90%,0) rotate(180deg);
    }
  }

  &.ce-dialogue-info__container--bottom-left {
    &:after {
      bottom: 0;
      left: 1.8vh;
      transform: translate3d(0, 90%,0);
      -webkit-transform: translate3d(0, 90%,0);
    }
  }

  &.ce-dialogue-info__container--bottom-right {
    &:after {
      bottom: 0;
      right: 1.8vh;
      transform: translate3d(0, 90%,0);
      -webkit-transform: translate3d(0, 90%,0);
    }
  }

  &.ce-dialogue-info__container--bottom-center {
    &:after {
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 90%,0);
      -webkit-transform: translate3d(-50%, 90%,0);
    }
  }
}

.ce-dialogue-info__container-heading {
  color: #000000;
  font-family: 'Open Sans';
  font-size: 1.8vh;
  font-weight: 600;
  text-align: center;

  @media screen and (max-width: 640px) {
    font-size: 2vh;
  }
}

.ce-dialogue-info__container-description {
  color: #000000;
  font-family: 'Open Sans';
  font-size: 1.8vh;
  font-weight: 400;
  line-height: 1.2;
  text-align: center;

  @media screen and (max-width: 640px) {
    font-size: 2vh;
  }
}
</style>
