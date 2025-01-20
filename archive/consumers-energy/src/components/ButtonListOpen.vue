<template>
  <section
    class="ce-button-list-open"
    :class="{ 'ce-button-list-open--disabled': isButtonDisabled }"
  >
    <button class="ce-button-list-open__btn" @click="onClick" type="button">
      <IconListOpen class="ce-button-list-open__btn-icon" />
      <span class="ce-button-list-open__btn-count-container">
        <span class="ce-button-list-open__btn-count">{{ selectedCount }}</span>
      </span>
    </button>

    <PopUpDialogueInfo
      v-if="dialogueInfoDescription"
      :arrowPos="isMobile ? 'bottomCenter' : 'topRight'"
      :animationDelay="Number(0.5)"
      :animationDirection="isMobile ? 'down' : 'up'"
      :heading="dialogueInfoHeading"
      :description="dialogueInfoDescription"
      :dheading="dialogueInfoHeading"
      :isActive="isDialogueInfoActive"
      :posBottom="isMobile ? '100%' : 'auto'"
      :posLeft="isMobile ? '50%' : 'auto'"
      :posRight="isMobile ? 'auto' : '-8px'"
      posTop="auto"
      :posX="isMobile ? '-50%' : '0'"
      :posY="isMobile ? '-20px' : '25px'"
    />
  </section>
</template>

<script lang="ts">
import IconListOpen from '@/components/icons/IconListOpen.vue'
import PopUpDialogueInfo from '@/components/PopUpDialogueInfo.vue'

export default {
  components: {
    IconListOpen,
    PopUpDialogueInfo
  },
  props: {
    dialogueInfoArrowPos: String,
    dialogueInfoDescription: String,
    dialogueInfoHeading: String,
    isButtonDisabled: Boolean,
    isDialogueInfoActive: Boolean,
    selectedCount: Number
  },
  data() {
    return {
      isMobile: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    onClick() {
      this.$emit('listOpenBtnClick')
    },
    onResize() {
      this.isMobile = window.innerWidth <= 640 ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
.ce-button-list-open {
  opacity: 0;
  position: absolute;
  right: 24px;
  top: 16px;
  transition: 0.5s all;
  z-index: 1;

  @media screen and (max-width: 640px) {
    bottom: 24px;
    left: 50%;
    right: auto;
    top: auto;
    transform: translate3d(-50%,0,0);
    -webkit-transform: scale(var(--scale)) translate3d(-50%,0,0);
  }
}

.ce-button-list-open--disabled {
  opacity: 0.5 !important;
  pointer-events: none;
}

.ce-button-list-open__btn {
  background-color: #0079c1;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 56px;
  width: 56px;
  z-index: 20;
}

.ce-button-list-open__btn-icon {
  fill: #ffffff;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%,0);
  -webkit-transform: translate3d(-50%,-50%,0);
  width: 25px;
}

.ce-button-list-open__btn-count-container {
  position: absolute;
  background-color: #639d36;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 24px;
  left: 0;
  top: 0;
  transform: translate3d(-25%, -25%);
  -webkit-transform: translate3d(-25%,-25%,0);
  width: 24px;
}

.ce-button-list-open__btn-count {
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%);
  -webkit-transform: translate3d(-50%, -50%,0);
}
</style>
