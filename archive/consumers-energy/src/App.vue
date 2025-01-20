<template>
  <router-view v-if="isLoaded" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { useModelStore } from '@/stores/model'

export default {
  components: {},
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await fetch('https://scottduncancreative.com/archive/consumers-energy/data.json')
      const data = await res.json()

      useModelStore().model = data
      this.isLoaded = true
    }
  }
}
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
}
</style>
