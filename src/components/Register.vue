<template>
    <div class="col-md-4 col-md-offset-4" id="center-container">
		<form @submit.prevent="register()">
			<legend><h1 class="text-center">Sign Up</h1></legend>
      <div class="form-group" v-bind:class="{'has-error': errors.has('name'), 'has-success': ! errors.has('name')}">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-user-circle-o fa-fw"></i></span>
					<input v-model="form.name" v-validate="'required'" type="text" name="name" class="form-control" placeholder="Name">
				</div>
        <span class="text-danger"
          v-show="errors.has('name')">
          <b>{{ errors.first('name') }}</b>
        </span>
			</div>
			<div class="form-group" v-bind:class="{'has-error': errors.has('email'), 'has-success': ! errors.has('email')}">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-envelope fa-fw"></i></span>
					<input v-model="form.email" v-validate="'required|email'" type="email" name="email" class="form-control" placeholder="Email">
				</div>
        <span class="text-danger"
          v-show="errors.has('email')">
          <b>{{ errors.first('email') }}</b>
        </span>
			</div>
			<div class="form-group" v-bind:class="{'has-error': errors.has('password'), 'has-success': ! errors.has('password')}">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
					<input v-model="form.password" v-validate="'required|min:8'" type="password" name="password" class="form-control" placeholder="Password">
				</div>
        <span class="text-danger"
          v-show="errors.has('password')">
          <b>{{ errors.first('password') }}</b>
        </span>
			</div>
			<div class="form-group" v-bind:class="{'has-error': errors.has('passwordConfirmation'), 'has-success': ! errors.has('passwordConfirmation')}">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
					<input v-model="form.passwordConfirmation" v-validate="'required|min:8|confirmed:password'" type="password" name="passwordConfirmation" class="form-control" placeholder="Password">
				</div>
        <span class="text-danger"
          v-show="errors.has('passwordConfirmation')">
          <b>{{ errors.first('passwordConfirmation') }}</b>
        </span>
			</div>
			<div class="form-group">
				<button :disabled="errors.any()" class="btn btn-primary btn-block">
          <i v-if="!loading" class="fa fa-user-plus"></i>
          <i v-if="loading" class="fa fa-spinner fa-pulse"></i> 
          Sign Up
        </button>
			</div>
		</form>
	</div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      loading: false,
    };
  },

  methods: {
    /**
     * Create a new account.
     */
    register() {
      this.$validator.validateAll().then(response => {
        if (!response) {
          return;
        }

        this.loading = true;
        axios
          .post('/register', this.form)
          .then(response => {
            this.loading = false;
            swal({
              title: 'Congratulations',
              text: 'Your account was successfully created.',
              type: 'success',
              timer: 2000,
            });
            this.$router.push('/login');
          })
          .catch(error => {
            this.loading = false;
            swal({
              title: 'Error',
              text: 'Whoops, something went wrong!',
              type: 'error',
              timer: 2000,
            });
          });
      });
    },
  },
};
</script>

<style>

</style>
