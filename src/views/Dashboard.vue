<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = useFetch('/api/users')
</script>

<template lang="pug">
.container 
  .row 
    .col-12.text-center.mt-5
      h1 Dashboard

      .error-message(v-if='error') {{ error }}
      .spinner(v-if='isFetching')
        i.fa.fa-spinner.fa-pulse
      pre(v-else) {{ data }}

</template>

<style lang="stylus">
.error-message
  color red
</style>