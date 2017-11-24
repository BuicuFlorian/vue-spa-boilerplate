<template>
  <div class="col-md-10 col-md-offset-1">
    <ul class="list-group">
      <my-task 
        v-for="task in tasks" 
        :task="task"
        @delete-task="deleteTask(task)"
        @complete-task="toggleTaskCompleted(task)">
      </my-task>
    </ul>

    <br><br><br>
    <!-- Trigger the modal with a button -->
    <button type="button" id="openModalBtn" class="btn btn-info btn-md pull-right" data-toggle="modal" data-target="#createTaskModal">
      <i class="fa fa-plus fa-2x"></i>
    </button>

    <bs-modal
      modalId="createTaskModal"
      modalTitle="Create a new task"
      :inputs="['title', 'priority']"
      :onSubmit="createTask">
    </bs-modal>
  </div>
</template>

<script>
import Task from './Task';
import Modal from '../bootstrap/Modal.vue';
import swal from 'sweetalert2';

export default {
  data() {
    return {
      tasks: [],
    };
  },

  components: {
    'my-task': Task,
    'bs-modal': Modal,
  },

  created() {
    if (!this.tasks.length > 0) {
      setTimeout(() => {
        this.tasks = [
          {
            title: 'Hit the gym',
            priority: 'low',
            completed: true,
          },
          {
            title: 'Pay bills',
            priority: 'high',
            completed: false,
          },
          {
            title: 'Buy eggs',
            priority: 'low',
            completed: false,
          },
          {
            title: 'Read a book',
            priority: 'high',
            completed: false,
          },
          {
            title: 'Organize office',
            priority: 'medium',
            completed: false,
          },
        ];
      }, 1500);
    }
  },

  methods: {
    createTask(formData) {
      const task = {
        title: formData[0],
        priority: formData[1],
        completed: false,
      };

      this.tasks.push(task);
      $('#createTaskModal').modal('hide');
      swal({
        title: 'Created',
        text: 'Your task was successfully created.',
        type: 'success',
        timer: 2000,
      });
    },

    deleteTask(task) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.value) {
          swal({
            title: 'Deleted',
            text: 'Your task has been deleted.',
            type: 'success',
            timer: 2000,
          });
          this.tasks = this.tasks.filter(t => t !== task);
        }
      });
    },

    toggleTaskCompleted(task) {
      let index = this.tasks.indexOf(task);
      
      if (this.tasks[index].completed === false) {
        this.tasks[index].completed = true;
      } else {
        this.tasks[index].completed = false;
      }
    },
  },
};
</script>

<style>
#openModalBtn {
  border-radius: 50%;
  box-shadow: 3px 3px 5px #888888;
}

#openModalBtn:focus {
  outline: none;
  border-color: #217dbb;
}
</style>
