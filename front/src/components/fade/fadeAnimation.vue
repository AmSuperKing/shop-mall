<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimation'
}
</script>

<style lang="scss" scoped>
  .v-enter, .v-leave-to {
    opacity: 0;
  }

  .v-enter-active, .v-leave-active {
    transition: opacity .6s;
  } 
</style>
