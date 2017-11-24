<template>
  <div class="row">
    <li class="list-group-item" data-toggle="tooltip" :title="task.priority" v-bind:class="{ 
      'strike list-group-item-success': task.completed === true, 
      'list-group-item-info': task.priority === 'low' && task.completed === false,
      'list-group-item-warning': task.priority === 'medium' && task.completed === false, 
      'list-group-item-danger': task.priority === 'high' && task.completed === false}">
      <span @click="$emit('complete-task')" id="title">{{ task.title }}</span><span @click="$emit('delete-task')" class="badge" data-toggle="tooltip" title="Remove task">X</span>
    </li>
  </div>
</template>

<script>
export default {
  props: ['task'],

  ready() {
    this.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
};
</script>

<style>
.strike {
  text-decoration: line-through;
}

li:hover {
  margin-left: 0.3em;
}

#title:hover {
  cursor: pointer;
}

.badge:hover {
  cursor: pointer;
}
</style>
