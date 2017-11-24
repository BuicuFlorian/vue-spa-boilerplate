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
          <form @submit.prevent="submitForm()">
            <div class="form-group" v-for="(input, index) in inputs" v-bind:class="{ 
              'has-error': errors.has(input),
              'has-success': ! errors.has(input) }">
              <label for="input">{{ input | capitalize }}:</label>
              <input type="text" class="form-control" :id="input" :name="input"
                v-model="form[index]"
                v-validate="'required'">
              <span class="text-danger"
                v-show="errors.has(input)">
                <b>{{ errors.first(input) }}</b>
              </span>
            </div>
            <input type="submit" :disabled="errors.any()" class="btn btn-info btn-block" value="Create">
          </form>
        </div>
        <div class="modal-footer">
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
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        this.onSubmit(this.form);
        this.clearForm();
      });
    },

    clearForm() {
      this.form = [];
    },
  },
};
</script>
