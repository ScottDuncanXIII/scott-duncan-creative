<template>
  <li class="ce-overlay-list-item">
    <button @click="onAddRemoveClick()" class="ce-overlay-list-item__add-remove-btn">
      <IconItemAddRemove
        :is-hotspot-active="isHotspotActive"
        :is-hotspot-viewed="isHotspotViewed"
      />
    </button>

    <button
      @click="$emit('listItemProductBtnClick', index)"
      class="ce-overlay-list-item__details-btn"
      type="button"
    >
      <h3 class="ce-overlay-list-item__title" v-html="title"></h3>

      <IconChevron class="ce-overlay-list-item__icon" />
    </button>
  </li>
</template>

<script lang="ts">
import IconItemAddRemove from '@/components/icons/IconItemAddRemove.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import { useSoundSettingsStore } from '@/stores/soundSettings'

export default {
  setup() {
    const soundSettings = useSoundSettingsStore()

    return {
      soundSettings
    }
  },
  components: {
    IconItemAddRemove,
    IconChevron
  },
  props: {
    title: String,
    index: Number,
    isHotspotActive: Boolean,
    isHotspotViewed: Boolean
  },
  data() {
    return {
      sound: {} as HTMLAudioElement
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.sound = new Audio(
        'https://scottduncancreative.com/archive/consumers-energy/sounds/global__add-to-list.mp3'
      )
    },
    onAddRemoveClick() {
      if (!this.isHotspotActive && !this.isMuted) {
        this.sound.play()
      }

      this.$emit('hotspotActiveArrayAddRemoveClick', this.index)
    }
  },
  computed: {
    isMuted() {
      return this.soundSettings.isMuted
    }
  }
}
</script>

<style lang="less" scoped>
.ce-overlay-list-item {
  align-items: center;
  border-bottom: 1px solid #b3b3b3;
  display: flex;
  gap: 16px;
}

.ce-overlay-list-item__add-remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
}

.ce-overlay-list-item__add-remove-icon {
  height: 20px;
  width: 20px;
}

.ce-overlay-list-item__title {
  color: #000000;
  font-family: 'Open Sans';
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.6;
  text-align: left;
}

.ce-overlay-list-item__icon {
  width: 12px;
}

.ce-overlay-list-item__details-btn {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex: 1;
  gap: 16px;
  justify-content: space-between;
  padding: 16px 10px 16px 0;
}
</style>
