<template>
  <div class="header clearfix">
    <nav>
      <ul class="nav nav-pills pull-right">
        <router-link tag="li" to="/home" v-if="isAuth()">
          <a><i class="fa fa-home"></i> Home</a>
        </router-link>
        <router-link tag="li" to="/list" v-if="isAuth()">
          <a><i class="fa fa-list-ul"></i> List</a>
        </router-link>
        <router-link tag="li" to="/login" v-if="! isAuth()">
          <a>Log In</a>
        </router-link>
        <router-link tag="li" to="/register" v-if="! isAuth()">
          <a>Sign Up</a>
        </router-link>
        <router-link tag="li" to="/login" v-if="isAuth" id="logout-li">
          <button @click="logOut()" id="logout-btn" v-if="isAuth()">
            <i class="fa fa-sign-out"></i> Logout
          </button>
        </router-link>
      </ul>
    </nav>
    <h3 class="text-muted">VueJS SPA Boilerplate</h3>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  created() {
    this.isAuth();
  },

  methods: {
    /**
     * Verify if the user it's authenticated or not.
     */
    isAuth() {
      return this.$auth.isAuthenticated();
    },

    /**
     * Destroy the session of the authenticated user and display an alert.
     */
    logOut() {
      this.$auth.destroyToken();
      swal({
        title: 'Have a nice day',
        html: '<i class="fa fa-handshake-o fa-5x"></i>',
        timer: 2000,
        confirmButtonText: 'Goodbye',
      });
    },
  },
};
</script>

<style>
#logout-li {
  padding-top: 10px;
  padding-left: 10px;
}

#logout-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  font: inherit;
  cursor: pointer;
  color: #18bc9c;
  outline: none;
}
</style>
