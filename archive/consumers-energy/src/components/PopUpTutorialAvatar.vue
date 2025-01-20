<template>
  <div
    @click="$emit('tutorial-avatar-click')"
    class="ce-tutorial-pop-up"
    :style="cssProps"
    :data-depth-x="depthX"
    :data-depth-y="depthY"
  >
    <PopUpDialogueInfo
      v-if="dialogueInfoDescription"
      :arrowPos="dialogueInfoArrowPos"
      :animationDelay="Number(0.8)"
      animationDirection="up"
      :description="dialogueInfoDescription"
      :heading="dialogueInfoHeading"
      :isActive="isDialogueInfoActive"
      :posBottom="dialogueInfoBottom"
      :posLeft="dialogueInfoLeft"
      :posRight="dialogueInfoRight"
      :posTop="dialogueInfoTop"
      :posX="dialogueInfoX"
      :posY="dialogueInfoY"
    />

    <img class="ce-tutorial-pop-up__image" :src="url" alt="" />
  </div>
</template>

<script lang="ts">
import PopUpDialogueInfo from '@/components/PopUpDialogueInfo.vue'
import TutorialAvatarA from '/imgs/tutorial-avatar--a.png'
import TutorialAvatarB from '/imgs/tutorial-avatar--b.png'
import TutorialAvatarC from '/imgs/tutorial-avatar--c.png'
import gsap from 'gsap'

export default {
  components: {
    PopUpDialogueInfo
  },
  props: {
    avatar: String,
    delay: Number,
    depthX: Number,
    depthY: Number,
    heightPerc: String,
    imageHeight: String,
    dialogueInfoArrowPos: String,
    dialogueInfoDescription: String,
    dialogueInfoHeading: String,
    dialogueInfoBottom: String,
    dialogueInfoLeft: String,
    dialogueInfoRight: String,
    dialogueInfoTop: String,
    dialogueInfoX: String,
    dialogueInfoY: String,
    isActive: Boolean,
    posBottom: String,
    posLeft: String,
    posRight: String,
    posX: String,
    zindex: Number
  },
  data() {
    return {
      isDialogueInfoActive: false,
      url: ''
    }
  },
  mounted() {
    this.initAvatar()
    this.hide()
  },
  methods: {
    initAvatar() {
      switch (this.avatar) {
        case 'a':
          this.url = TutorialAvatarA
          break
        case 'b':
          this.url = TutorialAvatarB
          break
        case 'c':
          this.url = TutorialAvatarC
          break
      }
    },
    show() {
      gsap.set(this.$el, { display: 'block', delay: this.delay })
      gsap.to(this.$el.querySelector('.ce-tutorial-pop-up__image'), {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: this.delay,
        ease: 'back.out(1.1)'
      })

      if (this.dialogueInfoDescription) {
        this.isDialogueInfoActive = true
      }
    },
    hide() {
      gsap.to(this.$el.querySelector('.ce-tutorial-pop-up__image'), {
        autoAlpha: 0,
        y: '100%',
        duration: 0.8,
        ease: 'back.in(1.1)'
      })

      if (this.dialogueInfoDescription) {
        this.isDialogueInfoActive = false
      }

      gsap.set(this.$el, { display: 'none', delay: 0.8 })
    }
  },
  computed: {
    cssProps() {
      return {
        '--height-perc': this.heightPerc,
        '--image-height': this.imageHeight,
        '--pos-bottom': this.posBottom,
        '--pos-left': this.posLeft,
        '--pos-right': this.posRight,
        '--pos-x': this.posX || 0,
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
    },
    avatar() {
      this.initAvatar()
    }
  }
}
</script>

<style lang="less" scoped>
.ce-tutorial-pop-up {
  background: none;
  border: 0;
  bottom: var(--pos-bottom);
  display: none;
  height: var(--height-perc);
  left: var(--pos-left) !important;
  padding: 0;
  position: absolute !important;
  right: var(--pos-right);
  top: auto !important;
  transform: translate3d(var(--pos-x), 0, 0);
  -webkit-transform: translate3d(var(--pos-x), 0, 0);
  z-index: var(--z-index);
}

.ce-tutorial-pop-up__image {
  display: block;
  height: var(--image-height);
  transform: translate3d(0, 100%, 0);
  -webkit-transform: translate3d(0, 100%, 0);
}
</style>
