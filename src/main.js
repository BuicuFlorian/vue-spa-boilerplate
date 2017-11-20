import Vue from 'vue'
import App from './App.vue'
import Router from './routes.js'
import Auth from './utilities/auth/Auth.js'
import axios from 'axios'

Vue.use(Auth)

window.axios = axios;

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['authorization'] = Vue.auth.getToken();

new Vue({
    el: '#app',
    render: h => h(App),
    router: Router
})