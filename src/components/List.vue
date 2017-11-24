<template>
  <div>
    <h1 class="text-center">To Do List</h1>
    <my-tasks></my-tasks>
  </div>
</template>

<script>
import Tasks from './task/Tasks.vue';

export default {
  components: {
    'my-tasks': Tasks,
  },
};
</script>
