<script setup lang="ts">
defineProps<{
  percentage: Number
}>()
</script>

<template>
  <section class="ce-header-progress-bar">
    <div class="ce-header-progress-bar__fill" :style="{ width: percentage + '%' }"></div>
  </section>
</template>

<style lang="less" scoped>
.ce-header-progress-bar {
  background: #e5e5e5;
  flex-shrink: 0;
  height: 8px;
  position: relative;
  transition: 0.5s all;
  width: 100%;
  z-index: 10;
}

.ce-header-progress-bar__fill {
  background: #639d36;
  height: 100%;
}
</style>
