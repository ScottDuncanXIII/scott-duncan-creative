<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue'
import { useModelStore } from '@/stores/model'

const model = useModelStore().model?.Explore

defineProps<{
  progressCount: number
  progressTotal: number
}>()
</script>

<template>
  <div class="ce-overlay-list-progess">
    <div class="ce-overlay-list-progess__container">
      <h2 class="ce-overlay-list-progess__title">
        {{ model.ViewedProductsLabel }}
      </h2>

      <svg
        class="ce-overlay-list-progess__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          d="M8.3125 13C8.3125 10.3682 10.3682 8.3125 13 8.3125C15.5879 8.3125 17.6875 10.3682 17.6875 13C17.6875 15.5879 15.5879 17.6875 13 17.6875C10.3682 17.6875 8.3125 15.5879 8.3125 13ZM25.5 13C25.5 19.9043 19.9043 25.5 13 25.5C6.0957 25.5 0.5 19.9043 0.5 13C0.5 6.0957 6.0957 0.5 13 0.5C19.9043 0.5 25.5 6.0957 25.5 13ZM13 2.84375C7.38965 2.84375 2.84375 7.38965 2.84375 13C2.84375 18.6104 7.38965 23.1562 13 23.1562C18.6104 23.1562 23.1562 18.6104 23.1562 13C23.1562 7.38965 18.6104 2.84375 13 2.84375Z"
          fill="#0079C1"
        />
      </svg>

      <div class="ce-overlay-list-progess__count">{{ progressCount }} of {{ progressTotal }}</div>
    </div>

    <button
      class="ce-overlay-list-progess__close-btn"
      @click="$emit('overlayCloseBtnClick')"
      type="button"
      aria-label="Close Slide Out Overlay"
    >
      <IconCross color="" />
    </button>
  </div>
</template>

<style lang="less" scoped>
.ce-overlay-list-progess {
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 15px 16px;
  width: 100%;
  z-index: 10;
}

.ce-overlay-list-progess__container {
  align-items: center;
  display: flex;
  justify-content: left;
}

.ce-overlay-list-progess__title {
  color: #000000;
  line-height: 24px;
  font-size: 1.6rem;
  font-weight: 600;
}

.ce-overlay-list-progess__icon {
  height: 25px;
  margin: 0 11.5px;
  width: 25px;
}

.ce-overlay-list-progess__count {
  color: #000000;
  line-height: 24px;
  font-size: 1.6rem;
  font-weight: 600;
}

.ce-overlay-list-progess__close-btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  z-index: 10;
}
</style>
