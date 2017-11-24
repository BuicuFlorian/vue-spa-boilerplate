import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import Router from './routes.js';
import Auth from './utilities/auth/Auth.js';
import axios from 'axios';

Vue.use(Auth);
Vue.use(VeeValidate);

window.axios = axios;

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['authorization'] = Vue.auth.getToken();

new Vue({
    el: '#app',
    render: h => h(App),
    router: Router
});