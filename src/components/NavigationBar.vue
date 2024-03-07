<script lang="ts" setup>
import { computed } from 'vue';
import { useDark, useToggle } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router';

import { userStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const isDark = useDark();
const toggleDark = useToggle(isDark);

const shouldDisplayLogin = computed(() => !userStore.isLoggedIn && route.name === 'signup');

const logOut = (): void => {
  userStore.destroySession();
  
  router.push({ name: 'login' });
}
</script>

<template lang="pug">
nav#navbar.navbar.navbar-expand-lg.bg-light 
  .container-fluid
    a.navbar-brand(href='#') Vue SPA Boilerplate
    
    button.navbar-toggler(v-if='userStore.isLoggedIn' type='button' data-bs-toggle='collapse' data-bs-target='#navbar-nav' aria-controls='navbar-nav' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon

    #navbar-nav.collapse.navbar-collapse
      ul.navbar-nav.ms-auto.mt-2.mt-lg-0
        li.nav-item(v-if='shouldDisplayLogin')
          router-link.nav-link(:to="{ name: 'login' }") Login

        li.nav-item(v-if='userStore.isLoggedIn')
          router-link.nav-link(:to="{ name: 'dashboard' }") Dashboard

        li.nav-item(v-if='userStore.isLoggedIn')
          a.nav-link.ps-4(href='#' @click.prevent='logOut()') Log out

        li.nav-item.ms-3 
          button.btn.btn-dark(@click='toggleDark()' type='button' aria-label='Dark Mode Toggler')
            i.fa.fa-lightbulb-o(v-if='isDark')
            i.fa.fa-moon-o(v-else)
</template>