import swal from 'sweetalert2';

export default function(Vue) {
    let authenticatedUser = {};

    Vue.auth = {
        /**
         * Save the token and expiration date to Local Storage.
         * 
         * @param {String} token
         * @param {String} expiration
         */
        setToken(token, expiration) {
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', expiration);
        },

        /**
         * Get the token from Local Storage.
         */
        getToken() {
            const token = localStorage.getItem('token');
            const expiration = localStorage.getItem('expiration');

            if (!token || !expiration) {
                return null;
            }

            if (Date.now() > parseInt(expiration)) {
                swal({
                    html: '<i class="fa fa-hourglass-end fa-5x"></i>',
                    title: 'Your session has expired.',
                    timer: 4000,
                    showCloseButton: true,
                    showConfirmButton: false
                });

                this.destroyToken();
                return null;
            } else {
                return token;
            }
        },

        /**
         * Remove the token from Local Storage.
         */
        destroyToken() {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');

        },

        /**
         * Verify if the user it's authenticated or not.
         */
        isAuthenticated() {
            return !! this.getToken();
        },

        /**
         * Set authenticated user's profile.
         */
        setAuthenticatedUser(user) {
            authenticatedUser = user;
        },

        /**
         * Get authenticated uer's profile.
         */
        getAuthenticatedUser() {
            return authenticatedUser;
        }
    }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get() {
                return Vue.auth;
            }
        }
    })
}