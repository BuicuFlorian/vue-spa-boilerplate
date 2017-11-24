<template>
  <!-- Modal -->
  <div class="modal fade" :id="modalId" role="dialog">
    <div class="modal-dialog">
      
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h1 class="modal-title text-center">{{ modalTitle }}</h1>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group" v-for="(input, index) in inputs">
              <label for="input">{{ input | capitalize }}:</label>
              <input type="text" v-model="form[index]" class="form-control" id="input" name="input">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="onSubmit(form); clearForm();" class="btn btn-success btn-block">
            Create
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalId', 'modalTitle', 'inputs', 'onSubmit'],

  data() {
    return {
      form: [],
    };
  },

  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  methods: {
    clearForm() {
      this.form = [];
    },
  },
};
</script>
