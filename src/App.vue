<script setup>
console.log('记得更换baseURL');
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="MainFade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.MainFade-enter-from, .MainFade-leave-to {
  opacity: 0;
}
.MainFade-enter-to, .MainFade-leave-from {
  opacity: 1;
}
.MainFade-enter-active,
.MainFade-leave-active {
  transition: opacity 1s;
}
</style>
