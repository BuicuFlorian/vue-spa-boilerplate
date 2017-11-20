<template>
    <div class="col-md-4 col-md-offset-4" id="center-container">
		<form @submit.prevent="authenticate()">
			<legend><h1 class="text-center">Log In</h1></legend>
			<div class="form-group">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-envelope fa-fw"></i></span>
					<input v-model="form.email" type="email" name="email" class="form-control" placeholder="Email" required autofocus>
				</div>
			</div>
			<div class="form-group">
				<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
					<input v-model="form.password" type="password" name="password" class="form-control" placeholder="Password" required>
				</div>
			</div>
			<div class="form-group">
				<button v-show="form.email && form.password" class="btn btn-success btn-block">
          <i v-if="!loading" class="fa fa-sign-in"></i>
          <i v-if="loading" class="fa fa-spinner fa-pulse"></i> 
          Log In
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
        email: '',
        password: ''
      },
      loading: false
    };
  },

  methods: {
    /**
     * Authenticate the user.
     */
    authenticate() {
      this.loading = true;

      axios.post('/authenticate', this.form)
        .then(response => {
          this.loading = false;
          this.$auth.setToken(
            response.accessToken,
            response.expiresIn + Date.now()
          );
          this.$router.push('/home');
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
};
</script>

<style>

</style>
