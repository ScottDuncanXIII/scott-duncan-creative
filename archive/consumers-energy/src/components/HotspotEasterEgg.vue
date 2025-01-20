<template>
  <button
    @click.stop="$emit('hotspot-click', index)"
    class="ce-hotspot__btn"
    type="button"
    :aria-label="title"
    :data-depth-x="depthX"
    :data-depth-y="depthY"
    :style="cssProps"
  >
    <IconHotspotEasterEgg
      class="ce-hotspot__icon"
      :class="{ 'ce-hotspot__icon--active': isHotspotActive }"
    />

    <PopUpDialogueInfo
      v-if="dialogueInfoMessage !== 'undefined'"
      :arrowPos="dialogueInfoArrowPos"
      :animationDelay="Number(0)"
      :animationDirection="dialogueAnimDirection"
      :description="dialogueInfoMessage"
      :isActive="isDialogueInfoActive"
      :posBottom="dialogueBottom"
      posLeft="50%"
      :posTop="dialogueTop"
      posX="-50%"
      posY="0"
    />
  </button>
</template>

<script lang="ts">
import PopUpDialogueInfo from '@/components/PopUpDialogueInfo.vue'
import IconHotspotEasterEgg from './icons/IconHotspotEasterEgg.vue'

export default {
  components: {
    IconHotspotEasterEgg,
    PopUpDialogueInfo
  },
  props: {
    index: Number,
    depthX: Number,
    depthY: Number,
    dialogueInfoPos: String,
    dialogueInfoMessage: String,
    hotspotLeft: String,
    hotspotTop: String,
    isDialogueInfoActive: Boolean,
    isHotspotActive: Boolean,
    isHotspotViewed: Boolean,
    topPos: String,
    leftPos: String,
    title: String,
    zindex: Number
  },
  data() {
    return {
      dialogueAnimDirection: '',
      dialogueBottom: '',
      dialogueInfoArrowPos: '',
      dialogueTop: ''
    }
  },
  mounted() {
    if (this.dialogueInfoMessage !== 'undefined') {
      this.dialogueAnimDirection = this.dialogueInfoPos === 'top' ? 'down' : 'up'
      this.dialogueBottom = this.dialogueInfoPos === 'top' ? '5vh' : 'auto'
      this.dialogueInfoArrowPos = this.dialogueInfoPos === 'top' ? 'bottomCenter' : 'topCenter'
      this.dialogueTop = this.dialogueInfoPos === 'top' ? 'auto' : '5vh'
      this.showInfoDialogue()
    }
  },
  methods: {
    showInfoDialogue() {
      if (this.dialogueInfoMessage !== 'undefined') {
        this.$refs?.popUpDialogueInfo?.show()
      }
    },
    hideInfoDialogue() {
      if (this.dialogueInfoMessage !== 'undefined') {
        this.$refs?.popUpDialogueInfo?.hide()
      }
    }
  },
  computed: {
    cssProps() {
      return {
        '--top-pos': this.topPos,
        '--left-pos': this.leftPos,
        '--z-index': this.zindex
      }
    }
  },
  watch: {
    isDialogueInfoActive() {
      if (this.isDialogueInfoActive) {
        this.showInfoDialogue()
      } else {
        this.hideInfoDialogue()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ce-hotspot__btn {
  background: none;
  border: 0;
  cursor: pointer;
  display: inline-block !important;
  left: var(--left-pos) !important;
  opacity: 0;
  padding: 0;
  position: absolute !important;
  top: var(--top-pos) !important;
  transform: translate3d(-50%, -50%,0);
  -webkit-transform: translate3d(-50%, -50%,0);
  z-index: var(--z-index);
}

.ce-hotspot__icon {
  transition: 0.5s all;
}

.ce-hotspot__icon--active {
  fill: #000000;
}
</style>
