<template>
    <div class="col-md-4 col-md-offset-4" id="center-container">
		<form @submit.prevent="register()">
			<legend><h1 class="text-center">Sign Up</h1></legend>
      <div class="form-group">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-user-circle-o fa-fw"></i></span>
					<input v-model="form.name" type="text" name="name" class="form-control" placeholder="Name" required autofocus>
				</div>
			</div>
			<div class="form-group">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-envelope fa-fw"></i></span>
					<input v-model="form.email" type="email" name="email" class="form-control" placeholder="Email" required>
				</div>
			</div>
			<div class="form-group">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
					<input v-model="form.password" type="password" name="password" class="form-control" placeholder="Password" required>
				</div>
			</div>
			<div class="form-group">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
					<input v-model="form.passwordConfirmation" type="password" name="passwordConfirmation" class="form-control" placeholder="Password" required>
				</div>
			</div>
			<div class="form-group">
				<button v-show="form.name && form.email && form.password && form.passwordConfirmation" class="btn btn-success btn-block">
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
        passwordConfirmation: ''
      },
      loading: false
    };
  },

  methods: {
    /**
     * Create a new account.
     */
    register() {
      this.loading = true;

      if (this.form.password !== this.form.passwordConfirmation) {
        this.loading = false;
        swal({
          title: 'Warning',
          text: 'Passwords don\'t match',
          type: 'warning',
          timer: 2000
        });
        return;
      } else {
        axios.post('/register', this.form)
          .then(response => {
            this.loading = false;
            swal({
              title: 'Congratulations',
              text: 'Your account was successfully created.',
              type: 'success',
              timer: 2000
            });
            this.$router.push('/login');
          })
          .catch(error => {
            this.loading = false;
            swal({
              title: 'Error',
              text: 'Whoops, something went wrong!',
              type: 'error',
              timer: 2000
            });
          });
      }
    }
  }
};
</script>

<style>

</style>
