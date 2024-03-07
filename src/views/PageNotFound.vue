<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template lang="pug">
.container
  .row.text-center
    .col-12.pt-5
      h2 Page Not Found

    a(href="#" @click.prevent="router.back()") Go back
</template>