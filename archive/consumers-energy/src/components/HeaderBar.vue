<template>
  <section class="ce-header-bar" :class="{ 'ce-header-bar--loaded': isLoaded }">
    <a class="ce-header-bar__container" href="https://www.consumersenergy.com/" target="_blank">
      <img
        alt="Consumer Energy Logo"
        class="ce-header-bar__logo"
        src="\imgs\consumer-energy-logo.svg"
      />
    </a>
  </section>
</template>

<script lang="ts">
import gsap from 'gsap'

export default {
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    this.isLoaded = true
  }
}
</script>

<style lang="less" scoped>
.ce-header-bar {
  align-items: center;
  background: #0079c1;
  display: flex;
  flex-shrink: 0;
  height: 80px;
  justify-content: center;
  transform: translate3d(0,-100%,0);
  -webkit-transform: translate3d(0,-100%,0);
  transition: 0.5s all;
  width: 100%;
  z-index: 100;

  @media screen and (max-width: 640px) {
    height: 50px;
  }
}

.ce-header-bar--loaded {
  transform: translate3d(0,0,0);
  -webkit-transform: translate3d(0,0,0);
}

.ce-header-bar__container {
  display: flex;
}

.ce-header-bar__logo {
  height: 48px;

  @media screen and (max-width: 640px) {
    height: 34px;
  }
}
</style>
