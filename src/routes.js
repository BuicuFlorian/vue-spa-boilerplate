import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';
import List from './components/List.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/login',
            component: Login,
            meta: {
                forVisitors: true
            }
        },

        {
            path: '/register',
            component: Register,
            meta: {
                forVisitors: true
            }
        },

        {
            path: '/home',
            component: Home,
            meta: {
                forAuth: true
            }
        },

        {
            path: '/list',
            component: List,
            meta: {
                forAuth: true
            }
        }
    ],

    // To remove # from the url.
    // mode: 'history',

    linkActiveClass: 'active'
})

// router.beforeEach(
//     (to, from, next) => {
//         if (to.matched.some(record => record.meta.forVisitors)) {
//             if (Vue.auth.isAuthenticated()) {
//                 next({
//                     path: '/home'
//                 })
//             } else {
//                 next();
//             }
//         } else if (to.matched.some(record => record.meta.forAuth)) {
//             if (!Vue.auth.isAuthenticated()) {
//                 next({
//                     path: '/login'
//                 })
//             } else {
//                 next();
//             }
//         } else {
//             next();
//         }
//     }
// )

export default router