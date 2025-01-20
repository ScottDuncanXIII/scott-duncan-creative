<template>
  <div
    class="ce-overlay-list-export"
    :class="{ 'ce-overlay-list-export--active': selectedCount && selectedCount > 0 }"
  >
    <button class="ce-overlay-list-export__btn" @click="onExportButtonClick()" type="button">
      <div class="ce-overlay-list-export__count">
        <span>{{ selectedCount }}</span>
      </div>

      <div class="ce-overlay-list-export__label">
        {{ model.ExportWorkbookLabel }}
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { useSoundSettingsStore } from '@/stores/soundSettings'
import { useModelStore } from '@/stores/model'

export default {
  setup() {
    const model = useModelStore().model?.Explore
    const soundSettings = useSoundSettingsStore()

    return {
      model,
      soundSettings
    }
  },
  props: {
    selectedCount: Number
  },
  data() {
    return {
      sound: {} as HTMLAudioElement
    }
  },
  mounted() {
    this.initSound()
  },
  methods: {
    initSound() {
      this.sound = new Audio(
        'https://scottduncancreative.com/archive/consumers-energy/sounds/global__download-pdf.mp3'
      )
    },
    onExportButtonClick() {
      if (!this.isMuted) {
        this.sound.play()
      }

      this.$emit('exportButtonClick')
    }
  },
  computed: {
    isMuted() {
      return this.soundSettings.isMuted
    }
  }
}
</script>

<style lang="less"></style>

<style lang="less" scoped>
.ce-overlay-list-export {
  background-color: #ffffff;
  bottom: 0;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 16px 16px;
  position: absolute;
  transform: translate3d(0, 100%, 0);
  -webkit-transform: translate3d(0, 100%, 0);
  transition: 0.5s all;
  width: 100%;
  z-index: 10;
}

.ce-overlay-list-export--active {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}

.ce-overlay-list-export__btn {
  align-items: center;
  background-color: #0079c1;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  gap: 8px;
  justify-content: center;
  line-height: 24px;
  padding: 12px 30px;
  width: 100%;
}

.ce-overlay-list-export__count {
  background: #639d36;
  border-radius: 50%;
  height: 24px;
  position: relative;
  width: 24px;

  span {
    color: #ffffff;
    font-size: 1.42rem;
    font-weight: 700;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    -webkit-transform: translate3d(-50%, -50%, 0);
  }
}

.ce-overlay-list-export__label {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 24px;
  padding: 0;
}
</style>
