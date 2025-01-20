<script setup lang="ts">
defineProps<{
  heading: String
  subheading: String
  hotspotActiveCount: number
}>()
</script>

<template>
  <section
    class="ce-overlay-list"
    :class="{ 'ce-overlay-list--export-active': hotspotActiveCount > 0 }"
  >
    <slot name="progress"></slot>

    <div class="ce-overlay-list__content-container">
      <div class="ce-overlay-list__heading-container">
        <h3 class="ce-overlay-list__heading">
          <slot name="listItemsPrimaryHeading"></slot>
        </h3>
      </div>

      <ul class="ce-overlay-list__content">
        <slot name="listItemsPrimary"></slot>
      </ul>

      <div class="ce-overlay-list__heading-container">
        <h3 class="ce-overlay-list__heading">
          <slot name="listItemsSecondaryHeading"></slot>
        </h3>
      </div>

      <ul class="ce-overlay-list__content">
        <slot name="listItemsSecondary"></slot>
      </ul>
    </div>

    <slot name="exportList"></slot>
  </section>
</template>

<style lang="less">
.ce-overlay-list__header-icon svg {
  fill: #0079c1;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%,0);
  -webkit-transform: translate3d(-50%, -50%,0);
  transition: 0.5s all;
  width: 20px;
}
</style>

<style lang="less" scoped>
.ce-overlay-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  transition: 0.5s all;
}

.ce-overlay-list--export-active {
  padding: 0 0 80px;
}

.ce-overlay-list__heading-container {
  padding: 0 16px;
}

.ce-overlay-list__heading {
  border-bottom: 1px solid #b3b3b3;
  color: #929292;
  font-family: 'Open Sans';
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 3.25px;
  line-height: 1.8;
  padding: 8px;
  text-transform: uppercase;
}

.ce-overlay-list__content-container {
  background-color: rgba(255, 255, 255, 0.95);
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.ce-overlay-list__content {
  padding: 0 16px;
}
</style>
