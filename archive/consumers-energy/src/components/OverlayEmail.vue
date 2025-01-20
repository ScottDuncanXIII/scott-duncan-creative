<template>
  <section class="ce-email-overlay">
    <div class="ce-email-overlay__container">
      <IconSavingsGift class="ce-email-overlay__heading-icon" role="presentation" />

      <h2 class="ce-email-overlay__heading" v-html="model.Heading"></h2>

      <p class="ce-email-overlay__paragraph" v-html="model.Description"></p>

      <button
        @click="onDownloadButtonClick()"
        class="ce-email-overlay__download-btn"
        type="button"
        v-html="model.DownloadButtonLabel"
      ></button>

      <button
        @click="$emit('on-email-overlay-close-btn-click')"
        class="ce-email-overlay__close-btn"
        type="button"
        aria-label="Close Email Overlay"
      >
        <IconCross class="ce-email-overlay__close-icon" color="" />
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import gsap from 'gsap'
import IconCross from './icons/IconCross.vue'
import IconSavingsGift from './icons/IconSavingsGift.vue'
import { useSoundSettingsStore } from '@/stores/soundSettings'
import { useModelStore } from '@/stores/model'

export default {
  setup() {
    const model = useModelStore().model?.Explore?.OverlayEmail
    const soundSettings = useSoundSettingsStore()

    return {
      model,
      soundSettings
    }
  },
  components: {
    IconCross,
    IconSavingsGift
  },
  props: {
    isActive: Boolean
  },
  data() {
    return {
      sound: {} as HTMLAudioElement
    }
  },
  mounted() {
    if (this.isActive) {
      this.show()
    }

    this.initSound()
  },
  methods: {
    initSound() {
      this.sound = new Audio(
        'https://scottduncancreative.com/archive/consumers-energy/sounds/global__download-pdf.mp3'
      )
    },
    onDownloadButtonClick() {
      if (!this.isMuted) {
        this.sound.play()
      }

      this.$emit('on-email-overlay-download-button-click')
      this.$emit('on-email-overlay-close-btn-click')
    },
    show() {
      gsap.set(this.$el, { duration: 0.5, y: 200 })
      gsap.to(this.$el, { duration: 0.5, y: 0, autoAlpha: 1, ease: 'back.out(2)' })
    },
    hide() {
      gsap.to(this.$el, { duration: 0.5, y: 200, autoAlpha: 0, ease: 'back.in(2)' })
    }
  },
  computed: {
    isMuted() {
      return this.soundSettings.isMuted
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
.ce-email-overlay {
  background-color: #ffffff;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.25);
  left: 50%;
  max-width: 390px;
  opacity: 0;
  padding: 24px;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  visibility: hidden;
  width: 100%;
}

.ce-email-overlay__container {
  position: relative;
}

.ce-email-overlay__heading-icon {
  display: block;
  margin: 0 auto 8px;
}

.ce-email-overlay__heading {
  color: #000000;
  margin: 0 0 16px;
  font-size: 27px;
  font-weight: 700;
  line-height: 1.4;
  line-height: 32px;
  text-align: center;
}

.ce-email-overlay__paragraph {
  color: #000000;
  margin: 0 auto 24px;
  text-align: center;
  max-width: 225px;
}

.ce-email-overlay__email-address-input {
  border-radius: 2px;
  border: 1px solid #cecece;
  color: #000000;
  display: block;
  margin: 0 0 16px;
  padding: 12px 18px;
  width: 100%;

  &::placeholder {
    color: #929292;
  }
}

.ce-email-overlay__download-btn {
  background-color: #639d36;
  border: 0;
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 30px;
  width: 100%;
}

.ce-email-overlay__close-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
