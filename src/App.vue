<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template lang="pug">
navigation-bar

router-view
</template>

<style lang="stylus">
$red = #ff6161

.input-error
  outline none
  box-shadow 0 0 0 0.2rem $red

.validation-error
  text-align center
  color $red
  position absolute
  left  0
  width 100%
  margin-top 3px

.router-link-active
  font-weight 700
  color black

.dark 
  body
    filter invert(100%)
    background-color rgb(29, 32, 31) !important
  img,
  .astro-code,
  .emoji,
  iframe /* for recaptcha */
    filter invert(100%) !important

.pointer
  cursor pointer
</style>